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
} from '@mui/material';

const steps = ['Enter Dates', 'Make Payment', 'Confirmation'];

const ReservationModal = ({ open, onClose, car, onReserve }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');

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
  };

  const handleConfirmReservation = () => {
    onReserve(pickupDate, dropoffDate, paymentDetails);
    handleReset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000, // Increased size
          height: 500, // Increased size
          backgroundColor: 'white',
          padding: 4,
          borderRadius: '12px',
          boxShadow: 24,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Reserve {car.model}
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
        {activeStep === 2 && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            Reservation complete! Your car is reserved for the following dates:
            <ul>
              <li>
                <strong>Pick-up Date:</strong> {pickupDate || 'Not set'}
              </li>
              <li>
                <strong>Drop-off Date:</strong> {dropoffDate || 'Not set'}
              </li>
            </ul>
            Thank you for choosing our service!
          </Typography>
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
              onClick={handleNext}
              disabled={activeStep === 0 && (!pickupDate || !dropoffDate)} // Prevent going to the next step without dates
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmReservation}
              disabled={!paymentDetails} // Prevent confirmation without payment details
            >
              Confirm
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ReservationModal;
