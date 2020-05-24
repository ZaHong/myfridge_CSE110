import React, { Component } from "react";
import background_img from "./res/homepage_background.png";
import { withStyles } from "@material-ui/core/styles";
import logo from "../../src/LogInSignup/res/MyFridge_Logo_Small.png";
import Grid from "@material-ui/core/Grid";
import profile_img from "./res/profile.png";
import scoreboard_img from "./res/scoreboard.png";
import recipe_img from "./res/recipe.png";
import friend_img from "./res/friend.png";
import Tabs from "./tabs";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { Redirect } from "react-router-dom";

var contains = [];

const style = theme => ({
  background: {
    backgroundImage: "url(" + background_img + ")",
    backgroundColor: "#cacbbc",
    backgroundSize: "cover",
    padding: "1vh",
    height: "100%",
    overflow: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    backgroundImage: "url(" + logo + ")"
    //height: "20px",
    //backgroundRepeat: 'no-repeat',
    //backgroundPosition: 'left',
    //backgroundSize: 'cover',
    //padding: '0 6px',
    //height: '100%',
    //position: 'fixed',
    //overflow: 'auto',
    //alignItems: 'left',
  }
});
class Fridge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: "user123456",
      food: [
        /*{
                foodName: 'Apple',
                ExpirationDate: '05/30/2020',
                Tag: 'fruit',
                Quantity: '1',
                PurchasedDate: '05/01/2020',
            }
            ,{
                foodName: 'Watermelon',
                ExpirationDate: '05/30/2020',
                Tag: 'fruit',
                Quantity: '1',
                PurchasedDate: '05/01/2020',
            },
            {
                foodName: 'strawberry',
                ExpirationDate: '05/30/2020',
                Tag: 'fruit',
                Quantity: '1',
                PurchasedDate: '05/01/2020',
            },
            {
                foodName: 'egg',
                ExpirationDate: '05/30/2020',
                Tag: 'food',
                Quantity: '10',
                PurchasedDate: '05/01/2020',
            },{
                foodName: 'milk',
                ExpirationDate: '05/30/2020',
                Tag: 'milk',
                Quantity: '2',
                PurchasedDate: '05/01/2020',
            }*/
      ],
      nullUserID: null
    };
    if (props.location.state == null) {
      this.state.nullUserID = true;
    } else {
      this.setState({ userid: props.location.state.userID });
      fetch("http://localhost:8000/user/" + props.location.state.userID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(json => {
          //alert(JSON.stringify(json.fridge))
          var resFood = [];
          for (var i = 0; i < json.fridge.length; i++) {
            var temp = json.fridge[i];
            var obj = {
              foodName: temp.name,
              ExpirationDate: temp.expiration_date.substring(0, 10),
              Tag: "IN PROGRESS",
              Quantity: temp.quantity,
              PurchasedDate: temp.date_purchased.substring(0, 10)
            };
            resFood.push(obj);
          }
          this.setState({ food: resFood });
        })
        .catch
        //this.setState({ userNotExist: true, emptyPassword: false })
        ();
    }
  }

  render() {
    const style = {
      marginTop: "25px"
    };
    const { classes } = this.props;
    return (
      <div padding="100vw" display="flex">
        <Grid container xs={12} className={classes.background}>
          <img
            src={logo}
            height="70vh"
            style={{ marginLeft: "6rem", marginRight: "34.5rem" }}
          />
          {this.state.nullUserID && <Redirect to="/" />}
          <Link to="http://google.com" variant="body2" className={classes.link}>
            <IconButton
              edge="end"
              size="small"
              color="inherit"
              aria-label="scoreboard"
            >
              <img
                src={scoreboard_img}
                style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
                height="70vh"
              />
            </IconButton>
          </Link>
          <Link to="http://google.com" variant="body2" className={classes.link}>
            <IconButton size="small" color="inherit" aria-label="scoreboard">
              <img
                src={profile_img}
                height="70vh"
                style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
              />
            </IconButton>
          </Link>
          <Link to="http://google.com" variant="body2" className={classes.link}>
            <IconButton size="small" color="inherit" aria-label="scoreboard">
              <img
                src={recipe_img}
                height="70vh"
                style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
              />
            </IconButton>
          </Link>
          <Link to="http://google.com" variant="body2" className={classes.link}>
            <IconButton size="small" color="inherit" aria-label="scoreboard">
              <img
                src={friend_img}
                height="70vh"
                style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
              />
            </IconButton>
          </Link>
        </Grid>
        <div style={style}>
          <Grid
            container
            style={{
              marginLeft: "375px"
            }}
          >
            <Link
              to="http://google.com"
              variant="body2"
              className={classes.link}
            >
              <IconButton size="small" color="#cacbbc" aria-label="scoreboard">
                <AddIcon style={{ fontSize: 70 }} />
              </IconButton>
            </Link>
          </Grid>
          <Grid
            container
            style={{ width: "1500px", marginLeft: "250px" }}
            //align="center"
            //justify="'flex-start'"
            //direction="column"
          >
            <Tabs foodInfos={this.state.food} />
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Fridge);

export function getFoodInfo() {
  return this.state.food;
}
