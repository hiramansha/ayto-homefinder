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
                  focus on secure investments and modern growth. Thank you for trusting us. Together,
                  we aim to build a better and more progressive future.
                </p>
              </div>

              <div className="mx-auto w-full max-w-[290px] overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1e1e1e]">
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
                time and to the highest standards.
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
                    <strong className="text-white">Safe &amp; Hassle-Free Transactions:</strong> From
                    documentation to transfer, we manage everything professionally.
                  </p>
                </div>

                <div className="mx-auto flex aspect-[4/3] w-full max-w-sm flex-col items-center justify-center rounded-3xl border border-white/15 bg-gradient-to-br from-[#232323] via-[#191919] to-[#121212] p-8 text-center shadow-2xl">
                  <div className="grid h-20 w-20 place-items-center rounded-full border border-[#f4d06f]/50 bg-[#f4d06f]/15">
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
                    Real estate services that simplify buying, selling, and managing properties.
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
                    Expert consulting services designed to elevate real estate performance.
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
                    Complete real estate services focused on maximizing your property&apos;s value.
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
                  className="flex items-center justify-center gap-2 text-center text-xs font-bold tracking-[0.18em] text-white/65"
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
          <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[360px]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
              alt="AYTO Properties Head Office & Branches"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/55" />
            <h1 className="relative z-10 px-4 text-center font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Our Head Office &amp; Branches
            </h1>
          </section>

          <div className="mx-auto max-w-5xl px-5 py-20 md:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-3xl border border-white/15 bg-[#191919] p-7 shadow-xl">
                <span className="rounded-full bg-[#f4c414] px-3 py-1 text-[11px] font-bold text-[#141414]">
                  HEAD OFFICE
                </span>
                <h2 className="mt-4 font-sans text-lg font-bold text-white">
                  DHA Phase 12 (EME Sector)
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  E65 DHA Phase 12, Multan Road, Lahore, Pakistan
                </p>
                <p className="mt-3 flex items-center gap-2 text-xs text-[#f4d06f]">
                  <Phone className="h-3.5 w-3.5" />
                  <span>+92 331-4972426</span>
                </p>
                <p className="mt-2 flex items-center gap-2 text-xs text-white/70">
                  <Clock className="h-3.5 w-3.5 text-[#f4d06f]" />
                  <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                </p>
              </div>

              <div className="rounded-3xl border border-white/15 bg-[#191919] p-7 shadow-xl">
                <span className="rounded-full border border-[#f4c414] px-3 py-1 text-[11px] font-bold text-[#f4c414]">
                  BRANCH OFFICE
                </span>
                <h2 className="mt-4 font-sans text-lg font-bold text-white">
                  DHA Phase 6 Branch
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  Main Boulevard, DHA Phase 6, Lahore, Pakistan
                </p>
                <p className="mt-3 flex items-center gap-2 text-xs text-[#f4d06f]">
                  <Phone className="h-3.5 w-3.5" />
                  <span>+92 331-4972426</span>
                </p>
                <p className="mt-2 flex items-center gap-2 text-xs text-white/70">
                  <Clock className="h-3.5 w-3.5 text-[#f4d06f]" />
                  <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                </p>
              </div>

              <div className="rounded-3xl border border-white/15 bg-[#191919] p-7 shadow-xl">
                <span className="rounded-full border border-[#f4c414] px-3 py-1 text-[11px] font-bold text-[#f4c414]">
                  BRANCH OFFICE
                </span>
                <h2 className="mt-4 font-sans text-lg font-bold text-white">
                  Bahria Town Branch
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  Sector C Commercial, Bahria Town, Lahore, Pakistan
                </p>
                <p className="mt-3 flex items-center gap-2 text-xs text-[#f4d06f]">
                  <Phone className="h-3.5 w-3.5" />
                  <span>+92 331-4972426</span>
                </p>
                <p className="mt-2 flex items-center gap-2 text-xs text-white/70">
                  <Clock className="h-3.5 w-3.5 text-[#f4d06f]" />
                  <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                </p>
              </div>
            </div>

            <section className="mt-20 text-center">
              <h2 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
                Let&apos;s Build Your Future Together
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-white/75 sm:text-sm">
                AYTO Properties &amp; Builders is committed to delivering trusted real estate
                solutions across Lahore. Visit our nearest office today.
              </p>
            </section>
          </div>
        </main>
      ) : activePage === "projects" ? (
        <main className="relative isolate overflow-hidden bg-[#141414] pt-20 text-white">
          <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[360px]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
              alt="AYTO Properties Signature Projects"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60" />
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
                  key={proj.title}
                  className="group overflow-hidden rounded-3xl border border-white/15 bg-[#191919] shadow-2xl transition hover:border-[#f4d06f]/50"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-[#141414]/85 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f4d06f]">
                      {proj.tag}
                    </span>
                    <span className="absolute bottom-4 right-4 rounded-full bg-[#f4c414] px-3.5 py-1 text-[11px] font-bold text-[#141414]">
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
                    <p className="mt-4 text-xs leading-relaxed text-white/75 sm:text-sm">
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
                        className="inline-flex items-center gap-2 rounded-full bg-[#f4c414] px-5 py-2.5 text-xs font-bold text-[#141414] transition hover:brightness-105"
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
        <main className="relative isolate overflow-hidden bg-[#141414] pt-20 text-white">
          <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[360px]">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80"
              alt="AYTO Properties Real Estate & Construction Services"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 px-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f4d06f]">
                What We Offer
              </p>
              <h1 className="mt-2 font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
                Our Real Estate &amp; Construction Services
              </h1>
            </div>
          </section>

          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {servicesList.map((srv) => {
                const Icon = srv.icon;
                return (
                  <div
                    key={srv.title}
                    className="flex flex-col justify-between rounded-3xl border border-white/15 bg-[#191919] p-7 shadow-xl transition hover:border-[#f4d06f]/50"
                  >
                    <div>
                      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#f4d06f]/40 bg-[#f4d06f]/10">
                        <Icon className="h-7 w-7 text-[#f4d06f]" />
                      </div>
                      <h2 className="mt-5 font-sans text-lg font-bold text-white sm:text-xl">
                        {srv.title}
                      </h2>
                      <p className="mt-3 text-xs leading-relaxed text-white/75 sm:text-sm">
                        {srv.desc}
                      </p>

                      <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                        {srv.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-2 text-xs text-white/85">
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
                      className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#f4c414] bg-transparent px-5 py-2.5 text-xs font-bold text-[#f4c414] transition hover:bg-[#f4c414] hover:text-[#141414]"
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
        <main className="relative isolate overflow-hidden bg-[#141414] pt-20 text-white">
          <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[360px]">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80"
              alt="AYTO Properties Architecture & Interior Gallery"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60" />
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
                      ? "bg-[#f4c414] text-[#141414]"
                      : "border border-white/20 bg-white/[0.03] text-white/80 hover:border-[#f4c414]"
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
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-[#1c1c1c] shadow-xl"
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
                className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-[#141414]"
              >
                <button
                  type="button"
                  onClick={() => setLightboxImg(null)}
                  aria-label="Close preview"
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/75 text-white hover:bg-[#f4c414] hover:text-[#141414]"
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
        <main className="relative isolate overflow-hidden bg-[#141414] pt-28 text-white">
          <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
            <div className="text-center">
              <p className="text-xs font-medium tracking-wider text-white/80 sm:text-sm">
                Get In Touch
              </p>
              <h1 className="mt-2 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Our Contact Information
              </h1>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="flex items-center gap-4 rounded-2xl bg-[#f4c414] px-6 py-7 text-[#141414] shadow-xl">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#141414]">
                  <MapPin className="h-6 w-6 text-[#141414]" />
                </div>
                <div>
                  <h2 className="font-sans text-lg font-bold">Our Address</h2>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-[#141414]/90 sm:text-sm">
                    E65 DHA Phase 12, Multan Road, Lahore
                  </p>
                </div>
              </div>

              <a
                href="tel:+923314972426"
                className="flex items-center gap-4 rounded-2xl bg-[#f4c414] px-6 py-7 text-[#141414] shadow-xl transition hover:brightness-105"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#141414]">
                  <Phone className="h-6 w-6 text-[#141414]" />
                </div>
                <div>
                  <h2 className="font-sans text-lg font-bold">Phone Number</h2>
                  <p className="mt-1 text-xs font-semibold text-[#141414]/90 sm:text-sm">
                    +92 331-4972426
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl bg-[#f4c414] px-6 py-7 text-[#141414] shadow-xl">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#141414]">
                  <Mail className="h-6 w-6 text-[#141414]" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-sans text-lg font-bold">Email Address</h2>
                  <p className="mt-1 truncate text-xs font-semibold text-[#141414]/90 sm:text-sm">
                    info2aytoproperties@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <h2 className="font-sans text-3xl font-bold text-white sm:text-4xl">
                  Schedule a visit
                </h2>

                <form onSubmit={handleContactSubmit} className="mt-7 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Your Name*"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full rounded-full border border-white/25 bg-[#191919]/90 px-5 py-3.5 pr-11 text-sm text-white placeholder:text-white/55 focus:border-[#f4c414] focus:outline-none"
                      />
                      <User className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="Your Email*"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full rounded-full border border-white/25 bg-[#191919]/90 px-5 py-3.5 pr-11 text-sm text-white placeholder:text-white/55 focus:border-[#f4c414] focus:outline-none"
                      />
                      <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full rounded-full border border-white/25 bg-[#191919]/90 px-5 py-3.5 pr-11 text-sm text-white placeholder:text-white/55 focus:border-[#f4c414] focus:outline-none"
                    />
                    <Phone className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                  </div>

                  <div className="relative">
                    <textarea
                      rows={4}
                      required
                      placeholder="Type Your Message*"
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full rounded-3xl border border-white/25 bg-[#191919]/90 px-5 py-4 pr-11 text-sm text-white placeholder:text-white/55 focus:border-[#f4c414] focus:outline-none"
                    />
                    <MessageSquare className="pointer-events-none absolute right-4 top-5 h-4 w-4 text-white/60" />
                  </div>

                  <button
                    type="submit"
                    className="rounded-full bg-[#f4c414] px-8 py-3.5 text-sm font-bold text-[#141414] shadow-lg transition hover:brightness-105"
                  >
                    Submit Message
                  </button>
                </form>
              </div>

              <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-[#191919] p-8 shadow-2xl">
                <div>
                  <span className="rounded-full bg-[#f4c414] px-3.5 py-1 text-[11px] font-bold text-[#141414]">
                    LAHORE HEAD OFFICE
                  </span>
                  <h3 className="mt-4 font-sans text-2xl font-bold text-white">
                    E65 DHA Phase 12, Multan Road
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-white/75 sm:text-sm">
                    Visit our main sales &amp; consultancy office in DHA Phase 12 (EME Sector),
                    Multan Road, Lahore for verified residential plots, luxury villas, and
                    construction consultations.
                  </p>
                </div>

                <div className="mt-8 space-y-3 border-t border-white/10 pt-5 text-xs text-white/85">
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
        </main>
      ) : (
        <main>
          <Hero />

          <Spotlight
            onView={() => navigatePage("projects")}
            onInquire={() => inquire(featured)}
          />

          <section
            id="listings"
            className="relative isolate overflow-hidden border-t border-white/10 bg-[#141414] py-20 text-white md:py-28"
          >
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
                  {showSaved ? "Your Saved Properties" : "Discover the Most Recommended Properties"}
                </h2>
                <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm">
                  Discover the most recommended properties handpicked for their quality, value, and
                  location across Lahore.
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
        onOpenQuery={() => navigatePage("query-form")}
      />

      {/* Colored Brand Social Icons Bar (Facebook, Instagram, Twitter, WhatsApp) */}
      <div className="border-t border-white/10 bg-[#0d0d0d] py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 md:px-8">
          <p className="text-xs text-white/60">
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
              <Sparkles className="h-4 w-4" />
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
              onClick={() => navigatePage("query-form")}
              aria-label="WhatsApp"
              title="WhatsApp (+92 331-4972426)"
              className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white shadow-md transition-transform duration-200 hover:scale-110"
            >
              <Phone className="h-4 w-4 fill-current" />
            </button>
          </div>
        </div>
      </div>

      <PropertyDialog p={open} onClose={() => setOpen(null)} onInquire={inquire} />
    </div>
  );
}
