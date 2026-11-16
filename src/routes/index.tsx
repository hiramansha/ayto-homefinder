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
  ownerAgency?: string;
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

  // User Auth, Profiles & User-Posted Listings State
  const [users, setUsers] = useState<AytoUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AytoUser | null>(null);
  const [userListings, setUserListings] = useState<UserPostedProperty[]>([]);
  const [viewedProfileUser, setViewedProfileUser] = useState<AytoUser | null>(null);

  // Auth Modal
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [openPostAfterAuth, setOpenPostAfterAuth] = useState(false);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authAgency, setAuthAgency] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  // Edit Profile Modal State
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAgency, setEditAgency] = useState("");

  // Edit Listing Modal State
  const [editingListing, setEditingListing] = useState<UserPostedProperty | null>(null);
  const [editPropTitle, setEditPropTitle] = useState("");
  const [editPropDemand, setEditPropDemand] = useState("");
  const [editPropLocation, setEditPropLocation] = useState("");
  const [editPropStatus, setEditPropStatus] = useState<"Available" | "Sold">("Available");

  // Projects Dropdown State
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);

  // Public Property Search, Category Filter & Property Compare
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Post Property Modal State (Only accessible when logged in)
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [propTitle, setPropTitle] = useState("");
  const [propCategory, setPropCategory] = useState("House");
  const [propLocation, setPropLocation] = useState("DHA Phase 6, Lahore");
  const [propArea, setPropArea] = useState("10 Marla");
  const [propBeds, setPropBeds] = useState("5");
  const [propDemand, setPropDemand] = useState("");
  const [propImageUrl, setPropImageUrl] = useState("");

  // Construction & Installment Calculators State
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
        phone: fallbackPhone || "+92 331-4972426",
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
      image:
        propImageUrl.trim() ||
        propertySampleImages[propCategory] ||
        propertySampleImages.House!,
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
    const phone = "923314972426";
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

  const comparedItems = combinedProperties.filter((p) => compareIds.includes(p.id));

  // Construction Cost Estimator Calculation
  const coveredAreaSqFt = plotMarla === 5 ? 1950 : plotMarla === 10 ? 3600 : 6200;
  const ratePerSqFt = buildQuality === "grey" ? 2750 : 5400;
  const estimatedCrore = ((coveredAreaSqFt * ratePerSqFt) / 10000000).toFixed(2);

  // Installment Plan Calculation
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

        {/* Sleek Account & Profile Status Pill */}
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

        {/* Floating Projects Dropdown Menu */}
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

        {activePage === "user-profile" && viewedProfileUser ? (
          <main key="user-profile" className="ayto-page-enter relative isolate overflow-hidden pt-32 text-white">
            <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
              <button
                type="button"
                onClick={() => navigatePage("home", "listings")}
                className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/25 bg-[#0f192d]/80 px-4 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md transition hover:border-[#f4d06f] hover:text-[#f4d06f]"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to All Properties
              </button>

              {/* User Profile Header Card */}
              <div className="mt-6 flex flex-col justify-between gap-6 rounded-3xl border border-[#f4c414]/35 bg-[#0e172a]/90 p-7 shadow-2xl backdrop-blur-md md:flex-row md:items-center sm:p-9">
                <div className="flex items-center gap-5">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-[#f4c414] bg-[#f4c414]/15 font-sans text-3xl font-extrabold text-[#f4c414]">
                    {viewedProfileUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="font-sans text-2xl font-extrabold text-white sm:text-3xl">
                        {viewedProfileUser.name}
                      </h1>
                      <span className="rounded-full bg-[#f4c414] px-3 py-0.5 text-[10px] font-extrabold uppercase text-[#070b14]">
                        {viewedProfileUser.agency || "Verified Seller"}
                      </span>
                    </div>
                    <p className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-[#f4c414]" /> {viewedProfileUser.phone}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-[#f4c414]" /> {viewedProfileUser.email}
                      </span>
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Member since {viewedProfileUser.joinedAt} • {profileListings.length} Active{" "}
                      {profileListings.length === 1 ? "Listing" : "Listings"}
                    </p>
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
                        className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/30 bg-[#080f1d] px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#f4c414] hover:text-[#f4c414]"
