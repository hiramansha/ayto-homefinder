import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
export interface GalleryItem { title: string; image: string; location: string; area: string; details: string; category: string }
export function GalleryLightbox({ items, selected, onSelect }: { items: GalleryItem[]; selected: GalleryItem | null; onSelect: (item: GalleryItem | null) => void }) {
  const index = items.findIndex(i => i.title === selected?.title);
  const move = (step: number) => { const item = items[(index + step + items.length) % items.length]; if (item) onSelect(item); };
  return <Dialog open={!!selected} onOpenChange={open => { if (!open) onSelect(null); }}><DialogContent aria-label="Gallery image preview" className="z-[100] max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto border-gold/40 bg-card p-0" onKeyDown={e => { if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); }}>
    {selected && <><div className="relative flex h-[min(57dvh,650px)] items-center justify-center bg-forest-deep"><img src={selected.image} alt={selected.title} className="h-full w-full object-contain" />
      <Button variant="heroOutline" size="icon" className="absolute left-3 bg-forest-deep/80" aria-label="Previous image" title="Previous image" onClick={() => move(-1)}><ChevronLeft /></Button>
      <Button variant="heroOutline" size="icon" className="absolute right-3 bg-forest-deep/80" aria-label="Next image" title="Next image" onClick={() => move(1)}><ChevronRight /></Button>
    </div><div className="p-5 sm:p-7"><div className="flex justify-between gap-4 text-xs font-semibold text-gold"><span>{selected.category} · {selected.area}</span><span>{index + 1} / {items.length}</span></div><DialogTitle className="mt-3 text-2xl text-foreground">{selected.title}</DialogTitle><p className="mt-2 flex items-center gap-2 text-sm text-gold"><MapPin className="h-4 w-4" />{selected.location}</p><DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">{selected.details}</DialogDescription></div></>}
  </DialogContent></Dialog>;
}