import React, { useState, useEffect } from "react";
import "../../css/Payment.css";

const Payment = () => {
  const [paymentMethods, setPaymentMethods] = useState(null);

  useEffect(() => {
    // Simulate fetching payment methods with mock data
    const mockPaymentMethods = [
      { id: 1, type: "Credit Card", details: "**** **** **** 1234", expiry: "12/24" },
      { id: 2, type: "PayPal", details: "john.doe@example.com", expiry: null },
    ];

    // Simulate API delay
    setTimeout(() => setPaymentMethods(mockPaymentMethods), 1000);
  }, []);

  if (!paymentMethods) {
    return <div>Loading...</div>;
  }

  return (
    <div className="payment">
      <h2>Payment Methods</h2>
      <ul>
        {paymentMethods.map((method) => (
          <li key={method.id}>
            <p><strong>Type:</strong> {method.type}</p>
            <p><strong>Details:</strong> {method.details}</p>
            {method.expiry && <p><strong>Expiry:</strong> {method.expiry}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payment;
