import { Bath, BedDouble, Check, MapPin, Ruler } from "lucide-react";
import type { Property } from "@/data/properties";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { priceLabel } from "@/lib/property-math";
import bedroom from "@/assets/master-bedroom.jpg";

export function PropertyDialog({
  p,
  onClose,
  onInquire,
}: {
  p: Property | null;
  onClose: () => void;
  onInquire: (p: Property) => void;
}) {
  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-2xl gap-0 overflow-y-auto border-border bg-card p-0">
        {p && (
          <>
            <div className="grid grid-cols-1 gap-1">
              <img src={p.image} alt={p.title} className="aspect-[16/9] w-full object-cover" />
              {p.id === 1 && <img src={bedroom} alt="Master bedroom" loading="lazy" className="aspect-[16/7] w-full object-cover" />}
            </div>
            <div className="p-7">
              <p className="font-display text-3xl font-bold text-primary">{priceLabel(p)}</p>
              <DialogTitle className="mt-1 font-display text-3xl font-semibold">{p.title}</DialogTitle>
              <DialogDescription className="mt-2 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gold" /> {p.location}, {p.city} · {p.type} for {p.purpose.toLowerCase()}
              </DialogDescription>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { i: Ruler, l: "Area", v: p.area },
                  { i: BedDouble, l: "Bedrooms", v: p.beds || "–" },
                  { i: Bath, l: "Bathrooms", v: p.baths || "–" },
                ].map(({ i: Icon, l, v }) => (
                  <div key={l} className="rounded-lg bg-muted p-4">
                    <Icon className="h-4 w-4 text-gold" />
                    <p className="mt-2 text-xs text-muted-foreground">{l}</p>
                    <p className="font-semibold text-foreground">{v}</p>
                  </div>
                ))}
              </div>
              {!!p.features?.length && (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Features</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.features.map((f) => (
                      <span key={f} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
                        <Check className="h-3 w-3 text-gold" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <Button variant="forest" size="xl" className="mt-7 w-full" onClick={() => onInquire(p)}>
                Ask about this property
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
