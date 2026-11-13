import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { properties, type Property } from "@/data/properties";
import { priceLabel } from "@/lib/property-math";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { PropertyDialog } from "@/components/site/PropertyDialog";
import { Spotlight } from "@/components/site/Spotlight";
import { Testimonials } from "@/components/site/Testimonials";
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
type ActivePage = "home" | "about-us" | "contact-us";

const partnerLogos = [
  "DHA LAHORE",
  "BAHRIA TOWN",
  "LAKE CITY",
  "LAHORE SMART CITY",
  "ETIHAD TOWN",
  "LDA APPROVED",
];

// Automatically picks up Ma'am's photo from src/assets/
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
  const [imgSrc, setImgSrc] = useState(LOCAL_DIRECTOR_IMG || fallbackAvatar);

  // Contact Us form state
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
      else if (s.includes("page=contact-us") || s.includes("page=query-form"))
        setActivePage("contact-us");
      else setActivePage("home");
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const navigatePage = (page: ActivePage, sectionId?: string, text = "") => {
    if (text) {
      setFormMessage(text);
    }
    setActivePage(page);
    try {
      const nextUrl =
        page === "about-us"
          ? "?page=about-us"
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
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest("button, a");
      if (!btn) return;
      const label = (btn.textContent || "").trim().toLowerCase();

      // 1. "About Us" or "More About AYTO" -> Opens ONLY the About Us page (Director Message + Vision & Mission + Why Choose Us)
      if (label === "about us" || label.includes("more about ayto")) {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("about-us");
        return;
      }

      // 2. "Contact Us", "Request A Visit", or "Get a Quote" -> Opens ONLY the Contact Us page
      if (
        label === "contact us" ||
        label.includes("request a visit") ||
        label.includes("get a quote")
      ) {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("contact-us");
        return;
      }

      // 3. "Home" -> Opens ONLY the Home page
      if (label === "home") {
        e.preventDefault();
        e.stopPropagation();
        navigatePage("home", "top");
        return;
      }

      // Other header links
      if (
        label === "our offices" ||
        label === "projects" ||
        label === "services" ||
        label === "gallery" ||
        label === "properties"
      ) {
        e.preventDefault();
        e.stopPropagation();
        const map: Record<string, string> = {
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
      "contact-us",
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

      {activePage === "about-us" ? (
        /* ABOUT US PAGE ONLY (EXACTLY MATCHING YOUR SCREENSHOTS) */
        <main className="relative isolate overflow-hidden bg-[#141414] pt-28 text-white">
          {/* Geometric Diamond Pattern Background */}
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

          <div className="mx-auto max-w-5xl px-5 pb-20 pt-4 md:px-8">
            {/* 1. Director Message + Ayesha Iqbal Portrait Card */}
            <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <h1 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Director Message
                </h1>
                <p className="mt-5 text-xs leading-[1.95] text-white/80 sm:text-sm">
                  At AYTO Properties & Builders, our vision is simple: to offer transparent
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
                    src={imgSrc}
                    onError={() => setImgSrc(fallbackAvatar)}
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

            {/* 2. VISION & MISSION */}
            <section className="mt-24 text-center">
              <h2 className="font-sans text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
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
                <div className="mx-auto flex aspect-[4/3] w-full max-w-sm flex-col items-center justify-center rounded-3xl border border-white/15 bg-gradient-to-br from-[#232323] via-[#191919] to-[#121212] p-8 text-center shadow-2xl">
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
      ) : activePage === "contact-us" ? (
        /* CONTACT US PAGE ONLY (3 GOLD CARDS + SCHEDULE A VISIT + MAP) */
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

              <a
                href="mailto:info2aytoproperties@gmail.com"
                className="flex items-center gap-4 rounded-2xl bg-[#f4c414] px-6 py-7 text-[#141414] shadow-xl transition hover:brightness-105"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#141414]">
                  <Mail className="h-6 w-6 text-[#141414]" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-sans text-lg font-bold">Email Address</h2>
                  <p className="mt-1 truncate text-xs font-semibold text-[#141414]/90 sm:text-sm">
                    info2aytoproperties@gmail.com
                  </p>
                </div>
              </a>
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

              <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#1c1c1c] shadow-2xl">
                <iframe
                  title="AYTO Properties Head Office Map - E65 DHA Phase 12, Multan Road, Lahore"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=74.1650%2C31.3850%2C74.2150%2C31.4250&layer=mapnik&marker=31.4050%2C74.1900"
                  className="h-[360px] w-full border-0"
                  loading="lazy"
                />
              </div>
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
        onOpenQuery={() => navigatePage("contact-us")}
      />

      <PropertyDialog p={open} onClose={() => setOpen(null)} onInquire={inquire} />
    </div>
  );
}
