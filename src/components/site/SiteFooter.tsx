import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import logo from "@/assets/ayto-logo.jpg";
import { scrollToId } from "./utils";

export function SiteFooter({
  onType,
  onOpenQuery,
}: {
  onType?: (t: string) => void;
  onOpenQuery?: () => void;
}) {
  const go = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    scrollToId(id);
  };

  return (
    <footer id="offices" className="border-t border-white/10 bg-[#0a0a0a] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.15fr_1fr_0.75fr_1.1fr] md:px-8">
        <div>
          <button
            type="button"
            onClick={() => go("top")}
            className="flex items-center gap-3 text-left"
          >
            <img
              src={logo}
              alt="AYTO Properties"
              className="h-14 w-14 rounded-full border border-[#f4d06f]/70 object-cover object-[50%_25%]"
            />
            <div>
              <span className="block font-display text-xl font-bold tracking-[0.2em] text-[#f4d06f]">
                AYTO
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-white/70">
                Properties & Builders
              </span>
            </div>
          </button>

          <p className="mt-5 max-w-xs text-xs leading-relaxed text-white/75 sm:text-sm">
            At AYTO Properties & Builders, our vision is simple: to offer transparent guidance,
            innovative solutions, and real estate opportunities across Lahore that create lasting
            value.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-white">Get In Touch</h3>
          <ul className="mt-5 space-y-4 text-xs text-white/80 sm:text-sm">
            <li className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/30 text-white">
                <MapPin className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="font-semibold text-white">Our Address</p>
                <p className="text-xs text-white/65">Main Boulevard, DHA Phase 6 / Phase 8, Lahore</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/30 text-white">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="font-semibold text-white">Phone Number</p>
                <a
                  href="https://wa.me/923314972426"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/65 transition hover:text-[#f4d06f]"
                >
                  +92 331-4972426
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/30 text-white">
                <Mail className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="font-semibold text-white">Email Address</p>
                <p className="text-xs text-white/65">info2aytoproperties@gmail.com</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-white">Useful Links</h3>
          <ul className="mt-5 space-y-3 text-xs sm:text-sm">
            <li>
              <button
                type="button"
                onClick={() => go("top")}
                className="font-medium text-[#f4d06f] transition hover:text-white"
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => go("about")}
                className="text-white/75 transition hover:text-[#f4d06f]"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => go("listings")}
                className="text-white/75 transition hover:text-[#f4d06f]"
              >
                Properties
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  if (onOpenQuery) onOpenQuery();
                  else go("contact");
                }}
                className="text-white/75 transition hover:text-[#f4d06f]"
              >
                Request A Visit
              </button>
            </li>
          </ul>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/15 bg-white shadow-lg">
          <iframe
            title="AYTO Properties Lahore Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=74.3800%2C31.4550%2C74.4750%2C31.5050&layer=mapnik&marker=31.4785%2C74.4320"
            className="h-52 w-full border-0"
            loading="lazy"
          />
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-xs text-white/55 sm:flex-row md:px-8">
          <p>© 2026 AYTO Properties & Builders. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923314972426"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#0a0a0a] transition hover:bg-[#f4d06f]"
            >
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://wa.me/923314972426"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#0a0a0a] transition hover:bg-[#f4d06f]"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://wa.me/923314972426"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#0a0a0a] transition hover:bg-[#f4d06f]"
            >
              <Youtube className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
