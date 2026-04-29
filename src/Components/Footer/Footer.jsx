import React from "react";
import { Github, Mail, MessageCircle, ArrowRight } from "lucide-react"; // Ensure MessageCircle is imported

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 pt-20 pb-10 px-6 overflow-hidden border-t border-white/5">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">
                i
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">iONA <span className="text-blue-500">Tech</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Architecting digital futures in Uganda through high-impact EdTech, Health, and AI-inclusive engineering.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Github, href: "https://github.com/ionatech2025" },
                { Icon: Mail, href: "mailto:ionatec002@gmail.com" },
                { Icon: MessageCircle, href: "https://wa.me/256767896608" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              {['Web Development', 'AI Integration', 'Health Systems', 'Cloud Solutions'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-blue-500 mr-0 group-hover:mr-2 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact Areas */}
          <div>
            <h4 className="text-white font-bold mb-6">Our Focus</h4>
            <ul className="space-y-4">
              {['Education', 'Digital Health', 'Agri-Fintech', 'Impact in Uganda'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h4 className="text-white font-bold mb-2">Stay Connected</h4>
            <p className="text-slate-400 text-sm mb-4">Get the latest on our impact projects.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {currentYear} iONA Tech. Based in Kampala, Uganda.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;