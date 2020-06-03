import React, { Component, Profiler } from "react";
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
  }
});

class Groceryinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryselected: []
    };
    // this.props.grocerylist.map(grocery => {
    //   this.setState({ this.state.groceryselected.[grocery]: false });
    // });
  }

  handleremove = () => {
    var removelist = { item_names: this.state.groceryselected };
    console.log("remove");
    fetch(
      "http://ec2-52-32-150-175.us-west-2.compute.amazonaws.com:8000/user/" + this.props.userid + "/remove_grocery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(removelist)
      }
    )
      .then(response => response.json())
      .then(json => {
        window.location.reload(false);
      });
  };

  render() {
    return (
      <div>
        {this.props.grocerylist.map(grocery => (
          <div key={grocery}>
            <ListItem>
              <ListItemText primary={grocery + ": "} />

              <ListItemText primary=" " />
              <Checkbox
                /*checked={event => {
              console.log(this.event.target.id);
            }}*/
                color="default"
                id={grocery}
                onChange={event => {
                  if (this.state.groceryselected.includes(grocery)) {
                    const index = this.state.groceryselected.indexOf(grocery);
                    if (index > -1) {
                      this.state.groceryselected.splice(index, 1);
                    }
                  } else {
                    this.state.groceryselected.push(grocery);
                  }

                  console.log(this.state.groceryselected);
                  // event.target.checked = true;
                }}
                inputProps={{ "aria-label": "primary checkbox" }}
              >
                {/*console.log([props.id])*/}
              </Checkbox>
            </ListItem>

            <Divider />
          </div>
        ))}

        <Button
          style={{
            height: "50px",
            width: "100px",
            marginLeft: "35%",
            marginTop: "20px"
          }}
          variant="contained"
          onClick={e => this.handleremove()}
        >
          remove
        </Button>
      </div>
    );
  }
}

export default withStyles(style)(Groceryinfo);
