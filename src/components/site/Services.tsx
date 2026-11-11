import { ArrowRight, Building2, KeyRound, ShieldCheck, TrendingUp } from "lucide-react";
import agent from "@/assets/services-agent.jpg";
import { Reveal, SectionHeading, scrollToId } from "./utils";

const services = [
  { icon: Building2, t: "Buy and sell", d: "Verified listings, fair valuation and help with paperwork.", cta: "Talk to a sales agent" },
  { icon: KeyRound, t: "Rentals", d: "Find tenants or a rental home with clear agreements.", cta: "Ask about rentals" },
  { icon: TrendingUp, t: "Investment advice", d: "Know which areas are growing before prices rise.", cta: "Get investment advice" },
  { icon: ShieldCheck, t: "Property management", d: "We handle upkeep, rent collection and tenant issues.", cta: "Ask about management" },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="relative hidden lg:block">
          <img src={agent} alt="AYTO agent welcoming a client" loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover object-top shadow-luxe" />
          <div className="absolute -bottom-6 -right-6 rounded-xl bg-primary p-6 text-primary-foreground shadow-luxe">
            <p className="font-display text-4xl font-bold text-gold-soft">12+</p>
            <p className="text-sm text-primary-foreground/80">years guiding families</p>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <SectionHeading eyebrow="Our services" title="What we do for you" sub="One team for every step, from the first viewing to the final transfer." />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:shadow-luxe">
                  <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-gold transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="grid h-14 w-14 place-items-center rounded-xl bg-primary text-gold-soft">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold">{s.t}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  <button
                    onClick={() => scrollToId("contact")}
                    className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-left text-sm font-semibold text-primary"
                  >
                    {s.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
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
