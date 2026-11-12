import { ArrowRight, Building2, Compass, MessageCircle, ShieldCheck, Star } from "lucide-react";
import hero from "@/assets/hero-villa.jpg";
import { Button } from "@/components/ui/button";
import { scrollToId } from "./utils";

const highlights = [
  {
    icon: Building2,
    title: "Turnkey Luxury Villas",
    desc: "Grey structure & A-class finishing in DHA & Bahria",
  },
  {
    icon: Compass,
    title: "Prime Lahore Locations",
    desc: "Verified residential & commercial plots in top phases",
  },
  {
    icon: ShieldCheck,
    title: "100% Transparent Deals",
    desc: "Direct owner & builder pricing with legal verification",
  },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-forest-deep pb-12 pt-32 md:pb-16 md:pt-40">
      {/* Cinematic slow-zoom villa background */}
      <img
        src={hero}
        alt="Modern luxury villa with warm lights at dusk"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full animate-ken-burns object-cover object-[65%_center] scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.16),transparent_55%)]" />

      {/* Main Editorial Hero Content */}
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl animate-rise">
          <div className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-forest-deep/75 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold-soft">
              Lahore’s Premier Real Estate & Builders
            </span>
          </div>

          <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.03] tracking-tight text-forest-foreground sm:text-6xl lg:text-[5.2rem]">
            Crafting Landmark Homes
            <span className="block italic text-gold-soft">& High-Yield Futures.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
            From luxury designer residences in DHA & Bahria Town to turnkey grey-structure construction and prime
            commercial investments — AYTO Properties delivers excellence at every step.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              variant="gold"
              size="xl"
              onClick={() => scrollToId("listings")}
              className="group shadow-[0_12px_32px_-8px_rgba(212,175,55,0.5)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore properties
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <a
              href="https://wa.me/923314972426?text=Hello%20AYTO%20Properties,%20I%20would%20like%20to%20book%20a%20free%20site%20visit%20or%20construction%20consultation%20in%20Lahore."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full border border-gold/50 bg-forest-deep/70 px-7 text-sm font-semibold text-gold-soft backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/15"
            >
              <MessageCircle className="h-4 w-4 text-gold" />
              Book free site visit
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-forest-foreground/80">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold" /> LDA & DHA Verified
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-gold text-gold" /> 1,200+ Happy Families
            </span>
            <span className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-gold-soft">12+</span> Years of Excellence
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Architectural Glass Strip (AAZ Builders Signature Look) */}
      <div className="mx-auto mt-16 w-full max-w-7xl px-5 md:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => scrollToId("services")}
                className="group cursor-pointer rounded-2xl border border-gold/25 bg-forest-deep/75 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/70 hover:bg-forest-deep/90 hover:shadow-[0_14px_35px_-10px_rgba(212,175,55,0.25)]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold-soft transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-forest-foreground">{item.title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-forest-muted">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
