import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import View from 'react';

class FoodInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            foodinfo: this.props.information,
            currentID: this.props.id,
            edit: false
        }
    }

    handleChange = name => event => {
        this.state.foodinfo[name]= event.target.value;
    };

    handleEdit = event => {
        if(this.state.edit){
            this.setState({ edit: false })
            var payload ={
                'name': this.state.foodinfo.foodName,
                'tag': this.state.foodinfo.Tag,
                'quantity': this.state.foodinfo.Quantity,
                'food_id':this.state.foodinfo.foodid
            }
            fetch("http://ec2-52-32-150-175.us-west-2.compute.amazonaws.com:8000/user/" + this.state.currentID + "/modifyFood",{
              method: "POST",
              headers: {
                'Content-Type': "application/json"
              },
              body: JSON.stringify(payload)
            }).then(response => response.json()).then(json => {
                if(json.status==true){
                  window.location.reload(false);
            }})
        }else{
            this.setState({ edit: true })
            
        }
        
    }
    
    removeFood(event){
        var payload={
            'food_id':this.state.foodinfo.foodid
        }
        fetch("http://ec2-52-32-150-175.us-west-2.compute.amazonaws.com:8000/user/" + this.state.currentID + "/deleteFood",{
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

    putToWaste(event){
        var payload={
            'amount':this.state.foodinfo.Quantity,
            'name':this.state.foodinfo.foodName,
            'date':this.state.foodinfo.ExpirationDate,
            'food_id':this.state.foodinfo.foodid,
        }

        fetch("http://ec2-52-32-150-175.us-west-2.compute.amazonaws.com:8000/user/" + this.state.currentID + "/add_waste",{
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
                //flexGrow: 1,
                display: 'flex',
                height: '55vh',
                alignItems: "center",
                //marginLeft: '2vw',
                //marginTop: '2vh',
                background: '#cacbbc',
                width: '45vw',
            }}>
                <List style={{width: '35vw', margin:'auto'}}>
                    <ListItem>
                        {!this.state.edit && <ListItemText primary="Food Item:" />}
                        {this.state.edit ? (
                        <TextField
                        variant="outlined"
                        //margin="normal"
                        required
                        fullWidth
                        label="Food Item:"
                        name="foodName"
                        autoFocus
                        defaultValue={this.state.foodinfo.foodName}
                        onChange={this.handleChange("foodName")}
                        />
                        ) : (<ListItemText primary={this.state.foodinfo.foodName} />)}
                    </ListItem>
                    <ListItem>
                        {!this.state.edit && <ListItemText primary="Tag:" />}
                        {this.state.edit ? (
                        <TextField
                        variant="outlined"
                        //margin="normal"
                        fullWidth
                        label="Tag:"
                        name="Tag"
                        autoFocus
                        defaultValue={this.state.foodinfo.Tag}
                        onChange={this.handleChange("Tag")}
                        />
                        ) : (<ListItemText primary={this.state.foodinfo.Tag} />)}
                    </ListItem>
                    <ListItem>
                        {!this.state.edit && <ListItemText primary="Quantity:" />}
                        {this.state.edit ? (
                        <TextField
                        variant="outlined"
                        //margin="normal"
                        fullWidth
                        label="Quantity:"
                        name="Quantity"
                        autoFocus
                        defaultValue={this.state.foodinfo.Quantity}
                        onChange={this.handleChange("Quantity")}
                        />
                        ) : (<ListItemText primary={this.state.foodinfo.Quantity} />)}
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Purchased Date:" />
                        <ListItemText primary={this.state.foodinfo.PurchasedDate} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Expected Expiration:" />
                        <ListItemText primary={this.state.foodinfo.ExpirationDate} />
                    </ListItem>
                    {!this.state.edit && 
                    <ListItem>
                        <ListItemText primary="" />
                    </ListItem>}
                    <ListItem>
                    <Button 
                        style={{height:'50px', width:'100px'}} 
                        variant="contained" 
                        color="white"
                        onClick={e => (this.handleEdit())}
                        >
                        {this.state.edit ? "Save" : "Edit"}
                    </Button>
                    {this.state.edit ? <br></br> : 
                    <Button 
                        style={{height:'50px', marginLeft: '200px', width:'100px'}}variant="contained" 
                        color="white"
                        onClick={event => this.removeFood(event)}>
                        Remove
                    </Button>}
                    </ListItem>
                    {this.state.edit ? <br></br> :
                    <ListItem>
                        <Button 
                            style={{ height:'50px', width:'150px'}} 
                            variant="contained" 
                            color="white"
                            onClick={event => this.putToWaste(event)}
                            >
                            Put to Waste
                        </Button>
                        </ListItem>}
                    
                </List>
            </div>
        )
    }
}

export default FoodInfo;