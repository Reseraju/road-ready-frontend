import React, { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext'; // Ensure the correct path
import { Card, Row, Col, Typography, Spin, Alert } from "antd";
import '../../css/Account.css';

const { Title, Text } = Typography;

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const response = await fetch(
          `http://localhost:8081/users/getUser/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user data.");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ margin: "20px" }}>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Alert
          message="No Data"
          description="No user data available."
          type="info"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="account-container">
      <Title level={2} className="account-title">
        Account Settings
      </Title>

      <Row gutter={[16, 16]} className="account-row">
        {/* Basic Info Section */}
        <Col span={12} className="account-col">
          <Card title="Basic Info" bordered>
            <p>
              <Text strong>First Name:</Text> {userData.firstName || "N/A"}
            </p>
            <p>
              <Text strong>Last Name:</Text> {userData.lastName || "N/A"}
            </p>
            <p>
              <Text strong>Email:</Text> {userData.email || "N/A"}
            </p>
          </Card>
        </Col>

        {/* Account Info Section */}
        <Col span={12} className="account-col">
          <Card title="Account Info" bordered>
            <p>
              <Text strong>Username:</Text> {userData.username || "N/A"}
            </p>
            <p>
              <Text strong>Password:</Text> ********
            </p>
          </Card>
        </Col>

        {/* Contact Info Section */}
        <Col span={12} className="account-col">
          <Card title="Contact Info" bordered>
            <p>
              <Text strong>Phone Number:</Text> {userData.phoneNo || "N/A"}
            </p>
          </Card>
        </Col>

        {/* Documents Section */}
        <Col span={12} className="account-col">
          <Card title="Documents" bordered>
            <p>
              <Text strong>License Number:</Text> {userData.licenseNo || "N/A"}
            </p>
          </Card>
        </Col>

        {/* User Type Section */}
        <Col span={24} className="account-col">
          <Card title="User Type" bordered>
            <p>
              <Text strong>Type:</Text> {userData.userType || "N/A"}
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Account;
