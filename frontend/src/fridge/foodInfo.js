import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import View from 'react';

class FoodInfo extends Component{
    constructor(props){
        super(props)
        this.state = this.props.information
        this.state.currentID = this.props.id
    }

    
    removeFood(event){
        var payload={
            'food_id':this.state.foodid
        }
        fetch("http://localhost:8000/user/" + this.state.currentID + "/deleteFood",{
              method: "POST",
              headers: {
                'Content-Type': "application/json"
              },
              body: JSON.stringify(payload)
            }).then(response => response.json()).then(json => {
              if(json.status==true){
                window.location.reload(false);
              }
            }).catch(
              //this.setState({ userNotExist: true, emptyPassword: false })
            )
    }
    render(){
        const number = this.props.number;
        const list = []
        return (
            <div style={{
                flexGrow: 1,
                //backgroundColor: theme.palette.background.paper,
                display: 'flex',
                height: '55vh',
                //marginLeft: '2vw',
                //marginTop: '2vh',
                background: '#cacbbc',
                width: '45vw',
            }}>
                
                <ul>
                <br></br>
                <div display="flex">
                  <label style={{fontSize: "1.17em", marginLeft: "8vw"}}>
                        Food Item:
                  </label>
                  <label style={{fontSize: "1.17em", marginLeft: "8vw"}}>
                  {this.state.foodName}
                  </label>
                </div>
                <br></br>
                <div display="flex">
                  <label style={{fontSize: "1.17em", marginLeft: "8vw"}}>
                  Tag:
                  </label>
                  <label style={{fontSize: "1.17em", marginLeft: "8vw"}}>
                  {this.state.Tag}
                  </label>
                </div>
                <br></br>
                <div display="flex">
                  <label style={{fontSize: "1.17em", marginLeft: "8vw"}}>
                  Quantity:
                  </label>
                  <label style={{fontSize: "1.17em", marginLeft: "8vw"}}>
                  {this.state.Quantity}
                  </label>
                </div>
                <br></br>
                <div display="flex">
                  <label style={{fontSize: "1.17em", marginLeft: "8vw"}}>
                  Purchased Date:
                  </label>
                  <label style={{fontSize: "1.17em", marginLeft: "8vw"}}>
                  {this.state.PurchasedDate}
                  </label>
                </div>
                <br></br>
                <div display="flex">
                  <label style={{fontSize: "1.17em", marginLeft: "8vw"}}>
                  Expected Expiration:
                  </label>
                  <label style={{fontSize: "1.17em", marginLeft: "8vw"}}>
                  {this.state.ExpirationDate}
                  </label>
                </div>
                
                <br></br>
                <Grid style = {{
                    display: 'flex',
                    height: 50,
                    width: '200vw',
                    flexDirection: 'row',
                    marginLeft: "8vw",
                }}>
                <Button 
                    style={{height:'50px', width:'100px'}} 
                    variant="contained" 
                    color="white"
                    >
                    Edit
                </Button>
                <Button 
                    style={{height:'50px', marginLeft: '200px', width:'100px'}}variant="contained" 
                    color="white"
                    onClick={event => this.removeFood(event)}>
                    Remove
                </Button>
                </Grid>
                <Button style={{ height:'50px', width:'150px', marginTop: '3vh', marginLeft:"8vw"}} variant="contained" color="white">
                    Put to Waste
                </Button>
                </ul>
            </div>
        )
    }
}

export default FoodInfo;