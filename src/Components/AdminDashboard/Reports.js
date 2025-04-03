import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { message } from 'antd';
import axios from "axios";

const Reports = () => {
  const [totalCars, setTotalCars] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const token = localStorage.getItem("token");

  // Fetch total car count
  const carCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/cars/getTotalNoOfCars`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass JWT token here
        }
      });
      setTotalCars(response.data);
      message.success('Car count fetched successfully!');
    } catch (error) {
      message.error('Failed to fetch cars count!');
    }
  };

  // Fetch total car count
  const userCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/users/getTotalNoOfUsers`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass JWT token here
        }
      });
      setTotalUsers(response.data);
      message.success('User count fetched successfully!');
    } catch (error) {
      message.error('Failed to fetch user count!');
    }
  };

  useEffect(() => {
    carCount();
    userCount();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Reports Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Total Cars Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#1976D2", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Cars</Typography>
              <Typography variant="h4">{totalCars}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Users Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#2E7D32", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Reports;