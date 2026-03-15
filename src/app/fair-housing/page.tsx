import type { Metadata } from "next";
import FairHousingClient from "./FairHousingClient";

export const metadata: Metadata = {
  title: "Fair Housing Statement | Legacy Real Estate Inc",
  description:
    "Fair Housing Statement for Legacy Real Estate Inc — our commitment to equal housing opportunity in compliance with federal and California fair housing laws.",
  openGraph: {
    title: "Fair Housing Statement | Legacy Real Estate Inc",
    description:
      "Fair Housing Statement for Legacy Real Estate Inc — our commitment to equal housing opportunity.",
    url: "https://www.alejandrahomes.org/fair-housing",
    type: "website",
  },
};

export default function FairHousingPage() {
  return <FairHousingClient />;
}
