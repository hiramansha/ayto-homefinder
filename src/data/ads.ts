import valuation from "@/assets/services-agent.jpg";
import plots from "@/assets/property-residential-plot.jpg";
import rentOut from "@/assets/property-furnished-flat.jpg";
import interior from "@/assets/ad-interior.jpg";
import solar from "@/assets/ad-solar.jpg";
import movers from "@/assets/ad-movers.jpg";
import loan from "@/assets/ad-home-loan.jpg";

export type AdKind = "own" | "partner";

export type Ad = {
  id: string;
  kind: AdKind;
  brand: string;
  title: string;
  text: string;
  offer: string;
  cta: string;
  image: string;
  alt: string;
};

export const ads: Ad[] = [
  {
    id: "valuation",
    kind: "own",
    brand: "AYTO Properties",
    title: "Free property valuation",
    text: "Find out what your house or plot is worth today. An agent visits and gives you a fair price.",
    offer: "Free this month",
    cta: "Book free valuation",
    image: valuation,
    alt: "AYTO agent ready to value a property",
  },
  {
    id: "plots",
    kind: "own",
    brand: "AYTO Properties",
    title: "Plots on easy installments",
    text: "5 Marla and 10 Marla residential plots in Lahore. Book with a small down payment.",
    offer: "Installments up to 3 years",
    cta: "Ask about plots",
    image: plots,
    alt: "Residential plot ready for construction",
  },
  {
    id: "rent-out",
    kind: "own",
    brand: "AYTO Properties",
    title: "Rent out your home, stress-free",
    text: "We find a verified tenant, prepare the agreement and collect rent for you.",
    offer: "First month fee 50% off",
    cta: "List my home",
    image: rentOut,
    alt: "Furnished flat ready for tenants",
  },
  {
    id: "interior",
    kind: "partner",
    brand: "Noor Interiors",
    title: "Interior design for your new home",
    text: "Living rooms, kitchens and bedrooms designed and finished by an experienced team.",
    offer: "10% off for AYTO buyers",
    cta: "Get interior quote",
    image: interior,
    alt: "Elegant living room designed by an interior studio",
  },
  {
    id: "solar",
    kind: "partner",
    brand: "Roshan Solar",
    title: "Cut your electricity bill with solar",
    text: "Rooftop solar systems for homes, installed with warranty and net-metering help.",
    offer: "Free site survey",
    cta: "Ask about solar",
    image: solar,
    alt: "Solar panels on the roof of a modern house",
  },
  {
    id: "movers",
    kind: "partner",
    brand: "SwiftMove Packers",
    title: "Safe shifting to your new house",
    text: "Packing, loading and moving across the city with careful, trained staff.",
    offer: "Free packing boxes",
    cta: "Get moving quote",
    image: movers,
    alt: "Movers carrying boxes into a new house",
  },
  {
    id: "loan",
    kind: "partner",
    brand: "Easy Home Finance",
    title: "Home loan made simple",
    text: "Get help with home financing so you can buy now and pay in monthly installments.",
    offer: "Quick approval help",
    cta: "Ask about home loan",
    image: loan,
    alt: "House keys handed over with a loan agreement",
  },
];

export function adMessage(ad: Ad) {
  return ad.kind === "own"
    ? `Hello, I am interested in your offer "${ad.title}" (${ad.offer}). Please share details.`
    : `Hello, please connect me with ${ad.brand} about "${ad.title}" (${ad.offer}).`;
}

export const advertiseMessage =
  "Hello, I want to advertise my business on the AYTO Properties website. Please share your ad packages and prices.";
