import cta from "@/assets/cta-new-home.jpg";
import { Button } from "@/components/ui/button";
import { scrollToId } from "./utils";

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden py-28 md:py-36">
      <img src={cta} alt="Couple holding the keys to their new home" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]" />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-lg">
          <p className="eyebrow text-gold-soft">Free consultation</p>
          <h2 className="mt-4 text-5xl font-semibold leading-tight text-forest-foreground md:text-6xl">Ready to buy your first home?</h2>
          <p className="mt-5 text-lg text-forest-foreground/80">Tell us your budget and we will shortlist homes that fit it. Advice is free.</p>
          <Button variant="gold" size="xl" className="mt-9" onClick={() => scrollToId("contact")}>
            Get free advice
          </Button>
        </div>
      </div>
    </section>
  );
}
