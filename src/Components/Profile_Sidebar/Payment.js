import React, { useState, useEffect } from "react";
import "../../css/Payment.css";
import { useAuth } from "../../context/AuthContext"; // Ensure the correct path to your AuthContext
import { Button, Modal, Form, Table, Input, Dropdown } from "semantic-ui-react";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    amount: "",
    paymentMethod: "",
    reservationId: "",
  });
  const { userId } = useAuth(); // Get the current logged-in user's ID

  const paymentMethods = [
    { key: "creditCard", text: "Credit Card", value: "Credit Card" },
    { key: "paypal", text: "PayPal", value: "PayPal" },
    { key: "debitCard", text: "Debit Card", value: "Debit Card" },
  ];

  useEffect(() => {
    const fetchAllPayments = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        if (!token) throw new Error("Authentication token not found.");

        const response = await fetch("http://localhost:8081/payments/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch payments.");
        }

        const data = await response.json();
        console.log("Payments Data:", data); // Debugging log
        setPayments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPayments();
  }, []);

  const handleAddPayment = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch("http://localhost:8081/payments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPayment),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add payment.");
      }

      const addedPayment = await response.json();
      setPayments((prevPayments) => [...prevPayments, addedPayment]);
      setIsAddModalOpen(false);
      setNewPayment({ amount: "", paymentMethod: "", reservationId: "" });
    } catch (error) {
      setError(error.message);
    }
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

  if (!payments.length) {
    return <div>No payments found for your account.</div>; // No payments fallback
  }

  return (
    <div className="payment">
      <h2>Payment Methods</h2>

      

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Payment ID</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Method</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Reservation ID</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
  {payments.map((payment) => (
    <Table.Row key={payment.paymentId}>
      <Table.Cell>{payment.paymentId}</Table.Cell>
      <Table.Cell>{payment.amount}</Table.Cell>
      <Table.Cell>{payment.paymentMethod}</Table.Cell>
      <Table.Cell>{payment.paymentDate}</Table.Cell>
      <Table.Cell>
        {payment.reservationId || "N/A"}
      </Table.Cell>
      <Table.Cell>{payment.paymentStatus}</Table.Cell>
    </Table.Row>
  ))}
</Table.Body>

      </Table>

      {/* Add Payment Modal */}
      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <Modal.Header>Add Payment</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Amount</label>
              <Input
                type="number"
                value={newPayment.amount}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, amount: e.target.value })
                }
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Payment Method</label>
              <Dropdown
                placeholder="Select Payment Method"
                fluid
                selection
                options={paymentMethods}
                value={newPayment.paymentMethod}
                onChange={(e, { value }) =>
                  setNewPayment({ ...newPayment, paymentMethod: value })
                }
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Reservation ID</label>
              <Input
                type="number"
                value={newPayment.reservationId}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, reservationId: e.target.value })
                }
                required
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          <Button primary onClick={handleAddPayment}>
            Add
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Payment;
