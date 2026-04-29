import React from "react";
import Afrikan from "../../assets/Afrikan.jpg";
import { Trophy, Rocket, ShieldCheck, ArrowRight } from "lucide-react";
import "./Mission.css";

const Mission = () => {
  const features = [
    { icon: <Rocket size={22} strokeWidth={1.5} />, label: "Innovation Led", detail: "Latest Tech Stacks" },
    { icon: <ShieldCheck size={22} strokeWidth={1.5} />, label: "Secure Scalability", detail: "Enterprise Standards" },
    { icon: <Trophy size={22} strokeWidth={1.5} />, label: "Excellence", detail: "Quality Focused" },
  ];

  return (
    <section className="mission-section">
      <div className="mission-container">
        <div className="mission-grid">

          {/* Left Side: Visual */}
          <div className="mission-visual">
            {/* Blue accent bar */}
            <div className="mission-accent-bar" />

            {/* Outer glow */}
            <div className="mission-image-glow" />

            {/* Image container */}
            <div className="mission-image-wrapper">
              <img
                className="mission-image"
                src='/images/team_of_developers.jpg'
                alt="iONA Tech team collaborating in a modern workspace"
              />
            </div>

            {/* Floating stat badge */}
            <div className="mission-stat-badge">
              <div className="mission-stat-badge-inner">
                <span className="mission-stat-number">100%</span>
                <span className="mission-stat-label">Client Commitment</span>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="mission-content">
            {/* Eyebrow */}
            <span className="mission-eyebrow">Who We Are</span>

            {/* Main Heading */}
            <h2 className="mission-heading">
              Turning Complex Ideas into{" "}
              <span className="mission-heading-gradient">Powerful Software.</span>
            </h2>

            {/* Body Text */}
            <p className="mission-text">
              At iONA Tech, we don&apos;t just write code; we architect digital futures.
              We understand that in a crowded market, your technology needs to be your
              greatest competitive advantage. We bridge the gap between creative design
              and robust engineering to help you <strong>make it big.</strong>
            </p>

            {/* Feature Grid */}
            <div className="mission-features">
              {features.map((feature, index) => (
                <div key={index} className="mission-feature-card">
                  <div className="mission-feature-icon">
                    {feature.icon}
                  </div>
                  <div className="mission-feature-text">
                    <span className="mission-feature-label">{feature.label}</span>
                    <span className="mission-feature-detail">{feature.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Link */}
            <a
              href="#contact_us"
              className="mission-cta"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact_us')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Work with our team</span>
              <ArrowRight size={18} strokeWidth={2} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Mission;
