import React, { useState, useEffect } from "react";
import "../../css/Account.css";

const Account = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulate fetching user data with mock data
    const mockData = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      username: "johndoe",
      phoneNo: "+1234567890",
      licenseNo: "12345-ABCDE",
      userType: "ADMIN",
    };

    // Simulate API delay with a timeout
    setTimeout(() => {
      setUserData(mockData);
    }, 1000); // Adjust delay as needed
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>

      {/* Basic Info Section */}
      <section>
        <h3>Basic Info</h3>
        <p>
          <strong>First Name:</strong> {userData.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {userData.lastName}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
      </section>

      {/* Account Info Section */}
      <section>
        <h3>Account Info</h3>
        <p>
          <strong>Username:</strong> {userData.username}
        </p>
        <p>
          <strong>Password:</strong> ******** {/* Masked password */}
        </p>
      </section>

      {/* Contact Info Section */}
      <section>
        <h3>Contact Info</h3>
        <p>
          <strong>Phone Number:</strong> {userData.phoneNo}
        </p>
      </section>

      {/* Documents Section */}
      <section>
        <h3>Documents</h3>
        <p>
          <strong>License Number:</strong> {userData.licenseNo}
        </p>
      </section>

      {/* User Type Section */}
      <section>
        <h3>User Type</h3>
        <p>
          <strong>Type:</strong> {userData.userType}
        </p>
      </section>
    </div>
  );
};

export default Account;
