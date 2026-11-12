import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, User } from "lucide-react";

export function Contact({ prefill }: { prefill: { text: string; nonce: number } }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("Residential Plot");
  const [locationPref, setLocationPref] = useState("DHA Lahore (Phase 5, 6, 7, 8, 9)");
  const [plotSize, setPlotSize] = useState("5 Marla");
  const [purpose, setPurpose] = useState("Investment");
  const [budgetFrom, setBudgetFrom] = useState("");
  const [budgetTo, setBudgetTo] = useState("");
  const [paymentPref, setPaymentPref] = useState("Full Cash");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!prefill.nonce) return;
    setDetails(prefill.text);
    const t = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 400);
    return () => clearTimeout(t);
  }, [prefill]);

  const inputClass =
    "h-10 w-full rounded-full border border-white/25 bg-white/[0.04] px-4 text-xs text-white placeholder:text-white/55 outline-none transition-all duration-300 focus:border-[#f4d06f] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#f4d06f]/25 sm:h-11 sm:text-sm [&>option]:bg-[#141414] [&>option]:text-white";

  const labelClass = "mb-1.5 block text-[11px] font-semibold tracking-wide text-white/90 sm:text-xs";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum AYTO Properties!\n*New Visit / Property Query*\n• Name: ${name}\n• Phone: ${phone}\n• Email: ${email}\n• Property Type: ${propertyType}\n• Location: ${locationPref}\n• Size: ${plotSize}\n• Purpose: ${purpose}\n• Budget: ${budgetFrom || "Any"} to ${budgetTo || "Any"}\n• Payment: ${paymentPref}\n• Details: ${details || "N/A"}`,
    );
    window.open(`https://wa.me/923314972426?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#141414] pb-16 pt-4 text-white md:pb-20 md:pt-6"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.16) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-full w-[520px] overflow-hidden opacity-85">
        <div className="absolute right-24 top-[-10%] h-[130%] w-[2px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#f4d06f] to-transparent shadow-[0_0_24px_4px_rgba(244,208,111,0.65)]" />
        <div className="absolute right-52 top-[-10%] h-[130%] w-[3px] rotate-[24deg] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent shadow-[0_0_32px_6px_rgba(212,175,55,0.7)]" />
      </div>

      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <h2 className="text-center font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Query Form
        </h2>
        <p className="mx-auto mt-1.5 max-w-lg text-center text-xs text-white/65 sm:text-sm">
          Fill out your property requirements below to schedule a private site visit or receive a tailored shortlist from AYTO Properties.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-3xl border border-white/25 bg-[#191919]/90 p-5 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.85)] backdrop-blur-md sm:p-7"
        >
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div className="relative">
              <input
                ref={nameRef}
                required
                type="text"
                placeholder="Your Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <User className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            </div>

            <div className="relative">
              <input
                required
                type="email"
                placeholder="Your Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <Mail className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            </div>
          </div>

          <div className="relative mt-3.5">
            <input
              required
              type="tel"
              placeholder="Your Phone (e.g. 0331-4972426)*"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${inputClass} pr-10`}
            />
            <Phone className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          </div>

          <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Property Type:</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className={inputClass}
              >
                <option>Residential Plot</option>
                <option>Luxury House / Villa</option>
                <option>Apartment / Penthouse</option>
                <option>Commercial Plot / Plaza</option>
                <option>Agriculture Land</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Location Preference:</label>
              <select
                value={locationPref}
                onChange={(e) => setLocationPref(e.target.value)}
                className={inputClass}
              >
                <option>DHA Lahore (Phase 5, 6, 7, 8, 9)</option>
                <option>Bahria Town & Bahria Orchard</option>
                <option>Lake City Lahore</option>
                <option>Lahore Smart City</option>
                <option>Etihad Town</option>
                <option>Gulberg / Canal Road</option>
              </select>
            </div>
          </div>

          <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Plot / Property Size:</label>
              <select
                value={plotSize}
                onChange={(e) => setPlotSize(e.target.value)}
                className={inputClass}
              >
                <option>5 Marla</option>
                <option>7 Marla</option>
                <option>10 Marla</option>
                <option>1 Kanal</option>
                <option>2 Kanal</option>
                <option>Commercial / Custom</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Purpose of Buying:</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className={inputClass}
              >
                <option>Investment</option>
                <option>Personal Residence / Construction</option>
                <option>Rental Income</option>
              </select>
            </div>
          </div>

          <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Budget From (e.g. 2 Crore)"
              value={budgetFrom}
              onChange={(e) => setBudgetFrom(e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Budget To (e.g. 8 Crore)"
              value={budgetTo}
              onChange={(e) => setBudgetTo(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label className={labelClass}>Payment Preference:</label>
            <select
              value={paymentPref}
              onChange={(e) => setPaymentPref(e.target.value)}
              className={inputClass}
            >
              <option>Full Cash</option>
              <option>Easy Installment Plan</option>
              <option>Home Loan / Bank Financing</option>
            </select>
          </div>

          <div className="mt-4">
            <textarea
              rows={3}
              placeholder="Additional Details (Optional)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full rounded-2xl border border-white/25 bg-white/[0.04] p-3.5 text-xs text-white placeholder:text-white/55 outline-none transition-all duration-300 focus:border-[#f4d06f] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#f4d06f]/25 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="mt-5 h-11 w-full rounded-full border border-white/40 bg-transparent text-xs font-semibold tracking-wider text-white transition-all duration-300 hover:border-[#f4d06f] hover:bg-[#f4d06f] hover:text-[#141414] sm:text-sm"
          >
            Submit
          </button>

          {submitted && (
            <div className="mt-3.5 flex items-center justify-center gap-2 rounded-full border border-[#f4d06f]/40 bg-[#f4d06f]/10 px-4 py-2 text-xs font-medium text-[#f4d06f]">
              <CheckCircle2 className="h-4 w-4" />
              Thank you! Your visit request has been sent to AYTO Properties (0331-4972426).
            </div>
          )}

          <div
            id="offices"
            className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-4 text-[11px] text-white/65 sm:text-xs"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#f4d06f]" /> AYTO Properties, Lahore
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#f4d06f]" /> 0331-4972426
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-[#f4d06f]" /> info2aytoproperties@gmail.com
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
