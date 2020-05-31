import React, { Component, Profiler } from "react";
import Groceryinfo from "./groceryinfo";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import myfridge_logo from "../../src/LogInSignup/res/MyFridge_Logo_Small.png";
import profile_icon from "../fridge/res/profile.png";
import scoreboard_icon from "../fridge/res/scoreboard.png";
import recipe_icon from "../fridge/res/recipe.png";
import friend_icon from "../fridge/res/friend.png";
import Checkbox from "@material-ui/core/Checkbox";
import ToggleButton from "@material-ui/lab/ToggleButton";
import TextField from "@material-ui/core/TextField";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const style = theme => ({
  background: {
    backgroundColor: "#f7f6f0",
    backgroundSize: "cover",
    height: "100%",
    position: "fixed",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  header: {
    backgroundColor: "#ddddd6",
    backgroundSize: "cover",
    paddingLeft: "10vw",
    paddingTop: "1vh",
    width: "100%",
    position: "fixed",
    overflow: "auto",
    display: "flex",
    height: "6.5em",
    borderBottom: "3px solid rgb(212, 212, 212)"
  },
  grow: {
    flexGrow: 0.8
  },
  bodyContainer: {
    marginTop: "20vh",
    direction: "row",
    justify: "space-around",
    alignItems: "baseline",
    spacing: 3
  },
  profile: {
    backgroundColor: "#e5e8df",
    backgroundSize: "cover",
    border: "3px solid rgb(212, 212, 212)",
    borderRadius: "10px",
    marginLeft: "5vw",
    marginRight: "5vw"
  },
  grocery: {
    backgroundColor: "#e5e8df",
    border: "3px solid rgb(212, 212, 212)",
    borderRadius: "10px",
    marginLeft: "5vw",
    marginRight: "5vw"
  },
  logout: {
    left: "40%"
  },
  link: {
    color: "#5f5f5d",
    fontSize: 15
  },
  profileTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  tabs: {
    marginTop: "20vh",
    backgroundColor: "#f7f6f0"
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      email: "",
      //tempemail: "",
      nickname: "",
      tempnickname: "",
      Password: "*******",
      emailNotification: false,
      edit: false,
      grocery: [],
      nullUserID: false,
      rendered: false
    };

    if (props.location.state == null) {
      this.setState({ nullUserID: true });
    } else {
      //this.setState({ userid: props.location.state.userID });
      this.state.userid = props.location.state.userID;
      console.log(this.state.userid);
      fetch("http://localhost:8000/user/" + this.state.userid + "/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(json => {
          this.setState({ email: json.email, nickname: json.nickname });
        })
        .catch
        //this.setState({ userNotExist: true, emptyPassword: false })
        ();

          fetch("http://localhost:8000/user/" + this.state.userid + "/grocery_list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(json => {
            this.setState({ grocery: json.grocery_list }, () => {});
          })
          .then(json => {
            this.setState({ rendered: true });
          })
          .catch();
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleLogout = event => {
    this.setState({ nullUserID: true });
  };

  handleSave = event => {
    this.setState({
      edit: !this.state.edit,
      nickname: this.state.tempnickname
    });
    var payload = {
      new_name: this.state.tempnickname
    };
    fetch("http://localhost:8000/user/" + this.state.userid + "/change_name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  };

  render() {
    const { classes } = this.props;
    const handleToggle = (event, toggled) => {
      if (toggled != null) {
        this.setState({ emailNotification: toggled });
        console.log(this.state.emailNotification);
      }
    };

    return (
      <div>
        {this.state.rendered ? (
          <Grid container xs={12} className={classes.background}>
            <div className={classes.header}>
              <Link
                to={{
                  pathname: "/index",
                  state: { userID: this.state.userid }
                }}
              >
                <img src={myfridge_logo} height="90vh" />
              </Link>
              <div className={classes.grow} />
              <Link
                to={{
                  pathname: "/wasteboard",
                  state: { userID: this.state.userid }
                }}
              >
                <IconButton size="medium">
                  <img src={scoreboard_icon} height="70vh" />
                </IconButton>
              </Link>
              <Link
                to={{
                  pathname: "/friendlist",
                  state: { userID: this.state.userid }
                }}
              >
                <IconButton size="medium">
                  <img src={friend_icon} height="70vh" />
                </IconButton>
              </Link>
              <Link
                to={{
                  pathname: "/recipe",
                  state: { userID: this.state.userid }
                }}
              >
                <IconButton size="medium">
                  <img src={recipe_icon} height="70vh" />
                </IconButton>
              </Link>
              <Link
                to={{
                  pathname: "/profile",
                  state: { userID: this.state.userid }
                }}
              >
                <IconButton size="medium">
                  <img src={profile_icon} height="70vh" />
                </IconButton>
              </Link>
            </div>
            {this.state.nullUserID && <Redirect push to="/" />}

            <Grid container className={classes.bodyContainer}>
              <Grid item xs={4} style={{ marginLeft: "10%" }}>
                <List className={classes.profile}>
                  <ListItem>
                    <h2>Grocery list: </h2>
                  </ListItem>
                  <Divider />
                  <Divider />
                  <Divider />
                  <Divider />
                  <Divider />
                  <Divider />
                  <Divider />

                  <Groceryinfo
                    grocerylist={this.state.grocery}
                    userid={this.state.userid}
                  />
                  <ListItem>
                    <ListItemText primary="" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6} style={{ marginRight: "3%" }}>
                <List className={classes.grocery}>
                  <ListItem>
                    <h2 style={{ marginLeft: "40%", marginRight: "25%" }}>
                      {" "}
                      Profile
                    </h2>

                    <Button
                      style={{ height: "50px", width: "100px" }}
                      variant="contained"
                      color={this.state.edit ? "secondary" : "white"}
                      onClick={e => (
                        this.setState({ edit: !this.state.edit }),
                        this.setState({ tempnickname: this.state.nickname })
                      )}
                    >
                      {this.state.edit ? "Cancel" : "Edit"}
                    </Button>
                  </ListItem>
                  <Divider />
                  <Divider />
                  <Divider />
                  <Divider />
                  <Divider />
                  <Divider />
                  <Divider />
                  <ListItem>
                    <h3 style={{ marginLeft: "15%" }}>
                      Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {/*this.state.edit ? (
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
                      onChange={this.handleChange("tempemail")}
                    />
                  ) : (
                    this.state.email
                  )*/}
                      {this.state.email}
                    </h3>
                  </ListItem>

                  <ListItem>
                    <h3 style={{ marginLeft: "15%" }}>
                      nickname:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.edit ? (
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="nickname"
                          label="Nickname"
                          name="nickname"
                          defaultValue={this.state.nickname}
                          onChange={this.handleChange("tempnickname")}
                        />
                      ) : (
                        this.state.nickname
                      )}
                    </h3>
                  </ListItem>

                  <ListItem>
                    <h3 style={{ marginLeft: "15%" }}>
                      Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.Password}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/resetpassword" className={classes.link}>
                        Reset Password
                      </Link>
                    </h3>
                  </ListItem>

                  <ListItem>
                    <h3 style={{ marginLeft: "15%" }}>
                      Email
                      Notification:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      <ToggleButtonGroup
                        value={this.state.emailNotification}
                        exclusive
                        onChange={handleToggle}
                        aria-label="text alignment"
                      >
                        <ToggleButton value={true} aria-label="left aligned">
                          ON
                        </ToggleButton>
                        <ToggleButton value={false} aria-label="centered">
                          OFF
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </h3>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="" />
                  </ListItem>
                  <div id="logout">
                    <Button
                      p={1}
                      style={{ height: "50px", width: "100px" }}
                      variant="contained"
                      color={this.state.edit ? "white" : "secondary"}
                      className={classes.logout}
                      onClick={e =>
                        this.state.edit
                          ? this.handleSave()
                          : this.handleLogout()
                      }
                    >
                      {this.state.edit ? "Save" : "Log Out"}
                    </Button>
                  </div>
                  <ListItem>
                    <ListItemText primary="" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container xs={12} className={classes.background}>
            <div container xs={12} className={classes.header}>
              <Link
                to={{
                  pathname: "/index",
                  state: { userID: this.state.userid }
                }}
              >
                <img src={myfridge_logo} height="90vh" />
              </Link>
              {this.state.nullUserID && <Redirect push to="/" />}

              <div className={classes.grow} />
              <Link
                to={{
                  pathname: "/wasteboard",
                  state: { userID: this.state.userid }
                }}
              >
                <IconButton size="medium">
                  <img src={scoreboard_icon} height="70vh" />
                </IconButton>
              </Link>
              <Link
                to={{
                  pathname: "/friendlist",
                  state: { userID: this.state.userid }
                }}
              >
                <IconButton size="medium">
                  <img src={friend_icon} height="70vh" />
                </IconButton>
              </Link>
              <Link
                to={{
                  pathname: "/recipe",
                  state: { userID: this.state.userid }
                }}
              >
                <IconButton size="medium">
                  <img src={recipe_icon} height="70vh" />
                </IconButton>
              </Link>
              <Link
                to={{
                  pathname: "/profile",
                  state: { userID: this.state.userid }
                }}
              >
                <IconButton size="medium">
                  <img src={profile_icon} height="70vh" />
                </IconButton>
              </Link>
            </div>
            <div className={classes.tabs}>
              <Typography variant="h3" gutterBottom={true} color="#ddddd6">
                Loading...
              </Typography>
              <CircularProgress size="20vh" color="#ddddd6" thickness="2" style={{marginLeft: "5%"}}/>
            </div>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(style)(Profile);
