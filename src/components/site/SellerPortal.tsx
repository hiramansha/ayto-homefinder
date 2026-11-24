import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
interface Props {
  open: boolean; onClose: () => void; tab: "login" | "signup"; onTab: (tab: "login" | "signup") => void;
  name: string; email: string; phone: string; agency: string; password: string;
  onName: (v: string) => void; onEmail: (v: string) => void; onPhone: (v: string) => void; onAgency: (v: string) => void; onPassword: (v: string) => void;
  onSubmit: (e: FormEvent) => Promise<void>; error: string; busy: boolean;
}
export function SellerPortal(p: Props) {
  const [visible, setVisible] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const input = "h-12 w-full rounded-md border border-portal-border bg-portal-input px-3 text-sm text-portal-foreground outline-none placeholder:text-portal-muted focus:border-gold-soft focus:ring-2 focus:ring-gold-soft/25 invalid:[&:not(:placeholder-shown)]:border-destructive";
  return <Dialog open={p.open} onOpenChange={open => { if (!open) { p.onClose(); setVisible(false); setInvalid(false); } }}><DialogContent className="seller-portal z-[100] max-h-[90dvh] max-w-md overflow-y-auto rounded-lg border-portal-border bg-portal/95 p-6 text-portal-foreground shadow-luxe backdrop-blur-2xl sm:p-8">
    <div className="mb-5 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-full border border-portal-border text-gold-soft"><LockKeyhole className="h-5 w-5" /></div><span className="text-xs font-semibold text-gold-soft">AYTO PROPERTIES<br /><span className="font-normal text-portal-muted">Seller portal</span></span></div>
    <DialogTitle className="text-3xl text-portal-foreground">{p.tab === "login" ? "Welcome back" : "Your property journey"}</DialogTitle>
    <DialogDescription className="mt-2 text-sm text-portal-muted">{p.tab === "login" ? "Sign in to your seller account." : "Create your AYTO seller profile."}</DialogDescription>
    <div className="mt-6 grid grid-cols-2 gap-1 border-b border-portal-border" role="tablist" aria-label="Seller account">
      {(["login", "signup"] as const).map(tab => <Button key={tab} variant="ghost" role="tab" aria-selected={p.tab === tab} onClick={() => { p.onTab(tab); setInvalid(false); }} className={p.tab === tab ? "rounded-none border-b-2 border-gold-soft text-gold-soft" : "text-portal-muted"}>{tab === "login" ? "Sign in" : "Create account"}</Button>)}
    </div>
    <form onSubmit={p.onSubmit} onInvalid={() => setInvalid(true)} className="mt-5 space-y-4">
      {p.tab === "signup" && <><label className="block space-y-2 text-xs text-portal-muted">Full name<input required value={p.name} onChange={e => p.onName(e.target.value)} autoComplete="name" placeholder="Full name" className={input} /></label><label className="block space-y-2 text-xs text-portal-muted">Mobile / WhatsApp<input required type="tel" value={p.phone} onChange={e => p.onPhone(e.target.value)} autoComplete="tel" placeholder="03xx xxxxxxx" className={input} /></label><label className="block space-y-2 text-xs text-portal-muted">Agency (optional)<input value={p.agency} onChange={e => p.onAgency(e.target.value)} autoComplete="organization" placeholder="Agency or direct owner" className={input} /></label></>}
      <label className="block space-y-2 text-xs text-portal-muted">Email address<input required type="email" value={p.email} onChange={e => p.onEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" className={input} /></label>
      <label className="block space-y-2 text-xs text-portal-muted">Password<div className="relative"><input required type={visible ? "text" : "password"} value={p.password} onChange={e => p.onPassword(e.target.value)} autoComplete={p.tab === "login" ? "current-password" : "new-password"} placeholder="Your password" className={`${input} pr-12`} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1.5 text-gold-soft" aria-label={visible ? "Hide password" : "Show password"} title={visible ? "Hide password" : "Show password"} onClick={() => setVisible(v => !v)}>{visible ? <EyeOff /> : <Eye />}</Button></div></label>
      {(p.error || invalid) && <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-portal-foreground">{p.error || "Please check the highlighted fields."}</p>}
      <Button type="submit" variant="gold" disabled={p.busy} className="h-12 w-full">{p.busy ? <LoaderCircle className="animate-spin" /> : <ShieldCheck />}{p.busy ? "Please wait…" : p.tab === "login" ? "Sign in & continue" : "Create seller profile"}</Button>
    </form>
  </DialogContent></Dialog>;
}