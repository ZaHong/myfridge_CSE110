import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import add_icon from "./res/Add_icon.png";
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const style = theme => ({
    info: {
        backgroundColor: "#e5e8df",
        backgroundSize: "cover",
        border: "1px solid rgb(212, 212, 212)",
        borderRadius: "10px",
        marginLeft: "5vw",
        marginRight: "5vw",
        overflow: "auto",
        maxHeight: "60vh",

        alignItems: "center",
        minHeight: "30vh",
        minWidth: "40vw",
        // display: 'flex',
    },
    image: {
        border: "0.4em solid #fff",
        borderRadius: "8px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "0.5em",
        height: "30vh",
        width: "50%",
    },
    button: {
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#f1f2ed",
    },
    title: {
        color: "#5b5d56",
        textAlign: "center",
        margin: "auto",
        fontSize: "2.3em",
        marginTop: "0.3em",
        marginBottom: "0.2em",
    },
    description: {
        color: "#5e6059",
        marginLeft: "1em",
        fontSize: "1.5em",
    },
    subDescription: {
        color: "#5e6059",
        marginLeft: "2.2em",
        fontSize: "1.3em",
    },
    subStepDescription: {
        color: "#5e6059",
        marginLeft: "2.4em",
        marginBottom: "0.5em",
        fontSize: "1.2em",
    },
    default: {
        color: "#5b5d56",
        marginLeft: "0.5em",
    }
});

class RecipeInfo extends Component{
    constructor(props){
        super(props);
        this.onClearClick = this.onClearClick.bind(this);
        this.onGroceryClick = this.onGroceryClick.bind(this);
    }

    onClearClick(event){
        fetch(`http://localhost:8000/user/${this.props.userid}/cleargrocery`,{
            method: "GET"
        });
    }

    onGroceryClick(event){
        // alert(this.props.userid);
        fetch(`http://localhost:8000/user/${this.props.userid}/addrecipe`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "recipefoods" : this.props.recipeInfo.recipe_info.ingredients
            })
        });
    }

    render(){
        const { classes } = this.props;
        let recipeDetail, ingredients = [], steps = [];

        if (this.props.recipeInfo !== undefined){
            recipeDetail = this.props.recipeInfo.recipe_info;
            for (let ingredient of recipeDetail.ingredients){
                ingredients.push(
                    <Typography  vairant="h4" className={classes.subDescription} >
                        {` - ${ingredient}`}
                    </Typography>
                )
            }
            // for (let step of recipeDetail.steps.split("\n\n")){
            //     steps.push(
            //         <Typography gutterBottom={true} vairant="h5" className={classes.subDescription} >
            //             {` - ${step.split("\n")[0]}: ${step.split("\n")[1]}`}
            //         </Typography>
            //     )
            // }
            const re = /step/i;
            const stepsList = recipeDetail.steps.split(re);
            if (stepsList.length === 1){
                let step = stepsList[0].trim();
                steps.push(
                    <Typography gutterBottom={true} vairant="h5" className={classes.subDescription} >
                        {` - Step 1: ${step}`}
                    </Typography>
                )
            }
            else{
                for (let i = 1; i<stepsList.length; i++){
                    let step = stepsList[i].trim();
                    steps.push(
                        <Typography gutterBottom={true} vairant="h5" className={classes.subDescription} >
                            {` - Step ${step.substring(0,1)}:${step.substring(1)}`}
                        </Typography>
                    )
                }
            }
        }

        return (
            <List className={classes.info}>
                {/*{(this.props.recipeInfo) ?<h2>{this.props.recipeInfo.recipe_info.name}</h2> :  (<h2>sadad</h2>)}*/}
                {this.props.recipeInfo ?
                    <>
                        <ListItem>
                            <Typography vairant="h2" className={classes.title} >{`${recipeDetail.name}`}</Typography>
                        </ListItem>
                        {/*<Divider />*/}
                        <img className={classes.image} alt="Food Image" src={recipeDetail.url} />
                        <ListItem>
                            {/*<ListItemText primary={`Missing item number: ${this.state.missing_num}`} />*/}
                            {/*<h4 className={classes.description} ></h4>*/}
                            <Typography  vairant="h4" className={classes.description} >
                                {`Main ingredients Missing: ${this.props.recipeInfo.missing_num} `}
                            </Typography>
                        </ListItem>

                        <ListItem>
                            <Typography  vairant="h4" className={classes.description} >
                                {`Ingredients: `}
                            </Typography>
                        </ListItem>
                        {ingredients}

                        <ListItem>
                            <Typography  vairant="h4" className={classes.description} >
                                {`Steps: `}
                            </Typography>
                        </ListItem>
                        {steps}

                        <ListItem >
                            <Button variant="contained" className={classes.button} onClick={this.onClearClick} >
                                Clear Grocery List
                            </Button>

                            <Button variant="contained" className={classes.button} onClick={this.onGroceryClick}>
                                Add to Grocery List
                            </Button>
                        </ListItem>
                    </>
                    :
                    <>
                        <ListItem>
                            {/*<h1>MyFridge recommends recipes based on the ingredients you have in your fridge</h1>*/}
                            <Typography gutterBottom variant="h4" className={classes.default} >
                                MyFridge recommends recipes based on the ingredients you have in your fridge
                            </Typography>
                        </ListItem>
                        <br/>
                        <ListItem>
                            {/*<ListItemText primaryTypographyProps={{variant: "h4", color:"initial"}}*/}
                                          {/*primary="Click a recipe to see its ingredients" />*/}
                            <Typography gutterBottom variant="h4" className={classes.default} >
                                Click a recipe to see its ingredients
                            </Typography>
                        </ListItem>

                        {/*<ListItem alignItems="center">*/}
                            {/*/!*<ListItemText primary="Click a recipe to see its ingredients" />*!/*/}
                            {/*<ListItemText primaryTypographyProps={{variant: "h4", color:"initial"}}*/}
                                          {/*primary="Press " />*/}
                            {/*<img src={add_icon} height='80vh'/>*/}
                            {/*<ListItemText primaryTypographyProps={{variant: "h4", color:"initial"}}*/}
                                          {/*primary=" to add your own recipe" />*/}
                        {/*</ListItem>*/}
                    </>
                }
            </List>
        )
    }
}

export default withStyles(style)(RecipeInfo);