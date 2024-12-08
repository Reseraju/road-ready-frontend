import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, Icon, SidebarPushable, SidebarPusher, Segment, Header, Image } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext';

// ProfileSidebar Component
const ProfileSidebar = ({ userType, username }) => (
  <Sidebar as={Menu} direction="left" vertical visible width="wide">
    <MenuItem>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        size="small"
        circular
        centered
      />
      <Header as="h3" textAlign="center">
        {username || 'Guest'}
      </Header>
      <p style={{ textAlign: 'center', color: 'gray' }}>
        {userType || 'Guest'}
      </p>
    </MenuItem>
    <MenuItem as={Link} to="account">
      <Icon name="user" />
      Account
    </MenuItem>
    <MenuItem as={Link} to="reservations">
      <Icon name="calendar" />
      Reservations
    </MenuItem>
    <MenuItem as={Link} to="payment">
      <Icon name="credit card" />
      Payment
    </MenuItem>
    <MenuItem as={Link} to="history">
      <Icon name="history" />
      History
    </MenuItem>
    <MenuItem as={Link} to="feedback">
      <Icon name="comment alternate" />
      Feedback
    </MenuItem>
  </Sidebar>
);

// ProfileSidebarExample Component
const ProfileSidebarExample = () => {
  const { userId, userType } = useAuth(); // Fetch userId and userType from AuthContext
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication token not found.');

        const response = await fetch(`http://localhost:8081/users/getUser/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data.');
        }

        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching username:', error.message);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <SidebarPushable as={Segment} style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {/* Pass userType and username as props */}
      <ProfileSidebar userType={userType} username={username} />
      <SidebarPusher style={{ marginLeft: '150px' }}>
        <Segment basic>
          <Header as="h3" style={{ color: 'white' }}>
            <Outlet />
          </Header>
        </Segment>
      </SidebarPusher>
    </SidebarPushable>
  );
};

export default ProfileSidebarExample;
