import React, { Component } from 'react';
import logo from "./res/MyFridge_Logo.png";
import "./login.css"

const style = {
    margin: 15,
};

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: ''};
  }

  handleLogin(event){
    event.preventDefault();
    const { email, password } = event.target.elements;
  }

  render(){
    return (
      <div className="login">
          <div class="title"><h1>Welcome to MyFridge</h1></div>
          <div class="imgcontainer">
              <img src={logo} alt="MyFridge Logo"></img>
          </div>

          <div class="container">
            <form onSubmit={this.handleLogin}>
                <label>Email: </label>
                <input name="email" type="email" placeholder="Enter Email..."/>
                <label>Password: </label>
                <input name='password' type="password" placeholder="Enter password..." />
                <button type="submit">Log In</button>
            </form>
          </div>
      </div>
    );
  }
}

export default Login;