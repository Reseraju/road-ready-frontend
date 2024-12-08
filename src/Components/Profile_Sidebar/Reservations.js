import React, { useState, useEffect } from "react";
import "../../css/Reservations.css";
import { useAuth } from "../../context/AuthContext"; // Ensure the correct path to your AuthContext
import { Button, Modal, Form, Input } from "semantic-ui-react";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [updatedReservation, setUpdatedReservation] = useState({});
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

  const handleCancelReservation = async (reservationId) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(
        `http://localhost:8081/api/reservations/deleteReservation/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel reservation.");
      }

      // Remove the deleted reservation from the local state
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.reservationId !== reservationId
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateReservation = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(
        `http://localhost:8081/api/reservations/updateReservation/${currentReservation.reservationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedReservation),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update reservation.");
      }

      const updatedData = await response.json();

      // Update the local state
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.reservationId === updatedData.reservationId
            ? updatedData
            : reservation
        )
      );

      // Close the modal
      setIsModalOpen(false);
      setCurrentReservation(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const openUpdateModal = (reservation) => {
    setCurrentReservation(reservation);
    setUpdatedReservation({ ...reservation }); // Pre-fill modal with existing data
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentReservation(null);
  };

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
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={reservation.reservationId}>
              <td>{index + 1}</td>
              <td>{reservation.carId || "N/A"}</td> {/* Assuming car has a carName field */}
              <td>{reservation.pickupDate || "N/A"}</td>
              <td>{reservation.dropoffDate || "N/A"}</td>
              <td>{reservation.pickupTime || "N/A"}</td>
              <td>{reservation.dropoffTime || "N/A"}</td>
              <td>{reservation.extraCharge || "0.00"}</td>
              <td className={`status ${reservation.reservationStatus ? reservation.reservationStatus.toLowerCase() : ""}`}>
                {reservation.reservationStatus || "N/A"}
              </td>
              <td>{reservation.createdAt ? new Date(reservation.createdAt).toLocaleString() : "N/A"}</td>
              <td>
                <button
                  className="cancel-button"
                  onClick={() => handleCancelReservation(reservation.reservationId)}
                >
                  Cancel
                </button>
                <button
                  className="update-button"
                  onClick={() => openUpdateModal(reservation)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Reservation Modal */}
      {currentReservation && (
        <Modal open={isModalOpen} onClose={closeModal}>
          <Modal.Header>Update Reservation</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Pickup Date</label>
                <Input
                  type="date"
                  value={updatedReservation.pickupDate}
                  onChange={(e) =>
                    setUpdatedReservation({
                      ...updatedReservation,
                      pickupDate: e.target.value,
                    })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Dropoff Date</label>
                <Input
                  type="date"
                  value={updatedReservation.dropoffDate}
                  onChange={(e) =>
                    setUpdatedReservation({
                      ...updatedReservation,
                      dropoffDate: e.target.value,
                    })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Pickup Time</label>
                <Input
                  type="time"
                  value={updatedReservation.pickupTime}
                  onChange={(e) =>
                    setUpdatedReservation({
                      ...updatedReservation,
                      pickupTime: e.target.value,
                    })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Dropoff Time</label>
                <Input
                  type="time"
                  value={updatedReservation.dropoffTime}
                  onChange={(e) =>
                    setUpdatedReservation({
                      ...updatedReservation,
                      dropoffTime: e.target.value,
                    })
                  }
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button color="green" onClick={handleUpdateReservation}>
              Save
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
};

export default Reservations;
