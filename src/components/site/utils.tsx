import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", inView && "is-in", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center,
  light,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p className={cn("eyebrow", light ? "text-gold-soft" : "text-gold")}>{eyebrow}</p>
      <h2 className={cn("mt-3 text-4xl font-semibold leading-[1.05] md:text-5xl", light ? "text-forest-foreground" : "text-foreground")}>
        {title}
      </h2>
      <div className={cn("mt-5 h-px w-16 bg-gold", center && "mx-auto")} />
      {sub && <p className={cn("mt-5 text-base leading-relaxed", light ? "text-forest-muted" : "text-muted-foreground")}>{sub}</p>}
    </div>
  );
}
