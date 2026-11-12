import { useEffect, useRef, useState } from "react";
import { Award, Building2, ShieldCheck, Users } from "lucide-react";

const stats = [
  { n: 850, l: "Properties sold", sub: "Across DHA, Bahria & Lake City", icon: Building2 },
  { n: 1200, l: "Happy clients", sub: "Verified buyers & investors", icon: Users },
  { n: 12, l: "Years of experience", sub: "Trusted in Lahore real estate", icon: Award },
  { n: 35, l: "Expert agents", sub: "Dedicated property advisors", icon: ShieldCheck },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const runAnimation = () => {
      if (started.current) return;
      started.current = true;
      setV(0);
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / 1400);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          io.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{v.toLocaleString("en-PK")}</span>;
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-forest-deep py-20">
      {/* Subtle architectural gold glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.l}
              className="group relative rounded-2xl border border-gold/20 bg-forest/40 p-7 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_12px_35px_-10px_rgba(212,175,55,0.2)]"
            >
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-forest-deep text-gold-soft transition-transform duration-500 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-display text-4xl font-bold text-gold-soft md:text-5xl">
                <Counter to={s.n} />+
              </p>
              <p className="mt-2 text-sm font-semibold tracking-wide text-forest-foreground">{s.l}</p>
              <p className="mt-1 text-xs text-forest-muted">{s.sub}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
