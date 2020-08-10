import React from 'react';
import {Switch, Route} from 'react-router-dom';

import "./App.css";

import Login from './components/login';
import Aplication from './components/aplication';


function App (){

  return (
        <div className="App">
           <Switch>
           <Route exact path="/" component={Login}/>
           <Route exact path="/home" component={Aplication}/>
           </Switch>
        </div>
  );
}


export default App;
