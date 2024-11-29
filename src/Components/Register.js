import React from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import '../css/Register.css';
import axios from 'axios';
import { Login } from '@mui/icons-material';
import LoginPage from './Login';

function RegisterPage() {
  const [username, setUsername] = React.useState('');
  const [firstName, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phoneNo, setPhone] = React.useState('');
  const [licenseNo, setLicenceNo] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [userType, setUserType] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const signup = () => {
    console.log("Signup initiated");
    let user = {
      email,
      username,
      password,
      firstName,
      lastname,
      phoneNo,
      licenseNo,
      userType,
    };
    console.log("Payload to API:", user);
 
    axios
      .post("http://localhost:8081/api/auth/signup", user)
      .then(() => alert("User added"))
      .catch((e) => {
        if (e.response) {
          console.error("Response error:", e.response.data, e.response.status);
        } else {
          console.error("Request error:", e.message);
        }
      });
  };
  
//   const history = useHistory();

  const handleSubmit = () => {
    // Clear previous error and success messages
    setError('');
    setSuccessMessage('');

    // Validation logic
    if (!username || !firstName || !lastname || !email || !phoneNo || !licenseNo || !password || !confirmPassword || !userType) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Simulate user registration
    // In a real scenario, you would send the data to the server
    console.log('User registered:', { firstName, lastname, email, phoneNo, licenseNo, userType, password });

    // On successful registration, show success message and redirect
    setSuccessMessage('Registration successful! Redirecting...');
    setTimeout(() => {
      //history.push('/login'); // Redirect to login page after 3 seconds
    }, 3000);
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          Create a new account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            {/* Username Field */}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {/* First Name Field */}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Firstname"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            {/* Last Name Field */}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            {/* Email Field */}
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Phone Number Field */}
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder="Phone number"
              type="number"
              value={phoneNo}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {/* Licence No Field */}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="User type eg: Admin or Customer"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            />
            {/* Licence No Field */}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Licence No"
              value={licenseNo}
              onChange={(e) => setLicenceNo(e.target.value)}
              required
            />
            {/* Password Field */}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Confirm Password Field */}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {/* Submit Button */}
            <Button color="blue" fluid size="large" type="submit" onClick={signup}>
              Sign Up
            </Button>
          </Segment>
        </Form>

        {/* Display Error Message if any */}
        {error && <Message color="red">{error}</Message>}

        {/* Display Success Message if Registration is successful */}
        {successMessage && <Message color="green">{successMessage}</Message>}

        {/* Link to Login page */}
        <Message>
          Already have an account? <Link to="/login">Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default RegisterPage;
