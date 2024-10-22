import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FoodInfos from './foodInfo';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import logo from "../../src/LogInSignup/res/MyFridge_Logo_Small.png";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { Grid } from '@material-ui/core';
import AddFood from './addFood';

/*
const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 550,
    marginLeft: '40px',
    background: '#cacbbc',
    //width: '20vw'
    width: '300px'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '300px',
    //width: '20vw',
    backgroundColor: '#cacbbc',
  },
  tab:{
    marginLeft: '5vw',
    //marginLeft: '15px',
    width: '300px',
    //width: '20vw'
  }
}));

export default function VerticalTabs(props) {
  const [activeTabIndex, setIndex] = React.useState(0);
  const style = {
    //display: 'flex',
    height: 450,
    marginLeft: '5vw',
    //marginLeft: '20px',
    marginTop: '20px',
    background: '#cacbbc',
    textAlign: 'center',
    width:'45vw'
    //width: '625px',
    }
  const classes = useStyles();
  
  var list = props.foodInfos;

  const handleChange = (event, newValue) => {
    if(typeof(newValue) == 'number'){
      setIndex(newValue);
    }else if(newValue != null){
      setIndex(parseInt(comboBoxhashMap.get(newValue.title), 10))
    }
  };

  

  var resultTab = [];
  var resultInfo = [];

  var comboBoxFoodList = []
  var comboBoxhashMap = new Map()
  for (var key = 0; key < list.length; key++){
    comboBoxFoodList.push({ title: list[key].foodName, ExpirationDate: list[key].ExpirationDate})
    comboBoxhashMap.set(list[key].foodName, key+1)
  }

  for (var i = -1; i < list.length; i++){
    if (i < 0){
      resultTab.push()
        resultInfo.push(<TabPanel value={activeTabIndex} index={0}>
                        <Grid style={style}>
                          <br></br>
                          <br></br>
                          <h1 >Welcome to </h1>
                          <img src={logo} height='150vh' style={{ marginTop: '2rem' }}/>
                        </Grid>
                      </TabPanel>)
    }
    else{
    var name = list[i].foodName +'  '+list[i].ExpirationDate
    resultTab.push( <AntTab label={name} className={classes.tab} {...a11yProps(i)} />)
    resultInfo.push(<TabPanel value={activeTabIndex} index={i+1}>
      <Grid style={style}>
      <FoodInfos information={list[i]} /> 
      </Grid>
      </TabPanel>)
    }
  }

  return (
    <div className={classes.root}>
      <AntTabs
        contentContainerStyle={{background: '#FF0'}}
        orientation="vertical"
        variant="scrollable"
        value={activeTabIndex}
        onChange={handleChange}
        //onInputChange={handleInputChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Autocomplete
                  id="combo-box-demo"
                  options={comboBoxFoodList}
                  onChange={handleChange}
                  getOptionLabel={(option) => option.title}
                  //style={{ width: '20vw' }}
                  renderInput={(params) => <TextField {...params} label="Choose Food Item" variant="outlined" />}
                />
        {resultTab}

      </AntTabs>
      {resultInfo}
      
    </div>
  );
}
*/

const AntTabs = withStyles({
  background:{
    backgroundColor: '#f7f6f0',
  },
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    //marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f7f6f0',
    display: 'flex',
    height: '80vh',
    //marginLeft: '40px',
    background: '#cacbbc',
    //width: '300px'
    //width: '100vw'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    //width: '300px'
    height: '60vh',
    width: '20vw',
    backgroundColor: '#cacbbc',
  },
  tab:{
    //marginLeft: '15px',
    //width: '300px'
    width: '20vw'
  }
}));

export default function VerticalTabs(props) {
  const [activeTabIndex, setIndex] = React.useState(0);
  const style = {
    //display: 'flex',
    height: '55vh',
    //marginLeft: '2vw',
    //marginTop: '2vh',
    //backgroundColor: '#f7f6f0',
    background: '#cacbbc',
    textAlign: 'center',
    width: '45vw',
    }
  const classes = useStyles();
  
  var list = props.foodInfos;
  var currentUserID = props.id;
  const handleChange = (event, newValue) => {
    if(typeof(newValue) == 'number'){
      setIndex(newValue);
    }else if(newValue != null){
      setIndex(parseInt(comboBoxhashMap.get(newValue.title), 10))
    }
  };

  

  var resultTab = [];
  var resultInfo = [];

  var comboBoxFoodList = []
  var comboBoxhashMap = new Map()
  for (var key = 0; key < list.length; key++){
    comboBoxFoodList.push({ title: list[key].foodName, ExpirationDate: list[key].ExpirationDate})
    comboBoxhashMap.set(list[key].foodName, key+1)
  }
  resultTab.push(
    <Autocomplete
      id="combo-box-demo"
      options={comboBoxFoodList}
      onChange={handleChange}
      getOptionLabel={(option) => option.title}
      //style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Choose Food Item" variant="outlined" />}
    />)
  resultInfo.push(
    <TabPanel value={activeTabIndex} index={0}>
      <Grid style={style}>
      <br></br>
      <br></br>
      <h1 >Welcome to </h1>
      <img src={logo} height='150vh' style={{ marginTop: '1vh' }}/>
      </Grid>
    </TabPanel>)

  for (var i = 0; i < list.length; i++){
    var name = list[i].foodName +'  '+list[i].ExpirationDate
    resultTab.push( 
    <AntTab label={name}  className={classes.tab} {...a11yProps(i)} />)
    resultInfo.push(
    <TabPanel value={activeTabIndex} index={i+1}>
      <Grid>
        <FoodInfos information={list[i]} id={currentUserID}/> 
      </Grid>
    </TabPanel>)
    
  }
  resultTab.push(
    <AntTab 
      label={<IconButton size='small' color="#cacbbc" style={{marginLeft:'1.5vw',width:'4vw' }}>
        <AddIcon style={{ fontSize: 40 }}
      className={classes.tab} {...a11yProps(list.length+1)}/>
  </IconButton>} >
    </AntTab>
  )
  resultInfo.push(
  <TabPanel value={activeTabIndex} index={list.length+1}>
    <Grid>
    <AddFood id={currentUserID}/>
    </Grid>
  </TabPanel>)

  return (
    <div className={classes.root}>
      <AntTabs
        contentContainerStyle={{background: '#FF0'}}
        orientation="vertical"
        variant="scrollable"
        value={activeTabIndex}
        onChange={handleChange}
        //onInputChange={handleInputChange}
        scrollButtons="off"
        className={classes.tabs}
      >
        {
        resultTab
        /*
        <Tab label="Item One two three four five" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
        <Tab label="Item Eight" {...a11yProps(7)} />
        <Tab label="Item Nine" {...a11yProps(8)} />
        <Tab label="Item Ten" {...a11yProps(9)} />
        <Tab label="Item Eleven" {...a11yProps(10)} />
        <Tab label="Item Twelve" {...a11yProps(11)} />
        */}

      </AntTabs>
      {resultInfo}
    </div>
  );
}