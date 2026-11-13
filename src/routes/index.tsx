import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeDollarSign,
  Building2,
  Home,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
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
import fallbackAvatar from "@/assets/ayto-logo.jpg";

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
type ActivePage = "home" | "query" | "contact-us";

const partnerLogos = [
  "DHA LAHORE",
  "BAHRIA TOWN",
  "LAKE CITY",
  "LAHORE SMART CITY",
  "ETIHAD TOWN",
  "LDA APPROVED",
];

// Automatically picks up whatever filename you uploaded in src/assets/
const assetModules = import.meta.glob("../assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const directorEntry = Object.entries(assetModules).find(([path]) =>
  path.toLowerCase().includes("ayesha"),
);
const LOCAL_DIRECTOR_IMG = directorEntry ? directorEntry[1] : "";

export function Index() {
  const [saved, setSaved] = useState<number[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [open, setOpen] = useState<Property | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [prefill, setPrefill] = useState({ text: "", nonce: 0 });
  const [imgSrc, setImgSrc] = useState(LOCAL_DIRECTOR_IMG || fallbackAvatar);

  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
    } catch {
      /* ignore */
    }
    const syncFromUrl = () => {
      const s = window.location.search;
      if (s.includes("page=query-form")) setActivePage("query");
      else if (s.includes("page=contact-us")) setActivePage("contact-us");
      else setActivePage("home");
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const navigatePage = (page: ActivePage, sectionId?: string, text = "") => {
    if (text) {
      setPrefill({ text, nonce: Date.now() });
    }
    setActivePage(page);
    try {
      const nextUrl =
        page === "query"
          ? "?page=query-form"
          : page === "contact-us"
            ? "?page=contact-us"
            : window.location.pathname;
      window.history.pushState({}, "", nextUrl);
    } catch {
      /* ignore */
    }
    if (page === "home" && sectionId && sectionId !== "top") {
      window.setTimeout(() => scrollToId(sectionId), 80);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest("button, a");
      if (!btn) return;
      const label = (btn.textContent || "").trim().toLowerCase();

      // "Contact Us" -> Opens dedicated Director Message + Vision & Mission + Why Choose Us page
      if (label === "contact us") {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("contact-us");
        return;
      }

      // "Request A Visit" or "Get a Quote" -> Opens Query Form page
      if (label.includes("request a visit") || label.includes("get a quote")) {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("query");
        return;
      }

      // Navigation back to Home sections
      if (
        label === "home" ||
        label === "about us" ||
        label === "our offices" ||
        label === "projects" ||
        label === "services" ||
        label === "gallery" ||
        label === "properties"
      ) {
        const map: Record<string, string> = {
          home: "top",
          "about us": "about",
          "our offices": "offices",
          projects: "spotlight",
          services: "about",
          gallery: "listings",
          properties: "listings",
        };
        navigatePage("home", map[label] || "top");
      }
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, []);

  const list = showSaved ? properties.filter((p) => saved.includes(p.id)) : properties;

  const inquire = (p: Property) => {
    setOpen(null);
    navigatePage(
      "query",
      undefined,
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
          navigatePage("home", "listings");
        }}
      />

      {activePage === "query" ? (
        /* QUERY FORM PAGE (On Request A Visit / Get a Quote) */
        <main className="pt-20">
          <div className="mx-auto max-w-2xl px-4 pt-3 md:px-6">
            <button
              type="button"
              onClick={() => navigatePage("home", "top")}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85 transition hover:border-[#f4d06f] hover:text-[#f4d06f]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </button>
          </div>
          <Contact prefill={prefill} />
        </main>
      ) : activePage === "contact-us" ? (
        /* CONTACT US PAGE: DIRECTOR MESSAGE (AYESHA IQBAL), VISION & MISSION & WHY CHOOSE US */
        <main className="relative isolate overflow-hidden bg-[#141414] pt-24 text-white">
          <div
            className="pointer-events-none absolute inset-0 -z-20 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.16) 1px, transparent 0)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* Diagonal Glowing Gold Beams */}
          <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-full w-[540px] overflow-hidden opacity-85">
            <div className="absolute right-24 top-[-10%] h-[130%] w-[2px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#f4d06f] to-transparent shadow-[0_0_24px_4px_rgba(244,208,111,0.65)]" />
            <div className="absolute right-52 top-[-10%] h-[130%] w-[3px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent shadow-[0_0_32px_6px_rgba(212,175,55,0.7)]" />
          </div>

          <div className="mx-auto max-w-5xl px-5 pb-20 pt-2 md:px-8">
            <button
              type="button"
              onClick={() => navigatePage("home", "top")}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85 transition hover:border-[#f4d06f] hover:text-[#f4d06f]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </button>

            {/* 1. Director Message + Ayesha Iqbal Portrait Card */}
            <section className="mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f4d06f]/35 bg-[#f4d06f]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4d06f]">
                  <Award className="h-3.5 w-3.5" /> Leadership & Vision
                </span>
                <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Director Message
                </h1>
                <p className="mt-5 text-xs leading-[1.95] text-white/80 sm:text-sm">
                  At AYTO Properties & Builders, our vision is simple: to offer transparent
                  guidance, innovative solutions, and real estate opportunities that create lasting
                  value. With a strong presence in DHA Lahore (including our head office at{" "}
                  <span className="font-semibold text-[#f4d06f]">
                    E65 DHA Phase 12, Multan Road
                  </span>
                  ), private housing societies, and high-rise developments, we focus on secure
                  investments and modern growth. We continue to enhance our services through
                  technology, customer care, and market insight. Thank you for trusting us.
                  Together, we aim to build a better and more progressive future.
                </p>
              </div>

              <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-3xl border border-[#f4d06f]/40 bg-white shadow-[0_25px_80px_-15px_rgba(244,208,111,0.22)]">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1e1e1e]">
                  <img
                    src={imgSrc}
                    onError={() => setImgSrc(fallbackAvatar)}
                    alt="Ayesha Iqbal - Managing Director, AYTO Properties"
                    className="h-full w-full object-cover object-top brightness-[1.03] contrast-[1.05]"
                  />
                </div>
                <div className="bg-white px-5 py-4 text-center">
                  <p className="font-sans text-lg font-bold tracking-tight text-[#141414]">
                    Ayesha Iqbal
                  </p>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
                    Managing Director
                  </p>
                </div>
              </div>
            </section>

            {/* 2. VISION & MISSION */}
            <section className="mt-20 rounded-3xl border border-white/12 bg-white/[0.03] px-6 py-10 text-center backdrop-blur-sm sm:px-12">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f4d06f]">
                Our Core Purpose
              </span>
              <h2 className="mt-2 font-sans text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
                VISION & MISSION
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xs leading-[1.9] text-white/80 sm:text-sm">
                AYTO Properties & Builders aims to create sustainable, high-quality living and
                business spaces that improve how people live and work. With a focus on
                transparency, reliability, and customer satisfaction, the company delivers projects on
                time and to the highest standards. Guided by innovation and excellence, AYTO
                strives to make well-designed, high-value real estate accessible to all, building
                lasting trust and turning clients&apos; dreams into reality.
              </p>
            </section>

            {/* 3. Why Choose Us? */}
            <section className="mt-20">
              <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <h2 className="font-sans text-2xl font-bold text-white sm:text-3xl">
                    Why Choose Us?
                  </h2>
                  <p className="mt-4 text-xs leading-[1.9] text-white/80 sm:text-sm">
                    <strong className="text-white">Trusted Real Estate Professionals:</strong> We
                    provide transparent, reliable, and market-driven property services in DHA,
                    private societies, and premium communities.{" "}
                    <strong className="text-white">
                      Expertise in High-Rise & Vertical Projects:
                    </strong>{" "}
                    Our team offers specialized consultancy for apartment investments, commercial
                    towers, and modern vertical developments.{" "}
                    <strong className="text-white">Accurate Market Insights:</strong> We guide
                    clients with updated data, genuine market trends, and expert advice to help
                    them make profitable decisions.{" "}
                    <strong className="text-white">Safe & Hassle-Free Transactions:</strong> From
                    documentation to transfer, we manage everything professionally to ensure secure
                    and smooth deal closing.{" "}
                    <strong className="text-white">Personalized Client Support:</strong> We focus on
                    long-term relationships with exceptional guidance, after-sales support, and
                    client-first service.
                  </p>
                </div>

                {/* Glowing Innovation Card */}
                <div className="mx-auto flex aspect-[4/3] w-full max-w-sm flex-col items-center justify-center rounded-3xl border border-[#f4d06f]/25 bg-gradient-to-br from-[#232323] via-[#191919] to-[#121212] p-8 text-center shadow-2xl">
                  <div className="grid h-20 w-20 place-items-center rounded-full border border-[#f4d06f]/50 bg-[#f4d06f]/15 shadow-[0_0_40px_rgba(244,208,111,0.45)]">
                    <Lightbulb className="h-10 w-10 text-[#f4d06f]" />
                  </div>
                  <p className="mt-5 font-sans text-base font-bold text-white">
                    Smart Real Estate Solutions
                  </p>
                  <p className="mt-1.5 text-xs text-white/65">
                    Transparent deals, verified files & strategic growth in Lahore
                  </p>
                </div>
              </div>

              {/* 3 Icon Pillars */}
              <div className="mt-14 grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-[#f4d06f]/40">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/25 bg-white/[0.04] text-white">
                    <BadgeDollarSign className="h-5 w-5 text-[#f4d06f]" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-white sm:text-base">
                    Invest Opportunities
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Real estate services that simplify buying, selling, and managing
                    properties—helping you secure assets that grow in value over time.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-[#f4d06f]/40">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/25 bg-white/[0.04] text-white">
                    <Home className="h-5 w-5 text-[#f4d06f]" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-white sm:text-base">
                    Property Management
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Expert consulting services designed to elevate real estate performance,
                    strengthen operations, and drive meaningful results.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-[#f4d06f]/40">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/25 bg-white/[0.04] text-white">
                    <ShieldCheck className="h-5 w-5 text-[#f4d06f]" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-white sm:text-base">
                    Property Valuation
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    AYTO Properties provides complete real estate services to make property
                    transactions effortless and confident, with a strong emphasis on maximizing your
                    property&apos;s value.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Partner Logos Strip */}
          <div className="border-t border-white/10 py-12">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 sm:grid-cols-3 lg:grid-cols-6 md:px-8">
              {partnerLogos.map((partner) => (
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
        </main>
      ) : (
        /* MAIN HOME PAGE */
        <main>
          <Hero />

          <Spotlight
            onView={() => setOpen(featured)}
            onInquire={() => inquire(featured)}
          />

          <section
            id="listings"
            className="relative isolate overflow-hidden border-t border-white/10 bg-[#141414] py-20 text-white md:py-28"
          >
            <div
              className="pointer-events-none absolute inset-0 -z-20 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.16) 1px, transparent 0)",
                backgroundSize: "36px 36px",
              }}
            />

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
                    <div className="aspect-square overflow-hidden rounded-2xl border border-white/15 bg-[#1c1c1c] shadow-lg">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

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

          <Testimonials />
        </main>
      )}

      <SiteFooter
        onType={() => navigatePage("home", "listings")}
        onOpenQuery={() => navigatePage("query")}
      />

      <PropertyDialog p={open} onClose={() => setOpen(null)} onInquire={inquire} />
    </div>
  );
}
