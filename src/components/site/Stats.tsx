import { useEffect, useRef, useState } from "react";

const stats = [
  { n: 850, l: "Properties sold" },
  { n: 1200, l: "Happy clients" },
  { n: 12, l: "Years of experience" },
  { n: 35, l: "Expert agents" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / 1400);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString("en-PK")}</span>;
}

export function Stats() {
  return (
    <section className="bg-forest-deep py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 md:grid-cols-4 md:px-8">
        {stats.map((s, i) => (
          <div key={s.l} className={i > 0 ? "text-center md:border-l md:border-forest-foreground/10" : "text-center"}>
            <p className="font-display text-5xl font-bold text-gold-soft md:text-6xl">
              <Counter to={s.n} />+
            </p>
            <p className="mt-2 text-sm tracking-wide text-forest-muted">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
