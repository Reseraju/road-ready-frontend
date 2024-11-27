import React from 'react';
import '../css/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to The Road Ready Car Rental Platform</h1>
            <h2>Discover the world on wheels with our car rental service</h2>
            <button className="cta-button">Explore Now</button>
          </div>
        </div>
        <img 
          src={process.env.PUBLIC_URL + '/images/download.jpg'} 
          alt="Black Sport Car" 
          className="hero-image" 
        />
      </div>
      
      <div className="search-section">
        <div className="search-field">
          <label>Location</label>
          <input type="text" placeholder="Search a location" />
        </div>
        <div className="search-field">
          <label>Pick-up date</label>
          <input type="date" />
        </div>
        <div className="search-field">
          <label>Drop-off date</label>
          <input type="date" />
        </div>
        <div className="search-field">
          <label>Type of vehicle</label>
          <select>
            <option>Select Vehicle type</option>
            <option>Economy</option>
            <option>SUV</option>
            <option>Luxury</option>
            <option>Convertible</option>
          </select>
        </div>
        <button className="search-button">Find a Vehicle →</button>
      </div>
    </div>
  );
}
