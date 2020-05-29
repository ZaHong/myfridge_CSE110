import myfridge_logo from "../LogInSignup/res/MyFridge_Logo_Small.png";
import profile_icon from "../fridge/res/profile.png";
import scoreboard_icon from "../fridge/res/scoreboard.png";
import recipe_icon from "../fridge/res/recipe.png";
import friend_icon from "../fridge/res/friend.png";
import add_icon from "./res/Add_icon.png";
// import background_img from "./res/homepage_background.png";
// import RecipeTabs from "./recipeTab";

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from "../FriendList/friendlist";

const style = theme => ({
    background:{
        backgroundColor: '#f7f6f0',
        backgroundSize: 'cover',
        height: '100%',
        position: 'fixed',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header:{
        backgroundColor: '#ddddd6',
        backgroundSize: 'cover',
        paddingLeft: '10vw',
        paddingTop: '1vh',
        width: '100%',
        position: 'fixed',
        overflow: 'auto',
        display: 'flex',
        height: '6.5em',
        borderBottom: "3px solid rgb(212, 212, 212)"
    },
    grow:{
        flexGrow: 0.8,
    },
    tabs: {
        marginTop: '20vh',
        backgroundColor: '#f7f6f0',
    },
    bodyContainer: {
        marginTop: "20vh",
        direction: "row",
        justify: "space-around",
        alignItems: "baseline",
        spacing: 3
    },
    verticalBodyContainer: {
        direction: "column",
        justify: "center",
        alignItems: "center",
        alignContent:"center"
    },
    profile: {
        backgroundColor: "#e5e8df",
        backgroundSize: "cover",
        border: "3px solid rgb(212, 212, 212)",
        borderRadius: "10px",
        marginLeft: "5vw",
        marginRight: "5vw",
        overflow: "auto",
        maxHeight: "60vh",
    }
});
//
// function listItemWrapper(props) {
//     const index = props.index;
//     return (
//
//     )
// }

class Recipe extends Component{
    constructor(props){
        super(props);
        this.state = {
            userid: "",
            recipes: [],
            recipe_items: [],
            // nullUserID: true,
            didRendered: false,
        };
        if (props.location.state == null) {
            this.props.history.push({
                pathname: '/',
            })
        } else {
            this.state.userid= props.location.state.userID;

            fetch(`http://localhost:8000/user/${this.state.userid}/recipe`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(json => {
                    // alert(JSON.stringify(json.length));
                    // this.state.recipes = json;
                    // this.state.didRendered = true;

                    let temp = [];
                    for ( var i =0; i<json.length; i++) {
                        temp.push(
                            <div >
                                <ListItem>
                                    <Link >
                                        <ListItemText primary={json[i].recipe_info.name + " " + json[i].missing_num} />
                                        <ListItemText primary=" " />
                                    </Link>
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    }
                    this.setState({recipes:json, didRendered:true, recipe_items: temp});
                })
        }
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                {/*{(this.state.nullUserID) && (<Redirect push to='/'/>)}*/}
                <Grid container xs={12} className={classes.background}>
                    <div container xs={12} className={classes.header}>
                        <Link to={{pathname: '/index', state: { userID: this.state.userid}}}>
                            <img src={myfridge_logo} height='90vh'/>
                        </Link>

                        <div className={classes.grow} />
                        <Link to={{pathname: '/wasteboard', state: { userID: this.state.userid}}}>
                            <IconButton size='medium'>
                                <img src={scoreboard_icon} height='70vh' />
                            </IconButton>
                        </Link>
                        <Link to={{pathname: '/friendlist', state: { userID: this.state.userid}}}>
                            <IconButton size='medium'>
                                <img src={friend_icon} height='70vh' />
                            </IconButton>
                        </Link>
                        <Link to={{pathname: '/recipe', state: { userID: this.state.userid}}}>
                            <IconButton size='medium'>
                                <img src={recipe_icon} height='70vh' />
                            </IconButton>
                        </Link>
                        <Link to={{pathname: '/profile', state: { userID: this.state.userid}}}>
                            <IconButton size='medium'>
                                <img src={profile_icon} height='70vh' />
                            </IconButton>
                        </Link>
                    </div>

                    {this.state.didRendered ?
                        <Grid container xs={12} className={classes.bodyContainer}>
                            <Grid container xs={4}>
                                <List className={classes.profile}>
                                    <ListItem>
                                        <h3 style={{ marginLeft: "15%" }}>Recommend Recipe</h3>
                                    </ListItem>

                                    <Divider />
                                    <Divider />
                                    <Divider />
                                    <Divider />
                                    <Divider />
                                    <Divider />
                                    <Divider />

                                    {this.state.recipe_items}
                                    <ListItem>
                                        <ListItemText primary="" />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid container xs={1} className={classes.verticalBodyContainer}>
                                <Tooltip title="Customize Your Recipe" aria-label="add">
                                    <IconButton aria-label="customize recipe">
                                        <img src={add_icon} height='90vh'/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Customize Your Recipe" aria-label="add">
                                    <IconButton aria-label="customize recipe">
                                        My<br/>Recipe
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid container xs={7} md={6}>
                                <List className={classes.profile}>
                                    <ListItem style={{ paddingInline: "30px" }}>
                                        <h3 style={{ justify: "center" }}>Recommend Recipe</h3>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="" />
                                    </ListItem>
                                </List>
                            </Grid>

                        </Grid>
                        :
                        <div className={classes.tabs} alignItems='center'>
                            <Typography variant="h3" gutterBottom={true} color='#ddddd6'>
                                Loading Recipes...
                            </Typography>
                            <CircularProgress size='20vh' color='#ddddd6' thickness='2'/>
                        </div>
                    }
                </Grid>
            </div>
        );
    }
}

export default withStyles(style)(Recipe);
//
// export function getFoodInfo() {
//     return this.state.food;
// }
