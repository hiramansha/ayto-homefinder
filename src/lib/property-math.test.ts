import { describe, expect, it } from "vitest";
import { calcEmi, filterProperties, defaultFilters, formatAmount, priceLabel, validateContact, type PropertyBase } from "./property-math";

const list: PropertyBase[] = [
  { id: 1, title: "Modern family house", city: "Lahore", type: "House", purpose: "Sale", crore: 8.5, beds: 5, baths: 5, area: "10 Marla", location: "DHA Phase 6" },
  { id: 5, title: "Furnished 2-bed flat", city: "Islamabad", type: "Apartment", purpose: "Rent", crore: 0.12, beds: 2, baths: 2, area: "1,100 sqft", location: "E-11" },
  { id: 9, title: "Garden villa", city: "Lahore", type: "House", purpose: "Sale", crore: 15, beds: 6, baths: 6, area: "2 Kanal", location: "Model Town" },
];

describe("prices", () => {
  it("shows crore for 1 crore and above", () => expect(formatAmount(8.5)).toBe("8.5 Crore"));
  it("shows lakh below 1 crore", () => expect(formatAmount(0.12)).toBe("12 Lakh"));
  it("adds per month for rentals", () => expect(priceLabel({ crore: 0.25, purpose: "Rent" })).toBe("PKR 25 Lakh / month"));
});

describe("filters", () => {
  it("Buy tab shows only sale listings", () =>
    expect(filterProperties(list, { ...defaultFilters, purpose: "Sale" }).map((p) => p.id)).toEqual([1, 9]));
  it("max price excludes pricier listings", () =>
    expect(filterProperties(list, { ...defaultFilters, maxCrore: 10 }).map((p) => p.id)).toEqual([1, 5]));
  it("search matches area name", () =>
    expect(filterProperties(list, { ...defaultFilters, query: "dha" }).map((p) => p.id)).toEqual([1]));
});

describe("EMI", () => {
  it("30 crore, 25% down, 14% for 15 years", () => {
    const r = calcEmi(30, 25, 14, 15);
    expect(r.loan).toBe(225_000_000);
    expect(Math.round(r.monthly)).toBe(2996418);
  });
});

describe("contact form", () => {
  it("accepts a Pakistani mobile number", () =>
    expect(validateContact({ name: "Ali", phone: "0300 1234567", email: "a@b.pk", message: "Interested in DHA" })).toEqual({}));
  it("rejects a non-mobile number", () =>
    expect(validateContact({ name: "Ali", phone: "12345", email: "a@b.pk", message: "Interested in DHA" }).phone).toBeDefined());
});
