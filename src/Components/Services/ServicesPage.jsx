import React, { useState } from 'react'
import {
  Sparkles, ArrowRight, Code, Smartphone,
  Palette, Monitor, X, CheckCircle,
  Star, Clock, Award, Zap, Users, TrendingUp
} from 'lucide-react'

// Asset Imports
import coda from '../../assets/coda.jpg'
import mobile from '../../assets/mobile.jpeg'
import graphics from '../../assets/graphics.jpeg'
import Pc from '../../assets/Pc.jpg'
import AppDev from '../../assets/AppDev.png'
import phoneApp from '../../assets/phoneApp.png'
import ManDesk from '../../assets/ManDesk.png'

const ServicesPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "200+", label: "Clients Served" },
    { icon: <Zap className="w-5 h-5" />, value: "500+", label: "Projects Delivered" },
    { icon: <TrendingUp className="w-5 h-5" />, value: "98%", label: "Client Satisfaction" },
  ]

  const programs = [
    {
      id: 1,
      image: coda,
      icon: AppDev,
      title: "Web Development",
      tagline: "Build Your Digital Presence",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies that scale with your business.",
      features: ["React & Next.js", "Node.js Backend", "Database Design", "API Integration"],
      iconComponent: <Code className="w-6 h-6" />,
      accentColor: "from-blue-500 to-cyan-500",
      bgAccent: "bg-blue-500",
      details: {
        overview: "Transform your digital presence with our comprehensive web development services. We focus on speed, security, and scalability to deliver solutions that drive real business results.",
        technologies: ["React.js", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "AWS"],
        benefits: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure & Scalable"]
      }
    },
    {
      id: 2,
      image: mobile,
      icon: phoneApp,
      title: "Mobile Development",
      tagline: "Apps That Users Love",
      description: "Cross-platform mobile applications for iOS and Android that deliver seamless experiences and drive engagement.",
      features: ["React Native", "Flutter", "App Store Deployment", "Push Notifications"],
      iconComponent: <Smartphone className="w-6 h-6" />,
      accentColor: "from-violet-500 to-purple-500",
      bgAccent: "bg-violet-500",
      details: {
        overview: "Build powerful mobile applications that engage users and drive results. We handle everything from design to App Store launch with a focus on performance and user experience.",
        technologies: ["React Native", "Flutter", "Firebase", "Swift", "Kotlin"],
        benefits: ["Native Performance", "Offline Capabilities", "User-Centric UX", "Analytics Built-in"]
      }
    },
    {
      id: 3,
      image: graphics,
      icon: ManDesk,
      title: "Graphics Design",
      tagline: "Design That Converts",
      description: "Creative visual solutions including branding, UI/UX design, and marketing materials that capture attention.",
      features: ["Brand Identity", "UI/UX Design", "Digital Marketing", "Motion Graphics"],
      iconComponent: <Palette className="w-6 h-6" />,
      accentColor: "from-rose-500 to-pink-500",
      bgAccent: "bg-rose-500",
      details: {
        overview: "Create stunning visual experiences that captivate your audience and build brand authority. Our designs are strategic, not just aesthetic.",
        technologies: ["Figma", "Adobe Creative Suite", "After Effects", "Blender"],
        benefits: ["Brand Consistency", "Professional Quality", "Modern Aesthetics", "Conversion Focused"]
      }
    },
    {
      id: 4,
      image: Pc,
      icon: ManDesk,
      title: "Desktop Applications",
      tagline: "Enterprise-Grade Software",
      description: "Powerful software solutions for Windows, macOS, and Linux built for performance and reliability.",
      features: ["Cross-Platform", "Native Performance", "System Integration", "Auto-Updates"],
      iconComponent: <Monitor className="w-6 h-6" />,
      accentColor: "from-emerald-500 to-teal-500",
      bgAccent: "bg-emerald-500",
      details: {
        overview: "Develop robust desktop applications designed for heavy performance and deep system integration. Perfect for enterprise workflows and specialized tools.",
        technologies: ["Electron", "Tauri", "Python", "C++", "Rust"],
        benefits: ["Data Security", "Native Feel", "Offline Reliability", "Enterprise Ready"]
      }
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
              onClick={() => scrollToSection('programs')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-blue-300 text-sm font-medium mb-8 cursor-pointer hover:bg-white/15 transition-all"
            >
              <Sparkles size={14} />
              <span>Professional Services</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
              Solutions That Drive{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Real Results
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              We build digital products that transform businesses. From concept to launch,
              our team delivers excellence at every step.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex items-center justify-center gap-2 text-blue-400 mb-1">
                    {stat.icon}
                    <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => scrollToSection('programs')}
                className="group flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-all shadow-lg shadow-white/10"
              >
                Explore Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
              Our Programs
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              What We Build
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              Tailored development services designed to meet the unique challenges of your industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {programs.map((program) => (
              <div
                key={program.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50"
                onMouseEnter={() => setHoveredCard(program.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Content */}
                <div className="flex flex-col md:flex-row">
                  {/* Image Side */}
                  <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.accentColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                    {/* Icon Badge */}
                    <div className={`absolute bottom-4 left-4 p-3 ${program.bgAccent} rounded-xl text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
                      {program.iconComponent}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col">
                    <div className="mb-auto">
                      <p className={`text-sm font-semibold bg-gradient-to-r ${program.accentColor} bg-clip-text text-transparent mb-2`}>
                        {program.tagline}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                        {program.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        {program.description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {program.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs text-slate-600"
                          >
                            <CheckCircle size={14} className={`${program.bgAccent.replace('bg-', 'text-')}`} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProgram(program)}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r ${program.accentColor} text-white font-semibold transition-all shadow-lg opacity-90 hover:opacity-100 hover:shadow-xl group/btn`}
                    >
                      View Details
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Let&apos;s discuss how we can help transform your ideas into reality.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-all shadow-lg"
            >
              Get in Touch <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Modal Section */}
      {selectedProgram && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm"
          onClick={() => setSelectedProgram(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'modalIn 0.3s ease-out' }}
          >
            <style>{`
              @keyframes modalIn {
                from { opacity: 0; transform: scale(0.95) translateY(20px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>

            {/* Modal Header */}
            <div className={`relative p-8 bg-gradient-to-r ${selectedProgram.accentColor}`}>
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl text-white">
                  {selectedProgram.iconComponent}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-1">
                    <Award size={14} /> Premium Service
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedProgram.title}</h2>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-800">
                  <Star size={18} className="text-amber-500 fill-amber-500" /> Overview
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {selectedProgram.details.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2">
                    <Code size={18} className={selectedProgram.bgAccent.replace('bg-', 'text-')} />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.details.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-medium text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-slate-800">Key Benefits</h3>
                  <div className="space-y-2">
                    {selectedProgram.details.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-slate-600"
                      >
                        <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={18} className="text-slate-400" />
                  <div>
                    <p className="font-semibold text-slate-800">Ready to get started?</p>
                    <p className="text-sm text-slate-500">Average project kickoff in 48 hours</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedProgram(null);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3.5 bg-gradient-to-r ${selectedProgram.accentColor} rounded-xl text-white font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2`}
                >
                  Start Your Project <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServicesPage
