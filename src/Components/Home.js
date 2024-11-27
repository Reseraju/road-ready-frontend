import React from 'react';
import '../css/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to Our Platform</h1>
            <p>Experience the best car rental services with ease and reliability.</p>
            <button className="cta-button">Explore Now</button>
          </div>
        </div>
        <img 
          src={process.env.PUBLIC_URL + '/images/download.jpg'} 
          alt="Black Sport Car" 
          className="hero-image" 
        />
      </div>
    </div>
  );
}
