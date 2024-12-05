import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FleetCard from "./Fleet";
import "../css/CarsFleet.css";

const CarsFleet = () => {
  const [carList, setCarList] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({ location: "", carType: "", priceRange: "" });

  const location = useLocation();
  const { state } = location || {};
  const { location: initialLocation, carType: initialVehicleType } = state || {};

  // Fetch cars from the backend
  const fetchCars = () => {
    axios
      .get("http://localhost:8081/cars/getAllCars")
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setCarList(res.data);
          // Apply initial filters if navigated with state
          const filtered = res.data.filter(
            (car) =>
              (!initialLocation || car.location.toLowerCase().includes(initialLocation.toLowerCase())) &&
              (!initialVehicleType || car.carType.toLowerCase() === initialVehicleType.toLowerCase()) &&
              car.availability
          );
          setFilteredCars(filtered);
        }
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Handle dynamic filtering
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = carList.filter(
      (car) =>
        (!filters.location || car.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.carType || car.carType.toLowerCase() === filters.carType.toLowerCase()) &&
        (!filters.priceRange || car.pricePerDay <= parseInt(filters.priceRange, 10)) &&
        car.availability
    );
    setFilteredCars(filtered);
  };

  const resetFilters = () => {
    setFilters({ location: "", carType: "", priceRange: "" });
    setFilteredCars(carList); // Reset to all cars
  };

  return (
    <div className="fleet-container">
      {/* Filters Section */}
      <div className="filters-container">
        <input
          type="text"
          name="location"
          placeholder="Search by location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <select name="vehicleType" value={filters.carType} onChange={handleFilterChange}>
          <option value="">All Car Types</option>
          <option value="family">Family</option>
          <option value="sports">Sports</option>
          <option value="luxury">Luxury</option>
        </select>
        <input
          type="number"
          name="priceRange"
          placeholder="Max Price"
          value={filters.priceRange}
          onChange={handleFilterChange}
        />
        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      {/* Cars List */}
      <div className="fleet-list">
        {filteredCars.map((car) => (
          <FleetCard
            key={car.carId}
            id={car.carId}
            make={car.make}
            model={car.model}
            title={`${car.make} ${car.model}`}
            location={car.location}
            image={car.imageURL}
            specifications={car.specifications}
            price={car.pricePerDay}
            category={car.carType}
            availability={car.availability}
            removeItem={() => console.log("Remove", car.carId)}
            updateItem={() => console.log("Update", car.carId)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarsFleet;
