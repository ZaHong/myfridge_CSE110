import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import myfridge_logo from "../../src/LogInSignup/res/MyFridge_Logo_Small.png";
import profile_icon from "../fridge/res/profile.png";
import scoreboard_icon from "../fridge/res/scoreboard.png";
import recipe_icon from "../fridge/res/recipe.png";
import friend_icon from "../fridge/res/friend.png";


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
      bodyContainer:{
          marginTop: '20vh',
          direction:"row",
          justify:"space-around",
          alignItems:"baseline",
          spacing:3,
      },
      scoreList:{
        backgroundColor: '#e5e8df',
        backgroundSize: 'cover',
        border: "3px solid rgb(212, 212, 212)",
        borderRadius: '10px',
        marginLeft: '5vw',
        marginRight: '5vw',
      },
      wasteList:{
        backgroundColor: '#e5e8df',
        border: "3px solid rgb(212, 212, 212)",
        borderRadius: '10px',
        marginLeft: '5vw',
        marginRight: '5vw',
      }
})

class Wasteboard extends Component{
    
    constructor(props){
        super(props)

        this.state={
            userid: '123456',
            stats:{
                money:'200',
                nickname:'Gary(Me)'
            },
            wastes:{
                'Apple':'05/30/2020',
                'Milk':'05/29/2020',
                'Eggs':'05/01/2020',
            },
            scores:{
                'Dad':1000,
                'Spongebob':500,
                'Gary(Me)':200,
            },
            scoreboardlist:[],
            wastefoodlist:[]
        }

        for(var key in this.state.scores){
            this.state.scoreboardlist.push(
                <div>
                <ListItem >
                    <ListItemText primary={key +": "}/>
                    <ListItemText primary=' ' />
                    <ListItemText primary={'$ ' + this.state.scores[key]}/>
                </ListItem>
                <Divider />
                </div>
            )
        }

        for(var key in this.state.wastes){
            this.state.wastefoodlist.push(
                <div>
                <ListItem>
                    <ListItemText primary={key +": "}/>
                    <ListItemText primary=' ' />
                    <ListItemText primary={this.state.wastes[key]}/>
                </ListItem>
                <Divider />
                </div>
            )
        }
    }

    render(){
        const {classes } = this.props;
        return(
            <Grid container xs={12} className={classes.background}>
                <div className={classes.header}>
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
                    <Link to="/index">
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
                
                <Grid container className={classes.bodyContainer}>  
                <Grid item xs={7}>
                    <List className={classes.scoreList}>
                        <ListItem>
                            <ListItemText primary='Food Waste Scoreboard: ' />
                        </ListItem>
                        <Divider />
                        <Divider />
                        <Divider />
                        <Divider />
                        <Divider />
                        <Divider />
                        <Divider />
                        <ListItem>
                            <ListItemText primary={this.state.stats.nickname} />
                            <ListItemText primary=' ' />
                            <ListItemText primary={'$ ' + this.state.stats.money}/>
                        </ListItem>
                        <Divider />
                        <Divider />
                        <Divider />
                        {this.state.scoreboardlist}
                        <ListItem>
                            <ListItemText primary=""/>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={5}>
                    <List className={classes.wasteList}>
                        <ListItem>
                            <ListItemText primary='Total Food Waste: ' />
                        </ListItem>
                        <Divider />
                        <Divider />
                        <Divider />
                        <Divider />
                        <Divider />
                        <Divider />
                        <Divider />
                        {this.state.wastefoodlist}
                        <ListItem>
                            <ListItemText primary=""/>
                        </ListItem>
                    </List>
                </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(style)(Wasteboard)