import { useEffect, useState } from "react";
import { Building2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials as T } from "@/data/properties";
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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % T.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  const cur = T[active] ?? T[0]!;

  return (
    <section
      id="reviews"
      className="relative isolate overflow-hidden bg-[#141414] py-24 text-white md:py-32"
    >
      {/* Subtle Geometric Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.16) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Diagonal Glowing Gold Beams */}
      <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-full w-[520px] overflow-hidden opacity-85">
        <div className="absolute right-24 top-[-10%] h-[130%] w-[2px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#f4d06f] to-transparent shadow-[0_0_24px_4px_rgba(244,208,111,0.65)]" />
        <div className="absolute right-52 top-[-10%] h-[130%] w-[3px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent shadow-[0_0_32px_6px_rgba(212,175,55,0.7)]" />
      </div>

      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        {/* Watermark Heading + Foreground Title */}
        <div className="relative flex flex-col items-center justify-center">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none font-sans text-4xl font-black uppercase tracking-[0.25em] text-white/[0.06] sm:text-6xl"
          >
            TESTIMONIALS
          </span>
          <h2 className="-mt-6 font-sans text-2xl font-bold text-white sm:-mt-8 sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        {/* 5 Gold Stars */}
        <div className="mt-8 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} className="h-4 w-4 fill-[#f4d06f] text-[#f4d06f]" />
          ))}
        </div>

        {/* Centered Review Text */}
        <blockquote
          key={active}
          className="mx-auto mt-5 max-w-xl animate-rise text-sm leading-relaxed text-white/85 sm:text-base"
        >
          “{cur.quote}”
        </blockquote>

        <div className="mt-5">
          <p className="text-sm font-bold text-white">{cur.name}</p>
          <p className="text-xs text-white/55">{cur.role}</p>
        </div>

        {/* Horizontal Dash Indicators & Arrows */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() => setActive((prev) => (prev - 1 + T.length) % T.length)}
            className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-white/75 transition hover:border-[#f4d06f] hover:text-[#f4d06f]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {T.map((_, k) => (
              <button
                key={k}
                type="button"
                aria-label={`Review ${k + 1}`}
                onClick={() => setActive(k)}
                className={cn(
                  "h-[2px] transition-all duration-300",
                  k === active ? "w-8 bg-[#f4d06f]" : "w-6 bg-white/25 hover:bg-white/50",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next review"
            onClick={() => setActive((prev) => (prev + 1) % T.length)}
            className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-white/75 transition hover:border-[#f4d06f] hover:text-[#f4d06f]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Bottom Partner Logos Strip */}
      <div className="mx-auto mt-20 max-w-6xl border-t border-white/10 px-5 pt-12 md:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center gap-2 text-center text-xs font-bold tracking-[0.18em] text-white/65 transition-colors hover:text-[#f4d06f]"
            >
              <Building2 className="h-4 w-4 shrink-0 text-[#f4d06f]" />
              <span>{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
