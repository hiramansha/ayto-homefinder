import { useEffect, useRef, useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
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

  const set = (k: keyof ContactInput) => (e: { target: { value: string } }) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateContact(v);
    setErr(found);
    if (Object.keys(found).length) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setV(empty);
      toast.success("Message received! An AYTO agent in Lahore will contact you shortly.");
    }, 500);
  };

  return (
    <section id="contact" className="bg-muted/35 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.15fr] md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Get in touch"
            title="Let’s find your property"
            subtitle="Send a message and an agent will reply within one working day."
          />

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-deep text-gold-soft">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Office</p>
                <p className="text-sm font-medium text-foreground">AYTO Properties, Lahore</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-deep text-gold-soft">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone / WhatsApp</p>
                <a
                  href="https://wa.me/923314972426?text=Hello%20AYTO%20Properties,%20I%20would%20like%20to%20inquire%20about%20a%20property%20in%20Lahore."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground transition-colors hover:text-gold"
                >
                  0331-4972426
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-deep text-gold-soft">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">info2aytoproperties@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-deep text-gold-soft">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Hours</p>
                <p className="text-sm font-medium text-foreground">Mon–Sat, 10am to 7pm</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-border/70 bg-white p-5 shadow-sm sm:flex-row">
            <img
              src={cartoon}
              alt="AYTO Properties Lahore"
              loading="lazy"
              className="h-36 w-36 shrink-0 object-contain"
            />
            <div className="text-center sm:text-left">
              <p className="font-display text-lg font-semibold text-foreground">Free consultation</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Tell us your budget and we will shortlist verified homes and plots in Lahore that fit it.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={submit} noValidate className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
            <h3 className="font-display text-2xl font-semibold text-foreground">Send us a message</h3>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</label>
                <input ref={nameRef} value={v.name} onChange={set("name")} className={cn(field, err.name && "border-destructive")} />
                {err.name && <p className="mt-1 text-xs text-destructive">{err.name}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone</label>
                <input
                  value={v.phone}
                  onChange={set("phone")}
                  placeholder="03XX XXXXXXX"
                  className={cn(field, err.phone && "border-destructive")}
                />
                {err.phone && <p className="mt-1 text-xs text-destructive">{err.phone}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={v.email}
                  onChange={set("email")}
                  className={cn(field, err.email && "border-destructive")}
                />
                {err.email && <p className="mt-1 text-xs text-destructive">{err.email}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea
                  rows={4}
                  value={v.message}
                  onChange={set("message")}
                  placeholder="Tell us what you are looking for"
                  className={cn(field, err.message && "border-destructive")}
                />
                {err.message && <p className="mt-1 text-xs text-destructive">{err.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-forest-deep py-6 text-sm font-medium text-gold-soft hover:bg-forest-deep/90"
              >
                <Send className="mr-2 h-4 w-4" />
                {sending ? "Sending..." : "Send message"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">We never share your details.</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
