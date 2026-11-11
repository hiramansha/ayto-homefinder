import logo from "@/assets/ayto-logo.jpg";
import { scrollToId } from "./utils";

export function SiteFooter({ onType }: { onType: (t: string) => void }) {
  const link = "block py-1 text-left text-sm text-forest-muted transition-colors hover:text-gold-soft";
  return (
    <footer className="bg-forest-deep text-forest-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr_1.2fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" loading="lazy" className="h-12 w-12 rounded-full border border-gold/60 object-cover object-[50%_25%]" />
            <span className="font-display text-2xl font-bold tracking-[0.18em] text-gold-soft">AYTO</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-forest-muted">
            Smart Property Solution. Buying, selling, renting and managing property across Pakistan with clear prices and honest advice.
          </p>
        </div>
        <div>
          <h4 className="eyebrow text-gold-soft">Explore</h4>
          <div className="mt-4">
            {([["listings", "Properties"], ["services", "Services"], ["emi", "EMI calculator"], ["contact", "Contact"]] as const).map(([id, l]) => (
              <button key={id} className={link} onClick={() => scrollToId(id)}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="eyebrow text-gold-soft">Property types</h4>
          <div className="mt-4">
            {["House", "Apartment", "Plot", "Commercial"].map((t) => (
              <button key={t} className={link} onClick={() => onType(t)}>
                {t}s
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="eyebrow text-gold-soft">Contact</h4>
          <div className="mt-4 space-y-2 text-sm text-forest-muted">
            <p>AYTO Properties, Pakistan</p>
            <p>info@aytoproperties.com</p>
            <p>Mon–Sat, 10am to 7pm</p>
          </div>
        </div>
      </div>
      <div className="border-t border-forest-foreground/10 py-6 text-center text-xs text-forest-muted">
        © {new Date().getFullYear()} AYTO Properties. All rights reserved.
      </div>
    </footer>
  );
}
