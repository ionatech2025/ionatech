import Navbar from './Components/Navbar/Navbar'
import Tech from './Components/Tech/Tech'
import About from './Components/About/About'
import Products from './Components/Products/Products'
import Testimonials from './Components/Testimonials/Testimonials'
import Contacts from './Components/Contacts/Contacts'
import Footer from './Components/Footer/Footer'
import ClientTestimonials from './Components/ClientTestimonials/ClientTestimonials'
import ServicesPage from './Components/Services/ServicesPage'
import Pricing from './Components/Pricing/Pricing'

const PublicSite = () => {
  return (
    <div className="site-theme">
      <Navbar />

      <section id="hero">
        <Tech />
      </section>

      <section id="descrip">
        <ServicesPage />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="OurFocus">
        <Products />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="testimonials-section">
        <Testimonials />
      </section>

      <section id="contact_us">
        <Contacts />
      </section>

      <ClientTestimonials />

      <Footer />
    </div>
  )
}

export default PublicSite
