import { useState } from "react";
import { calcEmi } from "@/lib/property-math";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading, scrollToId } from "./utils";

const pkr = (n: number) => "PKR " + Math.round(n).toLocaleString("en-PK");
const cr = (n: number) => (n / 1e7).toFixed(2) + " Cr";
const lakh = (n: number) =>
  n >= 1e7 ? `${(n / 1e7).toFixed(2)} Crore` : `${(n / 1e5).toFixed(1)} Lakh`;

type ToolTab = "emi" | "construction" | "converter";

const PLOT_PRESETS = [
  { label: "5 Marla", marla: 5, coveredSqft: 2050 },
  { label: "10 Marla", marla: 10, coveredSqft: 3600 },
  { label: "1 Kanal", marla: 20, coveredSqft: 6200 },
];

export function EmiCalculator() {
  const [tab, setTab] = useState<ToolTab>("emi");

  // 1. EMI Calculator State
  const [price, setPrice] = useState(30);
  const [down, setDown] = useState(25);
  const [rate, setRate] = useState(14);
  const [years, setYears] = useState(15);
  const r = calcEmi(price, down, rate, years);
  const share = r.loan / r.totalPayable;
  const C = 2 * Math.PI * 48;

  // 2. Lahore Construction Cost State
  const [plotPreset, setPlotPreset] = useState(1); // default 10 Marla
  const [coveredSqft, setCoveredSqft] = useState(3600);
  const [buildType, setBuildType] = useState<"grey" | "complete">("complete");

  const ratePerSqft = buildType === "grey" ? 2950 : 5400; // Lahore 2026 market estimates
  const totalBuildCost = coveredSqft * ratePerSqft;
  const greyShare = Math.round(coveredSqft * 2950);
  const finishingShare = buildType === "complete" ? totalBuildCost - greyShare : 0;

  // 3. Area Unit Converter State (Lahore standard: 1 Marla = 225 sq ft)
  const [areaValue, setAreaValue] = useState(10);
  const [areaUnit, setAreaUnit] = useState<"marla" | "kanal" | "sqft" | "sqyd">("marla");

  const toSqft =
    areaUnit === "marla"
      ? areaValue * 225
      : areaUnit === "kanal"
        ? areaValue * 4500
        : areaUnit === "sqyd"
          ? areaValue * 9
          : areaValue;

  const ctl = [
    { id: "price", l: "Property price", v: price, set: setPrice, min: 5, max: 100, step: 1, out: `PKR ${price} Crore` },
    { id: "down", l: "Down payment", v: down, set: setDown, min: 10, max: 80, step: 5, out: `${down}%` },
    { id: "rate", l: "Interest rate", v: rate, set: setRate, min: 5, max: 25, step: 0.5, out: `${rate}%` },
    { id: "years", l: "Loan period", v: years, set: setYears, min: 1, max: 25, step: 1, out: `${years} years` },
  ];

  const handlePreset = (idx: number) => {
    setPlotPreset(idx);
    setCoveredSqft(PLOT_PRESETS[idx].coveredSqft);
  };

  return (
    <section id="emi" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Property Calculators"
            title="Plan your budget & construction"
            sub="Calculate monthly instalments, Lahore house construction costs, or convert Marla & Kanal sizes."
          />

          {/* Zameen-style Tool Switcher Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {(
              [
                ["emi", "Home Loan / EMI"],
                ["construction", "Construction Cost (Lahore)"],
                ["converter", "Marla / Kanal Converter"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all ${
                  tab === key
                    ? "bg-forest-deep text-gold-soft shadow-md"
                    : "border border-border bg-card text-muted-foreground hover:border-gold/60 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          {/* TAB 1: HOME LOAN / EMI CALCULATOR */}
          {tab === "emi" && (
            <div className="mt-10 grid overflow-hidden rounded-2xl border border-border bg-card shadow-luxe lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-8 p-8 md:p-10">
                {ctl.map((c) => (
                  <div key={c.id}>
                    <label htmlFor={c.id} className="flex justify-between text-sm font-medium text-muted-foreground">
                      {c.l} <output className="font-semibold text-primary">{c.out}</output>
                    </label>
                    <input
                      id={c.id}
                      type="range"
                      min={c.min}
                      max={c.max}
                      step={c.step}
                      value={c.v}
                      onChange={(e) => c.set(Number(e.target.value))}
                      className="mt-3 w-full"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center gap-6 bg-forest p-8 text-center text-forest-foreground md:p-10">
                <div>
                  <p className="eyebrow text-forest-muted">Monthly instalment</p>
                  <p className="mt-2 font-display text-5xl font-bold text-gold-soft">{pkr(r.monthly)}</p>
                </div>
                <div className="relative h-40 w-40">
                  <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                    <circle cx="60" cy="60" r="48" fill="none" strokeWidth="12" className="stroke-forest-foreground/15" />
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      fill="none"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${C * share} ${C}`}
                      className="stroke-gold transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div>
                      <p className="font-display text-3xl font-bold">{Math.round(share * 100)}%</p>
                      <p className="text-xs text-forest-muted">principal</p>
                    </div>
                  </div>
                </div>
                <dl className="w-full max-w-xs space-y-2 text-sm">
                  {[
                    ["Loan amount", cr(r.loan)],
                    ["Total interest", cr(r.totalInterest)],
                    ["Down payment", cr(r.downPayment)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-forest-muted">
                      <dt>{k}</dt>
                      <dd className="font-semibold text-forest-foreground">{v}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-forest-foreground/15 pt-2">
                    <dt>Total payable</dt>
                    <dd className="font-bold text-gold-soft">{cr(r.totalPayable)}</dd>
                  </div>
                </dl>
                <Button variant="gold" size="lg" onClick={() => scrollToId("contact")}>
                  Get advice on financing
                </Button>
              </div>
            </div>
          )}

          {/* TAB 2: LAHORE CONSTRUCTION COST CALCULATOR */}
          {tab === "construction" && (
            <div className="mt-10 grid overflow-hidden rounded-2xl border border-border bg-card shadow-luxe lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-8 p-8 md:p-10">
                <div>
                  <p className="mb-3 text-sm font-medium text-muted-foreground">Select plot size (Lahore standard)</p>
                  <div className="grid grid-cols-3 gap-3">
                    {PLOT_PRESETS.map((p, idx) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => handlePreset(idx)}
                        className={`rounded-xl border py-3 text-sm font-semibold transition ${
                          plotPreset === idx
                            ? "border-gold bg-forest-deep text-gold-soft"
                            : "border-border bg-background text-foreground hover:border-gold/50"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="coveredArea" className="flex justify-between text-sm font-medium text-muted-foreground">
                    Covered area <output className="font-semibold text-primary">{coveredSqft.toLocaleString()} sq. ft.</output>
                  </label>
                  <input
                    id="coveredArea"
                    type="range"
                    min={1200}
                    max={9000}
                    step={50}
                    value={coveredSqft}
                    onChange={(e) => setCoveredSqft(Number(e.target.value))}
                    className="mt-3 w-full"
                  />
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium text-muted-foreground">Construction mode</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBuildType("grey")}
                      className={`rounded-xl border p-4 text-left transition ${
                        buildType === "grey"
                          ? "border-gold bg-forest-deep text-forest-foreground"
                          : "border-border bg-background text-foreground hover:border-gold/50"
                      }`}
                    >
                      <p className={`text-sm font-semibold ${buildType === "grey" ? "text-gold-soft" : ""}`}>Grey Structure</p>
                      <p className="mt-1 text-xs opacity-75">Bricks, cement, steel & plaster</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBuildType("complete")}
                      className={`rounded-xl border p-4 text-left transition ${
                        buildType === "complete"
                          ? "border-gold bg-forest-deep text-forest-foreground"
                          : "border-border bg-background text-foreground hover:border-gold/50"
                      }`}
                    >
                      <p className={`text-sm font-semibold ${buildType === "complete" ? "text-gold-soft" : ""}`}>Complete House</p>
                      <p className="mt-1 text-xs opacity-75">A-class tiles, woodwork & paint</p>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-6 bg-forest p-8 text-center text-forest-foreground md:p-10">
                <div>
                  <p className="eyebrow text-forest-muted">Estimated construction cost</p>
                  <p className="mt-2 font-display text-4xl font-bold text-gold-soft md:text-5xl">PKR {lakh(totalBuildCost)}</p>
                  <p className="mt-2 text-xs text-forest-muted">Based on PKR {ratePerSqft.toLocaleString()} / sq. ft. in Lahore</p>
                </div>

                <dl className="w-full max-w-xs space-y-2.5 text-sm">
                  <div className="flex justify-between text-forest-muted">
                    <dt>Grey structure cost</dt>
                    <dd className="font-semibold text-forest-foreground">PKR {lakh(greyShare)}</dd>
                  </div>
                  <div className="flex justify-between text-forest-muted">
                    <dt>Finishing & fixtures</dt>
                    <dd className="font-semibold text-forest-foreground">
                      {buildType === "complete" ? `PKR ${lakh(finishingShare)}` : "Not included"}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-forest-foreground/15 pt-2.5">
                    <dt>Covered area</dt>
                    <dd className="font-bold text-gold-soft">{coveredSqft.toLocaleString()} sq. ft.</dd>
                  </div>
                </dl>

                <Button variant="gold" size="lg" onClick={() => scrollToId("contact")}>
                  Find a plot in Lahore
                </Button>
              </div>
            </div>
          )}

          {/* TAB 3: MARLA / KANAL AREA CONVERTER */}
          {tab === "converter" && (
            <div className="mt-10 grid overflow-hidden rounded-2xl border border-border bg-card shadow-luxe lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6 p-8 md:p-10">
                <div>
                  <label htmlFor="areaInput" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Enter plot or house size
                  </label>
                  <div className="flex gap-3">
                    <input
                      id="areaInput"
                      type="number"
                      min={0}
                      value={areaValue}
                      onChange={(e) => setAreaValue(Math.max(0, Number(e.target.value)))}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base font-semibold text-foreground outline-none focus:border-gold"
                    />
                    <select
                      value={areaUnit}
                      onChange={(e) => setAreaUnit(e.target.value as "marla" | "kanal" | "sqft" | "sqyd")}
                      className="rounded-xl border border-input bg-background px-4 py-3 text-sm font-semibold text-foreground outline-none focus:border-gold"
                    >
                      <option value="marla">Marla</option>
                      <option value="kanal">Kanal</option>
                      <option value="sqft">Sq. Ft.</option>
                      <option value="sqyd">Sq. Yards</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">Quick Lahore sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { l: "3 Marla", v: 3, u: "marla" as const },
                      { l: "5 Marla", v: 5, u: "marla" as const },
                      { l: "10 Marla", v: 10, u: "marla" as const },
                      { l: "1 Kanal", v: 1, u: "kanal" as const },
                      { l: "2 Kanal", v: 2, u: "kanal" as const },
                    ].map((q) => (
                      <button
                        key={q.l}
                        type="button"
                        onClick={() => {
                          setAreaValue(q.v);
                          setAreaUnit(q.u);
                        }}
                        className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition hover:border-gold"
                      >
                        {q.l}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Calculated using Lahore Development Authority (LDA) & DHA Lahore standard: <strong>1 Marla = 225 sq. ft.</strong> (20 Marlas = 1 Kanal).
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-6 bg-forest p-8 text-center text-forest-foreground md:p-10">
                <div>
                  <p className="eyebrow text-forest-muted">Converted Measurements</p>
                  <p className="mt-2 font-display text-4xl font-bold text-gold-soft">
                    {(toSqft / 225).toFixed(2)} Marla
                  </p>
                </div>

                <dl className="w-full max-w-xs space-y-2.5 text-sm">
                  <div className="flex justify-between text-forest-muted">
                    <dt>Kanal</dt>
                    <dd className="font-semibold text-forest-foreground">{(toSqft / 4500).toFixed(3)} Kanal</dd>
                  </div>
                  <div className="flex justify-between text-forest-muted">
                    <dt>Square Feet</dt>
                    <dd className="font-semibold text-forest-foreground">{Math.round(toSqft).toLocaleString()} sq. ft.</dd>
                  </div>
                  <div className="flex justify-between border-t border-forest-foreground/15 pt-2.5">
                    <dt>Square Yards (Gaz)</dt>
                    <dd className="font-bold text-gold-soft">{Math.round(toSqft / 9).toLocaleString()} sq. yd.</dd>
                  </div>
                </dl>

                <Button variant="gold" size="lg" onClick={() => scrollToId("listings")}>
                  Browse Lahore properties
                </Button>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
