import React, { Component } from "react";
import ReactDom from "react-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
//import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Background_Image from "./res/background_img.png";
import logo from "./res/MyFridge_Logo_Small.png";
import Alert from "@material-ui/lab/Alert";
import background_color from "./res/background_color.png";
import SignUp from "./signup";

const styles = theme => ({
  background: {
    //backgroundImage: 'url('+ background_color +')',
    backgroundColor: "#cacbbc",
    backgroundSize: "cover",
    padding: "1vh",
    height: "100%",
    position: "fixed",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  image: {
    backgroundImage: "url(" + logo + ")"
    //height: "20px",
    //backgroundRepeat: 'no-repeat',
    //backgroundPosition: 'center',
    //backgroundSize: 'cover',
    //padding: '0 6px',
    //height: '100%',
    //position: 'fixed',
    //overflow: 'auto',
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  outerpaper: {
    marginBottom: "auto",
    border: "solid 25px white",
    borderRadius: "20px",
    padding: "5 2vw",
    minHeight: "80vh",
    boxSizing: "border-box"
    //boxShadow: '0px 20px 4px rgba(0, 0, 0, 0.25)',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#5f5f5d"
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    color: "#5f5f5d"
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "white !important"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    document.title = "Sign In";

    this.state = {
      email: "",
      password: "",
      userNotExist: false,
      emptyPassword: false,
      userID: "",
      successLogin: false
    };
  }

  handleClick(event) {
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    //alert(JSON.stringify(user))

    //alert(JSON.stringify(user));
    //For create new user
    if (user.password != null && user.password != "") {
      fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(json => {
          if (json.status != null && json.status == true) {
            this.setState({ userID: json.body._id, successLogin: true });
          } else {
            //alert('Wrong Password')
            this.setState({ userNotExist: true, emptyPassword: false });
          }
        })
        .catch
        //this.setState({ userNotExist: true, emptyPassword: false })
        ();
    } else {
      this.setState({ userNotExist: false, emptyPassword: true });
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container xs={12} className={classes.background}>
        {this.state.successLogin && (
          <Redirect
            push
            to={{ pathname: "/index", state: { userID: this.state.userID } }}
          />
        )}
        <img src={logo} marginTop="20px" height="100vh" />
        <Grid container xs={10} sm={6} md={4} className={classes.outerpaper}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  defaultValue={this.state.email}
                  onChange={this.handleChange("email")}
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
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  defaultValue={this.state.password}
                  onChange={this.handleChange("password")}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="#5f5f5d"
                  className={classes.submit}
                  onClick={event => this.handleClick(event)}
                >
                  Sign In
                </Button>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  {/*Pass props to other pages like this */}
                  {/*to={{ pathname: '/resetpassword', state: { foo: 'bar'}}}*/}
                  {/*props.location.state.xxxxxx*/}
                  <Link to="/resetpassword" className={classes.link}>
                    Forgot password?
                  </Link>
                  <Link to="/signup" variant="body2" className={classes.link}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                <div>
                  {(this.state.emptyPassword || this.state.userNotExist) && (
                    <Alert severity="error">
                      <strong>
                        {this.state.emptyPassword
                          ? "Please Enter Valid Password"
                          : "User Does Not Exist"}
                      </strong>
                    </Alert>
                  )}
                </div>
              </form>
            </div>
          </Container>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
