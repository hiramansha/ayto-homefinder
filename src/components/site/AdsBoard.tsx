import { useCallback, useEffect, useState } from "react";
import { Megaphone, Tag, Check, X, Trash2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ads as builtInAds } from "@/data/ads";

type AdRow = {
  id: string; brand: string; title: string; body: string; offer: string;
  phone: string; image_url: string; is_own: boolean; status: string; owner_id: string;
};

const card = "rounded-2xl border border-sky-300/15 bg-[#0e172a]/80 shadow-xl";
const input = "w-full rounded-lg border border-sky-300/25 bg-[#080f1d] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#f4c414]";

export function AdsBoard({ onContact }: { onContact: (text: string) => void }) {
  const [rows, setRows] = useState<AdRow[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({ brand: "", title: "", body: "", offer: "", phone: "", image_url: "" });

  const load = useCallback(async () => {
    const { data } = await supabase.from("ads").select("*").order("created_at", { ascending: false });
    setRows((data as AdRow[]) ?? []);
  }, []);

  const loadUser = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    const id = data.user?.id ?? null;
    setUserId(id);
    if (id) {
      const { data: admin } = await supabase.rpc("has_role", { _user_id: id, _role: "admin" });
      setIsAdmin(!!admin);
    } else setIsAdmin(false);
  }, []);

  useEffect(() => {
    void loadUser().then(load);
    const { data: sub } = supabase.auth.onAuthStateChange((e) => {
      if (e === "SIGNED_IN" || e === "SIGNED_OUT") void loadUser().then(load);
    });
    return () => sub.subscription.unsubscribe();
  }, [load, loadUser]);

  const signIn = async (mode: "in" | "up") => {
    if (!email || password.length < 6) return toast.error("Email and a 6+ character password are required");
    const res = mode === "in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
    if (res.error) return toast.error(res.error.message);
    if (mode === "up" && !res.data.session) toast.success("Check your email to confirm your account, then sign in.");
  };

  const submit = async () => {
    if (!form.brand.trim() || !form.title.trim()) return toast.error("Business name and ad title are required");
    const { error } = await supabase.from("ads").insert({
      ...form, owner_id: userId!, is_own: isAdmin, status: isAdmin ? "approved" : "pending",
    });
    if (error) return toast.error(error.message);
    toast.success(isAdmin ? "Your ad is live" : "Ad submitted — it will appear after approval");
    setForm({ brand: "", title: "", body: "", offer: "", phone: "", image_url: "" });
    setOpen(false);
    void load();
  };

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("ads").update({ status }).eq("id", id);
    if (error) toast.error(error.message); else void load();
  };
  const remove = async (id: string) => {
    const { error } = await supabase.from("ads").delete().eq("id", id);
    if (error) toast.error(error.message); else void load();
  };

  const live = rows.filter((r) => r.status === "approved");
  const pending = rows.filter((r) => r.status !== "approved");
  const fallbackImg = builtInAds[0]?.image ?? "";

  return (
    <section id="ads" className="border-t border-sky-300/10 py-20 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full border border-[#f4d06f]/40 bg-[#f4d06f]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#f4d06f]">Offers &amp; Ads</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-4xl">Deals from AYTO &amp; Partners</h2>
            <p className="mt-2 text-sm text-slate-300">Our own offers plus trusted businesses for home buyers.</p>
          </div>
          <button type="button" onClick={() => setOpen((v) => !v)} className="ayto-gold-btn inline-flex items-center gap-2 rounded-full bg-[#f4c414] px-5 py-2.5 text-sm font-bold text-[#070b14]">
            <Megaphone className="h-4 w-4" /> Post your ad
          </button>
        </div>

        {open && (
          <div className={`${card} mt-8 p-6`}>
            {!userId ? (
              <div className="grid gap-3 sm:max-w-md">
                <p className="text-sm text-slate-300">Sign in or create an account to post an ad.</p>
                <input className={input} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className={input} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="flex gap-2">
                  <button type="button" onClick={() => signIn("in")} className="ayto-gold-btn rounded-full bg-[#f4c414] px-4 py-2 text-sm font-bold text-[#070b14]">Sign in</button>
                  <button type="button" onClick={() => signIn("up")} className="rounded-full border border-sky-300/30 px-4 py-2 text-sm font-bold">Create account</button>
                </div>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <input className={input} placeholder="Business name *" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                <input className={input} placeholder="Ad title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <input className={input} placeholder="Offer (e.g. 10% off)" value={form.offer} onChange={(e) => setForm({ ...form, offer: e.target.value })} />
                <input className={input} placeholder="Contact phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className={`${input} sm:col-span-2`} placeholder="Image link (optional)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
                <textarea className={`${input} sm:col-span-2`} rows={3} placeholder="Describe your offer" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
                <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
                  <button type="button" onClick={submit} className="ayto-gold-btn rounded-full bg-[#f4c414] px-5 py-2 text-sm font-bold text-[#070b14]">{isAdmin ? "Publish ad" : "Submit for approval"}</button>
                  <button type="button" onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-1 text-xs text-slate-400"><LogOut className="h-3 w-3" /> Sign out</button>
                  {!isAdmin && <span className="text-xs text-slate-400">Your ad goes live after AYTO approves it.</span>}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {builtInAds.filter((a) => a.kind === "own").map((a) => (
            <AdCard key={a.id} own brand={a.brand} title={a.title} body={a.text} offer={a.offer} image={a.image} cta={a.cta}
              onClick={() => onContact(`Hello, I am interested in your offer "${a.title}" (${a.offer}).`)} />
          ))}
          {live.map((r) => (
            <AdCard key={r.id} own={r.is_own} brand={r.brand} title={r.title} body={r.body} offer={r.offer} image={r.image_url || fallbackImg}
              cta={r.phone ? `Call ${r.phone}` : "Contact"} onClick={() => onContact(`Hello, please connect me with ${r.brand} about "${r.title}".`)}
              extra={isAdmin ? <button type="button" onClick={() => remove(r.id)} className="mt-2 inline-flex items-center gap-1 text-xs text-red-300"><Trash2 className="h-3 w-3" /> Remove</button> : null} />
          ))}
        </div>

        {userId && pending.length > 0 && (
          <div className={`${card} mt-10 p-6`}>
            <h3 className="text-lg font-bold">{isAdmin ? "Ads waiting for your approval" : "Your submitted ads"}</h3>
            <ul className="mt-4 divide-y divide-sky-300/10">
              {pending.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-semibold">{r.brand} — {r.title}</p>
                    <p className="text-xs text-slate-400">{r.offer} {r.phone && `· ${r.phone}`} · <span className="uppercase">{r.status}</span></p>
                  </div>
                  <div className="flex gap-2">
                    {isAdmin && <button type="button" onClick={() => setStatus(r.id, "approved")} className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300"><Check className="h-3 w-3" /> Approve</button>}
                    {isAdmin && r.status === "pending" && <button type="button" onClick={() => setStatus(r.id, "rejected")} className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-300"><X className="h-3 w-3" /> Reject</button>}
                    <button type="button" onClick={() => remove(r.id)} className="inline-flex items-center gap-1 rounded-full border border-sky-300/20 px-3 py-1 text-xs"><Trash2 className="h-3 w-3" /> Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function AdCard(p: { own: boolean; brand: string; title: string; body: string; offer: string; image: string; cta: string; onClick: () => void; extra?: React.ReactNode }) {
  return (
    <article className={`${card} ayto-card flex flex-col overflow-hidden`}>
      <div className="relative">
        <img src={p.image} alt={p.title} loading="lazy" className="aspect-[3/2] w-full object-cover" />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${p.own ? "bg-[#f4c414] text-[#070b14]" : "bg-[#070b14]/85 text-[#f4d06f]"}`}>
          {p.own ? "AYTO offer" : "Sponsored"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#f4d06f]">{p.brand}</p>
        <h3 className="mt-1 text-lg font-bold text-white">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm text-slate-300">{p.body}</p>
        {p.offer && <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4d06f]"><Tag className="h-4 w-4" /> {p.offer}</p>}
        <button type="button" onClick={p.onClick} className="ayto-gold-btn mt-4 rounded-full bg-[#f4c414] px-4 py-2 text-sm font-bold text-[#070b14]">{p.cta}</button>
        {p.extra}
      </div>
    </article>
  );
}
