import PricingCard from './PricingCard';
import { Target, TrendingUp, Globe, Banknote, FileText, Sparkles } from 'lucide-react';
import './Pricing.css';

const websitePricing = [
  {
    planName: "We manage everything",
    badgeText: "Starter",
    badgeType: "starter",
    description: "Best for small businesses, salons, shops, and individuals launching their first site.",
    features: [
      { text: "Free website build — up to 5 pages", included: true },
      { text: "Mobile-first responsive design", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "Updates handled by our team", included: true },
      { text: "No client dashboard / CMS", included: false }
    ],
    priceRange: "UGX 174,000 – 443,000",
    pricePeriod: "per year",
    costs: [
      { label: "Domain Registration (year 1)", value: "UGX 26,000 – 295,000" },
      { label: "Domain Renewal (yearly)", value: "UGX 37,000 – 295,000" },
      { label: "Hosting (per year)", value: "UGX 148,000" },
      { label: "Website build", value: "Free", isHighlight: false },
      { label: "Total / year", value: "UGX 174K – 443K", isTotal: true }
    ],
    footnote: "≈ UGX 26,000 – 57,000/month. Content updates billed per request or optional bundle.",
    note: "NOTE: Costs depend on domain & hosting choices",
    isPopular: false
  },
  {
    planName: "You manage your website",
    badgeText: "Growth",
    badgeType: "growth",
    description: "Best for schools, NGOs, and growing businesses that want to update content without calling us.",
    featuresTitle: "Everything in Starter, plus",
    features: [
      { text: "Admin dashboard / CMS access", included: true },
      { text: "Edit text, images, blog posts freely", included: true },
      { text: "1 onboarding training session", included: true },
      { text: "Priority technical support", included: true },
      { text: "WhatsApp support line included", included: true }
    ],
    priceRange: "UGX 674,000 – 943,000",
    pricePeriod: "per year · save up to 20% paying annually",
    costs: [
      { label: "Domain Registration (year 1)", value: "UGX 26,000 – 295,000" },
      { label: "Domain Renewal (yearly)", value: "UGX 37,000 – 295,000" },
      { label: "Hosting (per year)", value: "UGX 148,000" },
      { label: "Dashboard Build", value: "UGX 500,000+" },
      { label: "Website Build", value: "Free" },
      { label: "Total / year", value: "UGX 674K – 943K", isTotal: true }
    ],
    footnote: "Annual plan unlocks 15–20% off.",
    note: "NOTE: Ongoing Dashboard Maintenance fees optionally apply per request or per month",
    isPopular: true
  },
  {
    planName: "Fully custom, fully yours",
    badgeText: "Pro",
    badgeType: "pro",
    description: "Best for companies, churches, hotels, and organisations that need a serious online presence.",
    featuresTitle: "Everything in Growth, plus",
    features: [
      { text: "Custom design — unlimited pages", included: true },
      { text: "Advanced UI/UX + performance pass", included: true },
      { text: "Full SEO optimisation", included: true },
      { text: "Admin & Other User dashboards included", included: true },
      { text: "Dedicated support + maintenance plan", included: true },
      { text: "Secure User Authentication & Authorization", included: true },
      { text: "API Integration", included: true },
      { text: "Custom Functionality", included: true },
      { text: "Custom Reporting & Analytics", included: true }
    ],
    priceRange: "UGX 3,174,000 – 26,195,000",
    costTitle: "Estimated yearly cost (year 1)",
    pricePeriod: "first year, includes one-time build fee",
    costs: [
      { label: "One-time build fee", value: "UGX 3M – 25M" },
      { label: "Domain Registration (year 1)", value: "UGX 26,000 – 295,000" },
      { label: "Domain Renewal (yearly)", value: "UGX 37,000 – 295,000" },
      { label: "Hosting (per year)", value: "UGX 148,000 - 900,000" },
      { label: "Total yr 1", value: "UGX 3.174M – 26.195M", isTotal: true }
    ],
    footnote: "No build costs from Year 2. Maintenance keeps site secure and updated.",
    note: "NOTE: Ongoing Dashboard Maintenance fees optionally apply per request or per month",
    isPopular: false
  }
];

const Pricing = () => {
  return (
    <div className="pricing-section ion-section">
      <div className="ion-aurora" aria-hidden="true" />
      <div className="ion-aurora ion-aurora-right" aria-hidden="true" />
      <div className="pricing-container">
        <div className="price-header">
          <div className="eyebrow-chip">
            <span className="ion-live-dot" />
            <Sparkles size={13} />
            Uganda's #1 Web Studio
          </div>
          <h2 className="main-headline">
            Premium Web Solutions<br />
            <em>Built for Impact</em>
          </h2>
          <div className="subhead">
            <span className="subhead-item"><Target size={16} className="subhead-icon" /> Tailored for impact</span>
            <span className="subhead-dot">•</span>
            <span className="subhead-item"><TrendingUp size={16} className="subhead-icon" /> Built for growth</span>
            <span className="subhead-dot">•</span>
            <span className="subhead-item"><Globe size={16} className="subhead-icon" /> Powered by Uganda innovation</span>
          </div>
        </div>

        <div className="pricing-grid">
          {websitePricing.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        <div className="info-panel">
          <span className="info-item"><Banknote size={15} className="info-icon" /> Rate used: UGX 3,700 per USD</span>
          <span className="info-item"><FileText size={15} className="info-icon" /> All figures approximate and exclusive of 18% VAT if applicable</span>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
