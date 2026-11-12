import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import logo from "@/assets/ayto-logo.png";
import heroVilla from "@/assets/hero-villa.jpg";
import spotlightHouse from "@/assets/spotlight-house.jpg";
import adPlots from "@/assets/ad-plots.jpg";
import adInterior from "@/assets/ad-interior.jpg";
import { scrollToId } from "./utils";

const slides = [
  {
    isLogoSlide: true,
    image: heroVilla,
    subtitle: "LAHORE’S PREMIER REAL ESTATE & BUILDERS",
    title: "AYTO Properties",
    cta: "Request A Visit",
  },
  {
    isLogoSlide: false,
    image: heroVilla,
    subtitle: "DHA • BAHRIA TOWN • LAKE CITY",
    title: "Luxury Villas & Homes",
    cta: "Request A Visit",
  },
  {
    isLogoSlide: false,
    image: spotlightHouse,
    subtitle: "A-CLASS GREY STRUCTURE & FINISHING",
    title: "Turnkey Construction",
    cta: "Request A Visit",
  },
  {
    isLogoSlide: false,
    image: adPlots,
    subtitle: "VERIFIED HIGH-ROI INVESTMENTS",
    title: "Residential & Commercial Plots",
    cta: "Request A Visit",
  },
  {
    isLogoSlide: false,
    image: adInterior,
    subtitle: "MODERN ARCHITECTURE & INTERIORS",
    title: "Designer Living Spaces",
    cta: "Request A Visit",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  const active = slides[current]!;

  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-forest-deep pt-20">
      {/* Auto-changing full-screen background slides with smooth crossfade & zoom */}
      {slides.map((slide, index) => (
        <div
          key={`${slide.title}-${index}`}
          className={`absolute inset-0 -z-20 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
              index === current ? "scale-110" : "scale-100"
            }`}
          />
        </div>
      ))}

      {/* Dark luxury overlay (extra deep on Logo slide so gold logo shines) */}
      <div
        className={`absolute inset-0 -z-10 transition-colors duration-1000 ${
          active.isLogoSlide ? "bg-forest-deep/85" : "bg-black/55"
        }`}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/95 via-transparent to-forest-deep/75" />

      {/* Left Circular Rotating Text Button */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="group absolute bottom-10 left-5 z-20 hidden h-28 w-28 items-center justify-center md:bottom-16 md:left-12 md:flex lg:h-32 lg:w-32"
      >
        <svg
          viewBox="0 0 120 120"
          className="h-full w-full animate-[spin_16s_linear_infinite] text-white/85 transition-colors group-hover:text-gold-soft"
        >
          <defs>
            <path
              id="leftCirclePath"
              d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
            />
          </defs>
          <text fontSize="10.2" fontWeight="600" letterSpacing="2.4" fill="currentColor">
            <textPath href="#leftCirclePath" startOffset="0%">
              Explore and find Your Dream place •
            </textPath>
          </text>
        </svg>
        <span className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-forest-deep">
          <ArrowLeft className="h-5 w-5" />
        </span>
      </button>

      {/* Right Circular Rotating Text Button */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="group absolute bottom-10 right-5 z-20 hidden h-28 w-28 items-center justify-center md:bottom-16 md:right-12 md:flex lg:h-32 lg:w-32"
      >
        <svg
          viewBox="0 0 120 120"
          className="h-full w-full animate-[spin_16s_linear_infinite] text-white/85 transition-colors group-hover:text-gold-soft"
        >
          <defs>
            <path
              id="rightCirclePath"
              d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
            />
          </defs>
          <text fontSize="11" fontWeight="600" letterSpacing="3.5" fill="currentColor">
            <textPath href="#rightCirclePath" startOffset="0%">
              Need Help? • Need Help? •
            </textPath>
          </text>
        </svg>
        <span className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-forest-deep">
          <ArrowRight className="h-5 w-5" />
        </span>
      </button>

      {/* Center Editorial Content (Logo Slide + Property Slides) */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        {active.isLogoSlide && (
          <div
            key={`logo-${current}`}
            className="mx-auto mb-6 flex h-28 w-28 animate-rise items-center justify-center rounded-full border-2 border-gold/60 bg-forest-deep/90 p-3 shadow-[0_0_50px_rgba(212,175,55,0.45)] sm:h-36 sm:w-36"
          >
            <img
              src={logo}
              alt="AYTO Properties Logo"
              className="h-full w-full animate-float rounded-full object-contain"
            />
          </div>
        )}

        <p
          key={`sub-${current}`}
          className="animate-rise text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft sm:text-sm"
        >
          {active.subtitle}
        </p>

        <h1
          key={`title-${current}`}
          className="mt-3 animate-rise font-sans text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-6xl lg:text-[4.6rem]"
        >
          {active.title}
        </h1>

        <div key={`cta-${current}`} className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-rise">
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="group inline-flex items-center gap-3 rounded-full bg-[#f4d06f] px-8 py-4 text-sm font-semibold text-forest-deep shadow-[0_14px_34px_-8px_rgba(244,208,111,0.65)] transition-all duration-300 hover:-translate-y-1 hover:bg-gold-soft sm:text-base"
          >
            {active.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          {/* Mobile Prev/Next arrows */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Slide Progress Dots */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {slides.map((s, idx) => (
            <button
              key={`${s.title}-${idx}`}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === current ? "w-9 bg-[#f4d06f]" : "w-2 bg-white/45 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
