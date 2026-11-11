import { useEffect, useState } from "react";
import { Heart, Menu, X, PlusCircle } from "lucide-react";
import logo from "@/assets/ayto-logo.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollToId } from "./utils";

const links = [
  { id: "listings", label: "Properties" },
  { id: "ads", label: "Offers" },
  { id: "services", label: "Services" },
  { id: "emi", label: "EMI Calculator" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid ? "bg-forest-deep/95 shadow-luxe backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <button onClick={() => go("top")} className="flex items-center gap-3 text-left" aria-label="AYTO Properties home">
            <img src={logo} alt="AYTO Properties logo" width={48} height={48} className="h-12 w-12 rounded-full border border-gold/60 object-cover object-[50%_25%]" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl font-bold tracking-[0.18em] text-gold-soft">AYTO</span>
              <span className="mt-1 text-[0.55rem] font-semibold tracking-[0.5em] text-forest-foreground/80">PROPERTIES</span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="relative text-sm font-medium text-forest-foreground/85 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:text-forest-foreground hover:after:w-full"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Post Property Button */}
            <Button
              variant="outline"
              size="lg"
              className="hidden sm:inline-flex border-gold/50 text-gold-soft hover:bg-gold hover:text-forest-deep"
              onClick={() => setShowPostModal(true)}
            >
              <PlusCircle className="mr-1.5 h-4 w-4" /> Post Property
            </Button>

            <button
              onClick={onShowSaved}
              aria-label="Saved properties"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-forest-foreground/25 text-forest-foreground transition-colors hover:border-gold hover:text-gold-soft"
            >
              <Heart className="h-4 w-4" />
              {savedCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-forest-deep">
                  {savedCount}
                </span>
              )}
            </button>
            <Button variant="gold" size="lg" className="hidden md:inline-flex" onClick={() => go("contact")}>
              Book a consultation
            </Button>
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-forest-foreground/25 text-forest-foreground lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-forest-foreground/10 bg-forest-deep px-5 pb-6 lg:hidden space-y-3">
            {links.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="block w-full border-b border-forest-foreground/10 py-3 text-left text-forest-foreground">
                {l.label}
              </button>
            ))}
            <Button
              variant="outline"
              size="lg"
              className="w-full border-gold text-gold-soft"
              onClick={() => { setOpen(false); setShowPostModal(true); }}
            >
              <PlusCircle className="mr-1.5 h-4 w-4" /> Post Property
            </Button>
            <Button variant="gold" size="lg" className="w-full" onClick={() => go("contact")}>
              Book a consultation
            </Button>
          </nav>
        )}
      </header>

      {/* Post Property Modal Popup */}
      {showPostModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl bg-forest-deep border border-gold/40 p-6 shadow-2xl text-forest-foreground my-8">
            <button
              onClick={() => setShowPostModal(false)}
              className="absolute right-4 top-4 text-forest-foreground/60 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-gold-soft mb-1">Post Your Property</h2>
            <p className="text-xs text-forest-foreground/70 mb-4">Add your listing with existing website choices</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10 Marla Luxury House in DHA Phase 6"
                  className="w-full rounded-md border border-forest-foreground/20 bg-forest-deep/50 p-2.5 text-white placeholder-forest-foreground/40 focus:border-gold focus:outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Purpose</label>
                  <select
                    className="w-full rounded-md border border-forest-foreground/20 bg-forest-deep p-2.5 text-white focus:border-gold focus:outline-none"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  >
                    <option value="Sale">For Sale</option>
                    <option value="Rent">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Property Type</label>
                  <select
                    className="w-full rounded-md border border-forest-foreground/20 bg-forest-deep p-2.5 text-white focus:border-gold focus:outline-none"
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
                  <label className="block text-xs font-semibold mb-1">City</label>
                  <input
                    type="text"
                    disabled
                    value="Lahore"
                    className="w-full rounded-md border border-forest-foreground/10 bg-forest-deep/80 p-2.5 text-forest-foreground/60 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Location / Area</label>
                  <select
                    className="w-full rounded-md border border-forest-foreground/20 bg-forest-deep p-2.5 text-white focus:border-gold focus:outline-none"
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
                  <label className="block text-xs font-semibold mb-1">Price (PKR Crore / Rent)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 5.5"
                    className="w-full rounded-md border border-forest-foreground/20 bg-forest-deep/50 p-2.5 text-white placeholder-forest-foreground/40 focus:border-gold focus:outline-none"
                    value={formData.crore}
                    onChange={(e) => setFormData({ ...formData, crore: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Area Size</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 Marla / 1 Kanal"
                    className="w-full rounded-md border border-forest-foreground/20 bg-forest-deep/50 p-2.5 text-white placeholder-forest-foreground/40 focus:border-gold focus:outline-none"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2">Features / Amenities</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {FEATURES_LIST.map((feat) => (
                    <label key={feat} className="flex items-center gap-1.5 text-xs text-forest-foreground/80 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gold/40 text-gold focus:ring-gold"
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
                  <label className="block text-xs font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full rounded-md border border-forest-foreground/20 bg-forest-deep/50 p-2.5 text-white placeholder-forest-foreground/40 focus:border-gold focus:outline-none"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="03XX XXXXXXX"
                    className="w-full rounded-md border border-forest-foreground/20 bg-forest-deep/50 p-2.5 text-white placeholder-forest-foreground/40 focus:border-gold focus:outline-none"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full mt-4">
                Submit Listing Request
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
