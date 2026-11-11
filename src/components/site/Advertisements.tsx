import { useState } from "react";
import { ArrowRight, Megaphone, Tag } from "lucide-react";
import { ads, type Ad, type AdKind } from "@/data/ads";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./utils";

const tabs: { id: "all" | AdKind; label: string }[] = [
  { id: "all", label: "All ads" },
  { id: "own", label: "AYTO offers" },
  { id: "partner", label: "Partner ads" },
];

export function Advertisements({ onAd, onAdvertise }: { onAd: (ad: Ad) => void; onAdvertise: () => void }) {
  const [tab, setTab] = useState<"all" | AdKind>("all");
  const list = tab === "all" ? ads : ads.filter((a) => a.kind === tab);

  return (
    <section id="ads" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Offers & partners"
            title="Deals for home buyers"
            sub="Our latest offers, plus trusted businesses that help you after you buy — interiors, solar, shifting and home loans."
          />
          <div role="tablist" aria-label="Ad type" className="flex rounded-full border border-border bg-card p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((ad, k) => (
            <Reveal key={ad.id} delay={(k % 3) * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-luxe">
                <div className="relative overflow-hidden">
                  <img
                    src={ad.image}
                    alt={ad.alt}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span
                    className={cn(
                      "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                      ad.kind === "own" ? "bg-gold text-forest-deep" : "bg-forest-deep/85 text-forest-foreground",
                    )}
                  >
                    {ad.kind === "own" ? "AYTO offer" : "Sponsored"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">{ad.brand}</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-snug text-foreground">{ad.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{ad.text}</p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <Tag className="h-4 w-4 text-gold" /> {ad.offer}
                  </p>
                  <Button variant={ad.kind === "own" ? "forest" : "outline"} className="mt-5 w-full" onClick={() => onAd(ad)}>
                    {ad.cta} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={(list.length % 3) * 80}>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-forest-deep p-8 text-forest-foreground shadow-luxe">
              <div>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
                  <Megaphone className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-3xl font-semibold leading-tight">Advertise your business here</h3>
                <p className="mt-4 text-sm leading-relaxed text-forest-muted">
                  Reach thousands of home buyers and tenants every month. Builders, interior designers, banks, solar and moving companies are welcome.
                </p>
              </div>
              <Button variant="gold" size="lg" className="mt-8 w-full" onClick={onAdvertise}>
                Place your ad
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
