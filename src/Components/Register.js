import React from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../css/Register.css';
import axios from 'axios';

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

  const handleSubmit = () => {
    setError('');
    setSuccessMessage('');

    if (!username || !firstName || !lastname || !email || !phoneNo || !licenseNo || !password || !confirmPassword || !userType) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSuccessMessage('Registration successful! Redirecting...');
    setTimeout(() => {}, 3000);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/Register.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Create a new account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Firstname"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
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
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="User type eg: Admin or Customer"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Licence No"
                value={licenseNo}
                onChange={(e) => setLicenceNo(e.target.value)}
                required
              />
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
              <Button color="blue" fluid size="large" type="submit" onClick={signup}>
                Sign Up
              </Button>
            </Segment>
          </Form>
          {error && <Message color="red">{error}</Message>}
          {successMessage && <Message color="green">{successMessage}</Message>}
          <Message>
            Already have an account? <Link to="/login">Log in</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default RegisterPage;
