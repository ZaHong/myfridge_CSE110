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
    }
    render(){
        const number = this.props.number;
        const list = []
        return (
            <div style={{
                flexGrow: 1,
                //backgroundColor: theme.palette.background.paper,
                display: 'flex',
                height: 450,
                marginLeft: '20px',
                marginTop: '20px',
                background: '#cacbbc',
                //width: '625px'
                width: '45vw'
            }}>
                <ul>
                <h3>
                    Food Item:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.foodName}
                </h3>
                <h3>
                    Tag:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.Tag}
                </h3>
                <h3>
                    Quantity:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.Quantity}
                </h3>
                <h3>
                    Purchased Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.PurchasedDate}
                </h3>
                <h3>
                    Expected Expiration:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.ExpirationDate}
                </h3>
                <Grid style = {{
                    display: 'flex',
                    height: 50,
                    width: '500px',
                    flexDirection: 'row',
                }}>
                <Button style={{height:'50px', width:'100px'}} variant="contained" color="white">
                    Edit
                </Button>
                <Button style={{height:'50px', marginLeft: '200px', width:'100px'}}variant="contained" color="white">
                    Remove
                </Button>
                </Grid>
                <Button style={{ height:'50px', width:'150px', marginTop: '30px'}} variant="contained" color="white">
                    Put to Waste
                </Button>
                </ul>
            </div>
        )
    }
}

export default FoodInfo;