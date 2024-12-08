import React from 'react';
import {
  FormInput,
  FormGroup,
  FormCheckbox,
  Button,
  Form,
  Segment,
} from 'semantic-ui-react';
import '../css/Contact.css';

const ContactForm = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/contact.jpg'})`, // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
    padding: '20px',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '600px',
  };

  return (
    <div style={backgroundImageStyle}>
      <div style={overlayStyle}>
        <Segment inverted>
          <Form inverted>
            <h2 className="form-header" style={{ textAlign: 'center', color: '#fff' }}>Contact Us</h2>
            <FormGroup widths="equal">
              <FormInput
                fluid
                label="First Name"
                placeholder="First Name"
                required
              />
              <FormInput
                fluid
                label="Last Name"
                placeholder="Last Name"
                required
              />
            </FormGroup>
            <FormInput
              fluid
              label="Email"
              placeholder="Email Address"
              type="email"
              required
            />
            <FormInput
              fluid
              label="Phone Number"
              placeholder="Phone Number"
              type="tel"
            />
            <FormInput fluid label="Subject" placeholder="Subject" />
            <Form.TextArea label="Message" placeholder="Write your message here..." required />
            <Button color="blue" type="submit" fluid>
              Submit
            </Button>
          </Form>
        </Segment>
      </div>
    </div>
  );
};

export default ContactForm;
