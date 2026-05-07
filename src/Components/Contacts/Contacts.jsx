import { useContactForm } from "../../hooks/useContactForm";
import {
  Mail, MapPin, Phone, Send, CheckCircle,
  AlertCircle, MessageCircle, ArrowUpRight,
  Zap, Clock, Shield
} from "lucide-react"

const PHONES = [
  { display: "+256 767 896 608", tel: "+256767896608" },
  { display: "+256 752 350 470", tel: "+256752350470" },
]
const EMAIL = "ionatec002@gmail.com"


const Contacts = () => {

  const { formData, setFormData, isLoading, result, submitForm } = useContactForm({
    name: "", email: "", phone: "", message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formData);
  };

  const WHATSAPP_NUMBER = "256767896608"

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const sendToWhatsApp = () => {
    const text = `Hi IONATECH! My name is ${formData.name}.%0A%0A*Message:* ${formData.message}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank")
  }


  const inputBase =
    "w-full bg-white/[0.055] border border-white/10 rounded-[8px] px-5 py-3.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-300/60 focus:bg-white/[0.075] focus:ring-4 focus:ring-cyan-300/10"

  return (
    <section
      id="contact"
      className="ion-section relative py-28 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="ion-aurora" aria-hidden="true" />
      <div className="ion-aurora ion-aurora-right" aria-hidden="true" />

      <div className="relative container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="mb-20">
          <div className="ion-badge mb-6">
            <span className="ion-live-dot" />
            <Zap size={11} />
            Get in touch
          </div>
          <h2
            className="ion-heading mb-5"
            style={{ letterSpacing: 0 }}
          >
            Let's build<br />
            <span className="ion-heading-accent">something great.</span>
          </h2>
          <p className="ion-copy max-w-xl">
            Tell us about your project. We respond to every inquiry within 24 hours — or ping us directly on WhatsApp for an instant reply.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* LEFT COLUMN — contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Promise cards */}
            {[
              { icon: <Clock size={18} />, label: "Response time", value: "Under 24 hours", color: "indigo" },
              { icon: <Shield size={18} />, label: "Data privacy", value: "Your info stays safe", color: "emerald" },
            ].map(({ icon, label, value, color }) => (
              <div
                key={label}
                className="ion-card flex items-center gap-4 px-6 py-5"
              >
                <div className={`ion-icon-tile shrink-0 ${color === "indigo" ? "text-cyan-300" : "text-emerald-300"
                  }`}>
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400">{label}</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
                </div>
              </div>
            ))}

            {/* Direct contacts */}
            <div className="ion-panel p-6 space-y-2">
              <p className="text-xs font-bold text-slate-400 mb-4">Direct lines</p>

              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-4 p-3 rounded-[8px] hover:bg-cyan-300/10 transition-colors"
              >
                <div className="ion-icon-tile w-9 h-9 shrink-0">
                  <Mail size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 font-medium">Email</p>
                  <p className="text-sm font-semibold text-white truncate">{EMAIL}</p>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-slate-500 group-hover:text-cyan-300 transition-colors shrink-0" />
              </a>

              {PHONES.map((p, i) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="group flex items-center gap-4 p-3 rounded-[8px] hover:bg-cyan-300/10 transition-colors"
                >
                  <div className="ion-icon-tile w-9 h-9 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 font-medium">{i === 0 ? "Phone" : "Phone (alt.)"}</p>
                    <p className="text-sm font-semibold text-white truncate">{p.display}</p>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-slate-500 group-hover:text-cyan-300 transition-colors shrink-0" />
                </a>
              ))}

              <div className="flex items-center gap-4 p-3 rounded-[8px]">
                <div className="ion-icon-tile w-9 h-9 shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Location</p>
                  <p className="text-sm font-semibold text-white">Kampala, Uganda</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={sendToWhatsApp}
              className="group relative w-full overflow-hidden bg-[#128c7e] hover:bg-[#075e54] text-white rounded-[8px] px-6 py-5 font-bold text-sm flex items-center justify-between transition-all duration-300 shadow-lg shadow-emerald-900/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 rounded-[8px] flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <div className="text-left">
                  <p className="text-white/70 text-xs font-medium">Prefer instant chat?</p>
                  <p className="text-white font-bold">Message on WhatsApp</p>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>

          </div>

          {/* RIGHT COLUMN — form */}
          <div className="lg:col-span-3">
            <div className="ion-panel p-8 lg:p-10">

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white" style={{ letterSpacing: 0 }}>
                  Send an official inquiry
                </h3>
                <p className="text-sm text-slate-400 mt-1">We'll put together a tailored proposal for you.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-bold text-slate-300">
                      Full name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Allan Baliddawa"
                      required
                      className={inputBase}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-bold text-slate-300">
                      Email address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      required
                      className={inputBase}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-phone" className="text-xs font-bold text-slate-300">
                    Phone number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+256 700 000 000"
                    required
                    className={inputBase}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-bold text-slate-300">
                    Project details
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Describe your project — what you're building, your timeline, and what kind of support you need..."
                    required
                    className={`${inputBase} resize-none`}
                  />
                </div>

                {/* Status messages */}
                {result === "success" && (
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 text-emerald-300 rounded-[8px] border border-emerald-500/20 text-sm font-medium">
                    <CheckCircle size={16} className="shrink-0" />
                    Message sent! We'll be in touch within 24 hours.
                  </div>
                )}
                {result === "error" && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 text-red-300 rounded-[8px] border border-red-500/20 text-sm font-medium">
                    <AlertCircle size={16} className="shrink-0" />
                    Something went wrong. Try WhatsApp instead?
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="ion-primary-btn group w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending your inquiry...
                    </>
                  ) : (
                    <>
                      Send inquiry
                      <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-500 pt-1">
                  No spam, ever. We only use your info to respond to your inquiry.
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contacts
