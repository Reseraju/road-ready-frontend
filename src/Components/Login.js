import React from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import '../css/Login.css';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    console.log('Email:', email, 'Password:', password);
    // Handle login logic here
  };

  const signin = () => {
    let login = { email, password };
    axios
      .post("http://localhost:8081/api/auth/login", login)
      .then((res) => {
        let token = res.data.jwt;
        alert("Use logged in successfully");
        localStorage.setItem("token", token);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          Log in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
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
            <Button color="blue" fluid size="large" type="submit" onClick={signin}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="#register">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default LoginPage;
