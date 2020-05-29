import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import View from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import add_icon from "./res/Add_icon.png";

const style = theme => ({
    info: {
        backgroundColor: "#cacbbc",
        backgroundSize: "cover",
        border: "1px solid rgb(212, 212, 212)",
        borderRadius: "10px",
        marginLeft: "5vw",
        marginRight: "5vw",
        overflow: "auto",
        maxHeight: "60vh",

        alignItems: "center",
        minHeight: "30vh",
        // width: "10vh",
        // display: 'flex',

    }
});

class RecipeInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            //missing_num: this.props.recipeInfo !== undefined? this.props.recipeInfo.missing_num : undefined,
            missing_num:this.props.index,
            recipeInfo: this.props.recipeInfo !== undefined? this.props.recipeInfo.recipe_info : undefined,
        }
        alert(JSON.stringify(this.props))
        // alert(props.toString())
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
            fetch("http://localhost:8000/user/" + this.state.currentID + "/modifyFood",{
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
        const { classes } = this.props;
        const list = []
        return (
            <List className={classes.info}>
                {this.props.recipeInfo ?
                    <>
                        <ListItem>
                            <ListItemText primary={`Missing item number: ${this.props.index}`} />
                            <ListItemText primary={new Date().toString()} />
                        </ListItem>

                        {/*<Button*/}
                        {/*style={{ height:'50px', width:'150px'}}*/}
                        {/*variant="contained"*/}
                        {/*color="white"*/}
                        {/*// onClick={event => this.putToWaste(event)}*/}
                        {/*>*/}
                        {/*Put to Waste*/}
                        {/*</Button>*/}
                    </>
                    :
                    <>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{variant: "h4", color:"initial"}}
                                primary="MyFridge recommends recipes based on the ingredients you have in your fridge" />
                            {/*<h1>MyFridge recommends recipes based on the ingredients you have in your fridge</h1>*/}
                        </ListItem>
                        <ListItem>
                            {/*<ListItemText primary="Click a recipe to see its ingredients" />*/}
                            <ListItemText primaryTypographyProps={{variant: "h4", color:"initial"}}
                                          primary="Click a recipe to see its ingredients" />
                        </ListItem>
                        <ListItem alignItems="center">
                            {/*<ListItemText primary="Click a recipe to see its ingredients" />*/}
                            <ListItemText primaryTypographyProps={{variant: "h4", color:"initial"}}
                                          primary="Press" />
                            <img src={add_icon} height='90vh'/>
                            <ListItemText primaryTypographyProps={{variant: "h4", color:"initial"}}
                                          primary=" to add your own recipe" />
                        </ListItem>
                    </>
                }
            </List>
        )
    }
}

export default withStyles(style)(RecipeInfo);