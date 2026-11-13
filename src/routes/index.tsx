import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  Building,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  Hammer,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  X,
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

const directorPhotos = [
  "/assets/ayesha-iqbal.jpg",
  "/assets/ayesha-iqbal.jpg.jpeg",
  "https://raw.githubusercontent.com/hiramansha/ayto-homefinder/main/src/assets/ayesha-iqbal.jpg.jpeg",
  "https://raw.githubusercontent.com/hiramansha/ayto-homefinder/main/src/assets/ayesha-iqbal.jpg",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AYTO Properties - Luxury Real Estate & Builders in Lahore" },
      {
        name: "description",
        content:
          "Verified luxury houses, apartments, plots, commercial spaces and turnkey construction in Lahore.",
      },
    ],
  }),
  component: Index,
});

const FAV_KEY = "ayto-fav";
type ActivePage =
  | "home"
  | "about-us"
  | "our-offices"
  | "projects"
  | "services"
  | "gallery"
  | "contact-us"
  | "query-form";

const partnerLogos = [
  "DHA LAHORE",
  "BAHRIA TOWN",
  "LAKE CITY",
  "LAHORE SMART CITY",
  "ETIHAD TOWN",
  "LDA APPROVED",
];

const servicesList = [
  {
    icon: Home,
    title: "Residential & Commercial Sales",
    desc: "Verified houses, luxury villas, commercial plazas, and prime plots in DHA Lahore, Bahria Town, and LDA-approved societies with transparent pricing.",
    points: ["100% Verified Files & Plots", "Direct Owner Deals", "Fast Transfer Assistance"],
  },
  {
    icon: Hammer,
    title: "Turnkey House Construction",
    desc: "End-to-end grey structure and luxury finishing construction in Lahore with A+ grade materials, dedicated site engineers, and on-time handover.",
    points: ["5 Marla, 10 Marla & 1 Kanal Villas", "Fixed-Cost Transparent BOQs", "Modern Elevation & Interiors"],
  },
  {
    icon: Building,
    title: "High-Rise & Vertical Consultancy",
    desc: "Strategic investment advisory for commercial towers, luxury apartments, and mixed-use vertical developments offering high rental yields.",
    points: ["LDA & NOC Approved Projects", "Installment & ROI Planning", "Developer Due Diligence"],
  },
  {
    icon: Compass,
    title: "Architectural & Interior Design",
    desc: "Contemporary architectural layouts, 3D elevation renders, smart lighting, and bespoke interior styling tailored to modern family living.",
    points: ["3D Walkthroughs & Floor Plans", "Luxury Kitchens & Wardrobes", "Landscape & Lighting Design"],
  },
  {
    icon: BadgeDollarSign,
    title: "Investment & Portfolio Advisory",
    desc: "Data-backed market insights for local and overseas Pakistanis looking to build secure, high-appreciation real estate portfolios in Lahore.",
    points: ["Overseas Client Desk", "Market Trend Reports", "Safe Capital Growth"],
  },
  {
    icon: FileCheck2,
    title: "Property Management & Valuation",
    desc: "Complete rental management, tenant screening, legal documentation, and accurate market valuation to maximize your asset's worth.",
    points: ["Corporate & Family Rentals", "Documentation & Registry", "Upkeep & Maintenance"],
  },
];

const projectsList = [
  {
    tag: "FLAGSHIP PROJECT",
    title: "AYTO Residency, DHA Phase 6",
    location: "DHA Phase 6, Lahore • 10 Marla • 5 Bedrooms",
    status: "Ready / Booking Open",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    desc: "Contemporary designer residence featuring glass-railing balconies, double car garage, lit entrance staircase, landscaped lawn, and imported fittings.",
  },
  {
    tag: "COMMERCIAL TOWER",
    title: "AYTO Heights Commercial Plaza",
    location: "Main Boulevard, DHA Phase 12 (EME Sector), Lahore",
    status: "Under Construction",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    desc: "Modern G+6 commercial & corporate complex with high-speed elevators, basement parking, retail showrooms, and executive office floors.",
  },
  {
    tag: "LUXURY VILLAS",
    title: "AYTO Signature Villas - DHA Phase 8",
    location: "Broadway Commercial Vicinity, DHA Phase 8, Lahore",
    status: "Limited Units Left",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    desc: "1 Kanal ultra-luxury smart villas with double-height lobby, Spanish tiles, automated security, and designer master suites.",
  },
  {
    tag: "RESIDENTIAL COMMUNITY",
    title: "AYTO Smart Homes - Bahria Town",
    location: "Sector C, Bahria Town Lahore",
    status: "Delivered & Active",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    desc: "Thoughtfully planned 5 & 10 Marla family homes combining energy-efficient architecture with peaceful gated community living.",
  },
];

const galleryItems = [
  {
    title: "Modern Villa Exterior - DHA Phase 6",
    category: "Luxury Villas",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Double-Height Designer Living Lounge",
    category: "Interiors",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "AYTO Corporate Commercial Tower",
    category: "Commercial & High-Rise",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "1 Kanal Contemporary Elevation - DHA Phase 8",
    category: "Luxury Villas",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Executive Master Bedroom Suite",
    category: "Interiors",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Bespoke Modular Kitchen & Dining",
    category: "Interiors",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Glass Facade Corporate Plaza",
    category: "Commercial & High-Rise",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Evening Architectural Lighting & Lawn",
    category: "Luxury Villas",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
  },
];

function RoyalArchitecturalBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#070b14] via-[#0b1322] to-[#070c16]">
      {/* Architectural Diamond Lattice Pattern */}
      <svg
        className="ayto-lattice-pulse absolute inset-0 h-full w-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="ayto-diamond-grid"
            width="92"
            height="92"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M46 0 L92 46 L46 92 L0 46 Z"
              fill="none"
              stroke="rgba(148, 185, 255, 0.14)"
              strokeWidth="1"
            />
            <path
              d="M46 16 L76 46 L46 76 L16 46 Z"
              fill="none"
              stroke="rgba(244, 208, 111, 0.08)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ayto-diamond-grid)" />
      </svg>

      {/* Smooth Royal Sapphire & Champagne Aurora Glows */}
      <div className="ayto-aurora-1 absolute -left-32 -top-24 h-[520px] w-[520px] rounded-full bg-[#1a3c78]/35 blur-[135px]" />
      <div className="ayto-aurora-2 absolute -right-24 top-1/4 h-[500px] w-[500px] rounded-full bg-[#d4af37]/16 blur-[145px]" />
      <div className="ayto-aurora-3 absolute bottom-[-10%] left-1/4 h-[480px] w-[480px] rounded-full bg-[#124563]/35 blur-[135px]" />

      {/* Intersecting V-Shaped Glowing Golden Light Beams on Right Side */}
      <div className="absolute right-[-60px] top-[-10%] h-[125%] w-[680px] overflow-hidden opacity-90">
        <div className="ayto-beam-left absolute right-[290px] top-[-10%] h-[135%] w-[2px] -rotate-[22deg] bg-gradient-to-b from-transparent via-[#f4d06f]/85 to-transparent shadow-[0_0_24px_4px_rgba(244,208,111,0.55)]" />
        <div className="ayto-beam-left-soft absolute right-[318px] top-[-10%] h-[135%] w-[1px] -rotate-[22deg] bg-gradient-to-b from-transparent via-[#93c5fd]/45 to-transparent shadow-[0_0_16px_2px_rgba(147,197,253,0.3)]" />

        <div className="ayto-beam-right absolute right-[130px] top-[-10%] h-[135%] w-[3px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#f4d06f]/90 to-transparent shadow-[0_0_32px_6px_rgba(212,175,55,0.65)]" />
        <div className="ayto-beam-right-soft absolute right-[162px] top-[-10%] h-[135%] w-[1.5px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#fde68a]/65 to-transparent shadow-[0_0_20px_3px_rgba(253,230,138,0.4)]" />
      </div>
    </div>
  );
}

export function Index() {
  const [saved, setSaved] = useState<number[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [open, setOpen] = useState<Property | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [prefill, setPrefill] = useState({ text: "", nonce: 0 });

  const [galleryFilter, setGalleryFilter] = useState("All");
  const [lightboxImg, setLightboxImg] = useState<{ title: string; image: string } | null>(null);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
    } catch {
      /* ignore */
    }
    const syncFromUrl = () => {
      const s = window.location.search;
      if (s.includes("page=about-us")) setActivePage("about-us");
      else if (s.includes("page=our-offices")) setActivePage("our-offices");
      else if (s.includes("page=projects")) setActivePage("projects");
      else if (s.includes("page=services")) setActivePage("services");
      else if (s.includes("page=gallery")) setActivePage("gallery");
      else if (s.includes("page=contact-us")) setActivePage("contact-us");
      else if (s.includes("page=query-form")) setActivePage("query-form");
      else setActivePage("home");
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  useEffect(() => {
    if (activePage !== "home") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      const t = window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }, 40);
      return () => window.clearTimeout(t);
    }
  }, [activePage]);

  const navigatePage = (page: ActivePage, sectionId?: string, text = "") => {
    if (text) {
      setPrefill({ text, nonce: Date.now() });
      setFormMessage(text);
    }
    setActivePage(page);
    try {
      const nextUrl = page === "home" ? window.location.pathname : `?page=${page}`;
      window.history.pushState({}, "", nextUrl);
    } catch {
      /* ignore */
    }
    if (page === "home" && sectionId && sectionId !== "top") {
      window.setTimeout(() => scrollToId(sectionId), 100);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest("button, a");
      if (!btn) return;
      if (btn.getAttribute("target") === "_blank") return;

      const raw = (btn.textContent || "").trim().toLowerCase();
      const label = raw.replace(/[^\w\s]/g, "").trim();

      const stopAndGo = (page: ActivePage, sectionId?: string) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        navigatePage(page, sectionId);
      };

      if (label === "about us" || label.includes("more about ayto")) {
        stopAndGo("about-us");
        return;
      }

      if (label === "our offices") {
        stopAndGo("our-offices");
        return;
      }

      if (label === "projects" || label === "view project") {
        stopAndGo("projects");
        return;
      }

      if (label === "services") {
        stopAndGo("services");
        return;
      }

      if (label === "gallery") {
        stopAndGo("gallery");
        return;
      }

      if (label.includes("request a visit") || label.includes("get a quote")) {
        stopAndGo("query-form");
        return;
      }

      if (label === "contact us") {
        stopAndGo("contact-us");
        return;
      }

      if (label === "home" || label.startsWith("ayto properties")) {
        stopAndGo("home", "top");
        return;
      }

      if (label === "properties") {
        stopAndGo("home", "listings");
      }
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      toast.error("Please fill in Your Name, Email, and Message.");
      return;
    }
    toast.success("Thank you! Your visit request has been sent to AYTO Properties.");
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormMessage("");
  };

  const openWhatsAppChat = () => {
    const phone = "923314972426";
    const msg = encodeURIComponent(
      "Assalam-o-Alaikum AYTO Properties! I would like to get property details.",
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const list = showSaved ? properties.filter((p) => saved.includes(p.id)) : properties;

  const inquire = (p: Property) => {
    setOpen(null);
    navigatePage(
      "query-form",
      undefined,
      `Hello, I am interested in "${p.title}" in ${p.location}, ${p.city} (${priceLabel(p)}). Please share more details.`,
    );
  };

  const featured = properties[0]!;
  const filteredGallery =
    galleryFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === galleryFilter);

  return (
    <div id="top" className="relative min-h-screen bg-[#070b14] text-white selection:bg-[#f4c414] selection:text-[#070b14]">
      <style>{`
        footer a[aria-label], footer > div:last-child a {
          display: none !important;
        }
        main section, footer {
          background-color: transparent !important;
        }
        @keyframes aytoAuroraDrift1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(40px, 28px, 0) scale(1.08); }
        }
        @keyframes aytoAuroraDrift2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-35px, -22px, 0) scale(1.07); }
        }
        @keyframes aytoAuroraDrift3 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(28px, -30px, 0) scale(1.06); }
        }
        @keyframes aytoLatticeGlow {
          0%, 100% { opacity: 0.28; }
          50% { opacity: 0.55; }
        }
        @keyframes aytoBeamSweepLeft {
          0%, 100% { opacity: 0.45; transform: rotate(-22deg) translateX(0px); }
          50% { opacity: 0.95; transform: rotate(-22deg) translateX(14px); }
        }
        @keyframes aytoBeamSweepRight {
          0%, 100% { opacity: 0.55; transform: rotate(24deg) translateX(0px); }
          50% { opacity: 1; transform: rotate(24deg) translateX(-14px); }
        }
        @keyframes aytoPageFade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ayto-aurora-1 { animation: aytoAuroraDrift1 14s ease-in-out infinite; }
        .ayto-aurora-2 { animation: aytoAuroraDrift2 16s ease-in-out infinite; }
        .ayto-aurora-3 { animation: aytoAuroraDrift3 18s ease-in-out infinite; }
        .ayto-lattice-pulse { animation: aytoLatticeGlow 6s ease-in-out infinite; }
        .ayto-beam-left { animation: aytoBeamSweepLeft 5.5s ease-in-out infinite; }
        .ayto-beam-left-soft { animation: aytoBeamSweepLeft 7s ease-in-out 1.5s infinite; }
        .ayto-beam-right { animation: aytoBeamSweepRight 6s ease-in-out infinite; }
        .ayto-beam-right-soft { animation: aytoBeamSweepRight 7.5s ease-in-out 2s infinite; }
        .ayto-page-enter { animation: aytoPageFade 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>

      {/* Royal Midnight Sapphire + Diamond Lattice + V-Shaped Golden Light Beams */}
      <RoyalArchitecturalBackdrop />

      <div className="relative z-10">
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

        {activePage === "query-form" ? (
          <main key="query-form" className="ayto-page-enter pt-20">
            <div className="mx-auto max-w-2xl px-4 pt-3 md:px-6">
              <button
                type="button"
                onClick={() => navigatePage("home", "top")}
                className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/25 bg-[#0f192d]/80 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md transition hover:border-[#f4d06f] hover:text-[#f4d06f]"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
              </button>
            </div>
            <Contact prefill={prefill} />
          </main>
        ) : activePage === "about-us" ? (
          <main key="about-us" className="ayto-page-enter relative isolate overflow-hidden pt-28 text-white">
            <div className="mx-auto max-w-5xl px-5 pb-20 pt-4 md:px-8">
              <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-3xl border border-sky-300/15 bg-[#0e172a]/80 p-7 shadow-2xl backdrop-blur-md sm:p-9">
                  <span className="inline-block rounded-full border border-[#f4d06f]/40 bg-[#f4d06f]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#f4d06f]">
                    Leadership &amp; Vision
                  </span>
                  <h1 className="mt-3 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Director Message
                  </h1>
                  <p className="mt-5 text-xs leading-[1.95] text-slate-200/85 sm:text-sm">
                    At AYTO Properties &amp; Builders, our vision is simple: to offer transparent
                    guidance, innovative solutions, and real estate opportunities that create lasting
                    value. With a strong presence in DHA Lahore (including our head office at E65 DHA
                    Phase 12, Multan Road), private housing societies, and high-rise developments, we
                    focus on secure investments and modern growth. Thank you for trusting us. Together,
                    we aim to build a better and more progressive future.
                  </p>
                </div>

                <div className="mx-auto w-full max-w-[290px] overflow-hidden rounded-3xl border border-[#f4d06f]/40 bg-white shadow-[0_25px_70px_-15px_rgba(3,8,20,0.95)] transition duration-500 hover:-translate-y-1.5">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#131d33]">
                    <img
                      src={directorPhotos[0]}
                      onError={(e) => {
                        const img = e.currentTarget;
                        const next = Number(img.dataset.idx || "0") + 1;
                        if (next < directorPhotos.length) {
                          img.dataset.idx = String(next);
                          img.src = directorPhotos[next]!;
                        } else {
                          img.src = fallbackAvatar;
                        }
                      }}
                      alt="Ayesha Iqbal - Managing Director, AYTO Properties"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="bg-white px-5 py-3.5 text-center">
                    <p className="font-sans text-base font-bold text-[#0b1322]">
                      Ayesha Iqbal
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      Managing Director
                    </p>
                  </div>
                </div>
              </section>

              <section className="mt-20 rounded-3xl border border-sky-300/15 bg-[#0e172a]/75 px-6 py-12 text-center shadow-xl backdrop-blur-md sm:px-12">
                <h2 className="font-sans text-2xl font-bold uppercase tracking-wider text-[#f4d06f] sm:text-3xl">
                  VISION &amp; MISSION
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-xs leading-[1.9] text-slate-200/85 sm:text-sm">
                  AYTO Properties &amp; Builders aims to create sustainable, high-quality living and
                  business spaces that improve how people live and work. With a focus on
                  transparency, reliability, and customer satisfaction, the company delivers projects on
                  time and to the highest standards.
                </p>
              </section>

              <section className="mt-20">
                <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-3xl border border-sky-300/15 bg-[#0e172a]/80 p-7 shadow-xl backdrop-blur-md sm:p-9">
                    <h2 className="font-sans text-2xl font-bold text-white sm:text-3xl">
                      Why Choose Us?
                    </h2>
                    <p className="mt-4 text-xs leading-[1.9] text-slate-200/85 sm:text-sm">
                      <strong className="text-[#f4d06f]">Trusted Real Estate Professionals:</strong> We
                      provide transparent, reliable, and market-driven property services in DHA,
                      private societies, and premium communities.{" "}
                      <strong className="text-[#f4d06f]">
                        Expertise in High-Rise &amp; Vertical Projects:
                      </strong>{" "}
                      Our team offers specialized consultancy for apartment investments, commercial
                      towers, and modern vertical developments.{" "}
                      <strong className="text-[#f4d06f]">Safe &amp; Hassle-Free Transactions:</strong> From
                      documentation to transfer, we manage everything professionally.
                    </p>
                  </div>

                  <div className="mx-auto flex aspect-[4/3] w-full max-w-sm flex-col items-center justify-center rounded-3xl border border-[#f4d06f]/30 bg-gradient-to-br from-[#122240] via-[#0d172a] to-[#080e1a] p-8 text-center shadow-2xl transition duration-500 hover:-translate-y-1">
                    <div className="grid h-20 w-20 place-items-center rounded-full border border-[#f4d06f]/50 bg-[#f4d06f]/15 shadow-[0_0_30px_rgba(244,208,111,0.25)]">
                      <Lightbulb className="h-10 w-10 text-[#f4d06f]" />
                    </div>
                    <p className="mt-5 font-sans text-base font-bold text-white">
                      Smart Real Estate Solutions
                    </p>
                    <p className="mt-1.5 text
