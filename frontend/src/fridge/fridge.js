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
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import  { Redirect } from 'react-router-dom'

var contains = []
/*
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
*/


const style = theme => ({
    background:{
        //backgroundImage: 'url('+ background_img +')',
        /*
        backgroundColor: '#f7f6f0',
        backgroundSize: 'cover',
        padding: '1vh',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        */
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
        height: '6em',
        borderBottom: "3px solid rgb(212, 212, 212)"
      },
      grow:{
        flexGrow: 0.8,
      },tabs: {
        marginTop: '10vw',
        backgroundColor: '#f7f6f0',
      }
})

class Fridge extends Component{

    constructor(props){
        super(props)

        this.state= {
            userid: 'user123456',
            food:[
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
            }*/],
            nullUserID:null,
          }
        if(props.location.state== null){
            this.state.nullUserID=true
        }else{
            this.setState({userid: props.location.state.userID})
            fetch("http://localhost:8000/user/"+props.location.state.userID,{
                method: "GET",
                headers: {
                'Content-Type': "application/json"
                }
            }).then(response => response.json()).then(json => {
            //alert(JSON.stringify(json.fridge))
            var resFood=[]
            for(var i = 0 ; i< json.fridge.length; i++){
                var temp=json.fridge[i]
                var obj={
                    foodName: temp.name,
                    ExpirationDate: temp.expiration_date.substring(0,10),
                    Tag: 'IN PROGRESS',
                    Quantity: temp.quantity,
                    PurchasedDate: temp.date_purchased.substring(0,10),
                }
                resFood.push(obj)
            }
            this.setState({food: resFood})
            }).catch(
                //this.setState({ userNotExist: true, emptyPassword: false })
        )
        }
    }

    render(){

        const style = {
            marginTop: ''
        }
        const { classes } = this.props;
        return (
            <Grid container xs={12} className={classes.background}>
                <div container xs={12} className={classes.header}>
                <Link to="/index">
                        <img src={logo} height='90vh'/>
                    </Link>
                    {(this.state.nullUserID) && (<Redirect to='/'/>)}
                    {/**
                     <Link to="http://google.com" variant="body2" className={classes.link}>
                        <IconButton edge="end" size='small' color="inherit" aria-label="scoreboard">
                        <img src={scoreboard_img} height='70vh'/>
                        </IconButton>
                    </Link>
                    <Link to="http://google.com" variant="body2" className={classes.link}>
                        <IconButton size='small' color="inherit" aria-label="scoreboard">
                        <img src={friend_img} height='70vh'/>
                        </IconButton>
                    </Link>
                    <Link to="http://google.com" variant="body2"className={classes.link}>
                        <IconButton size='small' color="inherit" aria-label="scoreboard">
                        <img src={recipe_img} height='70vh'/>
                        </IconButton>
                    </Link>
                    <Link to="http://google.com" variant="body2" className={classes.link}>
                        <IconButton size='small' color="inherit" aria-label="scoreboard">
                        <img src={profile_img} height='70vh'/>
                        </IconButton>
                    </Link>
                     */}
                    <div className={classes.grow} />
                    <Link to="/index">
                        <IconButton size='medium'>
                                    <img src={scoreboard_img} height='70vh' />
                        </IconButton>
                    </Link>
                    <Link to="/index">
                        <IconButton size='medium'>
                                    <img src={friend_img} height='70vh' />
                        </IconButton>
                    </Link>
                    <Link to="/index">
                        <IconButton size='medium'>
                                    <img src={recipe_img} height='70vh' />
                        </IconButton>
                    </Link>
                    <Link to="/index">
                        <IconButton size='medium'>
                                    <img src={profile_img} height='70vh' />
                        </IconButton>
                    </Link>
                </div>
                <div className={classes.tabs} >
                    <Grid
                        container
                        style={{
                                marginLeft:'375px',
                    }}>
                    <Link to="http://google.com" variant="body2" className={classes.link}>
                    <IconButton size='small' color="#cacbbc" aria-label="scoreboard">
                        <AddIcon style={{ fontSize: 70 }}/>
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
                        <Tabs foodInfos={this.state.food} />
                    </Grid>
                
                </div>
            </Grid>

          );
    }
}

export default withStyles(style)(Fridge)

export function getFoodInfo(){
    return this.state.food;
}
