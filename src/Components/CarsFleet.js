import React, { useState, useEffect } from "react";
import axios from "axios";
import FleetCard from "./Fleet";
import '../css/CarsFleet.css';

const CarsFleet = () => {
  const [carList, setCarList] = useState([]);

  const allCars = () => {
    axios
      .get("http://localhost:8081/cars/getAllCars", {})
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setCarList(res.data);
        }
      })
      .catch((e) => console.log(e));
  };


  useEffect(() => {
    allCars();
  }, []);

  return (
    <div className="fleet-container">
      {carList.map((car) => (
        <FleetCard
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
        removeItem={() => console.log('Remove', car.carId)}
        updateItem={() => console.log('Update', car.carId)}
      />
      
      ))}
    </div>
  );
};

export default CarsFleet;
