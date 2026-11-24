import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Building2, ChevronLeft, ChevronRight, Star, Quote, UserCheck } from "lucide-react";
import { testimonials as T } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [ref, api] = useEmblaCarousel({ loop: true });
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);
  useEffect(() => {
    if (!api || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => api.scrollNext(), 6500);
    return () => window.clearInterval(timer);
  }, [api, paused]);

  return (
    <section
      id="reviews"
      className="relative isolate overflow-hidden py-20 text-foreground md:py-28"
    >
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>
        {/* Watermark Heading + Foreground Title */}
        <div className="relative flex flex-col items-center justify-center">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none font-display text-4xl font-bold uppercase text-gold/15 sm:text-6xl"
          >
            TESTIMONIALS
          </span>
          <h2 className="-mt-6 font-display text-3xl font-bold text-foreground sm:-mt-8 sm:text-5xl">
            What Our Clients Say
          </h2>
        </div>

        <div ref={ref} className="mt-10 overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Client reviews">
          <div className="flex touch-pan-y">
            {T.map((review, i) => <article key={review.name} className="min-w-0 flex-[0_0_100%] px-1" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${T.length}`} aria-hidden={active !== i}>
              <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-gold/35 bg-card px-6 py-8 shadow-luxe sm:px-12">
                <Quote className="h-8 w-8 text-gold/70" />
                <div className="mt-4 flex gap-1" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-gold text-gold" />)}</div>
                <blockquote className="mt-5 max-w-xl font-display text-2xl leading-relaxed text-foreground">“{review.quote}”</blockquote>
                <p className="mt-5 text-sm font-bold text-foreground">{review.name}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-gold"><UserCheck className="h-3.5 w-3.5" />{review.role}</span>
              </div>
            </article>)}
          </div>
        </div>

        {/* Horizontal Dash Indicators & Arrows */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button variant="outline" size="icon"
            type="button"
            aria-label="Previous review"
            onClick={() => api?.scrollPrev()}
            className="rounded-full border-gold/40 text-gold"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            {T.map((_, k) => (
              <Button variant="ghost" size="icon"
                key={k}
                type="button"
                aria-label={`Review ${k + 1}`}
                onClick={() => api?.scrollTo(k)}
                aria-pressed={active === k}
                className={cn(
                  "h-8 w-8 rounded-full p-0 transition-colors duration-300",
                  k === active ? "text-gold" : "text-muted-foreground",
                )}
              ><span className={cn("h-1 rounded-full", k === active ? "w-7 bg-gold" : "w-4 bg-muted-foreground/30")} /></Button>
            ))}
          </div>

          <Button variant="outline" size="icon"
            type="button"
            aria-label="Next review"
            onClick={() => api?.scrollNext()}
            className="rounded-full border-gold/40 text-gold"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Partner Logos Strip */}
      <div className="mx-auto mt-14 max-w-6xl border-t border-border px-5 pt-10 md:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center gap-2 text-center text-xs font-bold text-muted-foreground transition-colors hover:text-gold"
            >
              <Building2 className="h-4 w-4 shrink-0 text-gold" />
              <span>{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
