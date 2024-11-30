import React, { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext'; // Make sure the hook path is correct

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
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  if (!userData) {
    return <div>No user data available.</div>; // Fallback if no data is found
  }

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>

      {/* Basic Info Section */}
      <section>
        <h3>Basic Info</h3>
        <p>
          <strong>First Name:</strong> {userData.firstName || "N/A"}
        </p>
        <p>
          <strong>Last Name:</strong> {userData.lastName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {userData.email || "N/A"}
        </p>
      </section>

      {/* Account Info Section */}
      <section>
        <h3>Account Info</h3>
        <p>
          <strong>Username:</strong> {userData.username || "N/A"}
        </p>
        <p>
          <strong>Password:</strong> ******** {/* Masking the password */}
        </p>
      </section>

      {/* Contact Info Section */}
      <section>
        <h3>Contact Info</h3>
        <p>
          <strong>Phone Number:</strong> {userData.phoneNo || "N/A"}
        </p>
      </section>

      {/* Documents Section */}
      <section>
        <h3>Documents</h3>
        <p>
          <strong>License Number:</strong> {userData.licenseNo || "N/A"}
        </p>
      </section>

      {/* User Type Section */}
      <section>
        <h3>User Type</h3>
        <p>
          <strong>Type:</strong> {userData.userType || "N/A"}
        </p>
      </section>
    </div>
  );
};

export default Account;
