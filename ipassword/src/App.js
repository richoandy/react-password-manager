import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Store from './stores/store'
import { inject, observer } from 'mobx-react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Form from './components/Form'
import { Provider } from 'mobx-react'

class App extends Component {
  render() {
    return (
      <Provider Store={Store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> iPassword </h1>
        </header>
        <Router>
          <Switch>
            <Route exact path = "/" render = {
              (props => {
                if (localStorage.getItem('user')) {
                  return <Home props = {props} />
                } else {
                  return <Redirect to ="/login" />
                }
              })
            } />
            <Route path ="/login" component = {Login} />
            <Route path ="/register" component = {Register} />
            <Route path ="/form/:action" component = {Form} />
          </Switch>
        </Router>
      </div>
      </Provider>
    );
  }
}

export default App;
