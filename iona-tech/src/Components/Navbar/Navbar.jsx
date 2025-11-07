import React, { useState, useEffect } from 'react'
import './Navbar.css'
import Iona from '../../assets/Iona.jpg'
import menuIcon from '../../assets/menuIcon.png'
import { Link } from 'react-scroll'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const ToggleMenu = () => {
    setMobileMenu(!mobileMenu)
  }

  const closeMobileMenu = () => {
    setMobileMenu(false)
  }

  const navItems = [
    { to: 'hero', label: 'Home' },
    { to: 'programs', label: 'Programs' },
    { to: 'MyProducts', label: 'Products' },
    { to: 'testimonials-section', label: 'Team' },
    { to: 'descrip', label: 'Services' }
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={Iona} alt="iONA Tech" className="logo" />
          <span className="logo-text">iONA Tech</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.to} className="navbar-item">
              <Link 
                to={item.to} 
                smooth={true} 
                offset={-80} 
                duration={500}
                className="navbar-link"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact Button */}
        <div className="navbar-cta">
          <Link 
            to='contact_us' 
            smooth={true} 
            offset={-80} 
            duration={500} 
            className='contact-button'
            onClick={closeMobileMenu}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={ToggleMenu}>
          {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenu ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item) => (
            <Link 
              key={item.to}
              to={item.to} 
              smooth={true} 
              offset={-80} 
              duration={500}
              className="mobile-menu-link"
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
          <Link 
            to='contact_us' 
            smooth={true} 
            offset={-80} 
            duration={500} 
            className='mobile-contact-button'
            onClick={closeMobileMenu}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
