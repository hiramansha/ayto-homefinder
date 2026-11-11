import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials as T } from "@/data/properties";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./utils";

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % T.length), 6000);
    return () => clearInterval(t);
  }, []);
  const cur = T[i] ?? T[0]!;
  return (
    <section id="reviews" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <SectionHeading eyebrow="Client stories" title="What clients say" center />
        <Quote className="mx-auto mt-12 h-10 w-10 text-gold" />
        <div className="mt-4 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} className="h-4 w-4 fill-gold text-gold" />
          ))}
        </div>
        <blockquote key={i} className="mt-6 min-h-32 animate-rise font-display text-3xl italic leading-snug text-foreground md:text-4xl">
          “{cur.quote}”
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary font-semibold text-gold-soft">
            {cur.name.split(" ").map((w) => w[0]).join("")}
          </span>
          <div className="text-left">
            <p className="font-semibold">{cur.name}</p>
            <p className="text-sm text-muted-foreground">{cur.role}</p>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-5">
          <button aria-label="Previous review" onClick={() => setI((i + T.length - 1) % T.length)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-gold">
            <ChevronLeft className="h-4 w-4" />
          </button>
          {T.map((_, k) => (
            <button key={k} aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className={cn("h-2 rounded-full transition-all", k === i ? "w-8 bg-gold" : "w-2 bg-border")} />
          ))}
          <button aria-label="Next review" onClick={() => setI((i + 1) % T.length)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-gold">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
