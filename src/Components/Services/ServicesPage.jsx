import { useEffect, useState } from 'react'
import {
  Sparkles, ArrowRight, Code, Smartphone,
  Palette, Monitor, X, CheckCircle,
  Star, Clock, Award, Zap, Users, TrendingUp,
  BrainCircuit, Bot, BarChart3, Cloud
} from 'lucide-react'
import { seoServices } from '../../data/seo'

const iconMap = {
  BarChart3,
  Bot,
  BrainCircuit,
  Cloud,
  Code,
  Monitor,
  Palette,
  Smartphone,
}

function ServiceIcon({ name, className = 'w-6 h-6' }) {
  const Icon = iconMap[name] || Code
  return <Icon className={className} aria-hidden="true" />
}

const ServicesPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null)

  useEffect(() => {
    if (!selectedProgram) return
    const onKey = (e) => { if (e.key === 'Escape') setSelectedProgram(null) }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [selectedProgram])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "8", label: "Service Lines" },
    { icon: <Zap className="w-5 h-5" />, value: "50+", label: "Projects Delivered" },
    { icon: <TrendingUp className="w-5 h-5" />, value: "98%", label: "Client Satisfaction" },
  ]

  const programs = seoServices.map((service) => ({
    ...service,
    iconComponent: <ServiceIcon name={service.iconName} />,
  }))

  return (
    <div className="bg-[#02040a] font-sans text-slate-100">

      {/* Hero Section */}
      <section className="ion-section py-20 lg:py-28">
        <div className="ion-aurora" aria-hidden="true" />
        <div className="ion-aurora ion-aurora-right" aria-hidden="true" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <button
              type="button"
              onClick={() => scrollToSection('programs')}
              className="ion-badge mb-8 cursor-pointer hover:bg-white/10"
            >
              <span className="ion-live-dot" />
              <Sparkles size={14} />
              <span>Professional Services</span>
            </button>

            <h2 className="ion-heading mb-6 text-white">
              Web, Mobile, AI and Dashboard Services That Drive{' '}
              <span className="ion-heading-accent">
                Real Results
              </span>
            </h2>

            <p className="ion-copy mb-10 max-w-2xl mx-auto">
              We build search-ready websites, native and Flutter mobile apps, AI/ML systems,
              agentic workflows, KPI dashboards and custom software products for growing teams.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="ion-card flex min-w-[150px] flex-col items-center justify-center gap-1 p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-cyan-300">
                    {stat.icon}
                    <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => scrollToSection('programs')}
                className="ion-primary-btn group"
              >
                Explore Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="ion-secondary-btn"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="ion-section py-20 lg:py-28">
        <div className="ion-aurora ion-aurora-right" aria-hidden="true" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="ion-badge mb-4">
              <span className="ion-live-dot" />
              Our Services
            </span>
            <h2 className="ion-heading mb-4">
              What We Build for Companies
            </h2>
            <p className="ion-copy max-w-3xl mx-auto">
              Tailored technology services for web development, mobile app development, AI/ML,
              deep learning, monitoring dashboards, APIs, cloud systems and custom business tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {programs.map((program) => (
              <div
                key={program.slug}
                className="ion-card group relative overflow-hidden transition-all duration-500"
              >
                {/* Card Content */}
                <div className="flex flex-col md:flex-row">
                  {/* Image Side */}
                  <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                    <img
                      src={program.image}
                      alt={`${program.title} services by iONA TECH`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-slate-950/35 opacity-100 transition-opacity duration-500" />

                    {/* Icon Badge */}
                    <div className="ion-icon-tile absolute bottom-4 left-4 transform transition-transform duration-300 group-hover:scale-110">
                      {program.iconComponent}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col">
                    <div className="mb-auto">
                      <p className="text-sm font-semibold text-cyan-300 mb-2">
                        {program.tagline}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                        {program.title}
                      </h3>
                      <p className="text-slate-300/75 text-sm leading-relaxed mb-6">
                        {program.description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {program.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs text-slate-300"
                          >
                            <CheckCircle size={14} className="text-amber-300" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedProgram(program)}
                        className="ion-primary-btn group/btn"
                      >
                        Quick View
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <a
                        href={program.path}
                        className="ion-secondary-btn"
                      >
                        Service Page
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ion-section py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[0.85fr_1.15fr] items-start">
            <div>
              <span className="ion-badge mb-4">
                <span className="ion-live-dot" />
                2026 Search-Ready Engineering
              </span>
              <h2 className="ion-heading text-3xl md:text-4xl">
                Built for discovery, speed and measurable business outcomes.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Technical SEO for company websites, service pages and landing pages',
                'Native Android, Kotlin, iOS, Swift, Flutter and React Native app builds',
                'AI/ML, deep learning, agentic AI modelling and workflow automation',
                'KPI dashboards, monitoring dashboards, reporting systems and custom builds',
              ].map((item) => (
                <div key={item} className="ion-card flex gap-3 p-4">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-amber-300" />
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ion-section py-20">
        <div className="ion-aurora" aria-hidden="true" />
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="ion-heading text-3xl md:text-4xl mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="ion-copy mb-8">
              Let&apos;s discuss your web, mobile, AI, dashboard or custom software project.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="ion-primary-btn"
            >
              Get in Touch <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Modal Section */}
      {selectedProgram && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#02040a]/90 backdrop-blur-sm"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => setSelectedProgram(null)}
            className="absolute inset-0 w-full h-full cursor-default focus:outline-none"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="ion-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            style={{ animation: 'modalIn 0.3s ease-out' }}
          >
            <style>{`
              @keyframes modalIn {
                from { opacity: 0; transform: scale(0.95) translateY(20px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>

            {/* Modal Header */}
            <div className="relative p-8 border-b border-white/10">
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 p-2 rounded-[8px] bg-white/10 hover:bg-white/15 text-white transition-all"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4">
                <div className="ion-icon-tile text-white">
                  {selectedProgram.iconComponent}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-1">
                    <Award size={14} /> Premium Service
                  </div>
                  <h2 id="service-modal-title" className="text-2xl md:text-3xl font-bold text-white">{selectedProgram.title}</h2>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 text-slate-200">
              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-white">
                  <Star size={18} className="text-amber-500 fill-amber-500" /> Overview
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {selectedProgram.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                    <Code size={18} className="text-cyan-300" />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="ion-chip text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-white">Key Benefits</h3>
                  <div className="space-y-2">
                    {selectedProgram.outcomes.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-slate-300"
                      >
                        <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="ion-card mt-8 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={18} className="text-cyan-300" />
                  <div>
                    <p className="font-semibold text-white">Ready to get started?</p>
                    <p className="text-sm text-slate-400">Average project kickoff in 48 hours</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedProgram(null);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="ion-primary-btn w-full"
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
