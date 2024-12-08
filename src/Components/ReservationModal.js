import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  CircularProgress,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuth } from '../context/AuthContext';
import "../css/ReseravationModal.css";

const steps = ['Enter Dates', 'Reservation Confirmation', 'Make Payment'];

const ReservationModal = ({ open, onClose, car, onReserve }) => {
  const { userId } = useAuth(); // Access userId from AuthContext
  const [activeStep, setActiveStep] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [reservationId, setReservationId] = useState(null); // Store created reservation ID
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false); // Loading state for Confirm button

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setPickupDate('');
    setDropoffDate('');
    setPaymentDetails('');
    setReservationId(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleConfirmReservation = async () => {
    setLoading(true);

    const reservationDetails = {
      userId,
      carId: car.id,
      pickupDate,
      dropoffDate,
      pickupTime: '10:00:00', // Static for simplicity
      dropoffTime: '15:00:00', // Static for simplicity
      extraCharge: 50.0, // Static for simplicity
      reservationStatus: 'PENDING', // Start with pending until payment
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(
        'http://localhost:8081/api/reservations/saveNewReservation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reservationDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Reservation failed.');
      }

      const data = await response.json();
      setSnackbarMessage('Reservation created successfully. Proceed to payment.');
      setSnackbarSeverity('success');
      setReservationId(data.reservationId); // Save reservation ID for payment
      onReserve(pickupDate, dropoffDate); // Notify parent
      handleNext(); // Move to payment step
    } catch (error) {
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarSeverity('error');
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleMakePayment = async () => {
    setLoading(true);

    const paymentDetailsObj = {
      reservationId,
      amount: 75.0, // Example amount; adjust as needed
      paymentMethod: paymentDetails,
      paymentTimestamp: new Date().toISOString(),
      paymentStatus: 'COMPLETED', // Assume success for simplicity
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(
        'http://localhost:8081/api/payments/makePayment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentDetailsObj),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment failed.');
      }

      setSnackbarMessage('Payment successful! Your reservation is confirmed.');
      setSnackbarSeverity('success');
      handleReset();
      onClose();
    } catch (error) {
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarSeverity('error');
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            backgroundColor: 'white',
            padding: 4,
            borderRadius: '12px',
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Reserve {car.make} {car.model}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <>
              <TextField
                label="Pick-up Date"
                type="date"
                fullWidth
                variant="outlined"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Drop-off Date"
                type="date"
                fullWidth
                variant="outlined"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
          {activeStep === 1 && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              Reservation created successfully! Proceed to payment to confirm.
            </Typography>
          )}
          {activeStep === 2 && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Please enter your payment details:
              </Typography>
              <TextField
                label="Payment Details"
                placeholder="Enter card or payment info"
                fullWidth
                variant="outlined"
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
                sx={{ mb: 2 }}
              />
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            {activeStep > 0 && (
              <Button variant="outlined" color="primary" onClick={handleBack}>
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={activeStep === 0 ? handleConfirmReservation : handleNext}
                disabled={
                  activeStep === 0 && (!pickupDate || !dropoffDate) // Disable if no dates selected
                }
                startIcon={loading && <CircularProgress size={20} />}
              >
                Confirm Reservation
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleMakePayment}
                disabled={!paymentDetails || loading} // Disable if no payment details or loading
                startIcon={loading && <CircularProgress size={20} />}
              >
                Confirm Payment
              </Button>
            )}
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReservationModal;
