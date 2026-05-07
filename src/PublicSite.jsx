import Navbar from './Components/Navbar/Navbar'
import Tech from './Components/Tech/Tech'
import Mission from './Components/Mission/Mission'
import Products from './Components/Products/Products'
import Team from './Components/Team/Team'
import Contacts from './Components/Contacts/Contacts'
import Footer from './Components/Footer/Footer'
import ClientTestimonials from './Components/ClientTestimonials/ClientTestimonials'
import ServicesPage from './Components/Services/ServicesPage'
import Pricing from './Components/Pricing/Pricing'

const PublicSite = () => {
  return (
    <div>
      <Navbar />

      <section id="hero">
        <Tech />
      </section>

      <section id="mission">
        <Mission />
      </section>

      <section id="descrip">
        <ServicesPage />
      </section>

      <section id="OurFocus">
        <Products />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="testimonials-section">
        <Team />
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
