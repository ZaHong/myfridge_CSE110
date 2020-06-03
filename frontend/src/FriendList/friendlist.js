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
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    marginTop: '20vh',
    backgroundColor: '#f7f6f0',
  }
});

class Friendlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid:'',
      friends: [
        {name: 'gary', email:"gary@ucsd.edu"},
        {name: 'foo', email:"foo@ucsd.edu"},
        {name: 'onion', email:"onion@ucsd.edu"},
        {name: 'hehe', email:"hehe@ucsd.edu"}
      ],
      list: [],
      dialogOpen: false,
      newFriend: "",
      didRendered:false,
    };

    if (props.location.state == null) {
      this.state.nullUserID = true;
    } else {
      this.state.userid= props.location.state.userID
      fetch("http://ec2-52-32-150-175.us-west-2.compute.amazonaws.com:8000/user/" + this.state.userid + '/friends', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log(json)
          var tempfriendlist =[]
          for(var entry of json){
            var temp_friend={
              name:entry.nickname,
              email:entry.email,
              id:entry.id,
            }
            tempfriendlist.push(temp_friend)
          }
          console.log(tempfriendlist)
          this.setState({friends:tempfriendlist})

          for ( var each of this.state.friends) {
            this.state.list.push(
                <div value={each.email}>
                  <ListItem>
                    <ListItemText primary={each.name + ": " + each.email} />
                    <ListItemText primary=" " />
                      <Button size="medium" onClick={() => this.handleDelete(each.id)}>
                        <CancelIcon style={{ fontSize: 40 }}/>
                      </Button>
                  </ListItem>
                  <Divider />
                </div>);
          }
          this.setState({didRendered:true})
        })
        .catch();
    }
  }


  // const [open, setOpen] = React.useState(false);

  handleDelete = id =>{
    var payload = {
      "friend_id": id
    }
    fetch("http://ec2-52-32-150-175.us-west-2.compute.amazonaws.com:8000/user/" + this.state.userid + "/deleteFriend",{
      method: "POST",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(payload)
      }).then(response => response.json()).then(json => {
        if(json.status==true){
          window.location.reload(false);
        }else{
          //handle wrong email
          alert("Please Try Again")
        }
      }).catch(
        //handle wrong email
      )
  }

  handleClickOpen = () => {
    this.setState({ dialogOpen: true })
  };

  handleClose = () => {
    this.setState({ dialogOpen: false })
  }

  handleChange = name => event => {
    this.state.newFriend = event.target.value
  };

  handleAdd = () => {
    var payload = {
      "email": this.state.newFriend
    }
    fetch("http://ec2-52-32-150-175.us-west-2.compute.amazonaws.com:8000/user/" + this.state.userid + "/addFriend",{
      method: "POST",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(payload)
      }).then(response => response.json()).then(json => {
        if(json.status==true){
          window.location.reload(false);
        }else{
          //handle wrong email
          alert("Please Check your email")
        }
      }).catch(
        //handle wrong email
      )

  }


  render() {
    const { classes } = this.props;
    /*
    const handleToggle = (event, toggled) => {
      if (toggled != null) {
        this.setState({ emailNotification: toggled });
        console.log(this.state.emailNotification);
      }
    };*/

    return (
      <div>
            {this.state.didRendered ? 
        <Grid container xs={12} className={classes.background}>
          <div className={classes.header}>
            <Link to={{pathname: '/index', state: { userID: this.state.userid}}}>
              < img src={myfridge_logo} height="90vh" />
            </Link>
            <div className={classes.grow} />
            <Link to={{pathname: '/wasteboard', state: { userID: this.state.userid}}}>
              <IconButton size="medium">
                < img src={scoreboard_icon} height="70vh" />
              </IconButton>
            </Link>
            <Link to={{pathname: '/friendlist', state: { userID: this.state.userid}}}>
              <IconButton size="medium">
                < img src={friend_icon} height="70vh" />
              </IconButton>
            </Link>
            <Link to={{pathname: '/recipe', state: { userID: this.state.userid}}}>
              <IconButton size="medium">
                < img src={recipe_icon} height="70vh" />
              </IconButton>
            </Link>
            <Link to={{pathname: '/profile', state: { userID: this.state.userid}}}>
              <IconButton size="medium">
                < img src={profile_icon} height="70vh" />
              </IconButton>
            </Link>
          </div>

          <Grid container className={classes.bodyContainer}>
            <Grid item xs={5} style={{ marginLeft: "27%" }}>
              <List className={classes.profile}>
                <ListItem style={{ paddingInline: "30px" }}>
                  <h2 style={{ marginLeft: "30%" }}>Friends </h2>
                  <div>
                    <Button
                        style={{ height: "5vh", width: "8vw", fontSize: "1.5em", marginLeft:"5vw" }}
                        variant="contained"
                        color={this.state.edit ? "secondary" : "white"}
                        onClick={this.handleClickOpen}
                    > +

                    </Button>

                    <Dialog 
                    open={this.state.dialogOpen} 
                    onClose={this.handleClose} aria-labelledby="form-dialog-title">
                      <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            onChange={this.handleChange()}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={this.handleAdd} color="primary">
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>

                  </div>

                </ListItem>

                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />

                {this.state.list}
                <ListItem>
                  <ListItemText primary="" />
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
          <CircularProgress size='20vh' color='#ddddd6' thickness='2' style={{marginLeft: "5%"}}/>
        </div>
    </Grid>}
        </div>
    );
  }
}

export default withStyles(style)(Friendlist);