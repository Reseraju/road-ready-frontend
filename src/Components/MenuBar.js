import React, { Component } from 'react';
import { Menu, MenuItem, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../css/MenuBar.css';

export default class MenuExampleInvertedSegment extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
            <MenuItem
              name="login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
              as={Link}
              to="/login"
            />
            <MenuItem
              name="register"
              active={activeItem === 'register'}
              onClick={this.handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}
