import React from "react";
import "./About.css";
import Afrikan from "../../assets/Afrikan.jpg";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-image-container">
            <img className="about-image" src={Afrikan} alt="iONA Tech team collaborating" />
          </div>
          <div className="about-text-container">
            <div className="about-text">
              <h2 className="about-title">About us</h2>
              <p className="about-description">
                In today's fast-paced digital world, standing out and making a lasting impact is more important than ever. At iONA Tech, we don't just offer services—we become your creative partner, helping businesses and organizations 
                harness the power of design and technology to engage, inspire, and grow.
              </p>
              <p className="about-tagline">Making it Big in Software</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
