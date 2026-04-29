import React, { useState } from 'react'
import {
  Sparkles, ArrowRight, X, CheckCircle,
  Star, Clock, Award,
} from 'lucide-react'
import { services as fallbackServices } from '../../data/services'
import { getIcon } from '../../data/iconRegistry'
import { useContent, mergeBySlug } from '../../lib/api'

const renderServiceIcon = (service) => {
  const Icon = getIcon(service.iconName)
  if (!Icon) return null
  return <Icon className={`w-8 h-8 ${service.colorClass || ''}`} />
}

const ServicesPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const liveServices = useContent('services', null)
  const services = liveServices ? mergeBySlug(liveServices, fallbackServices) : fallbackServices
  const programs = services.filter((s) => s.published)

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-36 bg-white">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="max-w-4xl">
            <div 
              onClick={() => scrollToSection('programs')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 cursor-pointer hover:bg-blue-100 transition-all mx-auto shadow-sm"
            >
              <Sparkles size={16} />
              <span>Our Services</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              What We Offer<span className="text-blue-600">:</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Comprehensive technology solutions designed to elevate your business and drive digital transformation through innovation and expert craftsmanship.
            </p>
            
            <div className="flex flex-wrap justify-center gap-5">
              <button 
                onClick={() => scrollToSection('programs')}
                className="flex items-center gap-2 bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group"
              >
                Explore Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="flex items-center gap-2 bg-white border-2 border-slate-200 px-10 py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all text-slate-700 shadow-sm"
              >
                Our Story <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[120px] opacity-60" />
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">Our Programs</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-xl mx-auto text-lg text-center">
              Tailored development services designed to meet the unique challenges of your industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program) => (
              <div key={program.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-8">
                    <div className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl text-white border border-white/30">
                      {renderServiceIcon(program)}
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    {program.iconImage && (
                      <img src={program.iconImage} alt="" className="w-7 h-7 object-contain" />
                    )}
                    <h3 className="text-2xl font-bold text-slate-900">{program.title}</h3>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                    {program.description}
                  </p>
                  
                  <div className="space-y-3 mb-10 mt-auto">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                        <CheckCircle size={16} className="text-blue-500" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedProgram(program)}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 group"
                  >
                    Details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Section */}
      {selectedProgram && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedProgram(null)}
              className="absolute top-8 right-8 p-3 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 transition-all z-20"
            >
              <X size={24} />
            </button>

            <div className="p-10 lg:p-16">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
                <div className="p-5 bg-blue-50 rounded-[2rem] text-blue-600 shadow-inner">
                  {renderServiceIcon(selectedProgram)}
                </div>
                <div>
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-2">{selectedProgram.title}</h2>
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest">
                    <Award size={16} /> Premium Service
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                      <Star size={20} className="text-yellow-500 fill-yellow-500" /> Service Overview
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {selectedProgram.details.overview}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 text-slate-800">Core Benefits</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedProgram.details.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                           <CheckCircle size={18} className="text-green-500" /> 
                           <span className="font-semibold">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                      <Code size={20} className="text-blue-600" /> Technologies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProgram.details.technologies.map((tech, i) => (
                        <span key={i} className="px-5 py-2.5 bg-blue-50 rounded-xl text-sm font-bold text-blue-700 border border-blue-100">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-900 rounded-3xl text-white">
                    <h4 className="font-bold mb-2 flex items-center gap-2"><Clock size={16}/> Ready to Start?</h4>
                    <p className="text-slate-400 text-sm mb-6">Our average project kickoff time is 48 hours.</p>
                    <button 
                      onClick={() => {
                        setSelectedProgram(null);
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      Hire Us Now <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServicesPage