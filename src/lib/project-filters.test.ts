import { describe, expect, it } from "vitest";
import { emptyProjectCriteria, filterProjects } from "./project-filters";
const projects = [
  { title: "Tower", location: "DHA Phase 12, Lahore", tag: "COMMERCIAL TOWER", status: "Under Construction", desc: "Executive offices" },
  { title: "Villas", location: "Bahria Town, Lahore", tag: "LUXURY VILLAS", status: "Delivered & Active", desc: "Family homes" },
];
describe("project filters", () => {
  it("filters exact location", () => expect(filterProjects(projects, { ...emptyProjectCriteria, location: "Bahria Town" }).map(p => p.title)).toEqual(["Villas"]));
  it("filters project type", () => expect(filterProjects(projects, { ...emptyProjectCriteria, type: "COMMERCIAL TOWER" }).map(p => p.title)).toEqual(["Tower"]));
  it("shows ongoing construction", () => expect(filterProjects(projects, { ...emptyProjectCriteria, status: "Ongoing" }).map(p => p.title)).toEqual(["Tower"]));
  it("shows completed developments", () => expect(filterProjects(projects, { ...emptyProjectCriteria, status: "Completed" }).map(p => p.title)).toEqual(["Villas"]));
  it("matches search keyword in description", () => expect(filterProjects(projects, { ...emptyProjectCriteria, keyword: "executive" }).map(p => p.title)).toEqual(["Tower"]));
  it("combines filters and returns empty for incompatible choices", () => expect(filterProjects(projects, { keyword: "Tower", location: "Bahria Town", type: "All", status: "All" })).toEqual([]));
});