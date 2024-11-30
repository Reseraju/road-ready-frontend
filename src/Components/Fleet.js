import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

export default function FleetCard(props) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const { removeItem, updateItem, ...serializableProps } = props; // Exclude non-serializable props
    navigate(`/car-details/${props.id}`, { state: { car: serializableProps } });
  };
  

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer', // Change cursor to pointer for better UX
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
      onClick={handleCardClick} // Navigate on card click
    >
      <CardMedia
        component="img"
        alt={props.title}
        height="200"
        image={props.image}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {props.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
          Location: {props.location}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
          Specifications: {props.specifications}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
          Price Per Day: ${props.price}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
          Car Type: {props.category}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 1 }}>
          <Chip
            label={props.availability ? 'Available' : 'Not Available'}
            color={props.availability ? 'success' : 'error'}
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
