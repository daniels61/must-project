import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        resp: null,
        user: null,
        pass: null
      };
    }
  
    doEditUser = (e) => {
      this.setState({
        user: e.target.value,
      });
    }
  
    doEditPass = (e) => {
      this.setState({
        pass: e.target.value,
      });
    }
  
    doSignup = (e) => {
      const url = "/signup";
      const data = {
        username: this.state.user,
        password: this.state.pass
      };
      axios.post(url, data)
        .then((res) => {
          this.setState({
            data: [],
            resp: "Signup successful!"
          });
        })
        .catch((err) => {
          this.setState({
            data: [],
            resp: "Error in signup!"
          });
        });
    }
  
    
    
  
  
    render() {
      // const { data } = this.state;
      return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
      <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
       <Typography component="h1" variant="h5">
            Sign Up
        </Typography>
          <div>
            <div>
            <TextField
              margin="normal"
              required
              fullWidth
              id=""
              label="user name"
              name="user name"
              autoFocus
              // input type="text"
              onChange={this.doEditUser}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              // input type="text"
              onChange={this.doEditPass}
            />
            {/* Username: <input type="text" onChange={this.doEditUser}></input><br/>
            Password: <input type="text" onChange={this.doEditPass}></input><br/> */}
            {/* <button onClick={this.doSignup}>Signup</button><br /><br /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={this.doSignup}
              color="secondary"
            >
              Sign Up
            </Button>
            <Link to="/login">Back to Login</Link><br /><br />

            </div>
  
  
          
            <div>
              {this.state.resp?this.state.resp:null}
            </div>
          </div>
          </Box>
        </Container>
      );
    }
  }