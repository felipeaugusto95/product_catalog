import React, { Component } from 'react';
import GlobalStyle from './styles/global';
import Route from './components/Routes';

class App extends Component{

  render(){
    return (
      <div>
        <GlobalStyle />      
        <Route />  
      </div>
    );
  };
}

export default App;
