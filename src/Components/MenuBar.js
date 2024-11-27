import React, { Component } from 'react';
import { Menu, MenuItem, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../css/MenuBar.css';

export default class MenuExampleInvertedSegment extends Component {
  state = { 
    activeItem: 'home' ,
    isSignedIn: false // Initial signed-in state
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  // Function to simulate user login/logout
  handleSignIn = () => {
    this.setState({ isSignedIn: true });
  };

  handleSignOut = () => {
    this.setState({ isSignedIn: false });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted>
        <Menu inverted secondary className="custom-menu">
          {/* Logo Section */}
          <MenuItem className="logo-item">
            <img
              src="/images/CarProfile.png"
              alt="RoadReady Logo"
              className="logo"
            />
            <span className="company-name">RoadReady</span>
          </MenuItem>

          {/* Menu Items */}
          <Menu.Menu position="right">
            <MenuItem
              name="home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
              as={Link}
              to="/"
            />
            <MenuItem
              name="about"
              active={activeItem === 'about'}
              onClick={this.handleItemClick}
              as={Link}
              to="/about"
            />
            <MenuItem
              name="contact"
              active={activeItem === 'contact'}
              onClick={this.handleItemClick}
              as={Link}
              to="/contact"
            />
            <MenuItem
              name="fleets"
              active={activeItem === 'fleets'}
              onClick={this.handleItemClick}
              as={Link}
              to="/fleets"
            />
            <MenuItem
              name="profile"
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}
              as={Link}
              to="/profile"
            />
            <MenuItem
              name="reviews"
              active={activeItem === 'reviews'}
              onClick={this.handleItemClick}
              as={Link}
              to="/reviews"
            />
            {!this.isSignedIn && (
              <>
                <MenuItem
                  name="login"
                  active={activeItem === 'login'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/login"
                  className="secondary-button"
                />
                <MenuItem
                  name="register"
                  active={activeItem === 'register'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/register"
                  className="primary-button"
                />
              </>
            )}

            {this.isSignedIn && (
              <MenuItem
                name="logout"
                active={activeItem === 'logout'}
                onClick={this.handleItemClick}
                as={Link}
                to="/logout"
                className="secondary-button"
              />
            )}
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}
