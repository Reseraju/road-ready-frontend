import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, Icon, SidebarPushable, SidebarPusher, Segment, Header, Image } from 'semantic-ui-react';

const ProfileSidebar = () => (
  <Sidebar as={Menu} direction="left" vertical visible width="wide">
    <MenuItem>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        size="small"
        circular
        centered
      />
      <Header as="h3" textAlign="center">
        John Doe
      </Header>
      <p style={{ textAlign: 'center', color: 'gray' }}>
        Software Engineer at ABC Corp
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
    <MenuItem>
      <Icon name="sign-out" />
      Logout
    </MenuItem>
  </Sidebar>
);

const ProfileSidebarExample = () => {
  return (
    <SidebarPushable as={Segment} style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <ProfileSidebar />
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
