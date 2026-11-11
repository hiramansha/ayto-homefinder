export type Purpose = "Sale" | "Rent";
export type PropertyType = "House" | "Apartment" | "Plot" | "Commercial";

export interface PropertyBase {
  id: number;
  title: string;
  city: string;
  type: PropertyType;
  purpose: Purpose;
  /** Price in crore PKR (rent is per month). */
  crore: number;
  beds: number;
  baths: number;
  area: string;
  location: string;
}

/** 1 crore and above shows as Crore, below shows as Lakh (1 crore = 100 lakh). */
export function formatAmount(crore: number): string {
  if (crore >= 1) return `${crore % 1 ? crore.toFixed(1) : crore.toFixed(0)} Crore`;
  return `${Math.round(crore * 100)} Lakh`;
}

export function priceLabel(p: Pick<PropertyBase, "crore" | "purpose">): string {
  return `PKR ${formatAmount(p.crore)}${p.purpose === "Rent" ? " / month" : ""}`;
}

export interface Filters {
  purpose: "All" | Purpose;
  query: string;
  city: string;
  type: string;
  /** Max price in crore; 100 means any price. */
  maxCrore: number;
  sort: "newest" | "asc" | "desc";
}

export const defaultFilters: Filters = {
  purpose: "All",
  query: "",
  city: "",
  type: "",
  maxCrore: 100,
  sort: "newest",
};

export function filterProperties<T extends PropertyBase>(list: T[], f: Filters): T[] {
  const q = f.query.trim().toLowerCase();
  const out = list.filter(
    (x) =>
      (f.purpose === "All" || x.purpose === f.purpose) &&
      (!f.city || x.city === f.city) &&
      (!f.type || x.type === f.type) &&
      (f.maxCrore >= 100 || x.crore <= f.maxCrore) &&
      (!q || `${x.title} ${x.location} ${x.city}`.toLowerCase().includes(q)),
  );
  if (f.sort === "asc") out.sort((a, b) => a.crore - b.crore);
  if (f.sort === "desc") out.sort((a, b) => b.crore - a.crore);
  return out;
}

export interface EmiResult {
  monthly: number;
  loan: number;
  downPayment: number;
  totalInterest: number;
  totalPayable: number;
}

/** Standard reducing-balance EMI. Price in crore, rate is yearly %. */
export function calcEmi(priceCrore: number, downPct: number, ratePct: number, years: number): EmiResult {
  const price = priceCrore * 1e7;
  const downPayment = price * (downPct / 100);
  const loan = price - downPayment;
  const i = ratePct / 1200;
  const n = years * 12;
  const monthly = i === 0 ? loan / n : (loan * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  const totalPayable = monthly * n;
  return { monthly, loan, downPayment, totalInterest: totalPayable - loan, totalPayable };
}

const PK_MOBILE = /^(\+92|0)?3\d{2}[\s-]?\d{7}$/;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export interface ContactInput {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function validateContact(v: ContactInput): Partial<Record<keyof ContactInput, string>> {
  const e: Partial<Record<keyof ContactInput, string>> = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  if (!PK_MOBILE.test(v.phone.trim())) e.phone = "Enter a valid mobile number, like 0300 1234567.";
  if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Write at least 10 characters.";
  return e;
}
