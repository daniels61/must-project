import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default class Applogin extends React.Component {
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


  doLogin = (e) => {
    const url = "/login"
    const data = {
      user: this.state.user,
      pass: this.state.pass
    }
    axios.post(url, data)
    .then((res) => {
      this.setState({
        data: [],
        resp: "Welcome!"
      });
    })
      .catch((err) => {
        this.setState({
          data: [],
          resp: "Error!"
        });
      });
  }

  doLogout = () => {
    const url = "/logout";
    axios.post(url)
      .then((res) => {
        this.setState({
          resp: "Logged out successfully!"
        });
      })
      .catch((err) => {
        this.setState({
          resp: "Error while logging out!"
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
            Sign in
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
          {/* Username:<br/> <input type="text" onChange={this.doEditUser}></input><br/> */}
          {/* Password:<br/> <input type="text" onChange={this.doEditPass}></input><br/> */}
          {/* <button onClick={this.doLogin}>Login</button><br/><br/> */}
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
              <div>
            {this.state.resp?this.state.resp:null}
              </div>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 3 }}
              onClick={this.doLogin}
              color="secondary"
            >
            
              Sign In
            </Button>
            <Link to="/signup">Signup</Link><br /><br />
            <Typography component="h1" variant="h5">
             
          </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={this.doLogout}
              color="secondary"
            >
              Logout
            </Button>

          
          </div>
          

        </div>
        </Box>
        </Container>
    );
  }
}

