import { useEffect, useRef, useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { validateContact, type ContactInput } from "@/lib/property-math";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import cartoon from "@/assets/cartoon-cart-homes.jpg";
import { Reveal, SectionHeading } from "./utils";

const field =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";
const empty: ContactInput = { name: "", phone: "", email: "", message: "" };

export function Contact({ prefill }: { prefill: { text: string; nonce: number } }) {
  const [v, setV] = useState<ContactInput>(empty);
  const [err, setErr] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [sending, setSending] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!prefill.nonce) return;
    setV((s) => ({ ...s, message: prefill.text }));
    const t = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 700);
    return () => clearTimeout(t);
  }, [prefill]);

  const set = (k: keyof ContactInput) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateContact(v);
    setErr(found);
    if (Object.keys(found).length) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setV(empty);
      toast.success("Message sent. We will contact you soon.");
    }, 900);
  };

  const info = [
    { i: MapPin, t: "Office", d: "AYTO Properties, Pakistan" },
    { i: Mail, t: "Email", d: "info@aytoproperties.com" },
    { i: Clock, t: "Hours", d: "Mon–Sat, 10am to 7pm" },
  ];

  return (
    <section id="contact" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Get in touch" title="Let’s find your property" sub="Send a message and an agent will reply within one working day." />
          <div className="mt-10 space-y-6">
            {info.map(({ i: Icon, t, d }) => (
              <div key={t} className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-gold-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-6 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-luxe">
            <img src={cartoon} alt="Figure pushing a shopping cart full of houses" loading="lazy" width={1024} height={1024} className="h-32 w-32 shrink-0 rounded-xl object-contain sm:h-40 sm:w-40" />
            <div>
              <p className="font-display text-2xl font-semibold text-primary">Free consultation</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Tell us your budget and we will shortlist homes that fit it.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={submit} noValidate className="space-y-5 rounded-2xl border border-border bg-card p-7 shadow-luxe md:p-10">
            <h3 className="text-3xl font-semibold">Send us a message</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" error={err.name}>
                <input ref={nameRef} className={cn(field, err.name && "border-destructive")} autoComplete="name" value={v.name} onChange={set("name")} />
              </Field>
              <Field label="Phone" error={err.phone}>
                <input className={cn(field, err.phone && "border-destructive")} inputMode="tel" autoComplete="tel" placeholder="03XX XXXXXXX" value={v.phone} onChange={set("phone")} />
              </Field>
            </div>
            <Field label="Email" error={err.email}>
              <input type="email" className={cn(field, err.email && "border-destructive")} autoComplete="email" value={v.email} onChange={set("email")} />
            </Field>
            <Field label="Message" error={err.message}>
              <textarea rows={5} className={cn(field, "resize-y", err.message && "border-destructive")} placeholder="Tell us what you are looking for" value={v.message} onChange={set("message")} />
            </Field>
            <Button type="submit" variant="forest" size="xl" className="w-full" disabled={sending}>
              {sending ? "Sending…" : "Send message"} <Send />
            </Button>
            <p className="text-center text-xs text-muted-foreground">We never share your details.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      {label}
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}
