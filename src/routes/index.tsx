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
        toast.error("Invalid email or password. If you're new, click Sign Up.");
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
                      >
                        <Edit3 className="h-3.5 w-3.5" /> Edit Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => setPostModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#f4c414] px-5 py-2.5 text-xs font-extrabold text-[#070b14] shadow-lg transition hover:brightness-105"
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
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-extrabold text-white shadow-lg transition hover:brightness-105"
                    >
                      <MessageCircle className="h-4 w-4" /> Contact Seller
                    </button>
                  )}
                </div>
              </div>

              {/* All Listings Posted by This User */}
              <div className="mt-12">
                <h2 className="font-sans text-xl font-bold text-white sm:text-2xl">
                  Properties Listed by {viewedProfileUser.name} ({profileListings.length})
                </h2>

                {profileListings.length === 0 ? (
                  <div className="mt-6 rounded-3xl border border-sky-300/15 bg-[#0e172a]/70 p-12 text-center">
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
                        className="group cursor-pointer rounded-2xl border border-sky-300/15 bg-[#0e172a]/85 p-3 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-[#f4d06f]/50"
                      >
                        <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-[#131f36]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <span className="absolute left-3 top-3 rounded-full bg-[#070b14]/85 px-3 py-1 text-xs font-extrabold text-[#f4c414]">
                            {item.customPriceText}
                          </span>
                          <span
                            className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                              item.listingStatus === "Sold"
                                ? "bg-red-500 text-white"
                                : "bg-emerald-500 text-[#070b14]"
                            }`}
                          >
                            {item.listingStatus || "Available"}
                          </span>
                        </div>

                        <div className="mt-3.5 px-1">
                          <h3 className="truncate text-base font-bold text-white group-hover:text-[#f4d06f]">
                            {item.title}
                          </h3>
                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-300/80">
                            <MapPin className="h-3.5 w-3.5 text-[#f4c414]" /> {item.location}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-400">Size: {item.areaText}</p>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-sky-300/15 pt-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpen(item);
                              }}
                              className="rounded-full bg-[#f4c414] px-3.5 py-1.5 text-xs font-extrabold text-[#070b14]"
                            >
                              Details
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
                                  className="inline-flex items-center gap-1 rounded-full border border-sky-300/35 px-3 py-1.5 text-[11px] font-bold text-white transition hover:border-[#f4c414] hover:text-[#f4c414]"
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
                                  className="inline-flex items-center gap-1 rounded-full border border-red-400/40 px-3 py-1.5 text-[11px] font-bold text-red-300 transition hover:bg-red-500/20"
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
              {/* Dual Calculators Grid: Turnkey Construction + Installment Plan */}
              <div className="mb-16 grid gap-8 lg:grid-cols-2">
                {/* 1. Construction Cost Calculator */}
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

                {/* 2. Plot / High-Rise Installment & ROI Calculator */}
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
