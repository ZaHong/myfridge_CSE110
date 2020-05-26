import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import {dark} from "@material-ui/core/styles/createPalette";
import {lightBlue, red} from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';

const style = theme => ({
  body:{
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
})

class AddFood extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentUserID: this.props.id,
        foodName:"",
        foodTag:"",
        selectedDate: new Date(),
        foodQuantity:"",
        foodDuration:"",
        comboBoxFoodList: [],
        foodInfos: [],
      };

      fetch("http://localhost:8000/user/foodvocab",{
        method: "GET",
        headers: {
          'Content-Type': "application/json"
        }
      }).then(response => response.json()).then(json => {
        //console.log(JSON.stringify(json))
        //[apple, orange, ....]
        this.state.foodInfos = json.infos
        for (var key in this.state.foodInfos){
          this.state.comboBoxFoodList.push({ name: this.state.foodInfos[key].name})
        }
      }).catch()
    };

    handleChange = name => event => {
      this.setState({[name]: event.target.value})
    };

    handleDateChange = (date) => {
      this.state.selectedDate = date
    };

    handleClick = (event) => {

      const food = {
        name : this.state.foodName,
        date_purchased : ((this.state.selectedDate.getMonth() + 1) + ' ' + this.state.selectedDate.getDate() + " " + this.state.selectedDate.getFullYear()),
        duration: this.state.foodDuration,
        tag:this.state.foodTag,
        quantity:this.state.foodQuantity,
      };
      //alert(JSON.stringify(food))
      if(food.name != null && food.name!= ''){
        fetch("http://localhost:8000/user/" + this.state.currentUserID + "/addFood",{
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(food)
        }).finally(function(){
          window.location.reload(false);
        }
        )

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
      
      handleCompleteChange = (event, newValue) => {
        if(newValue != null && newValue != ""){
          //alert(newValue)
          this.state.foodName = newValue
          if(newValue in this.state.foodInfos){
            this.setState({foodTag: this.state.foodInfos[newValue].category, foodDuration: this.state.foodInfos[newValue].duration})
          }
        }
      };

      render(){
        const { classes } = this.props;
        return (
          <div style={{ position: "center"}}>
              <table style={{width: "45vw", height: "55vh", backgroundColor: "#cacbbc"}}>
                  <div className={classes.body}>
                    <label style={{fontSize: "1.5em"}}>
                        New Food Item
                    </label>
                    <Autocomplete
                      id="food-name-autocomplete"
                      options={this.state.comboBoxFoodList}
                      freeSolo={true}
                      onInputChange={this.handleCompleteChange}
                      getOptionLabel={(option) => option.name}
                      style={{ width: "30vw" }}
                      renderInput={(params) => <TextField {...params} label="Food Item Name:" variant="outlined" />}
                    />
                    <br></br>
                    <TextField  
                    label="Tags:" variant="outlined"
                    style={{width: "30vw"}} 
                    value={this.state.foodTag}
                    onChange={this.handleChange('foodTag')}
                    />
                    <br></br>
                    <TextField  
                    label="Quantity:" variant="outlined"
                    style={{width: "30vw"}} 
                    value={this.state.foodQuantity}
                    onChange={this.handleChange('foodQuantity')}
                    />
                    <br></br>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              label="Purchase Date:"
                              style={{width:"30vw"}}
                              value={this.state.selectedDate}
                              onChange={this.handleDateChange}
                              KeyboardButtonProps={{
                                  'aria-label': 'change date',
                              }}
                          />
                    </MuiPickersUtilsProvider>
                    <br></br>
                    <TextField  
                    label="Duration:" variant="outlined"
                    style={{width: "30vw"}} 
                    value={this.state.foodDuration}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Days</InputAdornment>,
                    }}
                    onChange={this.handleChange('foodDuration')}
                    />
                    <Button
                      style={{
                          width: "15vw", backgroundColor: "#f2f2f2", marginTop:'0.8em'
                      }}
                      type="button"
                      halfWidth
                      variant="contained"
                      color="#5f5f5d"
                      onClick={event => this.handleClick(event)}
                  >
                      Save
                  </Button>
                  </div>
  
                  
              </table>
          </div>
      );
      }
}

export default withStyles(style)(AddFood);