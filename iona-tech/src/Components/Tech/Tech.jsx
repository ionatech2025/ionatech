import React from 'react'
import './Tech.css'
import { Sparkles, ArrowRight, Rocket, Users, Target } from 'lucide-react'
import { Link } from 'react-scroll'

const Tech = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
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
      linkTo: "MyProducts"
    }
  ]

  return (
    <section className="tech-section">
      <div className="tech-background">
        <div className="tech-overlay"></div>
      </div>
      
      <div className="tech-container">
        <div className="tech-content">
          {/* Header */}
          <div className="tech-header">
            <div className="tech-badge">
              <Sparkles className="w-4 h-4" />
              <span>iONA Tech</span>
            </div>
            
            <h1 className="tech-title">
              Let's create something 
              <span className="tech-accent"> extraordinary</span> 
              <span className="tech-accent">  </span> 
               together!
            </h1>
            
            <p className="tech-description">
              At iONA Tech, we believe in turning ideas into reality. Whether you're a startup, a growing business, 
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
            
            <div className="tech-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tech
