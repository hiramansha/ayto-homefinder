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
type ActivePage =
  | "home"
  | "about-us"
  | "our-offices"
  | "projects"
  | "services"
  | "gallery"
  | "contact-us"
  | "query-form";

const DIRECTOR_PHOTOS = [
  "https://raw.githubusercontent.com/hiramansha/ayto-homefinder/main/src/assets/ayesha-iqbal.jpg",
  "https://raw.githubusercontent.com/hiramansha/ayto-homefinder/main/src/assets/ayesha-iqbal.jpg.jpeg",
  "https://raw.githubusercontent.com/hiramansha/ayto-homefinder/main/src/assets/ayesha-iqbal.jpeg",
  "https://raw.githubusercontent.com/hiramansha/ayto-homefinder/main/src/assets/ayesha-iqbal.png",
];

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
    title: "AYTO Signature Villas – DHA Phase 8",
    location: "Broadway Commercial Vicinity, DHA Phase 8, Lahore",
    status: "Limited Units Left",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    desc: "1 Kanal ultra-luxury smart villas with double-height lobby, Spanish tiles, automated security, and designer master suites.",
  },
  {
    tag: "RESIDENTIAL COMMUNITY",
    title: "AYTO Smart Homes – Bahria Town",
    location: "Sector C, Bahria Town Lahore",
    status: "Delivered & Active",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    desc: "Thoughtfully planned 5 & 10 Marla family homes combining energy-efficient architecture with peaceful gated community living.",
  },
];

const galleryItems = [
  {
    title: "Modern Villa Exterior – DHA Phase 6",
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
    title: "1 Kanal Contemporary Elevation – DHA Phase 8",
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

export function Index() {
  const [saved, setSaved] = useState<number[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [open, setOpen] = useState<Property | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [photoIdx, setPhotoIdx] = useState(0);
  const [prefill, setPrefill] = useState({ text: "", nonce: 0 });

  const [galleryFilter, setGalleryFilter] = useState("All");
  const [lightboxImg, setLightboxImg] = useState<{ title: string; image: string } | null>(null);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const currentDirectorImg =
    photoIdx < DIRECTOR_PHOTOS.length ? DIRECTOR_PHOTOS[photoIdx] : fallbackAvatar;

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

  const navigatePage = (page: ActivePage, sectionId?: string, text = "") => {
    if (text) {
      setPrefill({ text, nonce: Date.now() });
      setFormMessage(text);
    }
    setActivePage((prev) => {
      if (prev === "home" && page === "home" && (!sectionId || sectionId === "top")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return "home";
      }
      return page;
    });
    try {
      const nextUrl = page === "home" ? window.location.pathname : `?page=${page}`;
      if (window.location.search !== (page === "home" ? "" : `?page=${page}`)) {
        window.history.pushState({}, "", nextUrl);
      }
    } catch {
      /* ignore */
    }
    if (page === "home" && sectionId && sectionId !== "top") {
      window.setTimeout(() => scrollToId(sectionId), 80);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
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

      if (label === "about us" || label.includes("more about ayto")) {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("about-us");
        return;
      }

      if (label === "our offices") {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("our-offices");
        return;
      }

      if (label === "projects" || label === "view project") {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("projects");
        return;
      }

      if (label === "services") {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("services");
        return;
      }

      if (label === "gallery") {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("gallery");
        return;
      }

      if (label.includes("request a visit") || label.includes("get a quote")) {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("query-form");
        return;
      }

      if (label === "contact us") {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("contact-us");
        return;
      }

      if (label === "home" || label.startsWith("ayto properties")) {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("home", "top");
        return;
      }

      if (label === "properties") {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("home", "listings");
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
    <div id="top" className="min-h-screen bg-[#141414] text-white">
      <style>{`
        footer a[aria-label], footer > div:last-child a {
          display: none !important;
        }
      `}</style>

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
      ) : activePage === "about-us" ? (
        <main className="relative isolate overflow-hidden bg-[#141414] pt-28 text-white">
          <div
            className="pointer-events-none absolute inset-0 -z-20 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.16) 1px, transparent 0)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-full w-[540px] overflow-hidden opacity-85">
            <div className="absolute right-24 top-[-10%] h-[130%] w-[2px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#f4d06f] to-transparent shadow-[0_0_24px_4px_rgba(244,208,111,0.65)]" />
            <div className="absolute right-52 top-[-10%] h-[130%] w-[3px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent shadow-[0_0_32px_6px_rgba(212,175,55,0.7)]" />
          </div>

          <div className="mx-auto max-w-5xl px-5 pb-20 pt-4 md:px-8">
            <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <h1 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Director Message
                </h1>
                <p className="mt-5 text-xs leading-[1.95] text-white/80 sm:text-sm">
                  At AYTO Properties &amp; Builders, our vision is simple: to offer transparent
                  guidance, innovative solutions, and real estate opportunities that create lasting
                  value. With a strong presence in DHA Lahore (including our head office at E65 DHA
                  Phase 12, Multan Road), private housing societies, and high-rise developments, we
                  focus on secure investments and modern growth. We continue to enhance our services
                  through technology, customer care, and market insight. Thank you for trusting us.
                  Together, we aim to build a better and more progressive future.
                </p>
              </div>

              <div className="mx-auto w-full max-w-[290px] overflow-hidden rounded-3xl border border-white/20 bg-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)]">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1e1e1e]">
                  <img
                    src={currentDirectorImg}
                    onError={() => setPhotoIdx((i) => i + 1)}
                    alt="Ayesha Iqbal - Managing Director, AYTO Properties"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="bg-white px-5 py-3.5 text-center">
                  <p className="font-sans text-base font-bold text-[#141414]">
                    Ayesha Iqbal
                  </p>
                  <p className="text-xs font-medium text-neutral-500">
                    Managing Director
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-24 text-center">
              <h2 className="font-sans text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
                VISION &amp; MISSION
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xs leading-[1.9] text-white/80 sm:text-sm">
                AYTO Properties &amp; Builders aims to create sustainable, high-quality living and
                business spaces that improve how people live and work. With a focus on
                transparency, reliability, and customer satisfaction, the company delivers projects on
                time and to the highest standards. Guided by innovation and excellence, AYTO
                strives to make well-designed, high-value real estate accessible to all, building
                lasting trust and turning clients&apos; dreams into reality.
              </p>
            </section>

            <section className="mt-28">
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
                      Expertise in High-Rise &amp; Vertical Projects:
                    </strong>{" "}
                    Our team offers specialized consultancy for apartment investments, commercial
                    towers, and modern vertical developments.{" "}
                    <strong className="text-white">Accurate Market Insights:</strong> We guide
                    clients with updated data, genuine market trends, and expert advice to help
                    them make profitable decisions.{" "}
                    <strong className="text-white">Safe &amp; Hassle-Free Transactions:</strong> From
                    documentation to transfer, we manage everything professionally to ensure secure
                    and smooth deal closing.{" "}
                    <strong className="text-white">Personalized Client Support:</strong> We focus on
                    long-term relationships with exceptional guidance, after-sales support, and
                    client-first service.
                  </p>
                </div>

                <div className="mx-auto flex aspect-[4/3] w-full max-w-sm flex-col items-center justify-center rounded-3xl border border-white/15 bg-gradient-to-br from-[#232323] via-[#191919] to-[#121212] p-8 text-center shadow-2xl">
                  <div className="grid h-20 w-20 place-items-center rounded-full border border-[#f4d06f]/50 bg-[#f4d06f]/15 shadow-[0_0_40px_rgba(244,208,111,0.45)]">
                    <Lightbulb className="h-10 w-10 text-[#f4d06f]" />
                  </div>
                  <p className="mt-5 font-sans text-base font-bold text-white">
                    Smart Real Estate Solutions
                  </p>
                  <p className="mt-1.5 text-xs text-white/65">
                    Transparent deals, verified files &amp; strategic growth in Lahore
                  </p>
                </div>
              </div>

              <div className="mt-14 grid gap-8 sm:grid-cols-3">
                <div>
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/25 bg-white/[0.03] text-white">
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

                <div>
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/25 bg-white/[0.03] text-white">
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

                <div>
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/25 bg-white/[0.03] text-white">
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
      ) : activePage === "our-offices" ? (
        <main className="relative isolate overflow-hidden bg-[#141414] pt-20 text-white">
          <div
            className="pointer-events-none absolute inset-0 -z-20 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.16) 1px, transparent 0)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="pointer-events-none absolute -right-24 top-64 -z-10 h-full w-[540px] overflow-hidden opacity-85">
            <div className="absolute right-24 top-[-10%] h-[130%] w-[2px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#f4d06f] to-transparent shadow-[0_0_24px_4px_rgba(244,208,111,0.65)]" />
            <div className="absolute right-52 top-[-10%] h-[130%] w-[3px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent shadow-[0_0_32px_6px_rgba(212,175,55,0.7)]" />
          </div>

          <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[360px]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
              alt="AYTO Properties Head Office & Branches"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/55" />
            <h1 className="relative z-10 px-4 text-center font-sans text-2xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl">
              Our Head Office &amp; Branches
            </h1>
          </section>

          <div className="mx-auto max-w-5xl px-5 py-20 md:px-8">
            <section>
              <h2 className="text-center font-sans text-xl font-bold text-white sm:text-3xl">
                AYTO Properties &amp; Builders – Head Office
              </h2>

              <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
                <div className="space-y-2 text-xs leading-relaxed text-white/85 sm:text-sm md:pl-8">
                  <p className="font-semibold text-white">
                    E65 DHA Phase 12, Multan Road, Lahore, Pakistan
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#f4d06f]" />
                    <span>Phone: +92 331-4972426</span>
                  </p>
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <Clock className="h-3.5 w-3.5 text-[#f4d06f]" />
                    <span>Office Hours:</span>
                  </p>
                  <p className="text-white/80">Monday – Saturday: 10:00 AM – 7:00 PM</p>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl">
                  <iframe
                    title="AYTO Properties Head Office - E65 DHA Phase 12, Multan Road, Lahore"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=74.1650%2C31.3850%2C74.2150%2C31.4250&layer=mapnik&marker=31.4050%2C74.1900"
                    className="h-[240px] w-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>

            <section className="mt-24">
              <h2 className="text-center font-sans text-xl font-bold text-white sm:text-3xl">
                AYTO Properties &amp; Builders – DHA Phase 6 Branch
              </h2>

              <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
                <div className="order-2 overflow-hidden rounded-xl border border-white/1
