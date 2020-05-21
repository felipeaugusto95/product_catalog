import React, { Component } from 'react';

import GlobalStyle from './styles/global';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home';
import User from './components/Users';
import Header from './components/Header';
import FormProduct from './components/FormProduct';
import Login from './components/Login';

class App extends Component{

  render(){
    return (
      <div>
        <GlobalStyle />
        <Header />
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/usuarios" component={User} />
          <Route path="/product/add" component={FormProduct} /> 
          <Route path="/login" component={Login} />
        </Switch>  
               
      </div>
    );
  };
}

export default App;
