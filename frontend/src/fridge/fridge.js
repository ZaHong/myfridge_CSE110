import React, { Component } from 'react';
import background_img from "./res/homepage_background.png";
import { withStyles } from '@material-ui/core/styles';
import logo from "../../src/LogInSignup/res/MyFridge_Logo_Small.png";
import Grid from '@material-ui/core/Grid';
import profile_img from "./res/profile.png";
import scoreboard_img from "./res/scoreboard.png";
import recipe_img from "./res/recipe.png";
import friend_img from "./res/friend.png";
import Tabs from "./tabs";
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

var list = []
var contains = []

const style = theme => ({
    background:{
        backgroundColor: '#f7f6f0',
        backgroundSize: 'cover',
        height: '100%',
        position: 'fixed',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        //alignItems: 'center',
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
        height: '6em',
        borderBottom: "3px solid rgb(212, 212, 212)"
      },
      grow:{
        flexGrow: 0.8,
      },
      bodyContainer:{
          marginTop: '20vh',
          direction:"row",
          justify:"space-around",
          alignItems:"baseline",
          spacing:3,
      },
      foodInfo:{
        backgroundColor: '#e5e8df',
        backgroundSize: 'cover',
        border: "3px solid rgb(212, 212, 212)",
        borderRadius: '10px',
        marginLeft: '5vw',
        //marginRight: '5vw',
      },
      wasteList:{
        backgroundColor: '#e5e8df',
        border: "3px solid rgb(212, 212, 212)",
        borderRadius: '10px',
        marginLeft: '5vw',
        marginRight: '5vw',
      }
})


/*
const style = theme => ({
    background:{
        backgroundImage: 'url('+ background_img +')',
        backgroundColor: '#cacbbc',
        backgroundSize: 'cover',
        padding: '1vh',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      image: {
        backgroundImage: 'url('+ logo +')',
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
})
*/
class Fridge extends Component{

    constructor(props){
        super(props)

        this.state= {
            userid: 'user123456',
            Apple: {
                foodName: 'Apple',
                ExpirationDate: '05/30/2020',
                Tag: 'fruit',
                Quantity: '1',
                PurchasedDate: '05/01/2020',
            }
            ,Watermelon: {
                foodName: 'Watermelon',
                ExpirationDate: '05/30/2020',
                Tag: 'fruit',
                Quantity: '1',
                PurchasedDate: '05/01/2020',
            },
            strawberry: {
                foodName: 'strawberry',
                ExpirationDate: '05/30/2020',
                Tag: 'fruit',
                Quantity: '1',
                PurchasedDate: '05/01/2020',
            },
            egg: {
                foodName: 'egg',
                ExpirationDate: '05/30/2020',
                Tag: 'food',
                Quantity: '10',
                PurchasedDate: '05/01/2020',
            },
            milk: {
                foodName: 'milk',
                ExpirationDate: '05/30/2020',
                Tag: 'milk',
                Quantity: '2',
                PurchasedDate: '05/01/2020',
            }
          }     
            for (var key in this.state){
                if (key !== 'userid' && !contains.includes(key)){
                list.push(this.state[key]);
                contains.push(key);
            }
        }     
    }

    render(){

        const { classes } = this.props;
        return (
            <Grid container xs={12} className={classes.background}>
                <div className={classes.header}>
                    <img src={logo} height='90vh'/> 
                    <div className={classes.grow} />
                    {/**<Link href="http://google.com" variant="body2">
                        <IconButton edge="end" size='small' color="inherit" aria-label="scoreboard">
                        <img src={scoreboard_img} height='90vh'/>
                        </IconButton>
                    </Link>
                    <Link href="http://google.com" variant="body2">
                        <IconButton size='small' color="inherit" aria-label="scoreboard">
                        <img src={friend_img} height='90vh'/>
                        </IconButton>
                    </Link>
                    <Link href="http://google.com" variant="body2">
                        <IconButton size='small' color="inherit" aria-label="scoreboard">
                        <img src={recipe_img} height='90vh'/>
                        </IconButton>
                    </Link>
                    <Link href="http://google.com" variant="body2">
                        <IconButton size='small' color="inherit" aria-label="scoreboard">
                        <img src={profile_img} height='90vh'/>
                        </IconButton>
                    </Link> */}
                    <IconButton size='medium'
                            containerElement={<Link to="/listings" />}
                            linkButton={true}>
                                <img src={scoreboard_img} height='90vh' />
                    </IconButton>
                    <IconButton size='medium'
                            containerElement={<Link to="/listings" />}
                            linkButton={true}>
                                <img src={friend_img} height='90vh' />
                    </IconButton>
                    <IconButton size='medium'
                            containerElement={<Link to="/listings" />}
                            linkButton={true}>
                                <img src={recipe_img} height='90vh' />
                    </IconButton>
                    <IconButton size='medium'
                            containerElement={<Link to="/listings" />}
                            linkButton={true}>
                                <img src={profile_img} height='90vh' />
                    </IconButton>
                </div>
                {/** <div>
                    <Grid container >
                    
                    <Link href="http://google.com" variant="body2">
                    <IconButton size='small' color="#cacbbc" aria-label="scoreboard" style={{ fontSize: 70, marginLeft:'22vw'}}>
                        <AddIcon style={{ fontSize: 70}}/>
                    </IconButton>
                    </Link>
                    </Grid>
                    <Grid container 
                        style={{width:'100vw',
                              marginLeft:'15vw',
                        }}
                        //align="center"
                        //justify="'flex-start'"
                        //direction="column"
                    >
                        <Tabs foodInfos={list}/>
                    </Grid>
                
                </div>*/}
                
                
            </Grid>

          );
    }
}

export default withStyles(style)(Fridge)

export function getFoodInfo(){
    return list;
}
