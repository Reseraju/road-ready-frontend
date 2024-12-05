import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const [location, setLocation] = useState("");
  const [carType, setCarType] = useState("");
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  // fetching car data
  useEffect(()=>{
    axios.get('http://localhost:8081/cars/getAllCars')
    .then((res)=>{
      if(res.data){
        setCars(res.data);
      }
    })
    .catch((e)=>console.error("rror fetching car data: ",e))
  },[])

  // navigating to fleets
  const navigateToFleets=()=>{
    navigate('/fleets', { state: { location, carType } });
  };


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
      
      <div className="content-section">
        <div className="search-section">
          {/* Search Section Code */}
          <div className="search-field">
            <label>Location</label>
            <input type="text" placeholder="Search a location" value={location} onChange={(e)=>setLocation(e.target.value)}/>
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
            <select value={carType} onChange={(e)=>setCarType(e.target.value)}>
              <option value="">Select Vehicle type</option>
              <option value="family">Family</option>
              <option value="luxury">Luxury</option>
              <option value="offroad">OffRoad</option>
              <option value="suv">SUV</option>
            </select>
          </div>
          <button className="search-button" onClick={navigateToFleets}>Find a Vehicle →</button>
        </div>
      
        

        <div className="info-heading">How it Works</div>
        <div className="info-subheading">
          Renting a luxury car has never been easier. Our streamlined process makes it simple for you<br /> to book and confirm your vehicle of choice online.
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
    </div>
  );
}
