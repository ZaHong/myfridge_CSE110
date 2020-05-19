import React, {Component} from 'react';
import db from '../base'
import Button from '@material-ui/core/Button';
import {dark} from "@material-ui/core/styles/createPalette";
import {lightBlue} from "@material-ui/core/colors";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

class FoodItemInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={{paddingTop: '10px', paddingLeft:"650px", position:"relative"}}>
                <table style={{width:"700px", height:"550px",border: '2px solid #666666', backgroundColor:"#ecf9f2"}}>
                    <tr>
                        <th style={{color:"darkslategrey"}}>Food Item:</th>
                        <th style={{color:"darkslategrey"}} >Apple</th>
                    </tr>
                    <tr>
                        <th style={{color:"darkslategrey"}}>Tag:</th>
                        <th style={{color:"darkslategrey"}}>Fruit</th>
                    </tr>
                    <tr>
                        <th style={{color:"darkslategrey"}}>Quantity:</th>
                        <th style={{color:"darkslategrey"}}>1 pound</th>
                    </tr>
                    <tr>
                        <th style={{color:"darkslategrey"}}>Purchase Date:</th>
                        <th style={{color:"darkslategrey"}}>May 1, 2020</th>
                    </tr>
                    <tr>
                        <th style={{color:"darkslategrey"}}>Expected Expiration Date:</th>
                        <th style={{color:"darkslategrey"}}>June 1, 2020</th>
                    </tr>
                    <tr style={{verticalAlign:"bottom"}}>
                        <Button
                            style={{marginTop:"40px", marginLeft:"100px", marginRight:"50px",
                                marginBottom:"30px", height:"50px", width: "100px", backgroundColor:"#f2f2f2"}}
                            type="submit"
                            halfWidth
                            variant="contained"
                            color="#5f5f5"
                            onClick={event => this.handleClick(event)}
                        >
                            Edit
                        </Button>
                        <Button
                            style={{marginTop:"40px",marginLeft:"100px", marginRight:"50px", marginBottom:"30px",
                                height:"50px", width: "120px", backgroundColor:"#f2f2f2"}}
                            type="submit"
                            halfWidth
                            variant="contained"
                            onClick={event => this.handleClick(event)}
                        >
                            Remove
                        </Button>
                    </tr>
                    <Button
                        style={{marginLeft:"100px", height:"50px", width: "200px", backgroundColor:"#f2f2f2"}}
                        type="submit"
                        halfWidth
                        variant="contained"
                        color="#5f5f5d"
                        onClick={event => this.handleClick(event)}
                    >
                        Put to waste
                    </Button>
                </table>

            </div>
        );
    }
}

export default FoodItemInfo;