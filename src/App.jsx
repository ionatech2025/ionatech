import React from 'react'
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicSite from './PublicSite'
import AdminApp from './admin/AdminApp'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
=======
import Navbar from './Components/Navbar/Navbar'
import Tech from './Components/Tech/Tech'
import Mission from './Components/Mission/Mission'
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

      {/* Mission Section */}
      <section id="mission">
        <Mission />
      </section>

      {/* Services Section */}
      <section id="descrip">
        <ServicesPage />
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
>>>>>>> origin/first_improvements
  )
}

export default App
