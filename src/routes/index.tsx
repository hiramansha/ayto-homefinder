import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  BadgeDollarSign,
  BedDouble,
  Building,
  Building2,
  Calculator,
  CheckCircle2,
  Clock,
  Compass,
  Edit3,
  FileCheck2,
  Hammer,
  Home,
  ImagePlus,
  Lightbulb,
  Lock,
  LogIn,
  LogOut,
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
  Trash2,
  User,
  UserCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { properties, type Property } from "@/data/properties";
import { bedsLabel, priceLabel, showBeds } from "@/lib/property-math";
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
const USERS_KEY = "ayto-registered-users";
const SESSION_KEY = "ayto-active-user";
const USER_POSTS_KEY = "ayto-user-listings";

interface AytoUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  agency?: string;
  joinedAt: string;
}

interface UserPostedProperty extends Property {
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerAgency?: string | undefined;
  customPriceText: string;
  areaText: string;
  listingStatus?: "Available" | "Sold";
}

type ActivePage =
  | "home"
  | "about-us"
  | "our-offices"
  | "projects"
  | "services"
  | "gallery"
  | "contact-us"
  | "query-form"
  | "user-profile";

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

const propertySampleImages: Record<string, string> = {
  House: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
  Villa: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
  Plot: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
  Commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  Apartment: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
};

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

  const [users, setUsers] = useState<AytoUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AytoUser | null>(null);
  const [userListings, setUserListings] = useState<UserPostedProperty[]>([]);
  const [viewedProfileUser, setViewedProfileUser] = useState<AytoUser | null>(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [openPostAfterAuth, setOpenPostAfterAuth] = useState(false);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authAgency, setAuthAgency] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAgency, setEditAgency] = useState("");

  const [editingListing, setEditingListing] = useState<UserPostedProperty | null>(null);
  const [editPropTitle, setEditPropTitle] = useState("");
  const [editPropDemand, setEditPropDemand] = useState("");
  const [editPropLocation, setEditPropLocation] = useState("");
  const [editPropStatus, setEditPropStatus] = useState<"Available" | "Sold">("Available");

  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [purposeFilter, setPurposeFilter] = useState<"All" | "Sale" | "Rent">("All");
  const [showAllListings, setShowAllListings] = useState(false);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [propTitle, setPropTitle] = useState("");
  const [propCategory, setPropCategory] = useState("House");
  const [propLocation, setPropLocation] = useState("DHA Phase 6, Lahore");
  const [propArea, setPropArea] = useState("10 Marla");
  const [propBeds, setPropBeds] = useState("5");
  const [propDemand, setPropDemand] = useState("");
  const [propImageUrl, setPropImageUrl] = useState("");

  const [plotMarla, setPlotMarla] = useState<5 | 10 | 20>(10);
  const [buildQuality, setBuildQuality] = useState<"grey" | "luxury">("luxury");
  const [installmentTotalLac, setInstallmentTotalLac] = useState(150);
  const [downPaymentPct, setDownPaymentPct] = useState(25);
  const [installmentMonths, setInstallmentMonths] = useState(36);

  const [galleryFilter, setGalleryFilter] = useState("All");
  const [lightboxImg, setLightboxImg] = useState<{ title: string; image: string } | null>(null);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
      const storedUsers: AytoUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      setUsers(storedUsers);
      const sessionUser: AytoUser | null = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
      if (sessionUser) setCurrentUser(sessionUser);
      const storedPosts: UserPostedProperty[] = JSON.parse(
        localStorage.getItem(USER_POSTS_KEY) || "[]",
      );
      setUserListings(storedPosts);
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
      else if (s.includes("page=user-profile")) setActivePage("user-profile");
      else setActivePage("home");
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);

    const replaceLegacyContactInfo = () => {
      document.querySelectorAll("footer a, footer p, footer span, section a, section p").forEach((el) => {
        if (el.children.length === 0 && el.textContent && el.textContent.includes("331-4972426")) {
          el.textContent = el.textContent.replace(/331-4972426/g, "336-4785098");
        }
        if (el instanceof HTMLAnchorElement) {
          if (el.href.includes("3314972426")) {
            el.href = el.href.replace(/3314972426/g, "3364785098");
          }
          if (el.href.includes("facebook.com")) {
            el.href = "https://www.facebook.com/profile.php?id=61596721197006";
          }
        }
      });
    };
    replaceLegacyContactInfo();
    const timer = window.setTimeout(replaceLegacyContactInfo, 400);

    return () => {
      window.removeEventListener("popstate", syncFromUrl);
      window.clearTimeout(timer);
    };
  }, [activePage]);

  useEffect(() => {
    if (activePage !== "home") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      const t = window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }, 40);
      return () => window.clearTimeout(t);
    }
    return undefined;
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

  const openUserProfile = (ownerId: string, fallbackName?: string, fallbackPhone?: string) => {
    const found = users.find((u) => u.id === ownerId);
    if (found) {
      setViewedProfileUser(found);
    } else if (currentUser && currentUser.id === ownerId) {
      setViewedProfileUser(currentUser);
    } else {
      setViewedProfileUser({
        id: ownerId,
        name: fallbackName || "AYTO Verified Member",
        email: "verified@aytoproperties.com",
        phone: fallbackPhone || "+92 336-4785098",
        password: "",
        agency: "AYTO Partner Network",
        joinedAt: "2026",
      });
    }
    navigatePage("user-profile");
  };

  const triggerPostPropertyFlow = () => {
    if (!currentUser) {
      setOpenPostAfterAuth(true);
      setAuthTab("login");
      setAuthModalOpen(true);
      toast("Please login or create an account to post your property.");
      return;
    }
    setPostModalOpen(true);
  };

  useEffect(() => {
    let hoverTimer: number | undefined;

    const isProjectsTrigger = (el: HTMLElement | null) => {
      const btn = el?.closest("header button, header a");
      if (!btn) return false;
      const clean = (btn.textContent || "").replace(/[^\w\s]/g, "").trim().toLowerCase();
      return clean === "projects";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (isProjectsTrigger(target) || target?.closest("[data-projects-dropdown]")) {
        if (hoverTimer) window.clearTimeout(hoverTimer);
        setProjectsMenuOpen(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const related = e.relatedTarget as HTMLElement | null;
      if (isProjectsTrigger(target) || target?.closest("[data-projects-dropdown]")) {
        if (isProjectsTrigger(related) || related?.closest("[data-projects-dropdown]")) {
          return;
        }
        hoverTimer = window.setTimeout(() => {
          setProjectsMenuOpen(false);
        }, 220);
      }
    };

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("[data-projects-dropdown]") && !isProjectsTrigger(target)) {
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
        triggerPostPropertyFlow();
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

    document.addEventListener("mouseover", onMouseOver, true);
    document.addEventListener("mouseout", onMouseOut, true);
    document.addEventListener("click", onDocClick, true);
    return () => {
      if (hoverTimer) window.clearTimeout(hoverTimer);
      document.removeEventListener("mouseover", onMouseOver, true);
      document.removeEventListener("mouseout", onMouseOut, true);
      document.removeEventListener("click", onDocClick, true);
    };
  }, [currentUser]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = authEmail.trim().toLowerCase();

    if (authTab === "signup") {
      if (!authName.trim() || !cleanEmail || !authPhone.trim() || !authPassword.trim()) {
        toast.error("Please fill in Name, Email, Phone, and Password.");
        return;
      }
      if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
        toast.error("This email is already registered. Please log in.");
        setAuthTab("login");
        return;
      }
      const newUser: AytoUser = {
        id: `user-${Date.now()}`,
        name: authName.trim(),
        email: cleanEmail,
        phone: authPhone.trim(),
        password: authPassword,
        agency: authAgency.trim() || "Direct Property Owner",
        joinedAt: new Date().toLocaleDateString("en-PK", { month: "short", year: "numeric" }),
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setCurrentUser(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
      toast.success(`Welcome ${newUser.name}! Your AYTO Profile is ready.`);
    } else {
      if (!cleanEmail || !authPassword.trim()) {
        toast.error("Please enter your Email and Password.");
        return;
      }
      const matched = users.find(
        (u) => u.email.toLowerCase() === cleanEmail && u.password === authPassword,
      );
      if (!matched) {
        toast.error("Invalid email or password. If you are new, click Sign Up.");
        return;
      }
      setCurrentUser(matched);
      localStorage.setItem(SESSION_KEY, JSON.stringify(matched));
      toast.success(`Welcome back, ${matched.name}!`);
    }

    setAuthModalOpen(false);
    setAuthName("");
    setAuthEmail("");
    setAuthPhone("");
    setAuthAgency("");
    setAuthPassword("");

    if (openPostAfterAuth) {
      setOpenPostAfterAuth(false);
      setPostModalOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
    toast.success("Logged out successfully.");
    if (activePage === "user-profile") {
      navigatePage("home", "top");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) {
      toast.error("Please select an image smaller than 2.5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPropImageUrl(reader.result);
        toast.success("Photo attached!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePropertyListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setPostModalOpen(false);
      setAuthModalOpen(true);
      return;
    }
    if (!propTitle.trim() || !propLocation.trim() || !propDemand.trim()) {
      toast.error("Please enter Property Title, Location, and Demand.");
      return;
    }

    const baseTemplate = properties[0]!;
    const newListing: UserPostedProperty = {
      ...baseTemplate,
      id: Date.now(),
      title: propTitle.trim(),
      location: propLocation.trim(),
      city: "Lahore",
      ...({
        type: propCategory,
        category: propCategory,
        purpose: "Sale",
      }),
      image:
        propImageUrl.trim() ||
        propertySampleImages[propCategory] ||
        propertySampleImages["House"]!,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerPhone: currentUser.phone,
      ownerAgency: currentUser.agency,
      customPriceText: propDemand.trim(),
      areaText: propArea.trim() || "10 Marla",
      listingStatus: "Available",
      ...(propCategory === "House" || propCategory === "Villa"
        ? { beds: Number(propBeds) || 4 }
        : {}),
    };

    const nextListings = [newListing, ...userListings];
    setUserListings(nextListings);
    localStorage.setItem(USER_POSTS_KEY, JSON.stringify(nextListings));

    toast.success("Property published under your profile and added to live listings!");
    setPropTitle("");
    setPropDemand("");
    setPropImageUrl("");
    setPostModalOpen(false);
    setViewedProfileUser(currentUser);
    navigatePage("user-profile");
  };

  const handleSaveProfileChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !editName.trim() || !editPhone.trim()) {
      toast.error("Name and Phone Number are required.");
      return;
    }
    const updatedUser: AytoUser = {
      ...currentUser,
      name: editName.trim(),
      phone: editPhone.trim(),
      agency: editAgency.trim() || "Direct Property Owner",
    };
    const nextUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));
    const nextListings = userListings.map((l) =>
      l.ownerId === currentUser.id
        ? {
            ...l,
            ownerName: updatedUser.name,
            ownerPhone: updatedUser.phone,
            ownerAgency: updatedUser.agency,
          }
        : l,
    );
    setUsers(nextUsers);
    setCurrentUser(updatedUser);
    setViewedProfileUser(updatedUser);
    setUserListings(nextListings);
    localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    localStorage.setItem(USER_POSTS_KEY, JSON.stringify(nextListings));
    setEditProfileOpen(false);
    toast.success("Profile updated!");
  };

  const handleSaveListingEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingListing || !editPropTitle.trim() || !editPropDemand.trim()) {
      toast.error("Please fill in Title and Demand.");
      return;
    }
    const updatedListings = userListings.map((item) =>
      item.id === editingListing.id
        ? {
            ...item,
            title: editPropTitle.trim(),
            location: editPropLocation.trim() || item.location,
            customPriceText: editPropDemand.trim(),
            listingStatus: editPropStatus,
          }
        : item,
    );
    setUserListings(updatedListings);
    localStorage.setItem(USER_POSTS_KEY, JSON.stringify(updatedListings));
    setEditingListing(null);
    toast.success("Property listing updated!");
  };

  const handleDeleteUserListing = (listingId: number) => {
    const updated = userListings.filter((item) => item.id !== listingId);
    setUserListings(updated);
    localStorage.setItem(USER_POSTS_KEY, JSON.stringify(updated));
    toast.success("Listing removed from your profile.");
  };

  const toggleCompareProperty = (id: number) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) {
        toast("Comparing latest 2 selected properties.");
        return [prev[1]!, id];
      }
      return [...prev, id];
    });
  };

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

  const openWhatsAppChat = (customText?: string) => {
    const phone = "923364785098";
    const msg = encodeURIComponent(
      customText ||
        "Assalam-o-Alaikum AYTO Properties! I would like to get property details.",
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const combinedProperties: Array<Property | UserPostedProperty> = [
    ...userListings,
    ...properties,
  ];
  const baseList = showSaved
    ? combinedProperties.filter((p) => saved.includes(p.id))
    : combinedProperties;

  const list = baseList.filter((p) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      p.city.toLowerCase().includes(query);

    const rawCategory = String(
      (p as { type?: string; category?: string }).type ||
        (p as { category?: string }).category ||
        p.title,
    ).toLowerCase();

    const matchesType =
      typeFilter === "All" ||
      rawCategory.includes(typeFilter.toLowerCase()) ||
      (typeFilter === "Villa" &&
        (rawCategory.includes("villa") || rawCategory.includes("house")));

    const itemPurpose = String(
      (p as { purpose?: string }).purpose || "Sale",
    ).toLowerCase();

    const matchesPurpose =
      purposeFilter === "All" ||
      itemPurpose === purposeFilter.toLowerCase();

    return matchesSearch && matchesType && matchesPurpose;
  });

  const resetAllFilters = () => {
    setSearchQuery("");
    setTypeFilter("All");
    setPurposeFilter("All");
    setShowSaved(false);
    setShowAllListings(false);
  };

  const comparedItems = combinedProperties.filter((p) => compareIds.includes(p.id));

  const coveredAreaSqFt = plotMarla === 5 ? 1950 : plotMarla === 10 ? 3600 : 6200;
  const ratePerSqFt = buildQuality === "grey" ? 2750 : 5400;
  const estimatedCrore = ((coveredAreaSqFt * ratePerSqFt) / 10000000).toFixed(2);

  const downPaymentLac = Math.round((installmentTotalLac * downPaymentPct) / 100);
  const remainingLac = installmentTotalLac - downPaymentLac;
  const monthlyInstallmentThousands = Math.round((remainingLac * 100) / installmentMonths);

  const inquire = (p: Property) => {
    setOpen(null);
    const displayPrice =
      "customPriceText" in p && (p as UserPostedProperty).customPriceText
        ? (p as UserPostedProperty).customPriceText
        : priceLabel(p);
    navigatePage(
      "query-form",
      undefined,
      `Hello, I am interested in "${p.title}" in ${p.location}, ${p.city} (${displayPrice}). Please share more details.`,
    );
  };

  const featured = properties[0]!;
  const filteredGallery =
    galleryFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === galleryFilter);

  const profileListings = viewedProfileUser
    ? userListings.filter((item) => item.ownerId === viewedProfileUser.id)
    : [];

  return (
    <div id="top" className="relative min-h-screen bg-[#070b14] text-white selection:bg-[#f4c414] selection:text-[#070b14]">
      <style>{`
        footer a[aria-label], footer > div:last-child a {
          display: none !important;
        }
        header [role="menu"], header nav div[class*="absolute"] {
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

        <div className="fixed right-5 top-[72px] z-40 flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-1.5 rounded-full border border-[#f4c414]/45 bg-[#0b1322]/90 px-3 py-1.5 text-xs shadow-xl backdrop-blur-md">
              <button
                type="button"
                onClick={() => openUserProfile(currentUser.id)}
                className="inline-flex items-center gap-1.5 font-bold text-[#f4d06f] hover:underline"
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>{currentUser.name}</span>
                <span className="rounded-full bg-[#f4c414] px-1.5 py-0.5 text-[10px] font-extrabold text-[#070b14]">
                  {userListings.filter((l) => l.ownerId === currentUser.id).length}
                </span>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                className="ml-1 rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setOpenPostAfterAuth(false);
                setAuthTab("login");
                setAuthModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/25 bg-[#0b1322]/85 px-3.5 py-1.5 text-xs font-bold text-white/90 shadow-lg backdrop-blur-md transition hover:border-[#f4c414] hover:text-[#f4c414]"
            >
              <LogIn className="h-3.5 w-3.5 text-[#f4c414]" />
              <span>Seller Login</span>
            </button>
          )}
        </div>

        {projectsMenuOpen && (
          <div
            data-projects-dropdown
            onMouseEnter={() => setProjectsMenuOpen(true)}
            onMouseLeave={() => setProjectsMenuOpen(false)}
            className="fixed left-1/2 top-[68px] z-50 w-[310px] -translate-x-1/2 rounded-2xl border border-[#f4c414]/40 bg-[#0b1322]/95 p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl"
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

        {activePage === "user-profile" && viewedProfileUser ? (
          <main key="user-profile" className="ayto-page-enter relative isolate overflow-hidden pt-28 text-white">
            <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigatePage("home", "listings")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/25 bg-[#0f192d]/80 px-4 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md transition hover:border-[#f4d06f] hover:text-[#f4d06f]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to All Properties
                </button>

                {currentUser?.id === viewedProfileUser.id && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-bold text-emerald-300">
                    <ShieldCheck className="h-3.5 w-3.5" /> Seller Dashboard Mode
                  </span>
                )}
              </div>

              <div className="mt-5 overflow-hidden rounded-3xl border border-[#f4c414]/35 bg-[#0e172a]/95 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#f4c414]/20 bg-gradient-to-r from-[#13264a] via-[#182f59] to-[#2e2611] px-6 py-3 sm:px-9">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f4d06f]">
                    AYTO Verified Partner Portal
                  </span>
                  <span className="hidden text-[11px] text-slate-300/80 sm:inline">
                    Lahore Real Estate Network
                  </span>
                </div>

                <div className="p-6 sm:p-9">
                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div className="flex items-center gap-4 sm:gap-5">
                      <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-2 border-[#f4c414] bg-[#080f1d] font-sans text-3xl font-extrabold text-[#f4c414] shadow-[0_8px_25px_rgba(244,196,20,0.2)]">
                        {viewedProfileUser.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h1 className="font-sans text-2xl font-extrabold text-white sm:text-3xl">
                            {viewedProfileUser.name}
                          </h1>
                          <span className="rounded-full bg-[#f4c414] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#070b14]">
                            {viewedProfileUser.agency || "Direct Property Owner"}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-300">
                          <span className="inline-flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-[#f4c414]" /> {viewedProfileUser.phone}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-[#f4c414]" /> {viewedProfileUser.email}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-slate-400">
                            <Clock className="h-3.5 w-3.5 text-[#f4c414]" /> Joined {viewedProfileUser.joinedAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {currentUser?.id === viewedProfileUser.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setEditName(currentUser.name);
                              setEditPhone(currentUser.phone);
                              setEditAgency(currentUser.agency || "");
                              setEditProfileOpen(true);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-sky-300/30 bg-[#080f1d] px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#f4c414] hover:text-[#f4c414]"
                          >
                            <Edit3 className="h-3.5 w-3.5" /> Edit Profile
                          </button>
                          <button
                            type="button"
                            onClick={() => setPostModalOpen(true)}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#f4c414] px-5 py-2.5 text-xs font-extrabold text-[#070b14] shadow-lg transition hover:brightness-105"
                          >
                            <PlusCircle className="h-4 w-4" /> Post New Property
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            openWhatsAppChat(
                              `Assalam-o-Alaikum! I saw ${viewedProfileUser.name}'s profile on AYTO Properties and want to inquire about their listings.`,
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs font-extrabold text-white shadow-lg transition hover:brightness-105"
                        >
                          <MessageCircle className="h-4 w-4" /> Contact Seller
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-3 gap-3 border-t border-sky-300/15 pt-6 sm:gap-5">
                    <div className="rounded-2xl border border-sky-300/15 bg-[#080f1d]/80 px-4 py-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                        Total Properties
                      </p>
                      <p className="mt-1 font-sans text-xl font-extrabold text-white sm:text-2xl">
                        {profileListings.length}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-emerald-400/20 bg-[#080f1d]/80 px-4 py-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-300/80">
                        Active / Available
                      </p>
                      <p className="mt-1 font-sans text-xl font-extrabold text-emerald-400 sm:text-2xl">
                        {profileListings.filter((l) => l.listingStatus !== "Sold").length}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#f4c414]/25 bg-[#080f1d]/80 px-4 py-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-[#f4d06f]/80">
                        Sold Deals
                      </p>
                      <p className="mt-1 font-sans text-xl font-extrabold text-[#f4c414] sm:text-2xl">
                        {profileListings.filter((l) => l.listingStatus === "Sold").length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-11">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-sans text-xl font-bold text-white sm:text-2xl">
                      Manage Listed Properties ({profileListings.length})
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-400">
                      All properties published under {viewedProfileUser.name}&apos;s portfolio
                    </p>
                  </div>
                </div>

                {profileListings.length === 0 ? (
                  <div className="mt-6 rounded-3xl border border-dashed border-sky-300/25 bg-[#0e172a]/70 p-12 text-center">
                    <p className="text-sm text-slate-300">
                      No properties posted by this user yet.
                    </p>
                    {currentUser?.id === viewedProfileUser.id && (
                      <button
                        type="button"
                        onClick={() => setPostModalOpen(true)}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f4c414] px-6 py-2.5 text-xs font-extrabold text-[#070b14]"
                      >
                        <PlusCircle className="h-4 w-4" /> Post Your First Property
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {profileListings.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setOpen(item)}
                        className="group cursor-pointer overflow-hidden rounded-2xl border border-sky-300/15 bg-[#0e172a]/90 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-[#f4d06f]/60"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#131f36]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 via-transparent to-transparent" />
                          <span className="absolute left-3.5 top-3.5 rounded-lg bg-[#070b14]/90 px-3 py-1 text-xs font-extrabold text-[#f4c414] backdrop-blur-md">
                            {item.customPriceText}
                          </span>
                          <span
                            className={`absolute right-3.5 top-3.5 rounded-lg px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${
                              item.listingStatus === "Sold"
                                ? "bg-red-500 text-white"
                                : "bg-emerald-500 text-[#070b14]"
                            }`}
                          >
                            {item.listingStatus || "Available"}
                          </span>
                          <span className="absolute bottom-3 left-3.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white/90">
                            <Maximize2 className="h-3 w-3 text-[#f4c414]" /> {item.areaText}
                          </span>
                        </div>

                        <div className="p-4">
                          <h3 className="truncate text-base font-bold text-white group-hover:text-[#f4d06f]">
                            {item.title}
                          </h3>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-300/80">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#f4c414]" /> {item.location}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-sky-300/15 pt-3.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpen(item);
                              }}
                              className="rounded-lg bg-[#f4c414] px-3.5 py-1.5 text-xs font-extrabold text-[#070b14] transition hover:brightness-105"
                            >
                              View Details
                            </button>

                            {currentUser?.id === viewedProfileUser.id && (
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingListing(item);
                                    setEditPropTitle(item.title);
                                    setEditPropDemand(item.customPriceText);
                                    setEditPropLocation(item.location);
                                    setEditPropStatus(item.listingStatus || "Available");
                                  }}
                                  className="inline-flex items-center gap-1 rounded-lg border border-sky-300/30 bg-[#080f1d] px-3 py-1.5 text-[11px] font-bold text-white transition hover:border-[#f4c414] hover:text-[#f4c414]"
                                >
                                  <Edit3 className="h-3 w-3" /> Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteUserListing(item.id);
                                  }}
                                  title="Delete Listing"
                                  className="inline-flex items-center gap-1 rounded-lg border border-red-400/35 bg-red-500/10 px-3 py-1.5 text-[11px] font-bold text-red-300 transition hover:bg-red-500/25"
                                >
                                  <Trash2 className="h-3 w-3" /> Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        ) : activePage === "query-form" ? (
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

                <div
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  className="mx-auto w-full max-w-[290px] select-none overflow-hidden rounded-3xl border border-[#f4d06f]/40 bg-white shadow-[0_25px_70px_-15px_rgba(3,8,20,0.95)] transition duration-500 hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#131d33]">
                    <img
                      src={directorPhotos[0]}
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onError={(e) => {
                        const img = e.currentTarget;
                        const next = Number(img.dataset["idx"] || "0") + 1;
                        if (next < directorPhotos.length) {
                          img.dataset["idx"] = String(next);
                          img.src = directorPhotos[next]!;
                        } else {
                          img.src = fallbackAvatar;
                        }
                      }}
                      alt="Ayesha Iqbal - Managing Director, AYTO Properties"
                      style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none" }}
                      className="pointer-events-none h-full w-full select-none object-cover object-top"
                    />
                    <div
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      className="absolute inset-0 z-10 bg-transparent"
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
                    <span>+92 336-4785098</span>
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
                    <span>+92 336-4785098</span>
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
                    <span>+92 336-4785098</span>
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
              <div className="mb-16 grid gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-[#f4c414]/35 bg-[#0e172a]/90 p-7 shadow-2xl backdrop-blur-md">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4c414]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f4d06f]">
                    <Calculator className="h-3.5 w-3.5" /> Lahore Construction Rates
                  </span>
                  <h2 className="mt-2 font-sans text-2xl font-extrabold text-white">
                    House Construction Estimator
                  </h2>

                  <div className="mt-4 rounded-2xl border border-[#f4c414]/40 bg-[#080f1d] px-5 py-3.5">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400">
                      Estimated Cost ({coveredAreaSqFt.toLocaleString()} sq.ft Covered Area)
                    </p>
                    <p className="mt-0.5 font-sans text-2xl font-extrabold text-[#f4c414]">
                      PKR {estimatedCrore} Crore
                    </p>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Plot Size
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-2.5">
                        {([5, 10, 20] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setPlotMarla(m)}
                            className={`rounded-xl py-2.5 text-xs font-extrabold transition ${
                              plotMarla === m
                                ? "bg-[#f4c414] text-[#070b14]"
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
                        Finishing Package
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setBuildQuality("grey")}
                          className={`rounded-xl py-2.5 text-xs font-extrabold transition ${
                            buildQuality === "grey"
                              ? "bg-[#f4c414] text-[#070b14]"
                              : "border border-sky-300/20 bg-[#080f1d] text-white/85 hover:border-[#f4c414]"
                          }`}
                        >
                          A+ Grey Structure
                        </button>
                        <button
                          type="button"
                          onClick={() => setBuildQuality("luxury")}
                          className={`rounded-xl py-2.5 text-xs font-extrabold transition ${
                            buildQuality === "luxury"
                              ? "bg-[#f4c414] text-[#070b14]"
                              : "border border-sky-300/20 bg-[#080f1d] text-white/85 hover:border-[#f4c414]"
                          }`}
                        >
                          Luxury Turnkey
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-sky-300/25 bg-[#0e172a]/90 p-7 shadow-2xl backdrop-blur-md">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-300">
                    <BadgeDollarSign className="h-3.5 w-3.5" /> Easy Payment Planner
                  </span>
                  <h2 className="mt-2 font-sans text-2xl font-extrabold text-white">
                    Installment Plan Calculator
                  </h2>

                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-sky-300/25 bg-[#080f1d] px-5 py-3.5">
                    <div>
                      <p className="text-[11px] text-slate-400">Down Payment ({downPaymentPct}%)</p>
                      <p className="font-sans text-lg font-extrabold text-white">
                        PKR {downPaymentLac} Lac
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-slate-400">Monthly Installment</p>
                      <p className="font-sans text-lg font-extrabold text-[#f4c414]">
                        PKR {monthlyInstallmentThousands.toLocaleString()}k / mo
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Total Property Price</span>
                        <span className="text-[#f4c414]">PKR {installmentTotalLac} Lac</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={600}
                        step={10}
                        value={installmentTotalLac}
                        onChange={(e) => setInstallmentTotalLac(Number(e.target.value))}
                        className="mt-2 w-full accent-[#f4c414]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-bold text-slate-300">Down Payment</p>
                        <div className="mt-1.5 grid grid-cols-2 gap-2">
                          {[20, 30].map((pct) => (
                            <button
                              key={pct}
                              type="button"
                              onClick={() => setDownPaymentPct(pct)}
                              className={`rounded-xl py-2 text-xs font-extrabold ${
                                downPaymentPct === pct
                                  ? "bg-[#f4c414] text-[#070b14]"
                                  : "border border-sky-300/20 bg-[#080f1d] text-white"
                              }`}
                            >
                              {pct}%
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-300">Duration</p>
                        <div className="mt-1.5 grid grid-cols-2 gap-2">
                          {[24, 36].map((mo) => (
                            <button
                              key={mo}
                              type="button"
                              onClick={() => setInstallmentMonths(mo)}
                              className={`rounded-xl py-2 text-xs font-extrabold ${
                                installmentMonths === mo
                                  ? "bg-[#f4c414] text-[#070b14]"
                                  : "border border-sky-300/20 bg-[#080f1d] text-white"
                              }`}
                            >
                              {mo} Mos
                            </button>
                          ))}
                        </div>
                      </div>
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
                  href="tel:+923364785098"
                  className="flex min-h-[156px] items-center gap-5 rounded-2xl bg-[#f4c414] px-7 py-7 text-[#070b14] shadow-[0_18px_45px_-12px_rgba(244,196,20,0.45)] transition duration-300 hover:-translate-y-1.5 hover:brightness-105"
                >
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#070b14] bg-[#070b14]/5">
                    <Phone className="h-6 w-6 text-[#070b14]" />
                  </div>
                  <div>
                    <h2 className="font-sans text-xl font-extrabold">Phone Number</h2>
                    <p className="mt-1.5 text-sm font-bold text-[#070b14]/95">
                      +92 336-4785098
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:info@aytoproperties.com"
                  className="flex min-h-[156px] items-center gap-5 rounded-2xl bg-[#f4c414] px-7 py-7 text-[#070b14] shadow-[0_18px_45px_-12px_rgba(244,196,20,0.45)] transition duration-300 hover:-translate-y-1.5 hover:brightness-105"
                >
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#070b14] bg-[#070b14]/5">
                    <Mail className="h-6 w-6 text-[#070b14]" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-sans text-xl font-extrabold">Email Address</h2>
                    <p className="mt-1.5 break-all text-xs font-bold text-[#070b14]/95 sm:text-sm">
                      info@aytoproperties.com
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
                        <span>Direct Helpline: +92 336-4785098</span>
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
                    {showSaved
                      ? "Your Saved Properties"
                      : "Discover the Most Recommended Properties"}
                  </h2>
                  <p className="mt-3 text-xs leading-relaxed text-slate-200/80 sm:text-sm">
                    Search, compare, and contact verified owners or AYTO advisors directly — no login required to browse.
                  </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="mt-10 rounded-2xl border border-sky-300/15 bg-[#0e172a]/85 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    {/* Search Input with Clear Button */}
                    <div className="relative w-full md:max-w-xs">
                      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search DHA, Bahria, Gulberg..."
                        className="w-full rounded-full border border-sky-300/20 bg-[#080f1d] py-2 pl-10 pr-9 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          aria-label="Clear search"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Purpose & Category Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <div
                        className="mr-1 inline-flex rounded-full border border-sky-300/20 bg-[#080f1d]/80 p-0.5"
                        role="group"
                        aria-label="Buy or rent"
                      >
                        {(
                          [
                            ["All", "All"],
                            ["Sale", "Buy"],
                            ["Rent", "Rent"],
                          ] as const
                        ).map(([v, l]) => (
                          <button
                            key={v}
                            type="button"
                            aria-pressed={purposeFilter === v}
                            onClick={() => setPurposeFilter(v)}
                            className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                              purposeFilter === v
                                ? "bg-white text-[#070b14]"
                                : "text-slate-200 hover:text-[#f4c414]"
                            }`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>

                      {["All", "House", "Villa", "Apartment", "Plot", "Commercial"].map(
                        (cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setTypeFilter(cat)}
                            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                              typeFilter === cat
                                ? "bg-[#f4c414] text-[#070b14] shadow-md"
                                : "border border-sky-300/20 bg-[#080f1d]/80 text-slate-200 hover:border-[#f4c414]"
                            }`}
                          >
                            {cat}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Active Filter Summary Bar */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-sky-300/10 pt-3 text-[11px] text-slate-400">
                    <span>
                      Showing{" "}
                      <strong className="text-white">{list.length}</strong>{" "}
                      {list.length === 1 ? "property" : "properties"}
                      {typeFilter !== "All" && (
                        <>
                          {" "}
                          in <strong className="text-[#f4c414]">{typeFilter}</strong>
                        </>
                      )}
                      {purposeFilter !== "All" && (
                        <>
                          {" "}
                          for{" "}
                          <strong className="text-[#f4c414]">
                            {purposeFilter === "Sale" ? "Buy" : "Rent"}
                          </strong>
                        </>
                      )}
                    </span>

                    {(searchQuery ||
                      typeFilter !== "All" ||
                      purposeFilter !== "All" ||
                      showSaved) && (
                      <button
                        type="button"
                        onClick={resetAllFilters}
                        className="font-bold text-[#f4d06f] hover:underline"
                      >
                        Reset All Filters
                      </button>
                    )}
                  </div>
                </div>

                {/* Property Cards Grid */}
                <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                  {(showAllListings ? list : list.slice(0, 12)).map((p) => {
                    const userPost = "ownerId" in p ? (p as UserPostedProperty) : null;
                    const beds = (p as { beds?: number }).beds;
                    const area =
                      userPost?.areaText ||
                      (p as { area?: string; size?: string }).area ||
                      (p as { size?: string }).size;
                    const displayPrice = userPost?.customPriceText || priceLabel(p);
                    const isCompared = compareIds.includes(p.id);

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
                            {displayPrice}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCompareProperty(p.id);
                            }}
                            title="Select to Compare"
                            className={`absolute right-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-bold transition ${
                              isCompared
                                ? "bg-[#f4c414] text-[#070b14]"
                                : "bg-[#070b14]/80 text-white/90 hover:bg-[#f4c414] hover:text-[#070b14]"
                            }`}
                          >
                            {isCompared ? "✓ Compare" : "+ Compare"}
                          </button>
                        </div>

                        <div className="mt-3 px-1 pb-1.5">
                          <h3 className="truncate text-xs font-bold text-white transition group-hover:text-[#f4d06f] sm:text-sm">
                            {p.location}
                          </h3>
                          <p className="truncate text-[11px] text-slate-300/75">
                            {p.title}
                          </p>

                          {(showBeds(p) || area) && (
                            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-300/80">
                              {showBeds(p) && (
                                <span className="inline-flex items-center gap-1">
                                  <BedDouble className="h-3.5 w-3.5 text-[#f4c414]" />{" "}
                                  {bedsLabel(beds ?? 0)}
                                </span>
                              )}
                              {area && (
                                <span className="inline-flex items-center gap-1">
                                  <Maximize2 className="h-3 w-3 text-[#f4c414]" />{" "}
                                  {area}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="mt-3 flex items-center justify-between gap-1.5 border-t border-sky-300/10 pt-2.5">
                            {userPost ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openUserProfile(
                                    userPost.ownerId,
                                    userPost.ownerName,
                                    userPost.ownerPhone,
                                  );
                                }}
                                title="View Seller Profile & All Listings"
                                className="inline-flex min-w-0 items-center gap-1 truncate text-[11px] font-bold text-[#f4d06f] hover:underline"
                              >
                                <User className="h-3 w-3 shrink-0" />
                                <span className="truncate">
                                  {userPost.ownerName}
                                </span>
                              </button>
                            ) : (
                              <span className="text-[11px] font-semibold text-[#f4d06f]">
                                AYTO Verified
                              </span>
                            )}

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

                {/* Show More / Less Button if > 12 properties */}
                {list.length > 12 && (
                  <div className="mt-10 text-center">
                    <button
                      type="button"
                      onClick={() => setShowAllListings((prev) => !prev)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#f4c414] bg-[#0e172a] px-6 py-2.5 text-xs font-extrabold text-[#f4c414] transition hover:bg-[#f4c414] hover:text-[#070b14]"
                    >
                      {showAllListings
                        ? "Show Less"
                        : `View All Properties (${list.length})`}
                    </button>
                  </div>
                )}

                {/* Empty State */}
                {list.length === 0 && (
                  <div className="mt-10 rounded-2xl border border-sky-300/15 bg-[#0e172a]/70 py-12 text-center">
                    <p className="text-sm font-medium text-slate-200">
                      No properties matched your filter.
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Try clearing your search or switching back to all categories.
                    </p>
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="mt-4 rounded-full bg-[#f4c414] px-6 py-2 text-xs font-extrabold text-[#070b14] shadow-md transition hover:brightness-105"
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

        <div className="border-t border-sky-300/10 bg-[#050912]/90 py-5 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 md:px-8">
            <p className="text-xs text-slate-300/70">
              Connect with{" "}
              <span className="font-semibold text-white">AYTO Properties &amp; Builders</span>
            </p>

            <div className="flex items-center gap-3.5">
              <a
                href="https://www.facebook.com/profile.php?id=61596721197006"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="AYTO Properties Official Facebook"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#1877F2] text-white shadow-md transition-transform duration-200 hover:scale-110"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3A21 21 0 0 0 14.6 2C12.3 2 10.7 3.4 10.7 6v2.5H8V12h2.7v10H14V12h2.7l.4-3.5H14Z" /></svg>
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
                className="grid h-10 w-10 place-items-center rounded-full bg-[#0f1419] text-white shadow-md transition-transform duration-200 hover:scale-110"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4Zm-1.2 17.9h1.9L7.1 4.2H5.1l11.9 16Z" /></svg>
              </a>

              <button
                type="button"
                onClick={() => openWhatsAppChat()}
                aria-label="WhatsApp"
                title="WhatsApp (+92 336-4785098)"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white shadow-md transition-transform duration-200 hover:scale-110"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {compareIds.length > 0 && (
        <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3 rounded-full border border-[#f4c414]/50 bg-[#0b1322]/95 px-4 py-2.5 text-xs shadow-2xl backdrop-blur-xl">
          <ArrowLeftRight className="h-4 w-4 text-[#f4c414]" />
          <span className="font-bold text-white">
            {compareIds.length}/2 Selected
          </span>
          <button
            type="button"
            onClick={() => setCompareModalOpen(true)}
            className="rounded-full bg-[#f4c414] px-3.5 py-1 text-xs font-extrabold text-[#070b14]"
          >
            Compare Now
          </button>
          <button
            type="button"
            onClick={() => setCompareIds([])}
            className="text-slate-400 hover:text-white"
            title="Clear Compare"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {compareModalOpen && (
        <div
          onClick={() => setCompareModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl border border-[#f4c414]/45 bg-[#0b1322] p-7 text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setCompareModalOpen(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-[#f4c414] hover:text-[#070b14]"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-sans text-2xl font-extrabold text-white">
              Property Side-by-Side Comparison
            </h2>

            {comparedItems.length < 2 ? (
              <p className="mt-4 text-xs text-slate-300">
                Please select 2 properties using the &ldquo;+ Compare&rdquo; badge on property cards.
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-4">
                {comparedItems.map((item) => {
                  const uPost = "ownerId" in item ? (item as UserPostedProperty) : null;
                  const price = uPost?.customPriceText || priceLabel(item);
                  const area =
                    uPost?.areaText ||
                    (item as { area?: string; size?: string }).area ||
                    (item as { size?: string }).size ||
                    "Standard";
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-sky-300/20 bg-[#080f1d] p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-36 w-full rounded-xl object-cover"
                      />
                      <h3 className="mt-3 text-sm font-bold text-white">{item.title}</h3>
                      <p className="mt-1 text-xs font-extrabold text-[#f4c414]">{price}</p>
                      <div className="mt-3 space-y-1.5 border-t border-sky-300/15 pt-2.5 text-xs text-slate-300">
                        <p>
                          <strong>Location:</strong> {item.location}
                        </p>
                        <p>
                          <strong>Area:</strong> {area}
                        </p>
                        <p>
                          <strong>Seller:</strong> {uPost ? uPost.ownerName : "AYTO Verified"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {authModalOpen && (
        <div
          onClick={() => setAuthModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-[#f4c414]/45 bg-[#0b1322] p-7 text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setAuthModalOpen(false)}
              aria-label="Close Auth Modal"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-[#f4c414] hover:text-[#070b14]"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4c414]/15 px-3 py-1 text-[11px] font-bold text-[#f4d06f]">
              <Lock className="h-3.5 w-3.5" /> AYTO Seller Account
            </span>
            <h2 className="mt-2 font-sans text-2xl font-extrabold text-white">
              {authTab === "login" ? "Login to Post Property" : "Create Seller Profile"}
            </h2>
            <p className="mt-1 text-xs text-slate-300/75">
              Browsing &amp; contacting is open to everyone. Login is required to create your profile and post listings.
            </p>

            <div className="mt-5 grid grid-cols-2 rounded-full border border-sky-300/20 bg-[#070b14] p-1">
              <button
                type="button"
                onClick={() => setAuthTab("login")}
                className={`rounded-full py-2 text-xs font-extrabold transition ${
                  authTab === "login"
                    ? "bg-[#f4c414] text-[#070b14]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setAuthTab("signup")}
                className={`rounded-full py-2 text-xs font-extrabold transition ${
                  authTab === "signup"
                    ? "bg-[#f4c414] text-[#070b14]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="mt-5 space-y-3.5">
              {authTab === "signup" && (
                <>
                  <input
                    type="text"
                    required
                    placeholder="Full Name*"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile / WhatsApp Number*"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Agency / Role (Optional, e.g., Owner / Dealer)"
                    value={authAgency}
                    onChange={(e) => setAuthAgency(e.target.value)}
                    className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                  />
                </>
              )}

              <input
                type="email"
                required
                placeholder="Email Address*"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
              />
              <input
                type="password"
                required
                placeholder="Password*"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
              />

              <button
                type="submit"
                className="w-full rounded-full bg-[#f4c414] py-3 text-xs font-extrabold text-[#070b14] shadow-lg transition hover:brightness-105"
              >
                {authTab === "login" ? "Login & Continue" : "Create Profile & Continue"}
              </button>
            </form>
          </div>
        </div>
      )}

      {postModalOpen && currentUser && (
        <div
          onClick={() => setPostModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl border border-[#f4c414]/40 bg-[#0b1322] p-7 text-white shadow-2xl"
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
              <UserCheck className="h-3.5 w-3.5" /> Posting as {currentUser.name}
            </span>
            <h2 className="mt-2 font-sans text-2xl font-extrabold text-white">
              Post New Property
            </h2>

            <form onSubmit={handleCreatePropertyListing} className="mt-5 space-y-3.5">
              <input
                type="text"
                required
                placeholder="Property Title (e.g., 10 Marla Brand New Designer House)*"
                value={propTitle}
                onChange={(e) => setPropTitle(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={propCategory}
                  onChange={(e) => setPropCategory(e.target.value)}
                  className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-3 py-3 text-xs text-white focus:border-[#f4c414] focus:outline-none"
                >
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Apartment">Apartment</option>
                </select>

                <input
                  type="text"
                  required
                  placeholder="Area (e.g., 10 Marla / 1 Kanal)"
                  value={propArea}
                  onChange={(e) => setPropArea(e.target.value)}
                  className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                />
              </div>

              <input
                type="text"
                required
                placeholder="Location (e.g., DHA Phase 6, Lahore)*"
                value={propLocation}
                onChange={(e) => setPropLocation(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Demand (e.g., PKR 4.5 Crore)*"
                  value={propDemand}
                  onChange={(e) => setPropDemand(e.target.value)}
                  className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                />
                <input
                  type="number"
                  min="0"
                  max="15"
                  placeholder="Bedrooms (e.g., 5)"
                  value={propBeds}
                  onChange={(e) => setPropBeds(e.target.value)}
                  className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:border-[#f4c414] focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-dashed border-[#f4c414]/45 bg-[#070b14] p-3.5 text-center">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#f4c414]/15 px-4 py-2 text-xs font-bold text-[#f4d06f] transition hover:bg-[#f4c414] hover:text-[#070b14]">
                  <ImagePlus className="h-4 w-4" />
                  <span>Upload Photo From Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {propImageUrl && (
                  <img
                    src={propImageUrl}
                    alt="Preview"
                    className="mx-auto mt-3 h-28 w-full rounded-lg object-cover"
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#f4c414] py-3 text-xs font-extrabold text-[#070b14] shadow-lg transition hover:brightness-105"
              >
                Publish Property To My Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {editProfileOpen && currentUser && (
        <div
          onClick={() => setEditProfileOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-[#f4c414]/40 bg-[#0b1322] p-7 text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setEditProfileOpen(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-[#f4c414] hover:text-[#070b14]"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-sans text-2xl font-extrabold text-white">Edit Profile</h2>
            <form onSubmit={handleSaveProfileChanges} className="mt-5 space-y-3.5">
              <input
                type="text"
                required
                placeholder="Full Name*"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white focus:border-[#f4c414] focus:outline-none"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number*"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white focus:border-[#f4c414] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Agency / Role"
                value={editAgency}
                onChange={(e) => setEditAgency(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white focus:border-[#f4c414] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-[#f4c414] py-3 text-xs font-extrabold text-[#070b14]"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {editingListing && (
        <div
          onClick={() => setEditingListing(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-[#f4c414]/40 bg-[#0b1322] p-7 text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setEditingListing(null)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-[#f4c414] hover:text-[#070b14]"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-sans text-2xl font-extrabold text-white">Edit Property Listing</h2>
            <form onSubmit={handleSaveListingEdit} className="mt-5 space-y-3.5">
              <input
                type="text"
                required
                placeholder="Property Title*"
                value={editPropTitle}
                onChange={(e) => setEditPropTitle(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white focus:border-[#f4c414] focus:outline-none"
              />
              <input
                type="text"
                required
                placeholder="Location*"
                value={editPropLocation}
                onChange={(e) => setEditPropLocation(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white focus:border-[#f4c414] focus:outline-none"
              />
              <input
                type="text"
                required
                placeholder="Demand*"
                value={editPropDemand}
                onChange={(e) => setEditPropDemand(e.target.value)}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white focus:border-[#f4c414] focus:outline-none"
              />
              <select
                value={editPropStatus}
                onChange={(e) => setEditPropStatus(e.target.value as "Available" | "Sold")}
                className="w-full rounded-xl border border-sky-300/20 bg-[#070b14] px-4 py-3 text-xs text-white focus:border-[#f4c414] focus:outline-none"
              >
                <option value="Available">Status: Available</option>
                <option value="Sold">Status: Sold</option>
              </select>
              <button
                type="submit"
                className="w-full rounded-full bg-[#f4c414] py-3 text-xs font-extrabold text-[#070b14]"
              >
                Update Property
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => openWhatsAppChat()}
        aria-label="WhatsApp"
        title="WhatsApp (+92 336-4785098)"
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
