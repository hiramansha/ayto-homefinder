import logo from "@/assets/ayto-logo.jpg";
import { scrollToId } from "./utils";

export function SiteFooter({ onType }: { onType: (t: string) => void }) {
  const link = "block py-1 text-left text-sm text-forest-muted transition-colors hover:text-gold-soft";
  const socialBtn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold-soft transition-colors hover:border-gold hover:bg-gold hover:text-forest-deep";

  return (
    <footer className="bg-forest-deep text-forest-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr_1.2fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" loading="lazy" className="h-12 w-12 rounded-full border border-gold/60 object-cover object-[50%_25%]" />
            <span className="font-display text-2xl font-bold tracking-[0.18em] text-gold-soft">AYTO</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-forest-muted">
            Smart Property Solution. Buying, selling, renting and managing property across Lahore with clear prices and honest advice.
          </p>

          {/* Social Media Links */}
          <div className="mt-6 flex items-center gap-3">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/aytoproperties"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AYTO Properties Facebook"
              title="AYTO Properties on Facebook"
              className={socialBtn}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.5v3.2h2.7V22h3.3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/aytoproperties"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AYTO Properties Instagram"
              title="AYTO Properties on Instagram"
              className={socialBtn}
            >
              <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/923314972426?text=Hello%20AYTO%20Properties,%20I%20would%20like%20to%20inquire%20about%20a%20property%20in%20Lahore."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AYTO Properties WhatsApp"
              title="Chat with AYTO Properties on WhatsApp"
              className={socialBtn}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.24.68-1.41 1.3-1.96 1.38-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.98-1.29-4.92-4.29-5.07-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.59.83 2.03.9 2.18.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.12.65-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.12.07.72-.17 1.4z" />
              </svg>
            </a>
          </div>
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
            <p>AYTO Properties, Lahore</p>
            <p>
              <a href="https://wa.me/923314972426" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-soft">
                0331-4972426
              </a>
            </p>
            <p>info2aytoproperties@gmail.com</p>
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
