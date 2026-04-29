import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Tech from './Components/Tech/Tech'
import About from './Components/About/About'
import Products from './Components/Products/Products'
import Testimonials from './Components/Testimonials/Testimonials'
import Contacts from './Components/Contacts/Contacts'
import Footer from './Components/Footer/Footer'
import ClientTestimonials from './Components/ClientTestimonials/ClientTestimonials'
import ServicesPage from './Components/Services/ServicesPage'

const App = () => {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero">
        <Tech />
      </section>

      {/* Services Section */}
      <section id="descrip">
        <ServicesPage />
      </section>

  

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Products Section */}
      <section id="MyProducts">
        <Products />
      </section>

      {/* Team Section */}
      <section id="testimonials-section">
        <Testimonials />
      </section>

      {/* Contact Section */}
      <section id="contact_us">
        <Contacts />
      </section>

      {/*ClientTestimonials Section*/}
      <ClientTestimonials/>

      <Footer />
    </div>
  )
}

export default App
