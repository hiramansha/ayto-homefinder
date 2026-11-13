import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  BedDouble,
  Building,
  Building2,
  Calculator,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  Hammer,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  Maximize2,
  MessageCircle,
  MessageSquare,
  Phone,
  PlusCircle,
  Search,
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
    id: "ayto-residency",
    tag: "FLAGSHIP PROJECT",
    title: "AYTO Residency, DHA Phase 6",
    location: "DHA Phase 6, Lahore • 10 Marla • 5 Bedrooms",
    status: "Ready / Booking Open",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    desc: "Contemporary designer residence featuring glass-railing balconies, double car garage, lit entrance staircase, landscaped lawn, and imported fittings.",
  },
  {
    id: "ayto-heights",
    tag: "COMMERCIAL TOWER",
    title: "AYTO Heights Commercial Plaza",
    location: "Main Boulevard, DHA Phase 12 (EME Sector), Lahore",
    status: "Under Construction",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    desc: "Modern G+6 commercial & corporate complex with high-speed elevators, basement parking, retail showrooms, and executive office floors.",
  },
  {
    id: "ayto-signature",
    tag: "LUXURY VILLAS",
    title: "AYTO Signature Villas - DHA Phase 8",
    location: "Broadway Commercial Vicinity, DHA Phase 8, Lahore",
    status: "Limited Units Left",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    desc: "1 Kanal ultra-luxury smart villas with double-height lobby, Spanish tiles, automated security, and designer master suites.",
  },
  {
    id: "ayto-smarthomes",
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

      <div className="ayto-aurora-1 absolute -left-32 -top-24 h-[520px] w-[520px] rounded-full bg-[#1a3c78]/35 blur-[135px]" />
      <div className="ayto-aurora-2 absolute -right-24 top-1/4 h-[500px] w-[500px] rounded-full bg-[#d4af37]/16 blur-[145px]" />
      <div className="ayto-aurora-3 absolute bottom-[-10%] left-1/4 h-[480px] w-[480px] rounded-full bg-[#124563]/35 blur-[135px]" />

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

  // Improvement 1: Projects Dropdown State
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);

  // Improvement 2: Property Search & Category Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // Improvement 3: Post Property Modal State
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerLocation, setSellerLocation] = useState("DHA Phase 6, Lahore");
  const [sellerSize, setSellerSize] = useState("10 Marla House");
  const [sellerDemand, setSellerDemand] = useState("");

  // Improvement 5: Turnkey Construction Cost Estimator State
  const [plotMarla, setPlotMarla] = useState<5 | 10 | 20>(10);
  const [buildQuality, setBuildQuality] = useState<"grey" | "luxury">("luxury");

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
    setProjectsMenuOpen(false);
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
    } else if (sectionId) {
      window.setTimeout(() => scrollToId(sectionId), 120);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("[data-projects-dropdown]")) {
        setProjectsMenuOpen(false);
      }

      const btn = target?.closest("button, a");
      if (!btn) return;
      if (btn.getAttribute("target") === "_blank") return;
      if (btn.closest("[data-projects-dropdown]")) return;

      const raw = (btn.textContent || "").trim().toLowerCase();
      const label = raw.replace(/[^\w\s]/g, "").trim();

      const stopAndGo = (page: ActivePage, sectionId?: string) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        navigatePage(page, sectionId);
      };

      if (label.includes("post property")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setPostModalOpen(true);
        return;
      }

      if (label === "about us" || label.includes("more about ayto")) {
        stopAndGo("about-us");
        return;
      }

      if (label === "our offices") {
        stopAndGo("our-offices");
        return;
      }

      if (label === "projects") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setProjectsMenuOpen((prev) => !prev);
        return;
      }

      if (label === "view project") {
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

  const handleSellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerName.trim() || !sellerPhone.trim() || !sellerDemand.trim()) {
      toast.error("Please enter your Name, Phone Number, and Demand.");
      return;
    }
    toast.success("Property submitted! AYTO Properties team will verify and contact you shortly.");
    setSellerName("");
    setSellerPhone("");
    setSellerDemand("");
    setPostModalOpen(false);
  };

  const openWhatsAppChat = () => {
    const phone = "923314972426";
    const msg = encodeURIComponent(
      "Assalam-o-Alaikum AYTO Properties! I would like to get property details.",
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  // Filtered Properties for Smart Search Bar
  const baseList = showSaved ? properties.filter((p) => saved.includes(p.id)) : properties;
  const list = baseList.filter((p) => {
    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      typeFilter === "All" ||
      String((p as { type?: string; category?: string }).type || (p as { category?: string }).category || p.title)
        .toLowerCase()
        .includes(typeFilter.toLowerCase());
    return matchesSearch && matchesType;
  });

  // Construction Cost Estimator Calculation (Lahore Market Rates)
  const coveredAreaSqFt = plotMarla === 5 ? 1950 : plotMarla === 10 ? 3600 : 6200;
  const ratePerSqFt = buildQuality === "grey" ? 2750 : 5400;
  const estimatedCrore = ((coveredAreaSqFt * ratePerSqFt) / 10000000).toFixed(2);

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

        {/* Floating Projects Dropdown Menu (Opens when clicking "Projects ▾" in Navbar) */}
        {projectsMenuOpen && (
          <div
            data-projects-dropdown
            className="fixed left-1/2 top-[72px] z-50 w-[310px] -translate-x-1/2 rounded-2xl border border-[#f4c414]/40 bg-[#0b1322]/95 p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#f4d06f]">
              AYTO Signature Projects
            </div>
            {projectsList.map((proj) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => navigatePage("projects", proj.id)}
                className="flex w-full items-start justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition hover:bg-[#f4c414]/15"
              >
                <div>
                  <p className="text-xs font-bold text-white">{proj.title}</p>
                  <p className="text-[11px] text-slate-400">{proj.status}</p>
                </div>
                <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#f4c414]" />
              </button>
            ))}
            <div className="mt-1 border-t border-sky-300/15 pt-1">
              <button
                type="button"
                onClick={() => navigatePage("projects")}
                className="w-full rounded-xl bg-[#f4c414] py-2 text-center text-xs font-extrabold text-[#070b14] transition hover:brightness-105"
              >
                View All Projects
              </button>
            </div>
          </div>
        )}

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
                    <p className="mt-1.5 text-xs text-slate-300/75">
                      Transparent deals, verified files &amp; strategic growth in Lahore
                    </p>
                  </div>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-3">
                  <div className="rounded-2xl border border-sky-300/15 bg-[#0e172a]/80 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#f4d06f]/45">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#f4d06f]/35 bg-[#f4d06f]/10 text-white">
                      <BadgeDollarSign className="h-5 w-5 text-[#f4d06f]" />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-white sm:text-base">
                      Invest Opportunities
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300/75">
                      Real estate services that simplify buying, selling, and managing properties.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-sky-300/15 bg-[#0e172a]/80 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#f4d06f]/45">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#f4d06f]/35 bg-[#f4d06f]/10 text-white">
                      <Home className="h-5 w-5 text-[#f4d06f]" />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-white sm:text-base">
                      Property Management
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300/75">
                      Expert consulting services designed to elevate real estate performance.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-sky-300/15 bg-[#0e172a]/80 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#f4d06f]/45">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#f4d06f]/35 bg-[#f4d06f]/10 text-white">
                      <ShieldCheck className="h-5 w-5 text-[#f4d06f]" />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-white sm:text-base">
                      Property Valuation
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300/75">
                      Complete real estate services focused on maximizing your property&apos;s value.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="border-t border-sky-300/10 bg-[#080f1d]/80 py-12 backdrop-blur-md">
              <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 sm:grid-cols-3 lg:grid-cols-6 md:px-8">
                {partnerLogos.map((partner) => (
                  <div
                    key={partner}
                    className="flex items-center justify-center gap-2 text-center text-xs font-bold tracking-[0.18em] text-slate-300/75 transition hover:text-[#f4d06f]"
                  >
                    <Building2 className="h-4 w-4 shrink-0 text-[#f4d06f]" />
                    <span>{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </main>
        ) : activePage === "our-offices" ? (
          <main key="our-offices" className="ayto-page-enter relative isolate overflow-hidden pt-20 text-white">
            <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[360px]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
                alt="AYTO Properties Head Office & Branches"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/75 via-[#070b14]/60 to-[#070b14]" />
              <div className="relative z-10 px-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f4d06f]">
                  Visit Us In Lahore
                </p>
                <h1 className="mt-2 font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
                  Our Head Office &amp; Branches
                </h1>
              </div>
            </section>

            <div className="mx-auto max-w-5xl px-5 py-20 md:px-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="rounded-3xl border border-sky-300/15 bg-[#0e172a]/85 p-7 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-[#f4d06f]/50">
                  <span className="rounded-full bg-[#f4c414] px-3 py-1 text-[11px] font-bold text-[#070b14]">
                    HEAD OFFICE
                  </span>
                  <h2 className="mt-4 font-sans text-lg font-bold text-white">
                    DHA Phase 12 (EME Sector)
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-200/85">
                    E65 DHA Phase 12, Multan Road, Lahore, Pakistan
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-xs text-[#f4d06f]">
                    <Phone className="h-3.5 w-3.5" />
                    <span>+92 331-4972426</span>
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-xs text-slate-300/75">
                    <Clock className="h-3.5 w-3.5 text-[#f4d06f]" />
                    <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                  </p>
                </div>

                <div className="rounded-3xl border border-sky-300/15 bg-[#0e172a]/85 p-7 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-[#f4d06f]/50">
                  <span className="rounded-full border border-[#f4c414] px-3 py-1 text-[11px] font-bold text-[#f4c414]">
                    BRANCH OFFICE
                  </span>
                  <h2 className="mt-4 font-sans text-lg font-bold text-white">
                    DHA Phase 6 Branch
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-200/85">
                    Main Boulevard, DHA Phase 6, Lahore, Pakistan
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-xs text-[#f4d06f]">
                    <Phone className="h-3.5 w-3.5" />
                    <span>+92 331-4972426</span>
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-xs text-slate-300/75">
                    <Clock className="h-3.5 w-3.5 text-[#f4d06f]" />
                    <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                  </p>
                </div>

                <div className="rounded-3xl border border-sky-300/15 bg-[#0e172a]/85 p-7 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-[#f4d06f]/50">
                  <span className="rounded-full border border-[#f4c414] px-3 py-1 text-[11px] font-bold text-[#f4c414]">
                    BRANCH OFFICE
                  </span>
                  <h2 className="mt-4 font-sans text-lg font-bold text-white">
                    Bahria Town Branch
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-200/85">
                    Sector C Commercial, Bahria Town, Lahore, Pakistan
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-xs text-[#f4d06f]">
                    <Phone className="h-3.5 w-3.5" />
                    <span>+92 331-4972426</span>
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-xs text-slate-300/75">
                    <Clock className="h-3.5 w-3.5 text-[#f4d06f]" />
                    <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                  </p>
                </div>
              </div>

              <section className="mt-20 rounded-3xl border border-sky-300/15 bg-[#0e172a]/75 px-6 py-12 text-center shadow-xl backdrop-blur-md">
                <h2 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
                  Let&apos;s Build Your Future Together
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-slate-200/80 sm:text-sm">
                  AYTO Properties &amp; Builders is committed to delivering trusted real estate
                  solutions across Lahore. Visit our nearest office today.
                </p>
              </section>
            </div>
          </main>
        ) : activePage === "projects" ? (
          <main key="projects" className="ayto-page-enter relative isolate overflow-hidden pt-20 text-white">
            <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[360px]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
                alt="AYTO Properties Signature Projects"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/75 via-[#070b14]/60 to-[#070b14]" />
              <div className="relative z-10 px-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f4d06f]">
                  Developments &amp; Ventures
                </p>
                <h1 className="mt-2 font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
                  Our Signature &amp; Ongoing Projects
                </h1>
              </div>
            </section>

            <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
              <div className="grid gap-10 md:grid-cols-2">
                {projectsList.map((proj) => (
                  <div
                    id={proj.id}
                    key={proj.title}
                    className="group scroll-mt-28 overflow-hidden rounded-3xl border border-sky-300/15 bg-[#0e172a]/85 shadow-2xl backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-[#f4d06f]/55"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-[#070b14]/85 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f4d06f]">
                        {proj.tag}
                      </span>
                      <span className="absolute bottom-4 right-4 rounded-full bg-[#f4c414] px-3.5 py-1 text-[11px] font-bold text-[#070b14]">
                        {proj.status}
                      </span>
                    </div>

                    <div className="p-6 sm:p-8">
                      <h2 className="font-sans text-xl font-bold text-white sm:text-2xl">
                        {proj.title}
                      </h2>
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#f4d06f]">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span>{proj.location}</span>
                      </p>
                      <p className="mt-4 text-xs leading-relaxed text-slate-200/80 sm:text-sm">
                        {proj.desc}
                      </p>

                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={() =>
                            navigatePage(
                              "contact-us",
                              undefined,
                              `Hello AYTO Properties, I would like details for "${proj.title}".`,
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-full bg-[#f4c414] px-5 py-2.5 text-xs font-bold text-[#070b14] transition hover:brightness-105"
                        >
                          Request Project Details
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        ) : activePage === "services" ? (
          <main key="services" className="ayto-page-enter relative isolate overflow-hidden pt-20 text-white">
            <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[360px]">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80"
                alt="AYTO Properties Real Estate & Construction Services"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/75 via-[#070b14]/60 to-[#070b14]" />
              <div className="relative z-10 px-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f4d06f]">
                  What We Offer
                </p>
                <h1 className="mt-2 font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
                  Our Real Estate &amp; Construction Services
                </h1>
              </div>
            </section>

            <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
              {/* Improvement 5: Turnkey House Construction Cost Estimator */}
              <div className="mb-16 rounded-3xl border border-[#f4c414]/35 bg-[#0e172a]/90 p-7 shadow-2xl backdrop-blur-md sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4c414]/15 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f4d06f]">
                      <Calculator className="h-3.5 w-3.5" /> Instant Lahore Cost Estimator
                    </span>
                    <h2 className="mt-2 font-sans text-2xl font-extrabold text-white sm:text-3xl">
                      Turnkey House Construction Calculator
                    </h2>
                  </div>

                  <div className="rounded-2xl border border-[#f4c414]/40 bg-[#080f1d] px-6 py-4 text-right">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400">
                      Estimated Construction Cost ({coveredAreaSqFt.toLocaleString()} sq.ft)
                    </p>
                    <p className="mt-0.5 font-sans text-2xl font-extrabold text-[#f4c414] sm:text-3xl">
                      PKR {estimatedCrore} Crore
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      1. Select Plot Size
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      {([5, 10, 20] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setPlotMarla(m)}
                          className={`rounded-xl py-3 text-xs font-extrabold transition ${
                            plotMarla === m
                              ? "bg-[#f4c414] text-[#070b14] shadow-lg"
                              : "border border-sky-300/20 bg-[#080f1d] text-white/85 hover:border-[#f4c414]"
                          }`}
                        >
                          {m === 20 ? "1 Kanal" : `${m} Marla`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      2. Construction Package
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBuildQuality("grey")}
                        className={`rounded-xl py-3 text-xs font-extrabold transition ${
                          buildQuality === "grey"
                            ? "bg-[#f4c414] text-[#070b14] shadow-lg"
                            : "border border-sky-300/20 bg-[#080f1d] text-white/85 hover:border-[#f4c414]"
                        }`}
                      >
                        A+ Grey Structure
                      </button>
                      <button
                        type="button"
                        onClick={() => setBuildQuality("luxury")}
                        className={`rounded-xl py-3 text-xs font-extrabold transition ${
                          buildQuality === "luxury"
                            ? "bg-[#f4c414] text-[#070b14] shadow-lg"
                            : "border border-sky-300/20 bg-[#080f1d] text-white/85 hover:border-[#f4c414]"
                        }`}
                      >
                        Luxury Turnkey Finish
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {servicesList.map((srv) => {
                  const Icon = srv.icon;
                  return (
                    <div
                      key={srv.title}
                      className="flex flex-col justify-between rounded-3xl border border-sky-300/15 bg-[#0e172a]/85 p-7 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-[#f4d06f]/55"
                    >
                      <div>
                        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#f4d06f]/40 bg-[#f4d06f]/10">
                          <Icon className="h-7 w-7 text-[#f4d06f]" />
                        </div>
                        <h2 className="mt-5 font-sans text-lg font-bold text-white sm:text-xl">
                          {srv.title}
                        </h2>
                        <p className="mt-3 text-xs leading-relaxed text-slate-200/80 sm:text-sm">
                          {srv.desc}
                        </p>

                        <ul className="mt-5 space-y-2 border-t border-sky-300/10 pt-4">
                          {srv.points.map((pt) => (
                            <li key={pt} className="flex items-center gap-2 text-xs text-slate-100/90">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#f4d06f]" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigatePage(
                            "contact-us",
                            undefined,
                            `Hello AYTO Properties, I need consultation regarding "${srv.title}".`,
                          )
                        }
                        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#f4c414] bg-transparent px-5 py-2.5 text-xs font-bold text-[#f4c414] transition hover:bg-[#f4c414] hover:text-[#070b14]"
                      >
                        Inquire Now
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        ) : activePage === "gallery" ? (
          <main key="gallery" className="ayto-page-enter relative isolate overflow-hidden pt-20 text-white">
            <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[360px]">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80"
                alt="AYTO Properties Architecture & Interior Gallery"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/75 via-[#070b14]/60 to-[#070b14]" />
              <div className="relative z-10 px-4 text-center">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#f4d06f]">
                  <Sparkles className="h-3.5 w-3.5" /> Visual Portfolio
                </p>
                <h1 className="mt-2 font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
                  Project &amp; Interior Gallery
                </h1>
              </div>
            </section>

            <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {["All", "Luxury Villas", "Interiors", "Commercial & High-Rise"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setGalleryFilter(cat)}
                    className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                      galleryFilter === cat
                        ? "bg-[#f4c414] text-[#070b14] shadow-lg"
                        : "border border-sky-300/20 bg-[#0e172a]/85 text-white/85 hover:border-[#f4c414]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredGallery.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => setLightboxImg(item)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-sky-300/15 bg-[#0e172a]/85 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-[#f4d06f]/50"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#f4d06f]">
                        {item.category}
                      </span>
                      <h2 className="mt-1 text-xs font-bold text-white sm:text-sm">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {lightboxImg && (
              <div
                onClick={() => setLightboxImg(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-sky-300/25 bg-[#0b1322]"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxImg(null)}
                    aria-label="Close preview"
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/75 text-white hover:bg-[#f4c414] hover:text-[#070b14]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <img
                    src={lightboxImg.image}
                    alt={lightboxImg.title}
                    className="max-h-[78vh] w-full object-contain"
                  />
                  <div className="px-5 py-3 text-center text-sm font-bold text-white">
                    {lightboxImg.title}
                  </div>
                </div>
              </div>
            )}
          </main>
        ) : activePage === "contact-us" ? (
          <main key="contact-us" className="ayto-page-enter relative isolate overflow-hidden pt-32 text-white">
            <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
              <div className="text-center">
                <div className="mx-auto mb-3 h-[2px] w-10 rounded-full bg-[#f4c414]" />
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                  Get In Touch
                </p>
                <h1 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Our Contact Information
                </h1>
              </div>

              <div className="mt-14 grid gap-6 md:grid-cols-3">
                <div className="flex min-h-[156px] items-center gap-5 rounded-2xl bg-[#f4c414] px-7 py-7 text-[#070b14] shadow-[0_18px_45px_-12px_rgba(244,196,20,0.45)] transition duration-300 hover:-translate-y-1.5">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#070b14] bg-[#070b14]/5">
                    <MapPin className="h-6 w-6 text-[#070b14]" />
                  </div>
                  <div>
                    <h2 className="font-sans text-xl font-extrabold">Our Address</h2>
                    <p className="mt-1.5 text-xs font-semibold leading-relaxed text-[#070b14]/90 sm:text-sm">
                      E65 DHA Phase 12, Multan Road, Lahore
                    </p>
                  </div>
                </div>

                <a
                  href="tel:+923314972426"
                  className="flex min-h-[156px] items-center gap-5 rounded-2xl bg-[#f4c414] px-7 py-7 text-[#070b14] shadow-[0_18px_45px_-12px_rgba(244,196,20,0.45)] transition duration-300 hover:-translate-y-1.5 hover:brightness-105"
                >
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#070b14] bg-[#070b14]/5">
                    <Phone className="h-6 w-6 text-[#070b14]" />
                  </div>
                  <div>
                    <h2 className="font-sans text-xl font-extrabold">Phone Number</h2>
                    <p className="mt-1.5 text-sm font-bold text-[#070b14]/95">
                      +92 331-4972426
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:info2aytoproperties@gmail.com"
                  className="flex min-h-[156px] items-center gap-5 rounded-2xl bg-[#f4c414] px-7 py-7 text-[#070b14] shadow-[0_18px_45px_-12px_rgba(244,196,20,0.45)] transition duration-300 hover:-translate-y-1.5 hover:brightness-105"
                >
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#070b14] bg-[#070b14]/5">
                    <Mail className="h-6 w-6 text-[#070b14]" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-sans text-xl font-extrabold">Email Address</h2>
                    <p className="mt-1.5 break-all text-xs font-bold text-[#070b14]/95 sm:text-sm">
                      info2aytoproperties@gmail.com
                    </p>
                  </div>
                </a>
              </div>

              <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-3xl border border-sky-300/15 bg-[#0e172a]/85 p-7 shadow-2xl backdrop-blur-md sm:p-9">
                  <h2 className="font-sans text-3xl font-extrabold text-white sm:text-4xl">
                    Schedule a visit
                  </h2>
                  <p className="mt-2 text-xs text-slate-300/75 sm:text-sm">
                    Fill out your details below and our DHA Lahore property advisor will call you back.
                  </p>

                  <form onSubmit={handleContactSubmit} className="mt-7 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="Your Name*"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full rounded-full border border-sky-300/20 bg-[#080f1d]/90 px-5 py-3.5 pr-11 text-sm text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                        />
                        <User className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>

                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="Your Email*"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full rounded-full border border-sky-300/20 bg-[#080f1d]/90 px-5 py-3.5 pr-11 text-sm text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                        />
                        <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="Your Phone"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full rounded-full border border-sky-300/20 bg-[#080f1d]/90 px-5 py-3.5 pr-11 text-sm text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                      />
                      <Phone className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative">
                      <textarea
                        rows={4}
                        required
                        placeholder="Type Your Message*"
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        className="w-full rounded-3xl border border-sky-300/20 bg-[#080f1d]/90 px-5 py-4 pr-11 text-sm text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                      />
                      <MessageSquare className="pointer-events-none absolute right-4 top-5 h-4 w-4 text-slate-400" />
                    </div>

                    <button
                      type="submit"
                      className="rounded-full bg-[#f4c414] px-8 py-3.5 text-sm font-extrabold text-[#070b14] shadow-lg transition hover:brightness-105"
                    >
                      Submit Message
                    </button>
                  </form>
                </div>

                <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-sky-300/15 bg-[#0e172a]/85 shadow-2xl backdrop-blur-md">
                  <div className="h-[250px] w-full bg-[#09101f]">
                    <iframe
                      title="AYTO Properties DHA Phase 12 Lahore Map"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=74.205%2C31.415%2C74.245%2C31.445&layer=mapnik&marker=31.430%2C74.225"
                      className="h-full w-full border-0"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-7">
                    <span className="rounded-full bg-[#f4c414] px-3.5 py-1 text-[11px] font-bold text-[#070b14]">
                      LAHORE HEAD OFFICE
                    </span>
                    <h3 className="mt-3 font-sans text-xl font-bold text-white">
                      E65 DHA Phase 12, Multan Road
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-200/80 sm:text-sm">
                      Visit our main sales &amp; consultancy office in DHA Phase 12 (EME Sector),
                      Multan Road, Lahore for verified plots, villas &amp; construction.
                    </p>

                    <div className="mt-5 space-y-2 border-t border-sky-300/15 pt-4 text-xs text-slate-100/90">
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#f4c414]" />
                        <span>Monday - Saturday: 10:00 AM - 7:00 PM</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[#f4c414]" />
                        <span>Direct Helpline: +92 331-4972426</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        ) : (
          <main key="home" className="ayto-page-enter">
            <Hero />

            <Spotlight
              onView={() => navigatePage("projects")}
              onInquire={() => inquire(featured)}
            />

            <section
              id="listings"
              className="relative isolate overflow-hidden border-t border-sky-300/10 py-20 text-white md:py-28"
            >
              <div className="mx-auto max-w-6xl px-5 md:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <span className="inline-block rounded-full border border-[#f4d06f]/40 bg-[#f4d06f]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#f4d06f]">
                    Handpicked Portfolio
                  </span>
                  <h2 className="mt-3 font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
                    {showSaved ? "Your Saved Properties" : "Discover the Most Recommended Properties"}
                  </h2>
                  <p className="mt-3 text-xs leading-relaxed text-slate-200/80 sm:text-sm">
                    Discover the most recommended properties handpicked for their quality, value, and
                    location across Lahore.
                  </p>
                </div>

                {/* Improvement 2: Smart Search & Filter Bar */}
                <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-sky-300/15 bg-[#0e172a]/85 p-4 backdrop-blur-md md:flex-row">
                  <div className="relative w-full md:max-w-xs">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search DHA, Bahria, Gulberg..."
                      className="w-full rounded-full border border-sky-300/20 bg-[#080f1d] py-2 pl-10 pr-4 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {["All", "House", "Villa", "Apartment", "Plot", "Commercial"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setTypeFilter(cat)}
                        className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                          typeFilter === cat
                            ? "bg-[#f4c414] text-[#070b14]"
                            : "border border-sky-300/20 bg-[#080f1d]/80 text-slate-200 hover:border-[#f4c414]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Improvement 4: Rich Property Cards with Price, Beds & Marla Badges */}
                <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                  {list.slice(0, 8).map((p) => {
                    const beds = (p as { beds?: number }).beds;
                    const area = (p as { area?: string; size?: string }).area || (p as { size?: string }).size;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setOpen(p)}
                        className="group cursor-pointer rounded-2xl border border-sky-300/15 bg-[#0e172a]/85 p-2.5 shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-[#f4d06f]/50"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-[#131f36] shadow-lg">
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <span className="absolute left-2.5 top-2.5 rounded-full bg-[#070b14]/85 px-3 py-1 text-[11px] font-extrabold text-[#f4c414] backdrop-blur-md">
                            {priceLabel(p)}
                          </span>
                        </div>

                        <div className="mt-3 px-1 pb-1.5">
                          <h3 className="truncate text-xs font-bold text-white transition group-hover:text-[#f4d06f] sm:text-sm">
                            {p.location}
                          </h3>
                          <p className="truncate text-[11px] text-slate-300/75">{p.title}</p>

                          {(beds || area) && (
                            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-300/80">
                              {beds && (
                                <span className="inline-flex items-center gap-1">
                                  <BedDouble className="h-3.5 w-3.5 text-[#f4c414]" /> {beds} Beds
                                </span>
                              )}
                              {area && (
                                <span className="inline-flex items-center gap-1">
                                  <Maximize2 className="h-3 w-3 text-[#f4c414]" /> {area}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="mt-3 flex items-center justify-between border-t border-sky-300/10 pt-2.5">
                            <span className="text-[11px] font-semibold text-[#f4d06f]">
                              Verified Listing
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpen(p);
                              }}
                              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-sky-200/40 px-3 py-1 text-[11px] font-medium text-white transition-all duration-300 group-hover:border-[#f4d06f] group-hover:bg-[#f4d06f] group-hover:text-[#070b14]"
                            >
                              Details
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {list.length === 0 && (
                  <div className="mt-10 rounded-2xl border border-sky-300/15 bg-[#0e172a]/70 py-10 text-center">
                    <p className="text-sm text-slate-300">No properties matched your filter.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setTypeFilter("All");
                      }}
                      className="mt-3 rounded-full bg-[#f4c414] px-5 py-2 text-xs font-bold text-[#070b14]"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </section>

            <Testimonials />
          </main>
        )}

        <SiteFooter
          onType={() => navigatePage("home", "listings")}
          onOpenQuery={() => navigatePage("query-form")}
        />

        {/* Colored Brand Social Icons Bar (Facebook, Proper Instagram Camera Icon, X, WhatsApp) */}
        <div className="border-t border-sky-300/10 bg-[#050912]/90 py-5 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 md:px-8">
            <p className="text-xs text-slate-300/70">
              Connect with{" "}
              <span className="font-semibold text-white">AYTO Properties &amp; Builders</span>
            </p>

            <div className="flex items-center gap-3.5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#1877F2] text-white shadow-md transition-transform duration-200 hover:scale-110"
              >
                <span className="font-sans text-lg font-extrabold leading-none">f</span>
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                style={{
                  background:
                    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                }}
                className="grid h-10 w-10 place-items-center rounded-full text-white shadow-md transition-transform duration-200 hover:scale-110"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                title="Twitter"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#1DA1F2] text-white shadow-md transition-transform duration-200 hover:scale-110"
              >
                <span className="font-sans text-base font-extrabold leading-none">X</span>
              </a>

              <button
                type="button"
                onClick={openWhatsAppChat}
                aria-label="WhatsApp"
                title="WhatsApp (+92 331-4972426)"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white shadow-md transition-transform duration-200 hover:scale-110"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Improvement 3: Post Property Seller Modal */}
      {postModalOpen && (
        <div
          onClick={() => setPostModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-[#f4c414]/40 bg-[#0b1322] p-7 text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setPostModalOpen(false)}
              aria-label="Close Post Property Modal"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-[#f4c414] hover:text-[#070b14]"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4c414]/15 px-3 py-1 text-[11px] font-bold text-[#f4d06f]">
              <PlusCircle className="h-3.5 w-3.5" /> List With AYTO Properties
            </span>
            <h2 className="mt-2 font-sans text-2xl font-extrabold text-white">
              Post Your Property
            </h2>
            <p className="mt-1 text-xs text-slate-300/75">
              Submit your plot, house, or commercial file for direct verified buyers in Lahore.
            </p>

            <form onSubmit={handleSellerSubmit} className="mt-5 space-y-4">
              <input
                type="text"
                required
                placeholder="Owner Full Name*"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
              />
              <input
                type="tel"
                required
                placeholder="WhatsApp / Phone Number*"
                value={sellerPhone}
                onChange={(e) => setSellerPhone(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
              />
              <input
                type="text"
                required
                placeholder="Society / Phase (e.g., DHA Phase 6, Lahore)"
                value={sellerLocation}
                onChange={(e) => setSellerLocation(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Size & Type (e.g., 10 Marla Plot)"
                  value={sellerSize}
                  onChange={(e) => setSellerSize(e.target.value)}
                  className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Demand (e.g., 4.2 Crore)*"
                  value={sellerDemand}
                  onChange={(e) => setSellerDemand(e.target.value)}
                  className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#f4c414] py-3 text-xs font-extrabold text-[#070b14] shadow-lg transition hover:brightness-105"
              >
                Submit Property For Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Standard Round WhatsApp Logo Icon (Bottom-Right) */}
      <button
        type="button"
        onClick={openWhatsAppChat}
        aria-label="WhatsApp"
        title="WhatsApp (+92 331-4972426)"
        className="fixed bottom-6 right-6 z-50 grid h-[66px] w-[66px] place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_26px_rgba(37,211,102,0.5)] transition-transform duration-200 hover:scale-110"
      >
        <svg className="h-9 w-9 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
        </svg>
      </button>

      <PropertyDialog p={open} onClose={() => setOpen(null)} onInquire={inquire} />
    </div>
  );
}
