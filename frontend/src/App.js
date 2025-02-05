import React, { Component } from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import login from "./LogInSignup/login";
import signup from "./LogInSignup/signup";
import resetpassword from "./LogInSignup/resetPassword";
import index from "./fridge/fridge";
import profile from "./Profile/profile";
import wasteboard from "./Wasteboard/wasteboard";
import addfood from './fridge/addFood';
import friendlist from './FriendList/friendlist';
import recipe from "./Recipe/recipe"

class App extends Component {
  constructor(props) {
    super(props);
    //this.state = {response : ""};
  }

  /*callBackend(){
    fetch("http://localhost:8000")
    .then(res => res.text())
    .then(res => this.setState({response : res}))
    .catch(err => err);
  }

  componentDidMount(){
    this.callBackend();
  }*/

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={login} />
            <Route path="/signup" component={signup} />
            <Route path="/resetpassword" component={resetpassword} />
            <Route path="/index" component={index} />
            <Route path="/wasteboard" component={wasteboard} />
            <Route path="/profile" component={profile} />
            <Route path="/addfood" component={addfood} />
            <Route path="/friendlist" component={friendlist} />
            <Route path="/recipe" component={recipe}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
