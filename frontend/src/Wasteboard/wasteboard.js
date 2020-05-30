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
      },
      tabs: {
        marginTop: '20vh',
        backgroundColor: '#f7f6f0',
      }
})

class Wasteboard extends Component{
    
    constructor(props){
        super(props)

        this.state={
            userid: '',
            stats:{
                score:'',
                name:''
            },
            wastes:[
                /*
                {name:'Apple', date:'05/30/2020'},
                {name:'Milk', date:'05/29/2020'},
                {name:'Egg', date:'05/27/2020'},*/
            ],
            scores:[
                /*
                {name:'Dad', score:1000},
                {name:'Spongebob', score:500},
                {name:'Gary(Me)', score:200},*/
            ],
            scoreboardlist:[],
            wastefoodlist:[],
            didRendered:false,
        };

        if (props.location.state == null) {
            this.props.history.push({
                pathname: '/',
            })
        } else {
            this.state.userid= props.location.state.userID;

            fetch(`http://localhost:8000/user/${this.state.userid}/scoreboard`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    var friendlist=[]
                    for(var item of json.rank){
                        if(item.self == true){
                           var temp_str = item.nickname + ' (Me)'
                           var temp_info={
                               score:item.score,
                               name:temp_str,
                           }
                           friendlist.push(temp_info)
                           this.setState({stats:temp_info})
                        }else{
                            var temp_info={
                                score:item.score,
                                name:item.nickname,
                            }
                            friendlist.push(temp_info)
                        }
                    }
                    this.setState({scores:friendlist})
                    this.setState({wastes: json.waste_list})
                    for(var entry of this.state.scores){
                        this.state.scoreboardlist.push(
                            <div>
                            <ListItem >
                                <ListItemText primary={entry.name +": "}/>
                                <ListItemText primary=' ' />
                                <ListItemText primary={'Waste Quantity: ' + entry.score}/>
                            </ListItem>
                            <Divider />
                            </div>
                        )
                    }
            
                    for(var entry of this.state.wastes){
                        this.state.wastefoodlist.push(
                            <div>
                            <ListItem>
                                <ListItemText primary={entry.name +": "}/>
                                <ListItemText primary=' ' />
                                <ListItemText primary={entry.date}/>
                            </ListItem>
                            <Divider />
                            </div>
                        )
                    }
                    this.setState({didRendered:true})
                })
            
        }

        
    }

    render(){
        const {classes } = this.props;
        return(
            <div>
            {this.state.didRendered ? 
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
                            <ListItemText primary={this.state.stats.name} />
                            <ListItemText primary=' ' />
                            <ListItemText primary={'Waste Quantity: ' + this.state.stats.score}/>
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
            :
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
                <div className={classes.tabs} >
                  <Typography variant="h3" gutterBottom={true} color='#ddddd6'>
                    Loading... 
                  </Typography>
                  <CircularProgress size='20vh' color='#ddddd6' thickness='2'/>
                </div>
            </Grid>}
            </div>
        )
    }
}

export default withStyles(style)(Wasteboard)