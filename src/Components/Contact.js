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

const ContactForm = () => (
  <div className="contact-form-container">
    <Segment inverted>
      <Form inverted>
        <h2 className="form-header">Contact Us</h2>
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
        {/* <FormCheckbox label="I agree to the Terms and Conditions" required /> */}
        <Button color="blue" type="submit">
          Submit
        </Button>
      </Form>
    </Segment>
  </div>
);

export default ContactForm;
