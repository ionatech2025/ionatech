import { useState } from "react";
import { Github, Linkedin, Mail, MessageCircle, ArrowRight, MapPin, Zap } from "lucide-react";
import Iona from '../../assets/Iona.jpg'

import { useContactForm } from "../../hooks/useContactForm";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false)

  const { formData, setFormData, isLoading, result, submitForm } = useContactForm({
    email: ""
  });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const ok = await submitForm({ ...formData, name: "Send Updates" });
    if (ok) setSubscribed(true);
  };

  const services = [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile App Development", href: "/services/mobile-app-development" },
    { label: "AI/ML & Deep Learning", href: "/services/ai-ml-deep-learning" },
    { label: "Agentic AI Modelling", href: "/services/agentic-ai-modelling" },
    { label: "KPI Dashboards", href: "/services/kpi-monitoring-dashboards" },
    { label: "Custom Software Builds", href: "/services/custom-software-development" },
  ]

  const focus = [
    { label: "Education", href: "/#OurFocus" },
    { label: "Digital Health", href: "/#OurFocus" },
    { label: "Agri-Fintech", href: "/#OurFocus" },
    { label: "Impact in Uganda", href: "/#OurFocus" },
  ]

  const socials = [
    { Icon: Github, href: "https://github.com/ionatech2025", label: "GitHub" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/ionatech", label: "LinkedIn" },
    { Icon: Mail, href: "mailto:ionatec002@gmail.com", label: "Email" },
    { Icon: MessageCircle, href: "https://wa.me/256767896608", label: "WhatsApp" },
  ]

  return (
    <footer className="ion-section relative overflow-hidden">

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

      <div className="ion-aurora" aria-hidden="true" />
      <div className="ion-aurora ion-aurora-right" aria-hidden="true" />

      {/* CTA Banner */}
      <div className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="ion-badge mb-4">
              <span className="ion-live-dot" />
              <Zap size={10} />
              Open to new projects
            </div>
            <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight"
              style={{ letterSpacing: 0 }}>
              Have a project in mind?
            </h3>
            <p className="text-slate-400 mt-2 text-base">Let's turn your idea into a product.</p>
          </div>
          <a
            href="#contact"
            className="ion-primary-btn group shrink-0"
          >
            Start a conversation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand — wider col */}
          <div className="lg:col-span-4 flex flex-col gap-7">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10">
                <img src={Iona} alt="IONATECH" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
                <span className="text-xl font-black text-white">
                IONA<span className="text-cyan-300">TECH</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Web development, mobile app development, AI/ML, KPI dashboards and custom software engineering from Kampala, Uganda.
            </p>

            {/* Location badge */}
            <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
              <MapPin size={13} className="text-cyan-300" />
              Kampala, Uganda
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group w-10 h-10 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-cyan-300 hover:border-cyan-300/40 hover:bg-cyan-300/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold text-slate-500 mb-6">Services</p>
            <ul className="space-y-3.5">
              {services.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-cyan-300 transition-all duration-300 shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold text-slate-500 mb-6">Our Focus</p>
            <ul className="space-y-3.5">
              {focus.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-cyan-300 transition-all duration-300 shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <p className="text-xs font-bold text-slate-500 mb-6">Stay Connected</p>
            <div className="ion-panel p-6">
              <p className="text-white font-bold text-base mb-1">Get project updates</p>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Follow our latest impact work across Uganda and beyond.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold bg-emerald-500/10 border border-emerald-500/20 rounded-[8px] px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  You're in — thanks for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ email: e.target.value })}
                    placeholder="Enter email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-[8px] py-3 px-4 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-300/60 focus:bg-white/[0.08] transition-all"
                  />
                  <button disabled={isLoading}
                    type="submit"
                    className="ion-primary-btn group w-full"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  {result === "success" && <p className="text-emerald-400 text-sm">{result}</p>}
                  {result === "error" && <p className="text-red-400 text-sm">{result}</p>}
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {currentYear} IONATECH. Built with purpose in Kampala, Uganda.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <button
                key={item}
                type="button"
                disabled
                aria-label={`${item} (coming soon)`}
                className="text-slate-600 hover:text-slate-400 text-xs transition-colors disabled:cursor-not-allowed"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
