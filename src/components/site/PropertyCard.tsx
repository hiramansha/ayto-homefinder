import { Bath, BedDouble, Heart, MapPin, Phone, Ruler } from "lucide-react";
import type { Property } from "@/data/properties";
import { priceLabel } from "@/lib/property-math";
import { cn } from "@/lib/utils";

export function PropertyCard({
  p,
  saved,
  onToggleSave,
  onOpen,
}: {
  p: Property;
  saved: boolean;
  onToggleSave: () => void;
  onOpen: () => void;
}) {
  const whatsappText = encodeURIComponent(
    `Assalam-o-Alaikum AYTO Properties, I am interested in "${p.title}" (${p.location}, ${p.city}) listed for ${priceLabel(p)}.`
  );

  return (
    <article
      onClick={onOpen}
      className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-border bg-card transition duration-300 hover:-translate-y-1.5 hover:shadow-luxe"
    >
      <div>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            width={1200}
            height={900}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-md bg-forest-deep/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-gold-soft backdrop-blur">
            For {p.purpose}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            aria-label={saved ? "Remove from saved" : "Save property"}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-forest-deep/60 text-forest-foreground backdrop-blur transition hover:scale-110"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-destructive text-destructive")} />
          </button>
          <div className="absolute inset-x-0 bottom-0 bg-card-fade px-5 pb-4 pt-14">
            <p className="font-display text-2xl font-bold text-gold-soft">{priceLabel(p)}</p>
          </div>
        </div>

        <div className="p-5 pb-4">
          <h3 className="text-2xl font-semibold text-foreground">{p.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-gold" /> {p.location}, {p.city}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{p.type}</span>
            {p.beds > 0 && (
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4" /> {p.beds} {p.beds === 1 ? "bed" : "beds"}
              </span>
            )}
            {p.baths > 0 && (
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" /> {p.baths} {p.baths === 1 ? "bath" : "baths"}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Ruler className="h-4 w-4" /> {p.area}
            </span>
          </div>
        </div>
      </div>

      {/* Direct WhatsApp & Call Action Bar */}
      <div className="grid grid-cols-2 gap-2.5 px-5 pb-5 pt-1" onClick={(e) => e.stopPropagation()}>
        <a
          href={`https://wa.me/923314972426?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-forest-deep py-2.5 text-xs font-semibold tracking-wide text-gold-soft transition hover:bg-forest-deep/90"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.24.68-1.41 1.3-1.96 1.38-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.98-1.29-4.92-4.29-5.07-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.59.83 2.03.9 2.18.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.12.65-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.12.07.72-.17 1.4z" />
          </svg>
          WhatsApp
        </a>
        <a
          href="tel:+923314972426"
          className="flex items-center justify-center gap-2 rounded-lg border border-gold/60 bg-background py-2.5 text-xs font-semibold tracking-wide text-foreground transition hover:border-gold hover:bg-gold hover:text-forest-deep"
        >
          <Phone className="h-3.5 w-3.5" />
          Call Now
        </a>
      </div>
    </article>
  );
}
