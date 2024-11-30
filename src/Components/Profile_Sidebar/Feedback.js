import React, { useState } from "react";
import "../../css/Feedback.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    setFeedback(""); // Clear the feedback field after submission
  };

  return (
    <div className="feedback">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Feedback;
