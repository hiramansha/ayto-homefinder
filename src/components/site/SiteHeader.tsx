import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import logo from "@/assets/ayto-logo.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollToId } from "./utils";

const links = [
  { id: "listings", label: "Properties" },
  { id: "services", label: "Services" },
  { id: "emi", label: "EMI Calculator" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

export function SiteHeader({ savedCount, onShowSaved }: { savedCount: number; onShowSaved: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
  const solid = scrolled || open;

  return (
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
        <nav className="border-t border-forest-foreground/10 bg-forest-deep px-5 pb-6 lg:hidden">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="block w-full border-b border-forest-foreground/10 py-4 text-left text-forest-foreground">
              {l.label}
            </button>
          ))}
          <Button variant="gold" size="lg" className="mt-5 w-full" onClick={() => go("contact")}>
            Book a consultation
          </Button>
        </nav>
      )}
    </header>
  );
}
