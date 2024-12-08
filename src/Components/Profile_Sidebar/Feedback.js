import React, { useState } from "react";
import { Form, TextArea, Button, Message, Dropdown, Header, Segment } from "semantic-ui-react";
import { useAuth } from "../../context/AuthContext"; // Ensure the correct path to your AuthContext
import '../../css/Feedback.css';

const Feedback = () => {
  const [carId, setCarId] = useState(""); // ID of the car being reviewed
  const [rating, setRating] = useState(""); // Rating (1-5)
  const [reviewText, setReviewText] = useState(""); // Review text
  const [error, setError] = useState(null); // Error state
  const [successMessage, setSuccessMessage] = useState(null); // Success message
  const { userId } = useAuth(); // Get the current logged-in user's ID

  const ratingOptions = [
    { key: 1, text: "1", value: 1 },
    { key: 2, text: "2", value: 2 },
    { key: 3, text: "3", value: 3 },
    { key: 4, text: "4", value: 4 },
    { key: 5, text: "5", value: 5 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) throw new Error("Authentication token not found.");

      const reviewData = {
        userId,
        carId,
        rating,
        reviewText,
      };

      const response = await fetch("http://localhost:8081/reviews/createReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit feedback.");
      }

      setSuccessMessage("Feedback submitted successfully!");
      setCarId(""); // Clear car ID field
      setRating(""); // Reset rating
      setReviewText(""); // Clear review text
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Segment
      className="feedback"
      style={{
        maxWidth: "600px",
        // margin: "0 auto",
        padding: "20px",
        backgroundColor: "#1b1c1d",
        color: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Header as="h2" textAlign="center" style={{ color: "#fff", marginBottom: "20px" }}>
        Submit Your Feedback
      </Header>

      <Form onSubmit={handleSubmit} success={!!successMessage} error={!!error}>
        {/* Car ID Input */}
        <Form.Field>
          <label style={{ color: "#fff" }}>Car ID</label>
          <input
            placeholder="Enter Car ID"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            required
            style={{
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              fontSize: "1em",
            }}
          />
        </Form.Field>

        {/* Rating Input */}
        <Form.Field>
          <label style={{ color: "#fff" }}>Rating</label>
          <Dropdown
            placeholder="Select Rating"
            fluid
            selection
            options={ratingOptions}
            value={rating}
            onChange={(e, { value }) => setRating(value)}
            style={{
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "1em",
            }}
            required
          />
        </Form.Field>

        {/* Review Text Input */}
        <Form.Field>
          <label style={{ color: "#fff" }}>Review</label>
          <TextArea
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            maxLength={1000}
            required
            style={{
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              fontSize: "1em",
              resize: "none",
            }}
          />
        </Form.Field>

        {/* Success Message */}
        {successMessage && <Message success header="Success" content={successMessage} />}

        {/* Error Message */}
        {error && <Message error header="Error" content={error} />}

        <Button type="submit" color="blue" fluid style={{ marginTop: "15px", padding: "10px", fontSize: "1em" }}>
          Submit
        </Button>
      </Form>
    </Segment>
  );
};

export default Feedback;
