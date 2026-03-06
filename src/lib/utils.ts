import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number = 30
): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

export function calculateMaxPurchasePrice(
  annualIncome: number,
  downPayment: number,
  annualRate: number
): number {
  const monthlyIncome = annualIncome / 12;
  const maxMonthlyPayment = monthlyIncome * 0.28;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = 30 * 12;

  if (monthlyRate === 0) {
    return maxMonthlyPayment * numPayments + downPayment;
  }

  const loanAmount =
    (maxMonthlyPayment * (Math.pow(1 + monthlyRate, numPayments) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments));

  return loanAmount + downPayment;
}

// ── Enhanced Affordability Calculator ──────────────────────────────

export interface AffordabilityInputs {
  annualIncome: number;
  downPayment: number;
  annualRate: number;
  loanTermYears: 15 | 30;
  monthlyDebt: number;
  propertyTaxRate: number; // % per year
  annualInsurance: number; // $/year
  monthlyHOA: number; // $/month
}

export interface AffordabilityResult {
  maxPurchasePrice: number;
  loanAmount: number;
  monthlyPI: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  frontEndDTI: number; // %
  backEndDTI: number; // %
  pmiRequired: boolean;
}

export function calculateDetailedAffordability(
  inputs: AffordabilityInputs
): AffordabilityResult {
  const {
    annualIncome,
    downPayment,
    annualRate,
    loanTermYears,
    monthlyDebt,
    propertyTaxRate,
    annualInsurance,
    monthlyHOA,
  } = inputs;

  const monthlyIncome = annualIncome / 12;
  const monthlyInsuranceFixed = annualInsurance / 12;

  // Dual DTI constraints
  const frontEndMax = monthlyIncome * 0.28; // 28% front-end: housing costs only
  const backEndMax = monthlyIncome * 0.36 - monthlyDebt; // 36% back-end: housing + all debts
  const maxHousingCost = Math.max(0, Math.min(frontEndMax, backEndMax));

  // Edge case: no income or debts exceed limits
  if (maxHousingCost <= 0 || annualIncome <= 0) {
    return {
      maxPurchasePrice: Math.round(downPayment),
      loanAmount: 0,
      monthlyPI: 0,
      monthlyPropertyTax: 0,
      monthlyInsurance: monthlyInsuranceFixed,
      monthlyPMI: 0,
      monthlyHOA,
      totalMonthlyPayment: monthlyInsuranceFixed + monthlyHOA,
      frontEndDTI: 0,
      backEndDTI: 0,
      pmiRequired: false,
    };
  }

  // Binary search for max purchase price
  // Property tax & PMI scale with price, so algebraic solution isn't clean
  let lo = downPayment;
  let hi = Math.max(annualIncome * 10, downPayment + 1);

  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    const loan = mid - downPayment;
    const pi = calculateMonthlyPayment(loan, annualRate, loanTermYears);
    const tax = (mid * propertyTaxRate) / 100 / 12;
    const pmi =
      mid > 0 && downPayment / mid < 0.2 ? (loan * 0.0075) / 12 : 0;
    const total = pi + tax + monthlyInsuranceFixed + pmi + monthlyHOA;

    if (total <= maxHousingCost) {
      lo = mid;
    } else {
      hi = mid;
    }
    if (hi - lo < 1) break;
  }

  const maxPrice = Math.floor(lo);
  const loanAmount = Math.max(0, maxPrice - downPayment);
  const monthlyPI = calculateMonthlyPayment(
    loanAmount,
    annualRate,
    loanTermYears
  );
  const monthlyPropertyTax = (maxPrice * propertyTaxRate) / 100 / 12;
  const pmiRequired = maxPrice > 0 && downPayment / maxPrice < 0.2;
  const monthlyPMI = pmiRequired ? (loanAmount * 0.0075) / 12 : 0;
  const totalMonthlyPayment =
    monthlyPI +
    monthlyPropertyTax +
    monthlyInsuranceFixed +
    monthlyPMI +
    monthlyHOA;

  const frontEndDTI =
    monthlyIncome > 0 ? (totalMonthlyPayment / monthlyIncome) * 100 : 0;
  const backEndDTI =
    monthlyIncome > 0
      ? ((totalMonthlyPayment + monthlyDebt) / monthlyIncome) * 100
      : 0;

  return {
    maxPurchasePrice: maxPrice,
    loanAmount,
    monthlyPI,
    monthlyPropertyTax,
    monthlyInsurance: monthlyInsuranceFixed,
    monthlyPMI,
    monthlyHOA,
    totalMonthlyPayment,
    frontEndDTI,
    backEndDTI,
    pmiRequired,
  };
}
