import React, { Component } from 'react';
import { Menu, MenuItem } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../css/MenuBar.css'; 

export default class MenuExampleInverted extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted className="custom-menu">
        <MenuItem className="logo-item">
          <img
            src="https://via.placeholder.com/40" // Replace with your logo URL
            alt="Company Logo"
            className="logo"
          />
          <span className="company-name">CompanyName</span>
        </MenuItem>

        <Menu.Menu position="right">
          <MenuItem
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <MenuItem
            name="about"
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
          />
          <MenuItem
            name="contact"
            active={activeItem === 'contact'}
            onClick={this.handleItemClick}
          />
          <MenuItem
            name="fleets"
            active={activeItem === 'fleets'}
            onClick={this.handleItemClick}
          />
          <MenuItem
            name="profile"
            active={activeItem === 'profile'}
            onClick={this.handleItemClick}
          />
          <MenuItem
            name="reviews"
            active={activeItem === 'reviews'}
            onClick={this.handleItemClick}
          />
          <MenuItem
            name="login"
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
            as={Link}
            to="/login" // Navigates to the Login route
          />
          <MenuItem
            name="register"
            active={activeItem === 'register'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}
