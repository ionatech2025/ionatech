import Navbar from './Components/Navbar/Navbar'
import Tech from './Components/Tech/Tech'
import Mission from './Components/Mission/Mission'
import Products from './Components/Products/Products'
import Team from './Components/Team/Team'
import Contacts from './Components/Contacts/Contacts'
import Footer from './Components/Footer/Footer'
import ClientTestimonials from './Components/ClientTestimonials/ClientTestimonials'
import ServicesPage from './Components/Services/ServicesPage'
import ServiceLandingPage, { ServicesIndexPage } from './Components/Services/ServiceLandingPage'
import Pricing from './Components/Pricing/Pricing'
import SEOHead from './Components/SEO/SEOHead'
import {
  buildHomeStructuredData,
  buildServiceStructuredData,
  buildServicesIndexStructuredData,
  getServiceByPath,
  homeSeo,
  normalizePath,
  servicesIndexSeo,
} from './data/seo'

const App = () => {
  const pathname = normalizePath(window.location.pathname)
  const service = getServiceByPath(pathname)

  if (service) {
    return (
      <>
        <SEOHead
          title={service.metaTitle}
          description={service.metaDescription}
          path={service.path}
          image={service.schemaImage}
          structuredData={buildServiceStructuredData(service)}
        />
        <ServiceLandingPage service={service} />
      </>
    )
  }

  if (pathname === '/services') {
    return (
      <>
        <SEOHead
          title={servicesIndexSeo.metaTitle}
          description={servicesIndexSeo.metaDescription}
          path={servicesIndexSeo.path}
          structuredData={buildServicesIndexStructuredData()}
        />
        <ServicesIndexPage />
      </>
    )
  }

  return (
    <div>
      <SEOHead
        title={homeSeo.metaTitle}
        description={homeSeo.metaDescription}
        path={homeSeo.path}
        structuredData={buildHomeStructuredData()}
      />
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
      <section id="OurFocus">
        <Products />
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <Pricing />
      </section>

      {/* Team Section */}
      <section id="testimonials-section">
        <Team />
      </section>

      {/* Contact Section */}
      <section id="contact_us">
        <Contacts />
      </section>

      {/*ClientTestimonials Section*/}
      <ClientTestimonials />

      <Footer />
    </div>
  )
}

export default App
