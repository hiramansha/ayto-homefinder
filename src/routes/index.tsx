import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { properties, type Property } from "@/data/properties";
import { defaultFilters, filterProperties, priceLabel, type Filters } from "@/lib/property-math";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { SearchPanel } from "@/components/site/SearchPanel";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PropertyDialog } from "@/components/site/PropertyDialog";
import { Spotlight } from "@/components/site/Spotlight";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { EmiCalculator } from "@/components/site/EmiCalculator";
import { Testimonials } from "@/components/site/Testimonials";
import { CtaBand } from "@/components/site/CtaBand";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionHeading, scrollToId } from "@/components/site/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AYTO Properties – Buy, Sell & Rent Property in Pakistan" },
      {
        name: "description",
        content: "Verified houses, apartments, plots and commercial spaces in Lahore, Islamabad and Karachi. Clear prices and honest advice from AYTO Properties.",
      },
      { property: "og:title", content: "AYTO Properties – Smart Property Solution" },
      { property: "og:description", content: "Find a home that fits your future. Buy, sell and rent property in Lahore, Islamabad and Karachi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FAV_KEY = "ayto-fav";

function Index() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [saved, setSaved] = useState<number[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [open, setOpen] = useState<Property | null>(null);
  const [prefill, setPrefill] = useState({ text: "", nonce: 0 });

  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleSave = (id: number) => {
    setSaved((s) => {
      const has = s.includes(id);
      const next = has ? s.filter((x) => x !== id) : [...s, id];
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      toast(has ? "Removed from saved" : "Saved to your list");
      return next;
    });
  };

  const list = useMemo(
    () => (showSaved ? properties.filter((p) => saved.includes(p.id)) : filterProperties(properties, filters)),
    [filters, showSaved, saved],
  );

  const update = (f: Partial<Filters>) => {
    setShowSaved(false);
    setFilters((s) => ({ ...s, ...f }));
  };

  const inquire = (p: Property) => {
    setOpen(null);
    setPrefill({
      text: `Hello, I am interested in "${p.title}" in ${p.location}, ${p.city} (${priceLabel(p)}). Please share more details.`,
      nonce: Date.now(),
    });
    scrollToId("contact");
  };

  const featured = properties[0]!;

  return (
    <div id="top">
      <SiteHeader
        savedCount={saved.length}
        onShowSaved={() => {
          if (!saved.length) {
            toast("Tap the heart on a property to save it");
            return;
          }
          setShowSaved(true);
          scrollToId("listings");
        }}
      />
      <main>
        <Hero />
        <SearchPanel filters={filters} onChange={update} onReset={() => update(defaultFilters)} />

        <section id="listings" className="py-24 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Handpicked for you" title={showSaved ? "Your saved properties" : "Featured properties"} />
              <p className="text-sm text-muted-foreground">
                {list.length} {list.length === 1 ? "property" : "properties"} {showSaved ? "saved" : "found"}
              </p>
            </div>
            {list.length ? (
              <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <PropertyCard key={p.id} p={p} saved={saved.includes(p.id)} onToggleSave={() => toggleSave(p.id)} onOpen={() => setOpen(p)} />
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-xl border border-dashed border-border p-14 text-center text-muted-foreground">
                No properties match these filters. Try a higher price or reset the search.
              </div>
            )}
          </div>
        </section>

        <Spotlight onView={() => setOpen(featured)} onInquire={() => inquire(featured)} />
        <Stats />
        <Services />
        <EmiCalculator />
        <Testimonials />
        <CtaBand />
        <Contact prefill={prefill} />
      </main>
      <SiteFooter
        onType={(t) => {
          update({ ...defaultFilters, type: t });
          scrollToId("listings");
        }}
      />
      <PropertyDialog p={open} onClose={() => setOpen(null)} onInquire={inquire} />
    </div>
  );
}
