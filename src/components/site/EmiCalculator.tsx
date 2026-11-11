import { useState } from "react";
import { calcEmi } from "@/lib/property-math";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading, scrollToId } from "./utils";

const pkr = (n: number) => "PKR " + Math.round(n).toLocaleString("en-PK");
const cr = (n: number) => (n / 1e7).toFixed(2) + " Cr";

export function EmiCalculator() {
  const [price, setPrice] = useState(30);
  const [down, setDown] = useState(25);
  const [rate, setRate] = useState(14);
  const [years, setYears] = useState(15);
  const r = calcEmi(price, down, rate, years);
  const share = r.loan / r.totalPayable;
  const C = 2 * Math.PI * 48;

  const ctl = [
    { id: "price", l: "Property price", v: price, set: setPrice, min: 5, max: 100, step: 1, out: `PKR ${price} Crore` },
    { id: "down", l: "Down payment", v: down, set: setDown, min: 10, max: 80, step: 5, out: `${down}%` },
    { id: "rate", l: "Interest rate", v: rate, set: setRate, min: 5, max: 25, step: 0.5, out: `${rate}%` },
    { id: "years", l: "Loan period", v: years, set: setYears, min: 1, max: 25, step: 1, out: `${years} years` },
  ];

  return (
    <section id="emi" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading eyebrow="Financing" title="Plan your monthly payment" sub="Move the sliders to see your instalment." />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-12 grid overflow-hidden rounded-2xl border border-border bg-card shadow-luxe lg:grid-cols-[1.1fr_0.9fr]">
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
        </Reveal>
      </div>
    </section>
  );
}
