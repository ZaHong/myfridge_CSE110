import myfridge_logo from "../LogInSignup/res/MyFridge_Logo_Small.png";
import profile_icon from "../fridge/res/profile.png";
import scoreboard_icon from "../fridge/res/scoreboard.png";
import recipe_icon from "../fridge/res/recipe.png";
import friend_icon from "../fridge/res/friend.png";
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
    }
});

class Recipe extends Component{
    constructor(props){
        super(props);
        this.state = {
            userid: "",
            recipes: [],
            // nullUserID: true,
            didRendered:false,
        };
        if (props.location.state == null) {
            this.props.history.push({
                pathname: '/',
            })
        } else {
            this.state.userid= props.location.state.userID
            fetch(`http://localhost:8000/user/${this.state.userid}/recipe`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(json => {
                    alert(JSON.stringify(json.length));
                    // var resFood = [];
                    // //console.log(json.fridge)
                    // for (var i = 0; i < json.fridge.length; i++) {
                    //     var temp = json.fridge[i];
                    //     console.log(temp)
                    //     var obj = {
                    //         foodName: temp.name,
                    //         ExpirationDate: temp.expiration_date.substring(0, 10),
                    //         Tag: temp.tag,
                    //         Quantity: temp.quantity,
                    //         PurchasedDate: temp.date_purchased.substring(0, 10),
                    //         foodid : temp._id,
                    //     };
                    //     resFood.push(obj);
                    // }
                    // this.setState({ food: resFood, didRendered: true });
                })
                .catch
                //this.setState({ userNotExist: true, emptyPassword: false })
                ();
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
                    <div className={classes.tabs}>
                        <Grid container
                              style={{width:'100vw',
                                  marginLeft:'15vw',
                              }}
                            //align="center"
                            //justify="'flex-start'"
                            //direction="column"
                        >
                            {/*<RecipeTabs foodInfos={this.state.food} id={this.state.userid}/>*/}
                        </Grid>
                    </div>
                    :
                    <div className={classes.tabs} >
                        <Typography variant="h3" gutterBottom={true} color='#ddddd6'>
                            Loading...
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
