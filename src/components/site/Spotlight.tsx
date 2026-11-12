import { useState } from "react";
import { ArrowRight, Building2, Check, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import exterior from "@/assets/property-modern-family-house.jpg";
import bedroom from "@/assets/master-bedroom.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, scrollToId } from "./utils";

const shots = [
  { src: exterior, alt: "Modern family house with glass balconies and a double garage" },
  { src: bedroom, alt: "Designer master bedroom" },
];

const features = [
  "Glass-railing balconies",
  "Double car garage",
  "Lit entrance staircase",
  "Landscaped front garden",
  "Designer master bedroom",
  "Soft ambient lighting",
];

export function Spotlight({ onView, onInquire }: { onView: () => void; onInquire: () => void }) {
  const [i, setI] = useState(0);
  const shot = shots[i] ?? shots[0]!;

  return (
    <>
      {/* 1. Editorial Brand Welcome Section ("Welcome to AYTO") */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Welcome to AYTO Properties
              </span>
            </div>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl">
              A Trusted Name in Lahore Real Estate & Turnkey Construction.
            </h2>
            <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-border pt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2 font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 text-gold" /> LDA & DHA Approved
              </span>
              <span className="flex items-center gap-2 font-medium text-foreground">
                <Building2 className="h-4 w-4 text-gold" /> Residential & High-Rise Consultancy
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              AYTO Properties offers professional, transparent, and result-driven solutions across residential,
              commercial, and investment sectors in Lahore. With deep market intelligence in DHA, Bahria Town, and
              Lake City, we guide families and overseas investors through buying, selling, and turnkey A-class
              construction with complete legal clarity.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                variant="forest"
                size="xl"
                onClick={() => scrollToId("services")}
                className="group shadow-luxe transition-all duration-300 hover:-translate-y-0.5"
              >
                More About AYTO
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => scrollToId("contact")}
                className="border-gold/50 bg-transparent text-foreground transition-all duration-300 hover:border-gold hover:bg-gold/10"
              >
                Book Free Consultation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Flagship / Current Running Project Showcase */}
      <section className="relative overflow-hidden bg-forest-deep py-24 text-forest-foreground md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.14),transparent_55%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
                Current Flagship Project
              </span>
            </div>

            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Modern Designer Residence, DHA Phase 6
            </h2>

            <p className="mt-4 text-base leading-relaxed text-forest-foreground/80 sm:text-lg">
              Setting a new benchmark for contemporary luxury living in Lahore. Positioned in prime DHA Phase 6,
              this 10 Marla architectural masterpiece combines imported finishes, smart layouts, and serene family
              comfort.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gold-soft">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gold" /> DHA Phase 6, Lahore • 10 Marla • 5 Beds
              </span>
              <span className="rounded-full border border-gold/30 bg-white/5 px-3 py-1 text-xs font-medium">
                Marketed Exclusively by AYTO Group
              </span>
            </div>

            <p className="mt-6 font-display text-4xl font-bold text-gold-soft">PKR 8.5 Crore</p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-forest-foreground/90">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/15">
                    <Check className="h-3.5 w-3.5 text-gold-soft" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button
                variant="gold"
                size="xl"
                onClick={onView}
                className="group shadow-[0_12px_32px_-8px_rgba(212,175,55,0.5)] transition-all duration-300 hover:-translate-y-0.5"
              >
                View Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={onInquire}
                className="border-gold/50 bg-transparent text-gold-soft transition-all duration-300 hover:border-gold hover:bg-gold/15"
              >
                Request A Visit
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="group relative overflow-hidden rounded-2xl border border-gold/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)]">
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
            </div>
            <div className="mt-4 flex gap-3">
              {shots.map((s, k) => (
                <button
                  key={s.alt}
                  type="button"
                  onClick={() => setI(k)}
                  aria-label={`Show ${s.alt}`}
                  className={cn(
                    "h-20 w-28 overflow-hidden rounded-xl border-2 transition-all duration-300",
                    k === i
                      ? "scale-105 border-gold opacity-100 shadow-md"
                      : "border-white/15 opacity-60 hover:opacity-95",
                  )}
                >
                  <img src={s.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
