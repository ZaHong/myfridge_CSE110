import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import logo from './res/MyFridge_Logo.png';

class Login extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      email: '',
      password: ''
    }
  }

  handleClick(event){

    const user = {
      email : this.state.email,
      password : this.state.password,
    };
    alert(JSON.stringify(user))
    
    //For create new user
    fetch("http://localhost:8000/user/register",{
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(user)
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render(){
    const root = {
      height: '100vh',
    };

    const image = {
      backgroundImage: 'url('+ logo +')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };

    const paper = {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };

    const avatar = {
      marginTop: '5vh',
    };

    const form = {
      width: '100%',
      marginTop: '5vh',
    };

    const submit = {
      margin: 'auto',
      spacing: [3],
    };

    return (
      <Grid container component="main" style={root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} style={image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div style={paper}>
            <Avatar style={avatar}><LockOutlinedIcon /></Avatar>
            <Typography component="h1" variant="h5">Sign in</Typography>
            <form style={form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                defaultValue={this.state.email}
                onChange={this.handleChange('email')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                defaultValue={this.state.password}
                onChange={this.handleChange('password')}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={submit}
                onClick={event => this.handleClick(event)}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item >
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}



export default Login;