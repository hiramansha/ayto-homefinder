import { Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
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
  return (
    <article
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition duration-300 hover:-translate-y-1.5 hover:shadow-luxe"
    >
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
      <div className="p-5">
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
    </article>
  );
}
