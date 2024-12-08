import React from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import '../css/Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login } = useAuth(); // Access login function from context
  const navigate = useNavigate();

  const signin = () => {
    let credentials = { email, password };
    axios
      .post("http://localhost:8081/api/auth/login", credentials)
      .then((res) => {
        let token = res.data.jwt;
        let id = res.data.userId; // Assuming the response includes userId
        let userType = res.data.userType;
        let jwt = res.data.jwt;
        console.log(id, userType, jwt);
        localStorage.setItem("token", token);
        login(id, userType, jwt); // Pass the userId to the context
        if (userType === "Admin") {
          navigate('/adminhome');
        } else if (userType === "Customer") {
          navigate('/');
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/Login.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Log in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Button color="blue" fluid size="large" type="button" onClick={signin}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/register">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default LoginPage;
