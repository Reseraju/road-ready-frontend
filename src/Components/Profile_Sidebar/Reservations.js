import React, { useState, useEffect } from "react";
import "../../css/Reservations.css";

const Reservations = () => {
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    // Simulate fetching reservation data with mock data
    const mockReservations = [
      {
        id: 1,
        vehicle: "Toyota Corolla",
        reservationDate: "2024-12-01",
        returnDate: "2024-12-05",
        status: "Confirmed",
      },
      {
        id: 2,
        vehicle: "Ford Mustang",
        reservationDate: "2024-11-20",
        returnDate: "2024-11-25",
        status: "Cancelled",
      },
      {
        id: 3,
        vehicle: "Tesla Model 3",
        reservationDate: "2024-11-15",
        returnDate: "2024-11-18",
        status: "Completed",
      },
    ];

    // Simulate API delay with a timeout
    setTimeout(() => {
      setReservations(mockReservations);
    }, 1000); // Adjust delay as needed
  }, []);

  if (!reservations) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="reservations">
      <h2>My Reservations</h2>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Vehicle</th>
            <th>Reservation Date</th>
            <th>Return Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.vehicle}</td>
              <td>{reservation.reservationDate}</td>
              <td>{reservation.returnDate}</td>
              <td className={`status ${reservation.status.toLowerCase()}`}>
                {reservation.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
