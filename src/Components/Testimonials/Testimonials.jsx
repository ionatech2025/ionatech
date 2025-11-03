"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./Testimonials.css"

const teamMembers = [
  {
    id: 1,
    name: "Nyombi Elijah",
    image: "/images/elijah.jpg?height=120&width=120",
    description:
      "Elijah Nyombi is one of the Directors for iONA Tech, a cutting-edge software company committed to driving innovation and providing impactful technological solutions. With a rich background in journalism, public health, and digital marketing communication, Elijah leads the company with a focus on digital transformation and high-quality software development.",
  },
  {
    id: 2,
    name: "Nakunda Lillian",
    image: "/images/lillian.jpg?height=120&width=120",
    description:
      "Nankunda Lilian, a young but innovative Software Engineering student at Makerere University - Uganda. As a young lady developer, I am currently practicing Systems Analyst, Web Developer, Mobile Developer and Graphic Designer in the tech space. I specialize in front-end web development and mobile development.",
  },
  {
    id: 3,
    name: "Baliddawa Allan",
    image: "/images/allanella.jpg?height=120&width=120",
    description:
      "I am a passionate and skilled Fullstack Web Developer with a strong background in both front-end and back-end development. I specialize in building responsive, user-friendly, and scalable web applications using modern technologies including ReactJS, Java (Spring Boot), and Node.js.",
  },
  {
    id: 4,
    name: "Mulungi Abigail",
    image: "/images/jordi.jpg?height=120&width=120",
    description:
      "Abigail is a passionate JavaScript developer with a keen eye for innovation. With a strong focus on crafting exceptional software experiences, she excels in designing and developing scalable web applications and desktop solutions.",
  },
  {
    id: 5,
    name: "Mpairwe Lauben",
    image: "/images/alien.jpg?height=120&width=120",
    description:
      "With over five years of hands-on experience, Mpairwe Lauben is a dynamic software engineer with a passion for crafting intelligent, scalable, and user-centric digital solutions. His core expertise lies at the intersection of mobile application development, cloud-native systems, and machine learning technologies.",
  },
  {
    id: 6,
    name: "Katongole Samuel",
    image: "/images/sam.jpg?height=120&width=120",
    description:
      "Samuel is a passionate Java Developer dedicated to crafting software that inspires progress and delivers value. Skilled in building intuitive, functional desktop and web applications, he combines technical expertise with a heart for service, collaboration and faith-driven purpose.",
  },
  {
    id: 7,
    name: "Amumpire Torren",
    image: "/images/torren.jpg?height=120&width=120",
    description:
      "As a digital enthusiast, AI activist and skilled graphics designer, I merge creativity with technological expertise to drive innovative solutions. I advocate for responsible AI development and harness its potential to enhance visual storytelling.",
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
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">Meet Our Team</h2>
          <p className="testimonials-subtitle">Talented individuals driving innovation and excellence in technology</p>
        </div>

        {/* Main Carousel */}
        <div className="carousel-container">
          {/* Navigation Buttons */}
          <button className="nav-button nav-button-prev" onClick={goToPrevious} aria-label="Previous team member">
            <ChevronLeft />
          </button>

          <button className="nav-button nav-button-next" onClick={goToNext} aria-label="Next team member">
            <ChevronRight />
          </button>

          {/* Carousel Container */}
          <div className="carousel-overflow">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {teamMembers.map((member) => (
                <div key={member.id} className="carousel-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-content">
                      {/* Profile Image */}
                      <div className="profile-image-container">
                        <img src={member.image || "/placeholder.svg"} alt={member.name} className="profile-image" />
                        <div className="profile-image-overlay"></div>
                      </div>

                      {/* Content */}
                      <div className="testimonial-text">
                        <h3 className="testimonial-name">{member.name}</h3>
                        <p className="testimonial-description">{member.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="dots-container">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to team member ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="autoplay-toggle">
            <button className="autoplay-button" onClick={() => setIsAutoPlaying(!isAutoPlaying)}>
              {isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"}
            </button>
          </div>
        </div>

        {/* Team Grid Preview */}
        <div className="team-grid-section">
          <h3 className="team-grid-title">Quick Team Overview</h3>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <button
                key={member.id}
                className={`team-grid-item ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`View ${member.name}'s profile`}
              >
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="team-grid-image" />
                <div className="team-grid-overlay">
                  <p className="team-grid-name">{member.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
