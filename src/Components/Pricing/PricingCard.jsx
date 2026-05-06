import React from 'react';
import { Link } from 'react-scroll';
import { Check, X } from 'lucide-react';
import './Pricing.css';

const PricingCard = ({ plan }) => {
  return (
    <div className={`pricing-card ${plan.isPopular ? 'popular-card' : ''} ${plan.badgeType}-card`}>
      {/* Accent stripe */}
      <div className={`card-accent ${plan.badgeType}-accent`} />

      <div className="card-content">
        {/* Badge row */}
        <div className="badge-row">
          <span className={`plan-badge ${plan.badgeType}-badge`}>{plan.badgeText}</span>
          {plan.isPopular && <span className="popular-tag">★ Most popular</span>}
        </div>

        {/* Plan name */}
        <h3 className="plan-name">{plan.planName}</h3>

        {/* Description */}
        <p className="plan-desc">{plan.description}</p>

        <div className="divider-light" />

        {/* Features */}
        <div className="section-label">{plan.featuresTitle || 'Included'}</div>
        <div className="feature-list">
          {plan.features.map((feature, idx) => (
            <div
              key={idx}
              className={`feature-item ${feature.included ? '' : 'not-included'}`}
            >
              {feature.included ? (
                <div className="icon-wrapper check-wrapper">
                  <Check size={12} strokeWidth={3.5} />
                </div>
              ) : (
                <div className="icon-wrapper x-wrapper">
                  <X size={12} strokeWidth={3} />
                </div>
              )}
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Cost widget */}
        <div className="cost-widget">
          <div className="section-label" style={{ margin: '0 0 6px 0' }}>
            {plan.costTitle || 'Estimated yearly cost'}
          </div>
          <div className="price-big">{plan.priceRange}</div>
          <div className="price-period">{plan.pricePeriod}</div>

          <div className="costs-breakdown">
            {plan.costs.map((cost, idx) => (
              <div
                key={idx}
                className={`cost-row ${cost.isTotal ? 'highlight' : ''}`}
              >
                <span>{cost.label}</span>
                <span className={`cost-value ${cost.value === 'Free' ? 'free-text' : ''}`}>
                  {cost.value}
                </span>
              </div>
            ))}
          </div>

          <div className="footnote">{plan.footnote}</div>
          <div className="mtn-pill">{plan.note}</div>
        </div>

        {/* CTA */}
        <div className="card-cta-wrapper">
          <Link
            to="contact_us"
            smooth={true}
            offset={-80}
            duration={500}
            className="pricing-cta-btn"
          >
            Request this plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;