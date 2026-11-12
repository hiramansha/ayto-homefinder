import { useState } from "react";
import { ArrowRight, Building2, Check, MapPin } from "lucide-react";
import exterior from "@/assets/property-modern-family-house.jpg";
import bedroom from "@/assets/master-bedroom.jpg";
import heroVilla from "@/assets/hero-villa.jpg";
import logo from "@/assets/ayto-logo.jpg";
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
    <div id="about" className="relative isolate overflow-hidden bg-[#141414] text-white">
      {/* Subtle Geometric Pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.16) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Diagonal Glowing Gold Light Beams */}
      <div className="pointer-events-none absolute -right-20 top-0 -z-10 h-full w-[560px] overflow-hidden opacity-90">
        <div className="absolute right-24 top-[-10%] h-[130%] w-[2px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#f4d06f] to-transparent shadow-[0_0_24px_4px_rgba(244,208,111,0.65)]" />
        <div className="absolute right-52 top-[-10%] h-[130%] w-[3px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent shadow-[0_0_32px_6px_rgba(212,175,55,0.7)]" />
        <div className="absolute right-72 top-[-10%] h-[42%] w-[2px] -rotate-[24deg] bg-gradient-to-b from-transparent via-[#f4d06f]/80 to-transparent shadow-[0_0_18px_2px_rgba(244,208,111,0.45)]" />
      </div>

      {/* SECTION 1: Geometric Office Collage + "Welcome to AYTO" */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="mx-auto max-w-[430px] overflow-hidden rounded-[2rem] border-[5px] border-white bg-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)]">
              <div className="relative flex items-center justify-between bg-[#1b1b1b] px-4 py-3 text-white">
                <div className="flex items-center gap-2.5">
                  <img
                    src={logo}
                    alt="AYTO Properties"
                    className="h-10 w-10 rounded-full border border-[#f4d06f] object-cover"
                  />
                  <div>
                    <p className="font-sans text-sm font-extrabold tracking-wider text-white">
                      AYTO PROPERTIES & BUILDERS
                    </p>
                    <p className="text-[10px] tracking-widest text-[#f4d06f]">
                      REALTORS • DEVELOPERS • CONSULTANTS
                    </p>
                  </div>
                </div>
                <Building2 className="h-5 w-5 text-[#f4d06f]" />
              </div>

              <div className="relative grid h-[370px] grid-cols-2 grid-rows-2 gap-1.5 bg-white pt-1.5">
                <div className="group overflow-hidden">
                  <img
                    src={heroVilla}
                    alt="AYTO Luxury Villa"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="group overflow-hidden">
                  <img
                    src={exterior}
                    alt="AYTO Architectural Project"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="group overflow-hidden">
                  <img
                    src={bedroom}
                    alt="AYTO Interior Design"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="group overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                    alt="AYTO Corporate Office Lahore"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rotate-45 overflow-hidden border-[5px] border-white bg-[#141414] shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
                    alt="AYTO Executive Lounge"
                    className="h-full w-full -rotate-45 scale-125 object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.6rem]">
              Welcome to AYTO
            </h2>

            <p className="mt-5 text-sm leading-[1.85] text-white/80 sm:text-base">
              AYTO Properties is a trusted name in property solutions, offering professional and
              result-driven services across residential, commercial, and investment sectors in Lahore.
              With strong market knowledge and a commitment to transparency, we guide clients through
              buying, selling, and investment decisions with confidence. In addition to traditional
              real estate services, AYTO Properties specializes in turnkey construction and high-rise
              project consultancy, providing expert guidance for homeowners, developers, and overseas
              investors seeking to plan, evaluate, and execute modern developments. Whether you are
              exploring property options or aiming to invest in large-scale projects, AYTO Properties
              ensures a smooth, informed, and successful real estate experience.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToId("services")}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#f4d06f] px-7 py-3.5 text-xs font-bold tracking-wide text-[#141414] shadow-[0_10px_28px_-6px_rgba(244,208,111,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:text-sm"
              >
                More About AYTO
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2: Current Running Project Showcase */}
      <section id="spotlight" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#f4d06f]">
              CURRENT RUNNING PROJECT
            </p>

            <h2 className="mt-2 font-sans text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              AYTO Residency, DHA Phase 6
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              AYTO Residency sets a new standard for contemporary urban living in Lahore. Positioned
              in prime DHA Phase 6, it brings together elegant architectural design, efficient layouts,
              and world-class amenities in one complete lifestyle destination.
            </p>

            <div className="mt-5 space-y-1.5 text-xs text-white/80 sm:text-sm">
              <p className="flex items-center gap-2 font-medium text-[#f4d06f]">
                <MapPin className="h-4 w-4" /> DHA Phase 6, Lahore • 10 Marla • 5 Bedrooms
              </p>
              <p className="text-white/60">Marketed exclusively by AYTO Properties & Builders</p>
            </div>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-xs text-white/85 sm:text-sm">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#f4d06f]/20 text-[#f4d06f]">
                    <Check className="h-3 w-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onView}
                className="group inline-flex items-center gap-2 rounded-full bg-[#f4d06f] px-7 py-3.5 text-xs font-bold text-[#141414] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:text-sm"
              >
                View Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onInquire();
                  scrollToId("contact");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-transparent px-7 py-3.5 text-xs font-semibold text-white transition-all duration-300 hover:border-[#f4d06f] hover:text-[#f4d06f] sm:text-sm"
              >
                Request A Visit
              </button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="group overflow-hidden rounded-3xl border border-white/15 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)]">
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex gap-3">
              {shots.map((s, k) => (
                <button
                  key={s.alt}
                  type="button"
                  onClick={() => setI(k)}
                  aria-label={`Show ${s.alt}`}
                  className={cn(
                    "h-16 w-24 overflow-hidden rounded-xl border-2 transition-all duration-300",
                    k === i ? "scale-105 border-[#f4d06f] opacity-100" : "border-white/15 opacity-55 hover:opacity-95",
                  )}
                >
                  <img src={s.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
