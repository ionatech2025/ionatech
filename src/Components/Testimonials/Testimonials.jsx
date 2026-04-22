"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react"
import "./Testimonials.css"

const teamMembers = [
  {
    id: 1,
    name: "Nyombi Elijah",
    role: "Director | Co-founder",
    image: "/images/elijah.jpg",
    description:
      "Elijah Nyombi is one of the Directors and Co-founders for iONA Tech, a cutting-edge software company committed to driving innovation and providing impactful technological solutions. With a rich background in journalism, public health, and digital marketing communication, Elijah leads the company with a focus on digital transformation and high-quality software development.",
  },
  {
    id: 2,
    name: "Nakunda Lillian",
    role: "Software Engineer | Co-founder",
    image: "/images/lillian.jpg",
    description:
      "Lillian is an innovative Software Engineering student at Makerere University and a Co-founder at iONA Tech. As a versatile developer, she serves as a Systems Analyst, Web Developer, and Graphic Designer. She specializes in crafting high-quality front-end web experiences and mobile applications, bringing a fresh, modern perspective to the tech space.",
  },
  {
    id: 3,
    name: "Baliddawa Allan",
    role: "Director | Co-founder",
    image: "/images/allanella.jpg",
    description:
      "Allan is a Director, Co-founder, and a passionate, skilled Fullstack Web Developer with a strong background in both front-end and back-end development. He specializes in building responsive, user-friendly, and scalable web applications using modern technologies including ReactJS, Java (Spring Boot), and Node.js.",
  },
  {
    id: 4,
    name: "Mulungi Abigail",
    role: "JavaScript Developer | Co-founder",
    image: "/images/jordi.jpg",
    description:
      "Abigail is a passionate JavaScript developer and Co-founder with a keen eye for innovation. With a strong focus on crafting exceptional software experiences, she excels in designing and developing scalable web applications and desktop solutions.",
  },
  {
    id: 5,
    name: "Mpairwe Lauben",
    role: "Software Engineer | Co-founder",
    image: "/images/alien.jpg",
    description:
      "With over five years of hands-on experience, Mpairwe Lauben is a dynamic software engineer and Co-founder with a passion for crafting intelligent, scalable, and user-centric digital solutions. His core expertise lies at the intersection of mobile application development, cloud-native systems, and machine learning technologies.",
  },
  {
    id: 6,
    name: "Katongole Samuel",
    role: "Director | Co-founder",
    image: "/images/sam.jpg",
    description:
      "Samuel is a Director and Co-founder, and a passionate Java Developer dedicated to crafting software that inspires progress and delivers value. Skilled in building intuitive, functional desktop and web applications, he combines technical expertise with a heart for service, collaboration and faith-driven purpose.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? teamMembers.length - 1 : currentIndex - 1)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === teamMembers.length - 1 ? 0 : currentIndex + 1)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="testimonials-section py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        
        {/* Header - Centered */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Talented individuals driving innovation and excellence in technology
          </p>
        </div>

        {/* Main Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Navigation Buttons */}
          <button 
            className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all hidden md:flex" 
            onClick={goToPrevious}
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all hidden md:flex" 
            onClick={goToNext}
          >
            <ChevronRight size={24} />
          </button>

          {/* Card Content */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-100">
            <div 
              className="flex transition-transform duration-700 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {teamMembers.map((member) => (
                <div key={member.id} className="w-full flex-shrink-0 p-8 lg:p-16 flex flex-col items-center text-center">
                  
                  {/* Profile Image */}
                  <div className="relative mb-8">
                    <div className="w-32 h-32 lg:w-40 h-40 rounded-full overflow-hidden border-4 border-blue-50 shadow-inner">
                      <img 
                        src={member.image || "/placeholder.svg"} 
                        alt={member.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="absolute -bottom-2 right-4 bg-blue-600 p-2 rounded-full text-white shadow-md">
                      <Quote size={16} fill="white" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="max-w-2xl">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-6 uppercase tracking-widest text-xs">{member.role}</p>
                    <p className="text-slate-600 text-lg leading-relaxed italic">
                      "{member.description}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators & Autoplay */}
          <div className="flex flex-col items-center mt-10 gap-6">
            <div className="flex gap-3">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex ? "w-10 h-2 bg-blue-600" : "w-2 h-2 bg-slate-300"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            
            <button 
              className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest" 
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Resume</>}
            </button>
          </div>
        </div>

        {/* Thumbnail Preview Grid */}
        <div className="mt-20 pt-10 border-t border-slate-200">
          <h4 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Quick Select</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {teamMembers.map((member, index) => (
              <button
                key={member.id}
                onClick={() => goToSlide(index)}
                className={`group relative rounded-full p-1 transition-all duration-500 ${
                  index === currentIndex ? "ring-2 ring-blue-600 ring-offset-2 scale-110" : "grayscale opacity-40 hover:opacity-100 hover:grayscale-0"
                }`}
              >
                <img 
                  src={member.image || "/placeholder.svg"} 
                  alt={member.name} 
                  className="w-12 h-12 rounded-full object-cover shadow-sm" 
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}