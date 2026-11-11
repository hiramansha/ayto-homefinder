export type Purpose = "Sale" | "Rent";
export type PropertyType = "House" | "Apartment" | "Plot" | "Commercial";

export const FEATURES = [
  "Furnished",
  "Parking",
  "Lift",
  "Security",
  "Garden",
  "Corner",
  "Swimming pool",
  "Servant quarter",
] as const;
export type Feature = (typeof FEATURES)[number];

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
  features?: Feature[];
  /** How many days ago the listing was added. */
  listedDaysAgo?: number;
}

/** Converts "10 Marla", "2 Kanal", "500 sq yd" or "1,650 sqft" to Marla (1 Marla = 225 sqft). */
export function areaInMarla(area: string): number {
  const m = area.replace(/,/g, "").match(/([\d.]+)\s*(.*)/);
  if (!m) return 0;
  const n = Number(m[1]);
  const unit = (m[2] ?? "").toLowerCase();
  if (unit.startsWith("kanal")) return n * 20;
  if (unit.startsWith("marla")) return n;
  if (unit.includes("yd")) return (n * 9) / 225;
  return n / 225;
}

/** 1 crore and above shows as Crore, below shows as Lakh (1 crore = 100 lakh). */
export function formatAmount(crore: number): string {
  if (crore >= 1) return `${crore % 1 ? crore.toFixed(1) : crore.toFixed(0)} Crore`;
  return `${Math.round(crore * 100)} Lakh`;
}

export function priceLabel(p: Pick<PropertyBase, "crore" | "purpose">): string {
  return `PKR ${formatAmount(p.crore)}${p.purpose === "Rent" ? " / month" : ""}`;
}

export type Sort = "newest" | "asc" | "desc" | "size";

export interface Filters {
  purpose: "All" | Purpose;
  query: string;
  city: string;
  location: string;
  type: string;
  /** Price range in crore; 0 means no limit. */
  minCrore: number;
  maxCrore: number;
  /** Minimum bedrooms / bathrooms; 0 means any. */
  minBeds: number;
  minBaths: number;
  /** Size range in Marla; 0 means no limit. */
  minMarla: number;
  maxMarla: number;
  /** Listing must have every selected feature. */
  features: Feature[];
  /** Only listings added within this many days; 0 means any time. */
  addedWithin: number;
  sort: Sort;
}

export const defaultFilters: Filters = {
  purpose: "All",
  query: "",
  city: "",
  location: "",
  type: "",
  minCrore: 0,
  maxCrore: 0,
  minBeds: 0,
  minBaths: 0,
  minMarla: 0,
  maxMarla: 0,
  features: [],
  addedWithin: 0,
  sort: "newest",
};

/** Number of filters that differ from the defaults (purpose tab and sort not counted). */
export function activeFilterCount(f: Filters): number {
  let n = 0;
  if (f.query.trim()) n++;
  if (f.city) n++;
  if (f.location) n++;
  if (f.type) n++;
  if (f.minCrore || f.maxCrore) n++;
  if (f.minBeds) n++;
  if (f.minBaths) n++;
  if (f.minMarla || f.maxMarla) n++;
  if (f.addedWithin) n++;
  return n + f.features.length;
}

export function filterProperties<T extends PropertyBase>(list: T[], f: Filters): T[] {
  const q = f.query.trim().toLowerCase();
  const out = list.filter((x) => {
    const marla = areaInMarla(x.area);
    const feats = x.features ?? [];
    return (
      (f.purpose === "All" || x.purpose === f.purpose) &&
      (!f.city || x.city === f.city) &&
      (!f.location || x.location === f.location) &&
      (!f.type || x.type === f.type) &&
      (!f.minCrore || x.crore >= f.minCrore) &&
      (!f.maxCrore || x.crore <= f.maxCrore) &&
      (!f.minBeds || x.beds >= f.minBeds) &&
      (!f.minBaths || x.baths >= f.minBaths) &&
      (!f.minMarla || marla >= f.minMarla) &&
      (!f.maxMarla || marla <= f.maxMarla) &&
      f.features.every((ft) => feats.includes(ft)) &&
      (!f.addedWithin || (x.listedDaysAgo ?? Infinity) <= f.addedWithin) &&
      (!q || `${x.title} ${x.location} ${x.city} ${x.type}`.toLowerCase().includes(q))
    );
  });
  if (f.sort === "newest") out.sort((a, b) => (a.listedDaysAgo ?? 999) - (b.listedDaysAgo ?? 999));
  if (f.sort === "asc") out.sort((a, b) => a.crore - b.crore);
  if (f.sort === "desc") out.sort((a, b) => b.crore - a.crore);
  if (f.sort === "size") out.sort((a, b) => areaInMarla(b.area) - areaInMarla(a.area));
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
