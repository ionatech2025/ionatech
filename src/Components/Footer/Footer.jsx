import React, { useState } from "react";
import { Github, Mail, MessageCircle, ArrowRight, MapPin, Zap } from "lucide-react";
import Iona from '../../assets/Iona.jpg'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  const services = [
    { label: "Web Development", href: "#" },
    { label: "AI Integration", href: "#" },
    { label: "Health Systems", href: "#" },
    { label: "Cloud Solutions", href: "#" },
  ]

  const focus = [
    { label: "Education", href: "#" },
    { label: "Digital Health", href: "#" },
    { label: "Agri-Fintech", href: "#" },
    { label: "Impact in Uganda", href: "#" },
  ]

  const socials = [
    { Icon: Github, href: "https://github.com/ionatech2025", label: "GitHub" },
    { Icon: Mail, href: "mailto:ionatec002@gmail.com", label: "Email" },
    { Icon: MessageCircle, href: "https://wa.me/256767896608", label: "WhatsApp" },
  ]

  return (
    <footer className="relative bg-[#06060f] overflow-hidden">

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* CTA Banner */}
      <div className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              <Zap size={10} />
              Open to new projects
            </div>
            <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight"
              style={{ letterSpacing: "-0.02em" }}>
              Have a project in mind?
            </h3>
            <p className="text-slate-400 mt-2 text-base">Let's turn your idea into a product.</p>
          </div>
          <a
            href="#contact"
            className="group shrink-0 inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-7 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-indigo-900/30"
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
                <img src={Iona} alt="iONA Tech" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                iONA <span className="text-indigo-400">Tech</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Architecting digital futures in Uganda through high-impact EdTech, Health, and AI-inclusive engineering.
            </p>

            {/* Location badge */}
            <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
              <MapPin size={13} className="text-indigo-500" />
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
                  className="group w-10 h-10 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/8 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Services</p>
            <ul className="space-y-3.5">
              {services.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-indigo-500 transition-all duration-300 shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Our Focus</p>
            <ul className="space-y-3.5">
              {focus.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-indigo-500 transition-all duration-300 shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Stay Connected</p>
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
              <p className="text-white font-bold text-base mb-1">Get project updates</p>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Follow our latest impact work across Uganda and beyond.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  You're in — thanks for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all"
                  />
                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Subscribe
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {currentYear} iONA Tech Ltd. Built with purpose in Kampala, Uganda.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-600 hover:text-slate-400 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;