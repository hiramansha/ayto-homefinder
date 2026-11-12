import {
  ArrowRight,
  Building2,
  Compass,
  HardHat,
  KeyRound,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import agent from "@/assets/services-agent.jpg";
import { Reveal, SectionHeading, scrollToId } from "./utils";

const services = [
  {
    icon: HardHat,
    tag: "BUILDERS",
    t: "Turnkey construction",
    d: "A-class grey structure & complete luxury finishing in DHA, Bahria & Lake City.",
    cta: "Get construction quote",
  },
  {
    icon: Compass,
    tag: "DESIGN",
    t: "3D architecture & maps",
    d: "Modern elevation designs, interior layouts & LDA / DHA building plan approvals.",
    cta: "Consult an architect",
  },
  {
    icon: Building2,
    tag: "REAL ESTATE",
    t: "Buy and sell",
    d: "Verified listings, fair market valuation and complete transfer paperwork in Lahore.",
    cta: "Talk to a sales agent",
  },
  {
    icon: KeyRound,
    tag: "LEASING",
    t: "Rentals",
    d: "Find verified tenants or a luxury rental home with clear legal agreements.",
    cta: "Ask about rentals",
  },
  {
    icon: TrendingUp,
    tag: "ADVISORY",
    t: "Investment advice",
    d: "High-ROI plot files and commercial opportunities before market prices rise.",
    cta: "Get investment advice",
  },
  {
    icon: ShieldCheck,
    tag: "CARE",
    t: "Property management",
    d: "End-to-end upkeep, rent collection and maintenance for overseas & local owners.",
    cta: "Ask about management",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="relative hidden lg:sticky lg:top-28 lg:block">
          <div className="group relative overflow-hidden rounded-2xl shadow-luxe">
            <img
              src={agent}
              alt="AYTO agent welcoming a client"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-top transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-forest-foreground">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                Lahore Builders & Advisors
              </p>
              <p className="mt-1 font-display text-2xl font-semibold">
                From bare plot to dream residence
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-gold/30 bg-forest-deep p-5 text-forest-foreground shadow-luxe">
            <div>
              <p className="font-display text-3xl font-bold text-gold-soft">12+ Years</p>
              <p className="text-xs text-forest-muted">Guiding families & investors in Lahore</p>
            </div>
            <span className="rounded-full border border-gold/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-gold-soft">
              LDA & DHA
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Our services"
              title="Real estate & construction under one roof"
              sub="Whether you are buying a plot, building a luxury home, or investing in Lahore — our team handles every step."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.t} delay={i * 70}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-luxe">
                  <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-gold transition-transform duration-500 group-hover:scale-x-100" />

                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest-deep text-gold-soft transition-transform duration-500 group-hover:scale-110">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-foreground">{s.t}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>

                  <button
                    onClick={() => scrollToId("contact")}
                    className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-left text-xs font-semibold uppercase tracking-wider text-primary transition-colors group-hover:text-gold"
                  >
                    {s.cta} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
