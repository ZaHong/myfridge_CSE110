
import React, {Component} from 'react';
import db from '../base'
import Button from '@material-ui/core/Button';
import {dark} from "@material-ui/core/styles/createPalette";
import {lightBlue, red} from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    return (
        <div style={{paddingTop: '10px', paddingLeft: "650px", position: "relative"}}>
            <table style={{width: "700px", height: "550px", border: '2px solid #666666', backgroundColor: "#ecf9f2"}}>
                <h1 style={{color: "darkslategrey", fontFamily: "Arial", textAlign: "center"}}>New Food Item</h1>

                <br style={{textAlign: "center"}}/>
                <label style={{color: "darkslategrey", fontSize: "25px", marginLeft: "100px"}}>Food Item Name:</label>
                <input style={{marginLeft: "20px", backgroundColor: "#f2f2f2", height: "27px", width: "250px"}}/>
                <br/>

                <br style={{textAlign: "center"}}/>
                <label style={{color: "darkslategrey", fontSize: "25px", marginLeft: "100px"}}>Tag:</label>
                <input style={{marginLeft: "20px", backgroundColor: "#f2f2f2", height: "27px", width: "250px"}}/>
                <br/>

                <br style={{textAlign: "center"}}/>
                <label style={{color: "darkslategrey", fontSize: "25px", marginLeft: "100px"}}>Quantity:</label>
                <input style={{marginLeft: "20px", backgroundColor: "#f2f2f2", height: "27px", width: "250px"}}/>
                <br/>

                <br style={{textAlign: "center"}}/>
                <label style={{color: "darkslategrey", fontSize: "25px", marginLeft: "100px"}}>Purchase Date:</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            id="date-picker-inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                </MuiPickersUtilsProvider>
                <br/>

                <br style={{textAlign: "center"}}/>
                <label style={{color: "darkslategrey", fontSize: "25px", marginLeft: "100px"}}>Duration:</label>
                <input style={{marginLeft: "20px", backgroundColor: "#f2f2f2", height: "27px", width: "200px"}}/>
                <label style={{color: "darkslategrey", fontSize: "25px", marginLeft: "20px"}}>Days</label>
                <br/>

                <Button
                    style={{
                        height: "50px", width: "200px", backgroundColor: "#f2f2f2",
                        marginLeft: "250px", marginTop: "50px"
                    }}
                    type="submit"
                    halfWidth
                    variant="contained"
                    color="#5f5f5d"
                    onClick={event => this.handleClick(event)}
                >
                    Save
                </Button>
            </table>
        </div>
    );
}