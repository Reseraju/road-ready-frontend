import React from "react";
import { MenuItem } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Logout = ({ activeItem, setActiveItem }) => {
  const logout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    console.log("Token removed. Redirecting to login..."); // Debugging log
  };

  return (
    <MenuItem
      name="logout"
      active={activeItem === "logout"}
      onClick={() => {
        setActiveItem("logout"); // Optionally update the active item
        logout(); // Perform logout logic
      }}
      as={Link}
      to="/login" // Redirect to the login page
      className="secondary-button"
    />
  );
};

export default Logout;
