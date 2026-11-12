import { useEffect, useState } from "react";
import { Building2, ChevronLeft, ChevronRight, Quote, ShieldCheck, Star } from "lucide-react";
import { testimonials as T } from "@/data/properties";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./utils";

const partners = [
  "DHA LAHORE",
  "BAHRIA TOWN",
  "LAKE CITY",
  "LAHORE SMART CITY",
  "ETIHAD TOWN",
  "LDA APPROVED",
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % T.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="relative overflow-hidden bg-secondary/60 py-24 md:py-32">
      <div className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          sub="Verified homeowners, plot investors, and overseas families across Lahore share their experience with AYTO Properties."
          center
        />

        {/* 3-Card Luxury Review Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {T.slice(0, 3).map((item, idx) => {
            const isHighlighted = idx === active % Math.min(T.length, 3);
            return (
              <Reveal key={item.name} delay={idx * 100}>
                <div
                  onClick={() => setActive(idx)}
                  className={cn(
                    "group flex h-full cursor-pointer flex-col justify-between rounded-2xl border bg-card p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe",
                    isHighlighted
                      ? "border-gold/70 ring-1 ring-gold/30"
                      : "border-border hover:border-gold/50",
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star key={k} className="h-4 w-4 fill-gold text-gold" />
                        ))}
                      </div>
                      <Quote className="h-7 w-7 text-gold/40 transition-colors group-hover:text-gold" />
                    </div>

                    <p className="mt-5 text-base leading-relaxed text-foreground/90">
                      “{item.quote}”
                    </p>
                  </div>

                  <div className="mt-7 flex items-center gap-3.5 border-t border-border pt-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-deep font-display text-sm font-bold text-gold-soft">
                      {item.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() => setActive((prev) => (prev - 1 + T.length) % T.length)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition hover:border-gold hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            {T.slice(0, 3).map((_, k) => (
              <button
                key={k}
                type="button"
                aria-label={`Review ${k + 1}`}
                onClick={() => setActive(k)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  k === active % Math.min(T.length, 3) ? "w-8 bg-gold" : "w-2 bg-border hover:bg-gold/50",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => setActive((prev) => (prev + 1) % T.length)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition hover:border-gold hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Trusted Societies & Partners Strip */}
        <div className="mt-20 border-t border-border pt-12">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Authorized Deals & Prime Developments Across Lahore
          </p>
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/80 px-4 py-4 text-center text-xs font-bold tracking-[0.14em] text-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:text-primary hover:shadow-sm"
              >
                <Building2 className="h-4 w-4 shrink-0 text-gold" />
                <span>{partner}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-gold" />
            <span>100% Verified Files, Registry & Transfer Assistance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
