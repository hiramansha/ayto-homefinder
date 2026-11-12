import { useEffect, useState } from "react";
import { ChevronDown, Heart, Menu, PlusCircle, X } from "lucide-react";
import logo from "@/assets/ayto-logo.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollToId } from "./utils";

const PROPERTY_TYPES = ["House", "Apartment", "Plot", "Commercial"];
const LOCATIONS = [
  "DHA Phase 5",
  "DHA Phase 6",
  "DHA Phase 8",
  "Gulberg III",
  "Johar Town",
  "Model Town",
  "Bahria Orchard",
  "Lake City",
  "Askari 11",
  "MM Alam Road",
];
const FEATURES_LIST = [
  "Parking",
  "Garden",
  "Security",
  "Lift",
  "Swimming pool",
  "Corner",
  "Furnished",
  "Servant quarter",
];

export function SiteHeader({ savedCount, onShowSaved }: { savedCount: number; onShowSaved: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    purpose: "Sale",
    type: "House",
    city: "Lahore",
    location: LOCATIONS[0],
    crore: "",
    area: "",
    features: [] as string[],
    contactName: "",
    contactPhone: "",
  });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    setProjectsOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    scrollToId(id);
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your property listing request has been submitted successfully. The AYTO team will verify it shortly before publishing.");
    setShowPostModal(false);
  };

  const solid = scrolled || open;
  const navLink =
    "relative text-xs font-medium tracking-wide text-white/85 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[#f4d06f] after:transition-all hover:text-[#f4d06f] hover:after:w-full xl:text-[13px]";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid ? "border-b border-white/10 bg-[#141414]/95 shadow-luxe backdrop-blur-md" : "bg-gradient-to-b from-[#141414]/90 to-transparent",
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
          <button onClick={() => go("top")} className="flex items-center gap-3 text-left" aria-label="AYTO Properties home">
            <img src={logo} alt="AYTO Properties logo" width={46} height={46} className="h-11 w-11 rounded-full border border-[#f4d06f]/70 object-cover object-[50%_25%]" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold tracking-[0.18em] text-[#f4d06f] sm:text-2xl">AYTO</span>
              <span className="mt-1 text-[0.52rem] font-semibold tracking-[0.45em] text-white/75">PROPERTIES</span>
            </span>
          </button>

          {/* Exact Navigation Links */}
          <nav className="hidden items-center gap-5 xl:gap-6 lg:flex">
            <button type="button" onClick={() => go("top")} className={navLink}>
              Home
            </button>
            <button type="button" onClick={() => go("about")} className={navLink}>
              About Us
            </button>
            <button type="button" onClick={() => go("offices")} className={navLink}>
              Our Offices
            </button>

            {/* Projects Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProjectsOpen(true)}
              onMouseLeave={() => setProjectsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProjectsOpen((p) => !p)}
                className={cn(navLink, "inline-flex items-center gap-1 py-2")}
              >
                Projects
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", projectsOpen && "rotate-180")} />
              </button>

              {projectsOpen && (
                <div className="absolute left-0 top-full w-60 rounded-2xl border border-white/15 bg-[#191919] p-2 shadow-2xl backdrop-blur-xl">
                  <button
                    type="button"
                    onClick={() => go("spotlight")}
                    className="block w-full rounded-xl px-3.5 py-2.5 text-left text-xs font-medium text-white/85 transition hover:bg-white/10 hover:text-[#f4d06f]"
                  >
                    Current Running Project
                  </button>
                  <button
                    type="button"
                    onClick={() => go("listings")}
                    className="block w-full rounded-xl px-3.5 py-2.5 text-left text-xs font-medium text-white/85 transition hover:bg-white/10 hover:text-[#f4d06f]"
                  >
                    Recommended Properties
                  </button>
                  <button
                    type="button"
                    onClick={() => go("emi")}
                    className="block w-full rounded-xl px-3.5 py-2.5 text-left text-xs font-medium text-white/85 transition hover:bg-white/10 hover:text-[#f4d06f]"
                  >
                    Cost & EMI Calculator
                  </button>
                </div>
              )}
            </div>

            <button type="button" onClick={() => go("services")} className={navLink}>
              Services
            </button>
            <button type="button" onClick={() => go("listings")} className={navLink}>
              Gallery
            </button>
            <button type="button" onClick={() => go("contact")} className={navLink}>
              Contact Us
            </button>
          </nav>

          {/* Right Actions: Post Property + Saved + Get a Quote */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowPostModal(true)}
              className="hidden items-center gap-1.5 rounded-full border border-[#f4d06f]/45 bg-white/5 px-3.5 py-2 text-xs font-semibold text-[#f4d06f] transition hover:border-[#f4d06f] hover:bg-[#f4d06f]/15 sm:inline-flex"
            >
              <PlusCircle className="h-3.5 w-3.5" /> Post Property
            </button>

            <button
              onClick={onShowSaved}
              aria-label="Saved properties"
              className="relative grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-[#f4d06f] hover:text-[#f4d06f]"
            >
              <Heart className="h-4 w-4" />
              {savedCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#f4d06f] px-1 text-[0.65rem] font-bold text-[#141414]">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => go("contact")}
              className="hidden rounded-full bg-[#f4d06f] px-5 py-2.5 text-xs font-bold tracking-wide text-[#141414] shadow-[0_8px_22px_-6px_rgba(244,208,111,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white md:inline-flex"
            >
              Get a Quote
            </button>

            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <nav className="space-y-2 border-t border-white/10 bg-[#141414] px-5 pb-6 pt-3 lg:hidden">
            {[
              ["top", "Home"],
              ["about", "About Us"],
              ["offices", "Our Offices"],
              ["spotlight", "Projects"],
              ["services", "Services"],
              ["listings", "Gallery"],
              ["contact", "Contact Us"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="block w-full border-b border-white/10 py-2.5 text-left text-sm text-white/90 hover:text-[#f4d06f]"
              >
                {label}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-2.5 pt-3">
              <Button
                variant="outline"
                size="lg"
                className="border-[#f4d06f]/50 bg-transparent text-[#f4d06f]"
                onClick={() => { setOpen(false); setShowPostModal(true); }}
              >
                <PlusCircle className="mr-1.5 h-4 w-4" /> Post Property
              </Button>
              <button
                type="button"
                onClick={() => go("contact")}
                className="rounded-full bg-[#f4d06f] text-xs font-bold text-[#141414]"
              >
                Get a Quote
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Post Property Modal Popup */}
      {showPostModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative my-8 w-full max-w-xl rounded-2xl border border-[#f4d06f]/40 bg-[#191919] p-6 text-white shadow-2xl">
            <button
              onClick={() => setShowPostModal(false)}
              className="absolute right-4 top-4 text-white/60 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="mb-1 text-2xl font-bold text-[#f4d06f]">Post Your Property</h2>
            <p className="mb-4 text-xs text-white/70">Add your listing with existing website choices</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="mb-1 block text-xs font-semibold">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10 Marla Luxury House in DHA Phase 6"
                  className="w-full rounded-md border border-white/20 bg-white/5 p-2.5 text-white placeholder-white/40 focus:border-[#f4d06f] focus:outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold">Purpose</label>
                  <select
                    className="w-full rounded-md border border-white/20 bg-[#141414] p-2.5 text-white focus:border-[#f4d06f] focus:outline-none"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  >
                    <option value="Sale">For Sale</option>
                    <option value="Rent">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Property Type</label>
                  <select
                    className="w-full rounded-md border border-white/20 bg-[#141414] p-2.5 text-white focus:border-[#f4d06f] focus:outline-none"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold">City</label>
                  <input
                    type="text"
                    disabled
                    value="Lahore"
                    className="w-full cursor-not-allowed rounded-md border border-white/10 bg-white/5 p-2.5 text-white/60"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Location / Area</label>
                  <select
                    className="w-full rounded-md border border-white/20 bg-[#141414] p-2.5 text-white focus:border-[#f4d06f] focus:outline-none"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold">Price (PKR Crore / Rent)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 5.5"
                    className="w-full rounded-md border border-white/20 bg-white/5 p-2.5 text-white placeholder-white/40 focus:border-[#f4d06f] focus:outline-none"
                    value={formData.crore}
                    onChange={(e) => setFormData({ ...formData, crore: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Area Size</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 Marla / 1 Kanal"
                    className="w-full rounded-md border border-white/20 bg-white/5 p-2.5 text-white placeholder-white/40 focus:border-[#f4d06f] focus:outline-none"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">Features / Amenities</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {FEATURES_LIST.map((feat) => (
                    <label key={feat} className="flex cursor-pointer items-center gap-1.5 text-xs text-white/80">
                      <input
                        type="checkbox"
                        className="rounded border-[#f4d06f]/40 text-[#f4d06f] focus:ring-[#f4d06f]"
                        checked={formData.features.includes(feat)}
                        onChange={() => handleFeatureToggle(feat)}
                      />
                      {feat}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full rounded-md border border-white/20 bg-white/5 p-2.5 text-white placeholder-white/40 focus:border-[#f4d06f] focus:outline-none"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="03XX XXXXXXX"
                    className="w-full rounded-md border border-white/20 bg-white/5 p-2.5 text-white placeholder-white/40 focus:border-[#f4d06f] focus:outline-none"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 h-11 w-full rounded-full bg-[#f4d06f] text-sm font-bold text-[#141414] transition hover:bg-white"
              >
                Submit Listing Request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
