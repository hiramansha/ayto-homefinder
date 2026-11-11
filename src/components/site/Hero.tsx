import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import hero from "@/assets/hero-villa.jpg";
import { Button } from "@/components/ui/button";
import { scrollToId } from "./utils";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest-deep pb-36 pt-32">
      <img
        src={hero}
        alt="Modern luxury villa with warm lights at dusk"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full animate-ken-burns object-cover object-[65%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />

      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl animate-rise">
          <p className="eyebrow flex items-center gap-3 text-gold-soft">
            <span className="h-px w-10 bg-gold" /> Lahore
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] text-forest-foreground sm:text-6xl lg:text-[5.4rem]">
            Find a home that
            <span className="block italic text-gold-soft">fits your future.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-forest-foreground/80">
            AYTO Properties helps you buy, sell and rent houses, apartments, plots and commercial spaces with clear
            prices and honest advice.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="gold" size="xl" onClick={() => scrollToId("listings")}>
              Browse properties <ArrowRight />
            </Button>
            <Button variant="heroOutline" size="xl" onClick={() => scrollToId("contact")}>
              Talk to an agent
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-forest-foreground/75">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold" /> Verified listings
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-gold text-gold" /> 1,200+ happy clients
            </span>
            <span className="flex items-center gap-2">
              <span className="font-display text-xl text-gold-soft">12</span> years of trust
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
