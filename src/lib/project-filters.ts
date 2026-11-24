export interface ProjectCriteria { keyword: string; location: string; type: string; status: string }
export interface FilterableProject { title: string; location: string; tag: string; status: string; desc: string }
export const emptyProjectCriteria: ProjectCriteria = { keyword: "", location: "All", type: "All", status: "All" };
export function projectStatus(status: string) {
  return /construction|ongoing/i.test(status) ? "Ongoing" : "Completed";
}
export function filterProjects<T extends FilterableProject>(projects: T[], criteria: ProjectCriteria) {
  const keyword = criteria.keyword.trim().toLowerCase();
  return projects.filter(p =>
    (!keyword || `${p.title} ${p.location} ${p.desc}`.toLowerCase().includes(keyword)) &&
    (criteria.location === "All" || p.location.includes(criteria.location)) &&
    (criteria.type === "All" || p.tag === criteria.type) &&
    (criteria.status === "All" || projectStatus(p.status) === criteria.status)
  );
}