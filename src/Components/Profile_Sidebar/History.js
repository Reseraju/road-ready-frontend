import React, { useState, useEffect } from "react";
import "../../css/History.css";

const History = () => {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    // Simulate fetching history data with mock data
    const mockHistory = [
      { id: 1, action: "Made a reservation", date: "2024-11-20" },
      { id: 2, action: "Updated payment details", date: "2024-11-10" },
      { id: 3, action: "Cancelled reservation", date: "2024-10-25" },
    ];

    // Simulate API delay
    setTimeout(() => setHistory(mockHistory), 1000);
  }, []);

  if (!history) {
    return <div>Loading...</div>;
  }

  return (
    <div className="history">
      <h2>Activity History</h2>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            <p><strong>Action:</strong> {item.action}</p>
            <p><strong>Date:</strong> {item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
