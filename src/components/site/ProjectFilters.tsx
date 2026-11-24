import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { emptyProjectCriteria, type ProjectCriteria } from "@/lib/project-filters";
export function ProjectFilters({ value, onChange }: { value: ProjectCriteria; onChange: (value: ProjectCriteria) => void }) {
  const input = "h-11 w-full rounded-md border border-input bg-muted px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold";
  return <div className="mb-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
    <label className="space-y-2 text-xs font-semibold text-muted-foreground">Search projects<div className="relative"><Search className="absolute left-3 top-3.5 h-4 w-4 text-gold" /><input aria-label="Search projects" value={value.keyword} onChange={e => onChange({ ...value, keyword: e.target.value })} placeholder="Project name or keyword" className={`${input} pl-9`} /></div></label>
    <label className="space-y-2 text-xs font-semibold text-muted-foreground">Location<select aria-label="Project location" value={value.location} onChange={e => onChange({ ...value, location: e.target.value })} className={input}>{["All", "DHA Phase 6", "DHA Phase 12", "DHA Phase 8", "Bahria Town"].map(v => <option key={v}>{v}</option>)}</select></label>
    <label className="space-y-2 text-xs font-semibold text-muted-foreground">Project type<select aria-label="Project type" value={value.type} onChange={e => onChange({ ...value, type: e.target.value })} className={input}>{["All", "FLAGSHIP PROJECT", "COMMERCIAL TOWER", "LUXURY VILLAS", "RESIDENTIAL COMMUNITY"].map(v => <option key={v} value={v}>{v === "All" ? "All types" : v.toLowerCase()}</option>)}</select></label>
    <label className="space-y-2 text-xs font-semibold text-muted-foreground">Status<select aria-label="Project status" value={value.status} onChange={e => onChange({ ...value, status: e.target.value })} className={input}>{["All", "Ongoing", "Completed"].map(v => <option key={v}>{v}</option>)}</select></label>
    <Button variant="outline" size="icon" className="mt-6 h-11 w-11" title="Reset project filters" aria-label="Reset project filters" onClick={() => onChange(emptyProjectCriteria)}><RotateCcw /></Button>
  </div>;
}