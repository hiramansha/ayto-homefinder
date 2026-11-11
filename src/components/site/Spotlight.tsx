import { useState } from "react";
import { Check } from "lucide-react";
import exterior from "@/assets/property-modern-family-house.jpg";
import bedroom from "@/assets/master-bedroom.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./utils";

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
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="overflow-hidden rounded-2xl shadow-luxe">
            <img src={shots[i].src} alt={shots[i].alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="mt-4 flex gap-3">
            {shots.map((s, k) => (
              <button
                key={s.alt}
                onClick={() => setI(k)}
                aria-label={`Show ${s.alt}`}
                className={cn(
                  "h-20 w-28 overflow-hidden rounded-lg border-2 transition",
                  k === i ? "border-gold opacity-100" : "border-transparent opacity-60 hover:opacity-90",
                )}
              >
                <img src={s.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <SectionHeading
            eyebrow="Property of the month"
            title="Modern family house, DHA Phase 6"
            sub="Lahore · 10 marla · 5 bedrooms · 5 bathrooms"
          />
          <p className="mt-6 font-display text-4xl font-bold text-primary">PKR 8.5 Crore</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/20">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button variant="forest" size="xl" onClick={onView}>
              View details
            </Button>
            <Button variant="outline" size="xl" className="border-primary/30 bg-transparent" onClick={onInquire}>
              Ask about this property
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
