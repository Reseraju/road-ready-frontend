import React, { useState, useEffect } from "react";
import "../../css/Reservations.css";
import { useAuth } from "../../context/AuthContext"; // Ensure the correct path to your AuthContext

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth(); // Get the current logged-in user's ID

  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        if (!token) throw new Error("Authentication token not found.");

        const response = await fetch(
          `http://localhost:8081/api/reservations/getReservationsByUserId/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch reservations.");
        }

        const data = await response.json();
        console.log("Reservations Data:", data); // Debugging log
        setReservations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserReservations();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return (
      <div className="error-message">
        Error: {error} <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    ); // Error state
  }

  if (!reservations.length) {
    return <div>No reservations found for your account.</div>; // No reservations fallback
  }

  return (
    <div className="reservations">
      <h2>My Reservations</h2>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Car</th>
            <th>Pickup Date</th>
            <th>Dropoff Date</th>
            <th>Pickup Time</th>
            <th>Dropoff Time</th>
            <th>Extra Charge</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={reservation.reservationId}>
              <td>{index + 1}</td>
              <td>{reservation.car ? reservation.car.carName : "N/A"}</td> {/* Assuming car has a carName field */}
              <td>{reservation.pickupDate || "N/A"}</td>
              <td>{reservation.dropoffDate || "N/A"}</td>
              <td>{reservation.pickupTime || "N/A"}</td>
              <td>{reservation.dropoffTime || "N/A"}</td>
              <td>{reservation.extraCharge || "0.00"}</td>
              <td className={`status ${reservation.reservationStatus ? reservation.reservationStatus.toLowerCase() : ""}`}>
                {reservation.reservationStatus || "N/A"}
              </td>
              <td>{reservation.createdAt ? new Date(reservation.createdAt).toLocaleString() : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
