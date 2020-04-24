import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {response : ""};
  }

  callBackend(){
    fetch("http://localhost:8000")
    .then(res => res.text())
    .then(res => this.setState({response : res}))
    .catch(err => err);
  }

  componentDidMount(){
    this.callBackend();
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>My Fridge</h1>
          <p className="App-intro">{this.state.response}</p>
        </header>
      </div>
    );
  }
}

export default App;
