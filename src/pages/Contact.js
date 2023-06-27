import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";



const Contact = () => {
  
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the message to "dslotin@gmail.com"
    sendEmail(message);
    // Clear the message field
    setMessage("");
  };

  const sendEmail = (message) => {
    console.log(`Sending email: ${message}`);
  };


  return(
      <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          id="message"
          name="message"
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>

  )
};

export default Contact;