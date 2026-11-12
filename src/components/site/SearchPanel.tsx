import { useMemo, useState } from "react";
import { Search, RotateCcw, SlidersHorizontal, ChevronDown, Check, X } from "lucide-react";
import { FEATURES, activeFilterCount, formatAmount, type Feature, type Filters } from "@/lib/property-math";
import { properties } from "@/data/properties";
import { cn } from "@/lib/utils";

const field =
  "h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";

const PRICES = [0.05, 0.1, 0.2, 0.5, 1, 2, 3, 5, 8, 10, 15, 20];
const SIZES: { v: number; l: string }[] = [
  { v: 3, l: "3 Marla" },
  { v: 5, l: "5 Marla" },
  { v: 7, l: "7 Marla" },
  { v: 10, l: "10 Marla" },
  { v: 20, l: "1 Kanal" },
  { v: 40, l: "2 Kanal" },
];
const ADDED = [
  { v: 0, l: "Any time" },
  { v: 3, l: "Last 3 days" },
  { v: 7, l: "Last 7 days" },
  { v: 14, l: "Last 2 weeks" },
  { v: 30, l: "Last month" },
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{children}</p>;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-gold",
      )}
    >
      {active && <Check className="h-3.5 w-3.5" />}
      {children}
    </button>
  );
}

export function SearchPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
  onReset: () => void;
}) {
  const [more, setMore] = useState(false);
  const tabs: { v: Filters["purpose"]; l: string }[] = [
    { v: "All", l: "All" },
    { v: "Sale", l: "Buy" },
    { v: "Rent", l: "Rent" },
  ];

  const cities = useMemo(() => [...new Set(properties.map((p) => p.city))].sort(), []);
  const locations = useMemo(
    () => [...new Set(properties.filter((p) => !filters.city || p.city === filters.city).map((p) => p.location))].sort(),
    [filters.city],
  );
  const count = activeFilterCount(filters);
  const toggleFeature = (ft: Feature) =>
    onChange({ features: filters.features.includes(ft) ? filters.features.filter((x) => x !== ft) : [...filters.features, ft] });

  const chips: { l: string; clear: Partial<Filters> }[] = [];
  if (filters.query.trim()) chips.push({ l: `"${filters.query.trim()}"`, clear: { query: "" } });
  if (filters.city) chips.push({ l: filters.city, clear: { city: "", location: "" } });
  if (filters.location) chips.push({ l: filters.location, clear: { location: "" } });
  if (filters.type) chips.push({ l: filters.type, clear: { type: "" } });
  if (filters.minCrore || filters.maxCrore)
    chips.push({
      l: `PKR ${filters.minCrore ? formatAmount(filters.minCrore) : "0"} – ${filters.maxCrore ? formatAmount(filters.maxCrore) : "any"}`,
      clear: { minCrore: 0, maxCrore: 0 },
    });
  if (filters.minMarla || filters.maxMarla) {
    const s = (v: number) => SIZES.find((x) => x.v === v)?.l ?? `${v} Marla`;
    chips.push({ l: `Size ${filters.minMarla ? s(filters.minMarla) : "any"} – ${filters.maxMarla ? s(filters.maxMarla) : "any"}`, clear: { minMarla: 0, maxMarla: 0 } });
  }
  if (filters.minBeds) chips.push({ l: `${filters.minBeds}+ beds`, clear: { minBeds: 0 } });
  if (filters.minBaths) chips.push({ l: `${filters.minBaths}+ baths`, clear: { minBaths: 0 } });
  filters.features.forEach((ft) => chips.push({ l: ft, clear: { features: filters.features.filter((x) => x !== ft) } }));
  if (filters.addedWithin) chips.push({ l: ADDED.find((a) => a.v === filters.addedWithin)?.l ?? "", clear: { addedWithin: 0 } });

  return (
    <div className="relative z-10 mx-auto mt-10 max-w-7xl px-5 animate-rise md:mt-14 md:px-8">
      <div className="rounded-2xl border border-gold/25 bg-card p-5 shadow-luxe transition-all duration-500 hover:border-gold/50 md:p-7">
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
          <div className="flex items-center gap-5">
            <button
              onClick={() => setMore((m) => !m)}
              aria-expanded={more}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-gold"
            >
              <SlidersHorizontal className="h-4 w-4 text-gold" />
              More filters
              {count > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-primary">{count}</span>
              )}
              <ChevronDown className={cn("h-4 w-4 transition", more && "rotate-180")} />
            </button>
            <button onClick={onReset} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <label className="relative md:col-span-2 lg:col-span-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className={cn(field, "pl-11")}
              placeholder="Search by area or title, e.g. DHA"
              aria-label="Search"
              value={filters.query}
              onChange={(e) => onChange({ query: e.target.value })}
            />
          </label>
          <select className={field} aria-label="City" value={filters.city} onChange={(e) => onChange({ city: e.target.value, location: "" })}>
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select className={field} aria-label="Location" value={filters.location} onChange={(e) => onChange({ location: e.target.value })}>
            <option value="">All locations</option>
            {locations.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <select className={field} aria-label="Type" value={filters.type} onChange={(e) => onChange({ type: e.target.value })}>
            <option value="">All types</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Plot</option>
            <option>Commercial</option>
          </select>
          <select className={field} aria-label="Sort" value={filters.sort} onChange={(e) => onChange({ sort: e.target.value as Filters["sort"] })}>
            <option value="newest">Newest first</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
            <option value="size">Size: largest first</option>
          </select>
        </div>

        {more && (
          <div className="mt-6 grid gap-6 border-t border-border pt-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label>Price range (PKR)</Label>
              <div className="grid grid-cols-2 gap-2">
                <select className={field} aria-label="Min price" value={filters.minCrore} onChange={(e) => onChange({ minCrore: Number(e.target.value) })}>
                  <option value={0}>No min</option>
                  {PRICES.map((v) => (
                    <option key={v} value={v}>{formatAmount(v)}</option>
                  ))}
                </select>
                <select className={field} aria-label="Max price" value={filters.maxCrore} onChange={(e) => onChange({ maxCrore: Number(e.target.value) })}>
                  <option value={0}>No max</option>
                  {PRICES.map((v) => (
                    <option key={v} value={v}>{formatAmount(v)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label>Size</Label>
              <div className="grid grid-cols-2 gap-2">
                <select className={field} aria-label="Min size" value={filters.minMarla} onChange={(e) => onChange({ minMarla: Number(e.target.value) })}>
                  <option value={0}>No min</option>
                  {SIZES.map((s) => (
                    <option key={s.v} value={s.v}>{s.l}</option>
                  ))}
                </select>
                <select className={field} aria-label="Max size" value={filters.maxMarla} onChange={(e) => onChange({ maxMarla: Number(e.target.value) })}>
                  <option value={0}>No max</option>
                  {SIZES.map((s) => (
                    <option key={s.v} value={s.v}>{s.l}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label>Listed</Label>
              <select className={field} aria-label="Listed" value={filters.addedWithin} onChange={(e) => onChange({ addedWithin: Number(e.target.value) })}>
                {ADDED.map((a) => (
                  <option key={a.v} value={a.v}>{a.l}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Bedrooms</Label>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <Chip key={n} active={filters.minBeds === n} onClick={() => onChange({ minBeds: n })}>
                    {n ? `${n}+` : "Any"}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <Label>Bathrooms</Label>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Chip key={n} active={filters.minBaths === n} onClick={() => onChange({ minBaths: n })}>
                    {n ? `${n}+` : "Any"}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <Label>Features</Label>
              <div className="flex flex-wrap gap-2">
                {FEATURES.map((ft) => (
                  <Chip key={ft} active={filters.features.includes(ft)} onClick={() => toggleFeature(ft)}>
                    {ft}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        )}

        {chips.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <span className="mr-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Active</span>
            {chips.map((c) => (
              <button
                key={c.l}
                onClick={() => onChange(c.clear)}
                className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-gold/20"
                aria-label={`Remove ${c.l}`}
              >
                {c.l} <X className="h-3 w-3" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
