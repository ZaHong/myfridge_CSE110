
import React, {Component} from 'react';
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
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [foodItem, setFoodItem] = React.useState({});
    const [foodVocab, setFoodVocab] = React.useState([]);
    const [foodInfos, setFoodInfos] = React.useState({})

    React.useEffect(() =>{
        fetch("http://localhost:8000/foodvocab",{
            method: "GET",
            headers: {
              'Content-Type': "application/json"
            }
        }).then(response => response.json()).then(json => {
           setFoodVocab(json.body.namelist)
           //[apple, orange, ....]
           setFoodInfos(json.body.infos)
           //{apple:{duration: 6day, ...}, orange:{...}}
          }).catch()
    }, [])


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleClick = (event) => {

        const food = {
          name : foodItem.foodName,
          date_purchased : ((selectedDate.getMonth() + 1) + ' ' + selectedDate.getDate() + " " + selectedDate.getFullYear()),
          duration: foodItem.foodDuration,
          tag:foodItem.foodTag,
          quantity:foodItem.foodQuantity,
        };
        alert(JSON.stringify(food))
        if(food.name != null && food.name!= ''){
          fetch("http://localhost:8000/user/5ec75a293e85915190455654/addFood",{
            method: "POST",
            headers: {
              'Content-Type': "application/json"
            },
            body: JSON.stringify(food)
          })
          /*.then(response => response.json()).then(json => {
            if(json.status!=null && json.status==true){
             this.setState({userID: json.body._id, successLogin:true})
            }else{
              //alert('Wrong Password')
              this.setState({ userNotExist: true, emptyPassword: false })
            }
          }).catch(
            //this.setState({ userNotExist: true, emptyPassword: false })
            )*/
        }
      };

    const handleChange = name => event => {
        foodItem[name]= event.target.value
    };


    return (
        <div /*style={{paddingTop: '10px', paddingLeft: "650px", position: "relative"}}*/>
            <table style={{width: "700px", height: "550px", border: '2px solid #666666', backgroundColor: "#ecf9f2"}}>
                <h1 style={{color: "darkslategrey", fontFamily: "Arial", textAlign: "center"}}>New Food Item</h1>

                <br style={{textAlign: "center"}}/>
                <label style={{color: "darkslategrey", fontSize: "25px", marginLeft: "100px"}}>Food Item Name:</label>
                <input style={{marginLeft: "20px", backgroundColor: "#f2f2f2", height: "27px", width: "250px"}} onChange={handleChange('foodName')}/>
                <br/>

                <br style={{textAlign: "center"}}/>
                <label style={{color: "darkslategrey", fontSize: "25px", marginLeft: "100px"}}>Tag:</label>
                <input style={{marginLeft: "20px", backgroundColor: "#f2f2f2", height: "27px", width: "250px"}} onChange={handleChange('foodTag')}/>
                <br/>

                <br style={{textAlign: "center"}}/>
                <label style={{color: "darkslategrey", fontSize: "25px", marginLeft: "100px"}}>Quantity:</label>
                <input style={{marginLeft: "20px", backgroundColor: "#f2f2f2", height: "27px", width: "250px"}} onChange={handleChange('foodQuantity')}/>
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
                <input style={{marginLeft: "20px", backgroundColor: "#f2f2f2", height: "27px", width: "200px"}} onChange={handleChange('foodDuration')}/>
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
                    onClick={event => handleClick(event)}
                >
                    Save
                </Button>
            </table>
        </div>
    );
}