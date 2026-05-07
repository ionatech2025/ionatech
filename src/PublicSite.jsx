import { useLocation } from 'react-router-dom'
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

const PublicSite = () => {
  const { pathname } = useLocation()
  const normalizedPath = normalizePath(pathname)
  const service = getServiceByPath(normalizedPath)

  if (service) {
    return (
      <>
        <SEOHead
          title={service.metaTitle}
          description={service.metaDescription}
          path={service.path}
          structuredData={buildServiceStructuredData(service)}
        />
        <ServiceLandingPage service={service} />
      </>
    )
  }

  if (normalizedPath === '/services') {
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
    <div className="site-theme">
      <SEOHead
        title={homeSeo.metaTitle}
        description={homeSeo.metaDescription}
        path={homeSeo.path}
        structuredData={buildHomeStructuredData()}
      />
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
