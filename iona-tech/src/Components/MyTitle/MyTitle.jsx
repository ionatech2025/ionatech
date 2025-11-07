import React from 'react'
import './MyTitle.css'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-scroll'

const MyTitle = () => {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs')
    if (programsSection) {
      programsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="mytitle-section">
      <div className="mytitle-container">
        <div className="mytitle-content">
          <div className="mytitle-badge" onClick={scrollToPrograms} style={{ cursor: 'pointer' }}>
            <Sparkles className="w-4 h-4" />
            <span>Our Services</span>
          </div>
          
          <h1 className="mytitle-heading">
            What We Offer
            <span className="mytitle-accent">:</span>
          </h1>
          
          <p className="mytitle-description">
            Comprehensive technology solutions designed to elevate your business and drive digital transformation
          </p>
          
          <div className="mytitle-cta">
            <button className="mytitle-button" onClick={scrollToPrograms}>
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="mytitle-button mytitle-button-secondary" onClick={scrollToAbout}>
              <span>Explore More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="mytitle-decoration">
          <div className="decoration-circle decoration-circle-1"></div>
          <div className="decoration-circle decoration-circle-2"></div>
          <div className="decoration-circle decoration-circle-3"></div>
        </div>
      </div>
    </section>
  )
}

export default MyTitle
