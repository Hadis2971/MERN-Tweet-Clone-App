import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";


import Navbar from "./Components/UI/navbar";
import Dashboard from "./Components/UI/dashboard";
import Register from "./Components/Auth/register";
import Login from "./Components/Auth/login";
import Logout from "./Components/Auth/logout";

import './App.css';

class App extends Component {

  render() {

    
    return (
      <Provider store={store}> 
        <Router>
        <div className="App">
          <Navbar />
          
          <Route exact path="/" component = {Dashboard}/>
          <Route exact path="/auth/register" component = {Register} />
          <Route exact path="/auth/login" component = {Login} />
          <Route exact path="/auth/logout" component = {Logout} />
        </div>
      </Router>
      </Provider>      
    );
  }
}

export default App;
