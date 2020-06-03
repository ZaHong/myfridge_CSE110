import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Background_Image from "./res/background_img.png";
import logo from "./res/MyFridge_Logo_Small.png";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/Alert";
import background_color from "./res/background_color.png";
import { Redirect } from "react-router-dom";
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

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    document.title = "Reset Password";

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
      userNotExist: true,
      consistentPassword: false,
      successLogin: false,
      userid: ""
    };

    if (props.location.state == null) {
      this.setState({ nullUserID: true });
      console.log("null user");
    } else {
      // this.setState({ userid: props.state.userID });

      // this.state.userid = props.state.userID;
      this.state.userid = props.location.state.userID;
      console.log(this.state.userid);
    }
  }

  handleClick(event) {
    //console.log(this.state.userid);
    if (
      this.state.newPassword === "" ||
      this.state.confirmNewPassword != this.state.newPassword
    ) {
      this.setState({ consistentPassword: true });
      console.log(this.state.confirmNewPassword);
      console.log(this.state.newPassword);
      return false;
    } else {
      this.setState({ consistentPassword: false });
      var newpassword = { newpassword: this.state.newPassword };

      const user = {
        email: this.state.email,
        password: this.state.password
      };

      // check whether account is valid
      if (user.password != null && user.password != "") {
        fetch("http://ec2-52-32-150-175.us-west-2.compute.amazonaws.com:8000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })
          .then(response => response.json())
          .then(json => {
            if (json.status != null && json.status == true) {
              this.setState({
                userID: json.body._id,
                successLogin: true,
                userNotExist: false
              });

              // if valid, change the password
              fetch(
                "http://ec2-52-32-150-175.us-west-2.compute.amazonaws.com:8000/user/" +
                  this.state.userid +
                  "/change_password",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(newpassword)
                }
              ).catch();
            } else {
              this.setState({ userNotExist: true, emptyPassword: false });
            }
          })
          .catch
          //this.setState({ userNotExist: true, emptyPassword: false })
          ();
      } else {
        this.setState({ userNotExist: false, emptyPassword: true });
      }

      console.log(this.state.successLogin);
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
            to={{ pathname: "/profile", state: { userID: this.state.userid } }}
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
                Reset Password
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
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="new password"
                  label="new Password"
                  type="new password"
                  id="new password"
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  defaultValue={this.state.password}
                  onChange={this.handleChange("newPassword")}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirm new password"
                  label="confirm new password"
                  type="confirm new password"
                  id="confirm new password"
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  defaultValue={this.state.password}
                  onChange={this.handleChange("confirmNewPassword")}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="#5f5f5d"
                  className={classes.submit}
                  onClick={event => this.handleClick(event)}
                >
                  Reset
                </Button>
                <div>
                  {(this.state.consistentPassword ||
                    this.state.userNotExist) && (
                    <Alert severity="error">
                      <strong>
                        {this.state.consistentPassword
                          ? "The password does not match"
                          : "The user does not exist"}
                      </strong>
                    </Alert>
                  )}
                </div>

                <div id="test"></div>

                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                ></Grid>
              </form>
            </div>
          </Container>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ResetPassword);
