import React from 'react';
import {Switch, Route} from 'react-router-dom';

import "./App.css";

import Login from './components/login';


function App (){

  return (
        <div className="App">
           <Switch>
           <Route exact path="/" component={Login}/>
           </Switch>
        </div>
  );
}


export default App;
