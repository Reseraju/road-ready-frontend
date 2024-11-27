import React from 'react';
import '../css/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to Our Platform</h1>
            <p>Discover the world on wheels with our car rental service</p>
            <button className="cta-button">Explore Now</button>
          </div>
        </div>
        <img 
          src={process.env.PUBLIC_URL + '/images/carImage.png'} 
          alt="Black Sport Car" 
          className="hero-image" 
        />
      </div>
      
      <div className="search-section">
        {/* Search Section Code */}
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
          </select>
        </div>
        <button className="search-button">Find a Vehicle →</button>
      </div>
      
      <div className="info-heading">How it Works</div>
<div className="info-subheading">
  Renting a luxury car has never been easier. Our streamlined process makes it simple for you to book and confirm your vehicle of choice online.
</div>
<div className="info-section">
  <div className="info-text">
    <div className="info-item">
      <h3>Browse and select</h3>
      <p>Choose from our wide range of premium cars, select the pickup and return dates that suit you best.</p>
    </div>
    <div className="info-item">
      <h3>Book and confirm</h3>
      <p>Book your desired car with just a few clicks and receive an instant confirmation via email or SMS.</p>
    </div>
    <div className="info-item">
      <h3>Enjoy your ride</h3>
      <p>Pick up your car at the car rental agency and enjoy your premium driving experience with our top-quality service.</p>
    </div>
  </div>
  <div className="info-image">
    <img src={process.env.PUBLIC_URL + '/images/MahindraThar.jpeg'}
    alt="Luxury car" />
  </div>
</div>

    </div>
  );
}
