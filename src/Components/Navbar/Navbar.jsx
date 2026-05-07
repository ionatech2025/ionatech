import { useState, useEffect } from 'react'
import './Navbar.css'
import Iona from '../../assets/Iona.jpg'
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
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/#OurFocus', label: 'Our Focus' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/#testimonials-section', label: 'Team' }
  ]

  const handleNavClick = (event, href) => {
    const isHome = window.location.pathname === '/'

    if (href === '/' && isHome) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.pushState(null, '', '/')
    }

    if (href.startsWith('/#') && isHome) {
      const target = document.getElementById(href.slice(2))
      if (target) {
        event.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.pushState(null, '', href)
      }
    }

    closeMobileMenu()
  }

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Primary"
    >
        <div className="navbar-container">
          {/* Logo */}
        <a href="/" className="navbar-logo" onClick={(event) => handleNavClick(event, '/')}>
          <img src={Iona} alt="" aria-hidden="true" className="logo" />
          <span className="logo-text">IONATECH</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.href} className="navbar-item">
              <a
                href={item.href}
                className="navbar-link"
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Contact Button */}
        <div className="navbar-cta">
          <a
            href="/#contact_us"
            className='contact-button'
            onClick={(event) => handleNavClick(event, '/#contact_us')}
          >
            Contact Us
          </a>
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
            <a
              key={item.href}
              href={item.href}
              className="mobile-menu-link"
              onClick={(event) => handleNavClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#contact_us"
            className='mobile-contact-button'
            onClick={(event) => handleNavClick(event, '/#contact_us')}
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
