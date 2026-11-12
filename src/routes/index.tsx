import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { toast } from "sonner";
import { properties, type Property } from "@/data/properties";
import { priceLabel } from "@/lib/property-math";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { PropertyDialog } from "@/components/site/PropertyDialog";
import { Spotlight } from "@/components/site/Spotlight";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";
import { scrollToId } from "@/components/site/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AYTO Properties – Luxury Real Estate & Builders in Lahore" },
      {
        name: "description",
        content:
          "Verified luxury houses, apartments, plots, commercial spaces and turnkey construction in Lahore. Clear prices and honest advice from AYTO Properties.",
      },
    ],
  }),
  component: Index,
});

const FAV_KEY = "ayto-fav";

export function Index() {
  const [saved, setSaved] = useState<number[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [open, setOpen] = useState<Property | null>(null);
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [prefill, setPrefill] = useState({ text: "", nonce: 0 });

  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  // Open Query Form whenever user clicks "Request A Visit", "Get a Quote", or "Contact Us"
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest("button, a");
      if (!btn) return;
      const label = (btn.textContent || "").trim().toLowerCase();
      if (
        label.includes("request a visit") ||
        label.includes("get a quote") ||
        label.includes("contact us")
      ) {
        setShowQueryForm(true);
        window.setTimeout(() => scrollToId("contact"), 80);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const list = showSaved ? properties.filter((p) => saved.includes(p.id)) : properties;

  const openVisitForm = (text = "") => {
    if (text) {
      setPrefill({ text, nonce: Date.now() });
    }
    setShowQueryForm(true);
    window.setTimeout(() => scrollToId("contact"), 80);
  };

  const inquire = (p: Property) => {
    setOpen(null);
    openVisitForm(
      `Hello, I am interested in "${p.title}" in ${p.location}, ${p.city} (${priceLabel(p)}). Please share more details.`,
    );
  };

  const featured = properties[0]!;

  return (
    <div id="top" className="min-h-screen bg-[#141414] text-white">
      <SiteHeader
        savedCount={saved.length}
        onShowSaved={() => {
          if (!saved.length) {
            toast("Tap a property to view details or request a visit");
            return;
          }
          setShowSaved((s) => !s);
          scrollToId("listings");
        }}
      />

      <main>
        {/* 1. Full-Screen Hero Slider */}
        <Hero />

        {/* 2. Welcome to AYTO (Honeycomb Collage) + Current Running Project */}
        <Spotlight
          onView={() => setOpen(featured)}
          onInquire={() => inquire(featured)}
        />

        {/* 3. Discover the Most Recommended Properties (Dark 4-Column Cards) */}
        <section
          id="listings"
          className="relative isolate overflow-hidden border-t border-white/10 bg-[#141414] py-20 text-white md:py-28"
        >
          {/* Subtle Geometric Dots */}
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

          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
                {showSaved ? "Your Saved Properties" : "Discover the Most Recommended Properties"}
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm">
                Discover the most recommended properties handpicked for their quality, value, and
                location. From luxury villas to prime residential & commercial plots across Lahore,
                each listing is verified to ensure smart returns and long-term comfort.
              </p>
            </div>

            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {list.slice(0, 8).map((p) => (
                <div
                  key={p.id}
                  onClick={() => setOpen(p)}
                  className="group cursor-pointer"
                >
                  {/* Rounded Square Image Card */}
                  <div className="aspect-square overflow-hidden rounded-2xl border border-white/15 bg-[#1c1c1c] shadow-lg">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Title + Pill "Details ->" Button */}
                  <div className="mt-3.5 flex items-center justify-between gap-2 border-b border-white/15 pb-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-xs font-bold text-white transition group-hover:text-[#f4d06f] sm:text-sm">
                        {p.location}
                      </h3>
                      <p className="truncate text-[11px] text-white/55">{p.title}</p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(p);
                      }}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/45 px-3.5 py-1 text-[11px] font-medium text-white transition-all duration-300 group-hover:border-[#f4d06f] group-hover:bg-[#f4d06f] group-hover:text-[#141414]"
                    >
                      Details
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Testimonials + Partner Logos Strip */}
        <Testimonials />

        {/* 5. Query Form (Opens only when user clicks "Request A Visit" / "Get a Quote") */}
        {showQueryForm && (
          <div className="relative border-t border-[#f4d06f]/30">
            <button
              type="button"
              onClick={() => setShowQueryForm(false)}
              className="absolute right-6 top-6 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#191919] px-4 py-2 text-xs font-medium text-white/80 transition hover:border-[#f4d06f] hover:text-[#f4d06f]"
            >
              <X className="h-3.5 w-3.5" /> Close Form
            </button>
            <Contact prefill={prefill} />
          </div>
        )}
      </main>

      {/* 6. Black Luxury Footer with Lahore Map */}
      <SiteFooter
        onType={() => scrollToId("listings")}
        onOpenQuery={() => openVisitForm()}
      />

      <PropertyDialog p={open} onClose={() => setOpen(null)} onInquire={inquire} />
    </div>
  );
}
