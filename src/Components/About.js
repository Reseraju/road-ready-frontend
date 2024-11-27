import React from 'react';
import '../css/About.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-section">
        <div className="about-overlay">
          <div className="about-content">
            <h1>About Us</h1>
            <p>We are dedicated to providing the best car rental services with a focus on customer satisfaction.</p>
            <button className="cta-button">Learn More</button>
          </div>
        </div>
        <img 
          src={process.env.PUBLIC_URL + '/images/about.jpg'} 
          alt="about" 
          className="about-image" 
        />
      </div>
    </div>
  );
}
