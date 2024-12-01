import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import ReservationModal from './ReservationModal';
import { useAuth } from '../context/AuthContext';
import "../css/CarDetails.css";

export default function CarDetails() {
  const location = useLocation();
  const { car } = location.state;

  const { isSignedIn } = useAuth(); 
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  // Function to extract specifications from the specifications string
  const extractSpecifications = (specifications) => {
    const specRegex = /([\w\s]+):\s?([^,]+)/g; // Matches "key: value" pairs
    let matches;
    const specObj = {};

    while ((matches = specRegex.exec(specifications)) !== null) {
      const key = matches[1].trim(); // Extract key
      const value = matches[2].trim(); // Extract value
      specObj[key] = value; // Add to the object as-is
    }

    return specObj;
  };

  const carSpecs = extractSpecifications(car.specifications);

  const handleAddToWishlist = () => {
    if (!isSignedIn) {
      navigate('/login');
      return;
    }

    // Logic for adding the car to the wishlist
    console.log(`Car ${car.model} added to wishlist!`);
    alert(`${car.model} has been added to your wishlist.`);
  };

  const handleOpenReservationModal = () => {
    if (!isSignedIn) {
      navigate('/login');
      return;
    }

    setOpenModal(true);
  };

  const handleMakeReservation = (pickupDate, dropoffDate) => {
    console.log(`Car ${car.model} reserved from ${pickupDate} to ${dropoffDate}!`);
    alert(`Your reservation for ${car.model} from ${pickupDate} to ${dropoffDate} is confirmed.`);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Paper
        sx={{
          maxWidth: 2000,
          width: '100%',
          p: 3,
          borderRadius: '10px',
          boxShadow: 3,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'row', // Landscape layout
          alignItems: 'flex-start',
        }}
      >
        <CardMedia
          component="img"
          alt={car.model}
          height="300"
          image={car.image}
          sx={{
            borderRadius: '10px',
            objectFit: 'cover',
            width: '50%', // Landscape - image takes half the space
            marginRight: '20px',
          }}
        />
        <Box sx={{ width: '50%' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            {car.make} {car.model}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, color: '#555' }}>
            Location: {car.location}
          </Typography>
          <Typography variant="outlined" sx={{ mb: 2, color: '#777' }}>
            <strong>Specifications:</strong>
            <ul className="specifications-list">
              {Object.entries(carSpecs).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
            Price Per Day: <strong>${car.price}</strong>
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, color: '#555' }}>
            Car Type: {car.category}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, color: car.availability ? 'green' : 'red' }}>
            Availability: {car.availability ? 'Available' : 'Not Available'}
          </Typography>

          {/* Add to Wishlist and Make Reservation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddToWishlist}
              sx={{
                width: '48%',
                padding: '10px',
                backgroundColor: '#f2f2f2',
                '&:hover': {
                  backgroundColor: '#ff6700',
                },
              }}
            >
              Add to Wishlist
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenReservationModal}
              sx={{
                width: '48%',
                padding: '10px',
                backgroundColor: '#ff6700',
                '&:hover': {
                  backgroundColor: '#e65a00',
                },
              }}
            >
              Make Reservation
            </Button>
          </Box>
        </Box>
      </Paper>

      <ReservationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        car={car}
        onReserve={handleMakeReservation}
      />
    </Box>
  );
}
