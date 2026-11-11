import { Search, RotateCcw } from "lucide-react";
import type { Filters } from "@/lib/property-math";
import { cn } from "@/lib/utils";

const field =
  "h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";

export function SearchPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
  onReset: () => void;
}) {
  const tabs: { v: Filters["purpose"]; l: string }[] = [
    { v: "All", l: "All" },
    { v: "Sale", l: "Buy" },
    { v: "Rent", l: "Rent" },
  ];
  return (
    <div className="relative z-10 mx-auto -mt-24 max-w-7xl px-5 md:px-8">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-luxe md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-lg bg-muted p-1">
            {tabs.map((t) => (
              <button
                key={t.v}
                onClick={() => onChange({ purpose: t.v })}
                className={cn(
                  "rounded-md px-6 py-2 text-sm font-semibold transition",
                  filters.purpose === t.v ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.l}
              </button>
            ))}
          </div>
          <button onClick={onReset} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-3.5 w-3.5" /> Reset filters
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className={cn(field, "pl-11")}
              placeholder="Search by area or title, e.g. DHA"
              aria-label="Search"
              value={filters.query}
              onChange={(e) => onChange({ query: e.target.value })}
            />
          </label>
          <select className={field} aria-label="City" value={filters.city} onChange={(e) => onChange({ city: e.target.value })}>
            <option value="">All cities</option>
            <option>Lahore</option>
            <option>Islamabad</option>
            <option>Karachi</option>
          </select>
          <select className={field} aria-label="Type" value={filters.type} onChange={(e) => onChange({ type: e.target.value })}>
            <option value="">All types</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Plot</option>
            <option>Commercial</option>
          </select>
          <select
            className={field}
            aria-label="Sort"
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value as Filters["sort"] })}
          >
            <option value="newest">Newest</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
          </select>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="font-medium">Max price</span>
          <input
            type="range"
            min={5}
            max={100}
            step={5}
            value={filters.maxCrore}
            aria-label="Max price"
            onChange={(e) => onChange({ maxCrore: Number(e.target.value) })}
            className="min-w-40 flex-1"
          />
          <span className="min-w-28 text-right font-semibold text-primary">
            {filters.maxCrore >= 100 ? "Any price" : `PKR ${filters.maxCrore} Crore`}
          </span>
        </div>
      </div>
    </div>
  );
}
