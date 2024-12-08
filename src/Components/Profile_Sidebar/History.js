import React, { useState, useEffect } from "react";
import "../../css/History.css";
import { useAuth } from "../../context/AuthContext"; // Ensure the correct path to your AuthContext

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth(); // Get the current logged-in user's ID

  useEffect(() => {
    const fetchUserHistory = async () => {
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
          throw new Error(errorData.message || "Failed to fetch reservation history.");
        }

        const data = await response.json();
        console.log("Reservation History Data:", data); // Debugging log
        setHistory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserHistory();
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

  if (!history.length) {
    return <div>No reservation history found for your account.</div>; // No history fallback
  }

  return (
    <div className="history">
      <h2>Reservation History</h2>
      <ul>
        {history.map((reservation) => (
          <li key={reservation.reservationId}>
            <p><strong>Car:</strong> {reservation.car ? reservation.car.carName : "N/A"}</p>
            <p><strong>Pickup Date:</strong> {reservation.pickupDate || "N/A"}</p>
            <p><strong>Dropoff Date:</strong> {reservation.dropoffDate || "N/A"}</p>
            <p><strong>Status:</strong> {reservation.reservationStatus || "N/A"}</p>
            <p><strong>Created At:</strong> {reservation.createdAt ? new Date(reservation.createdAt).toLocaleString() : "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
