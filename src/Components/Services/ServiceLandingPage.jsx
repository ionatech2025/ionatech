import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle,
  Cloud,
  Code,
  Monitor,
  Palette,
  Smartphone,
} from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import Contacts from '../Contacts/Contacts';
import Footer from '../Footer/Footer';
import { seoServices, servicesIndexSeo } from '../../data/seo';

const iconMap = {
  BarChart3,
  Bot,
  BrainCircuit,
  Cloud,
  Code,
  Monitor,
  Palette,
  Smartphone,
};

function ServiceIcon({ name, className = 'w-6 h-6' }) {
  const Icon = iconMap[name] || Code;
  return <Icon className={className} aria-hidden="true" />;
}

function ContactLink({ children, className = '' }) {
  return (
    <a
      href="#contact_us"
      className={`ion-primary-btn text-sm ${className}`}
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}

export function ServicesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#02040a] text-slate-100">
        <section className="ion-section px-6 pb-16 pt-32 text-white">
          <div className="ion-aurora" aria-hidden="true" />
          <div className="ion-aurora ion-aurora-right" aria-hidden="true" />
          <div className="mx-auto max-w-6xl">
            <p className="ion-badge mb-4">
              <span className="ion-live-dot" />
              IONATECH Services
            </p>
            <h1 className="ion-heading max-w-4xl">
              {servicesIndexSeo.h1}
            </h1>
            <p className="ion-copy mt-6 max-w-3xl">
              We build web platforms, mobile apps, AI/ML systems, agentic AI workflows, KPI
              monitoring dashboards, cloud integrations and custom software for teams that need
              reliable digital products.
            </p>
          </div>
        </section>

        <section className="ion-section px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {seoServices.map((service) => (
              <a
                key={service.slug}
                href={service.path}
                className="ion-card group p-6"
              >
                <div className="ion-icon-tile mb-5 text-white">
                  <ServiceIcon name={service.iconName} />
                </div>
                <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{service.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span key={feature} className="ion-chip text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
                  View {service.shortTitle}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="ion-section px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            <div>
              <p className="ion-badge">
                <span className="ion-live-dot" />
                Built for 2026 visibility
              </p>
              <h2 className="ion-heading mt-3 text-3xl">Technical SEO is part of the build.</h2>
            </div>
            <div className="md:col-span-2">
              <p className="ion-copy text-lg">
                We structure pages, code, metadata, service URLs, schema, responsive layouts and
                performance basics so every digital product has a stronger foundation for discovery.
                Search ranking still depends on competition, content quality and authority, but the
                engineering foundation should not hold the business back.
              </p>
            </div>
          </div>
        </section>

        <section id="contact_us">
          <Contacts />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ServiceLandingPage({ service }) {
  const related = seoServices.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-[#02040a] text-slate-100">
        <section className="ion-section px-6 pb-16 pt-32 text-white">
          <div className="ion-aurora" aria-hidden="true" />
          <div className="ion-aurora ion-aurora-right" aria-hidden="true" />
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <a href="/services" className="ion-badge mb-5">
                <span className="ion-live-dot" />
                Technology Services
              </a>
              <h1 className="ion-heading">{service.h1}</h1>
              <p className="ion-copy mt-6">{service.summary}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ContactLink>Request a project quote</ContactLink>
                <a
                  href="/services"
                  className="ion-secondary-btn text-sm"
                >
                  Compare services
                </a>
              </div>
            </div>
            <div className="ion-image-frame">
              <img
                src={service.image}
                alt={`${service.title} by IONATECH`}
                className="h-[320px] w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="ion-section px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="ion-icon-tile text-white">
                <ServiceIcon name={service.iconName} className="w-7 h-7" />
              </div>
              <h2 className="ion-heading mt-5 text-3xl">{service.title} Capabilities</h2>
              <p className="ion-copy mt-4">{service.description}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {service.outcomes.map((outcome) => (
                <div key={outcome} className="ion-card p-5">
                  <CheckCircle className="mb-4 h-5 w-5 text-amber-300" aria-hidden="true" />
                  <p className="font-semibold text-slate-100">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ion-section px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="ion-heading text-3xl">Technologies We Use</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {service.technologies.map((technology) => (
                  <span key={technology} className="ion-chip text-sm">
                    {technology}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="ion-heading text-3xl">Typical Deliverables</h2>
              <ul className="mt-6 grid gap-3">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="ion-section px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="ion-badge">
              <span className="ion-live-dot" />
              Questions clients ask
            </p>
            <h2 className="ion-heading mt-3 text-3xl">{service.title} FAQs</h2>
            <div className="mt-8 grid gap-5">
              {service.faq.map((item) => (
                <article key={item.question} className="ion-card p-6">
                  <h3 className="text-lg font-bold text-white">{item.question}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ion-section px-6 py-16 text-white">
          <div className="ion-aurora" aria-hidden="true" />
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <h2 className="ion-heading text-3xl">Build with IONATECH</h2>
              <p className="ion-copy mt-4">
                Tell us what you want to build, who it serves and what success should look like.
                We will help shape the scope, technical approach and delivery plan.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <ContactLink>Start the conversation</ContactLink>
            </div>
          </div>
        </section>

        <section className="ion-section px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white">Related Services</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <a key={item.slug} href={item.path} className="ion-card group p-5">
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
                    Learn more
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact_us">
          <Contacts />
        </section>
      </main>
      <Footer />
    </>
  );
}
