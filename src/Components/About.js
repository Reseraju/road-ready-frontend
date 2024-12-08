import React from 'react';
import '../css/About.css';

export default function About() {
  return (
    <div className="about-container">
  <div className="about-section">
    <div className="about-overlay">
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
          padding: '20px 30px',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          maxWidth: '600px',
          margin: 'auto',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#333', marginBottom: '20px' }}>About Us</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
          We are committed to delivering exceptional car rental services tailored to meet the diverse needs of our customers.
          Our primary focus is on ensuring unparalleled customer satisfaction by offering a wide range of well-maintained vehicles,
          seamless booking experiences, and personalized support. Whether you're planning a business trip, a family vacation,
          or a quick weekend getaway, we strive to make your journey comfortable, convenient, and enjoyable.
          With a dedication to quality, reliability, and value, we aim to exceed your expectations at every step, making us your
          trusted partner for all your car rental needs.
        </p>
        <button
          style={{
            backgroundColor: '#ff6700',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
          onClick={() => window.open('https://hexaware.com/', '_blank')}
        >
          Learn More
        </button>
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
