import React from "react";
import { Trophy, Rocket, ShieldCheck, ArrowRight, Quote } from "lucide-react";

const About = () => {
  const stats = [
    { icon: <Rocket size={20} />, label: "Innovation Led", detail: "Latest Tech Stacks" },
    { icon: <ShieldCheck size={20} />, label: "Secure Scalability", detail: "Enterprise Standards" },
    { icon: <Trophy size={20} />, label: "Excellence", detail: "Quality Focused" },
  ];

  return (
    <section
      id="about"
      className="relative py-20 lg:py-32 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Visuals */}
          <div className="relative group animate-fadeInLeft">
            <div className="absolute -inset-4 bg-blue-100/50 rounded-3xl blur-2xl group-hover:bg-blue-200/50 transition-colors" />
            <div className="relative">
              <img
                className="w-full h-[400px] lg:h-[600px] object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                src="/images/team_of_developers.jpg"
                alt="iONA Tech team collaborating"
              />
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold mb-1">100%</p>
                <p className="text-blue-100 text-sm font-medium">Client Commitment</p>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="flex flex-col gap-8 animate-fadeInRight">
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
                Who We Are
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-[1.1]">
                Turning Complex Ideas into <span className="text-blue-600">Powerful Software.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                At iONA Tech, we don't just write code; we architect digital futures. We understand that in a crowded market, your technology needs to be your greatest competitive advantage. We bridge the gap between creative design and robust engineering to help you <strong>make it big.</strong>
              </p>
            </div>

            {/* Benefit Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="text-blue-600 mb-2">{stat.icon}</div>
                  <p className="font-bold text-slate-900 text-sm">{stat.label}</p>
                  <p className="text-slate-500 text-xs">{stat.detail}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all group"
              >
                Work with our team <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInLeft { animation: fadeInLeft 1s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 1s ease-out forwards; }
      `}} />
    </section>
  );
};

export default About;