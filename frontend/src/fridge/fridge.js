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
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

var list = [];
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
      Apple: {
        foodName: "Apple",
        ExpirationDate: "05/30/2020",
        Tag: "fruit",
        Quantity: "1",
        PurchasedDate: "05/01/2020"
      },
      Watermelon: {
        foodName: "Watermelon",
        ExpirationDate: "05/30/2020",
        Tag: "fruit",
        Quantity: "1",
        PurchasedDate: "05/01/2020"
      },
      strawberry: {
        foodName: "strawberry",
        ExpirationDate: "05/30/2020",
        Tag: "fruit",
        Quantity: "1",
        PurchasedDate: "05/01/2020"
      },
      egg: {
        foodName: "egg",
        ExpirationDate: "05/30/2020",
        Tag: "food",
        Quantity: "10",
        PurchasedDate: "05/01/2020"
      },
      milk: {
        foodName: "milk",
        ExpirationDate: "05/30/2020",
        Tag: "milk",
        Quantity: "2",
        PurchasedDate: "05/01/2020"
      }
    };
    for (var key in this.state) {
      if (key !== "userid" && !contains.includes(key)) {
        list.push(this.state[key]);
        contains.push(key);
      }
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
          <Link
            href="http://google.com"
            variant="body2"
            className={classes.link}
          >
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
          <Link
            href="http://google.com"
            variant="body2"
            className={classes.link}
          >
            <IconButton size="small" color="inherit" aria-label="scoreboard">
              <img
                src={profile_img}
                height="70vh"
                style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
              />
            </IconButton>
          </Link>
          <Link
            href="http://google.com"
            variant="body2"
            className={classes.link}
          >
            <IconButton size="small" color="inherit" aria-label="scoreboard">
              <img
                src={recipe_img}
                height="70vh"
                style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
              />
            </IconButton>
          </Link>
          <Link
            href="http://google.com"
            variant="body2"
            className={classes.link}
          >
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
              href="http://google.com"
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
            <Tabs foodInfos={list} />
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Fridge);

export function getFoodInfo() {
  return list;
}
