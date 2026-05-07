import { useState, useEffect } from 'react'
import './Navbar.css'
import Iona from '../../assets/Iona.jpg'
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

  // Updated Navigation Items
  const navItems = [
    { to: 'hero', label: 'Home' },
    { to: 'programs', label: 'Services' }, // Pointing to the merged section ID
    { to: 'OurFocus', label: 'Our Focus' },
    { to: 'pricing', label: 'Pricing' },
    { to: 'testimonials-section', label: 'Team' }
  ]

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Primary"
    >
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={Iona} alt="" aria-hidden="true" className="logo" />
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
        <button
          type="button"
          className="mobile-menu-button"
          onClick={ToggleMenu}
          aria-expanded={mobileMenu}
          aria-controls="mobile-menu"
          aria-label={mobileMenu ? 'Close menu' : 'Open menu'}
        >
          {mobileMenu ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${mobileMenu ? 'active' : ''}`}
        aria-hidden={!mobileMenu}
      >
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
