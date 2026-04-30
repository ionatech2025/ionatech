import React, { useEffect, useRef } from 'react'
import './Tech.css'
import { Sparkles, ArrowRight, Rocket, Users, Target, Briefcase, Clock, Award } from 'lucide-react'
import { Link } from 'react-scroll'

const Tech = () => {
  const canvasRef = useRef(null)

  // Network particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = Math.random() * 1.5 + 0.5
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 204, 255, 0.4)'
        ctx.fill()
      }
    }

    // Create particles
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000))
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Draw connections
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 204, 255, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      drawConnections()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('ourFocus')
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const features = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Innovation First",
      description: "Cutting-edge technology solutions that drive your business forward",
      linkTo: "programs"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Team",
      description: "Skilled professionals with years of experience in digital transformation",
      linkTo: "testimonials-section"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Results Driven",
      description: "Focused on delivering measurable outcomes and business value",
      linkTo: "OurFocus"
    }
  ]

  const stats = [
    {
      icon: <Briefcase className="w-5 h-5" />,
      number: "50+",
      label: "Projects Completed"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      number: "5+",
      label: "Years Experience"
    },
    {
      icon: <Award className="w-5 h-5" />,
      number: "100%",
      label: "Client Satisfaction"
    }
  ]

  return (
    <section className="tech-section">
      {/* Deep charcoal background with gradient glow */}
      <div className="tech-background">
        <div className="tech-gradient-glow tech-gradient-glow-1"></div>
        <div className="tech-gradient-glow tech-gradient-glow-2"></div>
      </div>

      {/* Network particle canvas */}
      <canvas ref={canvasRef} className="tech-particles-canvas"></canvas>

      <div className="tech-container">
        <div className="tech-content">
          {/* Header */}
          <div className="tech-header">
            <div className="tech-badge">
              <Sparkles className="w-4 h-4" />
              <span>iONA Tech</span>
            </div>

            <h1 className="tech-title">
              Let&apos;s create something
              <span className="tech-accent"> extraordinary</span>
              <span className="tech-accent">  </span>
              together!
            </h1>

            <p className="tech-description">
              At iONA Tech, we believe in turning ideas into reality. Whether you&apos;re a startup, a growing business,
              or an established brand, we are here to help you stand out, connect, and thrive in the digital space.
            </p>
          </div>

          {/* Features Grid */}
          <div className="tech-features">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.linkTo}
                smooth={true}
                offset={-80}
                duration={500}
                className="tech-feature-link"
              >
                <div className="tech-feature">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <div className="feature-arrow">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="tech-cta">
            <button className="tech-button" onClick={scrollToAbout}>
              <span>Explore More</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Enhanced Stats Cards with Glassmorphism */}
            <div className="tech-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-card-glow"></div>
                  <div className="stat-card-content">
                    <div className="stat-icon">
                      {stat.icon}
                    </div>
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tech
