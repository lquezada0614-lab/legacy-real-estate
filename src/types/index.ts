export interface Listing {
  id: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  price: number;
  status: "for-sale" | "for-rent" | "pending" | "sold";
  type: "single-family" | "condo" | "townhouse" | "multi-family";
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  description: string;
  features: string[];
  images: string[];
  mlsNumber: string;
  listedDate: string;
}

export interface Investment {
  id: string;
  title: string;
  location: string;
  type: "flip" | "airbnb" | "long-term-rental";
  status: "completed" | "active" | "in-progress";
  purchasePrice: number;
  currentValue: number;
  roi: number;
  monthlyIncome?: number;
  images: string[];
  description: string;
  tag: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}
