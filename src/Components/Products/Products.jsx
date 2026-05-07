import './Products.css';
import {
  GraduationCap,
  Brain,
  ShieldCheck,
  Landmark,
  Sparkles
} from 'lucide-react';

const Products = () => {
  const focusAreas = [
    {
      id: 1,
      image: '/images/TechGal.jpg',
      title: 'Transformative Education',
      subtitle: 'EdTech',
      description: 'Build collaborative hubs and mentorship platforms that scale human capital. We architect the next generation of digital learning for Africa\'s youth, leveraging frameworks like Scholaria to create immersive educational ecosystems.',
      icon: <GraduationCap className="w-6 h-6" />,
      impact: 'Strategic Impact',
      keywords: ['Collaborative Hubs', 'Mentorship Platforms', 'Scholaria Framework'],
    },
    {
      id: 2,
      image: '/images/LightCode.jpeg',
      title: 'AI-Inclusive Systems',
      subtitle: 'Intelligent Automation',
      description: 'Integrate intelligent automation into local business workflows and research. We deliver accessible AI solutions that solve real-world operational bottlenecks, tailored for the regional context and scalable across industries.',
      icon: <Brain className="w-6 h-6" />,
      impact: 'Strategic Impact',
      keywords: ['Intelligent Automation', 'Workflow Integration', 'Accessible AI'],
    },
    {
      id: 3,
      image: '/images/Info.jpg',
      title: 'Digital Health & Data Security',
      subtitle: 'Health Informatics',
      description: 'Develop secure, resilient health informatics and patient data systems. Our advanced software architecture ensures data integrity through robust encryption protocols, improving regional healthcare delivery and compliance.',
      icon: <ShieldCheck className="w-6 h-6" />,
      impact: 'Strategic Impact',
      keywords: ['Health Informatics', 'Data Integrity', 'Secure Architecture'],
    },
    {
      id: 4,
      image: '/images/Afrikan.jpg',
      title: 'Next-Gen eCommerce & Agri-Fintech',
      subtitle: 'Digital Economies',
      description: 'Beyond simple storefronts, we architect integrated digital economies. Build secure middleware for cross-border transactions and value-chain automation, empowering the agriculture sector with fintech innovation.',
      icon: <Landmark className="w-6 h-6" />,
      impact: 'Strategic Impact',
      keywords: ['Secure Middleware', 'Cross-Border Transactions', 'Value-Chain Automation'],
    },
  ];

  return (
    <section className="industry-section ion-section">
      {/* Background Elements */}
      <div className="industry-bg-gradient" />
      <div className="ion-aurora" aria-hidden="true" />
      <div className="ion-aurora ion-aurora-right" aria-hidden="true" />

      <div className="industry-container">
        {/* Header */}
        <div className="industry-header">
          <div className="industry-badge ion-badge">
            <span className="ion-live-dot" />
            <Sparkles className="w-4 h-4" />
            <span>Uganda&apos;s Digital Transformation</span>
          </div>
          <h2 className="industry-title">
            Industry <span className="industry-title-accent">Focus Areas</span>
          </h2>
          <p className="industry-subtitle">
            Positioning iONA TECH as an elite engineering partner, delivering transformative
            solutions across Uganda&apos;s most critical sectors.
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="industry-grid">
          {focusAreas.map((area, index) => (
            <article
              key={area.id}
              className="industry-card ion-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Strategic Impact Tag */}
              <div className="industry-card-tag">
                <span>{area.impact}</span>
              </div>

              {/* Image */}
              <div className="industry-card-image-wrapper ion-image-frame">
                <img
                  src={area.image}
                  alt={area.title}
                  className="industry-card-image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="industry-card-image-overlay" />
              </div>

              {/* Content */}
              <div className="industry-card-content">
                {/* Icon & Subtitle */}
                <div className="industry-card-meta">
                  <div className="industry-card-icon ion-icon-tile">
                    {area.icon}
                  </div>
                  <span className="industry-card-subtitle">{area.subtitle}</span>
                </div>

                {/* Title */}
                <h3 className="industry-card-title">{area.title}</h3>

                {/* Description */}
                <p className="industry-card-description">{area.description}</p>

                {/* Keywords */}
                <div className="industry-card-keywords">
                  {area.keywords.map((keyword, idx) => (
                    <span key={idx} className="industry-card-keyword">
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* CTA - temporarily commented out, until products are ready*/}
                {/* <button className="industry-card-cta">
                  <span>Explore Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
