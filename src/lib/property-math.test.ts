import { describe, expect, it } from "vitest";
import { areaInMarla, activeFilterCount, calcEmi, filterProperties, defaultFilters, formatAmount, priceLabel, showBeds, bedsLabel, validateContact, type PropertyBase } from "./property-math";

const list: PropertyBase[] = [
  { id: 1, title: "Modern family house", city: "Lahore", type: "House", purpose: "Sale", crore: 8.5, beds: 5, baths: 5, area: "10 Marla", location: "DHA Phase 6", features: ["Parking", "Garden"], listedDaysAgo: 3 },
  { id: 5, title: "Furnished 2-bed flat", city: "Islamabad", type: "Apartment", purpose: "Rent", crore: 0.12, beds: 2, baths: 2, area: "1,100 sqft", location: "E-11", features: ["Furnished", "Parking"], listedDaysAgo: 4 },
  { id: 9, title: "Garden villa", city: "Lahore", type: "House", purpose: "Sale", crore: 15, beds: 6, baths: 6, area: "2 Kanal", location: "Model Town", features: ["Garden", "Swimming pool"], listedDaysAgo: 6 },
];

describe("prices", () => {
  it("shows crore for 1 crore and above", () => expect(formatAmount(8.5)).toBe("8.5 Crore"));
  it("shows lakh below 1 crore", () => expect(formatAmount(0.12)).toBe("12 Lakh"));
  it("shows decimal lakh for Askari 11 rent", () => expect(formatAmount(0.012)).toBe("1.2 Lakh"));
  it("shows rupees below 1 lakh for Johar Town studio", () => expect(priceLabel({ crore: 0.0055, purpose: "Rent" })).toBe("PKR 55,000 / month"));
  it("adds per month for rentals", () => expect(priceLabel({ crore: 0.25, purpose: "Rent" })).toBe("PKR 25 Lakh / month"));
});

describe("filters", () => {
  it("Buy tab shows only sale listings", () =>
    expect(filterProperties(list, { ...defaultFilters, purpose: "Sale" }).map((p) => p.id)).toEqual([1, 9]));
  it("max price excludes pricier listings", () =>
    expect(filterProperties(list, { ...defaultFilters, maxCrore: 10 }).map((p) => p.id)).toEqual([1, 5]));
  it("search matches area name", () =>
    expect(filterProperties(list, { ...defaultFilters, query: "dha" }).map((p) => p.id)).toEqual([1]));
  it("min price excludes cheaper listings", () =>
    expect(filterProperties(list, { ...defaultFilters, minCrore: 10 }).map((p) => p.id)).toEqual([9]));
  it("3+ bedrooms hides the 2-bed flat", () =>
    expect(filterProperties(list, { ...defaultFilters, minBeds: 3 }).map((p) => p.id)).toEqual([1, 9]));
  it("features must all match", () =>
    expect(filterProperties(list, { ...defaultFilters, features: ["Parking", "Garden"] }).map((p) => p.id)).toEqual([1]));
  it("size from 1 Kanal keeps only the 2 Kanal villa", () =>
    expect(filterProperties(list, { ...defaultFilters, minMarla: 20 }).map((p) => p.id)).toEqual([9]));
  it("added within 4 days", () =>
    expect(filterProperties(list, { ...defaultFilters, addedWithin: 4 }).map((p) => p.id)).toEqual([1, 5]));
  it("size sort puts largest first", () =>
    expect(filterProperties(list, { ...defaultFilters, sort: "size" }).map((p) => p.id)).toEqual([9, 1, 5]));
  it("counts active filters", () => expect(activeFilterCount({ ...defaultFilters, city: "Lahore", features: ["Parking", "Lift"] })).toBe(3));
});

describe("area units", () => {
  it("1 Kanal is 20 Marla", () => expect(areaInMarla("1 Kanal")).toBe(20));
  it("2,250 sqft is 10 Marla", () => expect(areaInMarla("2,250 sqft")).toBe(10));
  it("500 sq yd is 20 Marla", () => expect(areaInMarla("500 sq yd")).toBe(20));
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

describe("bedroom display", () => {
  it("hides beds on plots", () => expect(showBeds({ beds: 0, type: "Plot" })).toBe(false));
  it("hides beds on commercial", () => expect(showBeds({ beds: 2, type: "Commercial" })).toBe(false));
  it("shows beds on houses", () => expect(showBeds({ beds: 3, type: "House" })).toBe(true));
  it("says 1 Bed, not 1 Beds", () => expect(bedsLabel(1)).toBe("1 Bed"));
});
