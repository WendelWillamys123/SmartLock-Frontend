import React from 'react';
import "./App.css";
import {Switch, Route} from 'react-router-dom';

import Login from './components/Login&Register';
import Header from "./components/Header";
import SectionLeft from "./components/SectionLeft";

import Home from "./components/SectionCenter/Home";
import Locks from "./components/SectionCenter/Locks";
import PhysicalLocal from "./components/SectionCenter/PhysicalLocal";
import Users from "./components/SectionCenter/Users/lista";
import Admins from "./components/SectionCenter/Admins/lista";
import Roles from './components/SectionCenter/Roles';

import User from './components/SectionCenter/User';
import Admin from './components/SectionCenter/Admin';

import Page404 from "./services/Page404"
import {PrivateRoute} from './routes/PrivateRoute.js';
import Groups from './components/SectionCenter/Groups';
import Role from './components/SectionCenter/Role';


 function App() {
     return(
        <div className="App">
        <div className="Cabecalho">
        {(window.location.href==="http://localhost:3000/")? null : <Header/>}
        </div>
        <aside>
          {(window.location.href==="http://localhost:3000/")? null : <SectionLeft/>}
        </aside>
         <Switch>
         <Route exact path="/" component={Login}/>
        <main className="center"> 
              <PrivateRoute exact path="/home" component={Home}/>
              <PrivateRoute exact path="/users" component={Users}/>
              <PrivateRoute exact path="/admins" component={Admins}/>
              <PrivateRoute exact path="/groups" component={Groups}/>
              <PrivateRoute exact path="/locks" component={Locks}/>
              <PrivateRoute exact path="/physicalLocal" component={PhysicalLocal}/>
              <PrivateRoute exact path="/roles" component={Roles}/>
              <PrivateRoute exact path="/role" component={Role}/>

              <PrivateRoute exact path="/user" component={User}/>
              <PrivateRoute exact path="/admin" component={Admin}/>
              <Route path="/" render={()=>{
                  if(window.location.href==="http://localhost:3000/" || window.location.href==="http://localhost:3000/users" || 
                  window.location.href==="http://localhost:3000/home" || window.location.href==="http://localhost:3000/admins" ||
                   window.location.href==="http://localhost:3000/locks" || window.location.href==="http://localhost:3000/physicalLocal" || 
                   window.location.href==="http://localhost:3000/user" || window.location.href==="http://localhost:3000/admin" ||
                   window.location.href==="http://localhost:3000/roles" || window.location.href==="http://localhost:3000/role" ||
                   window.location.href==="http://localhost:3000/groups");
                  else{
                     window.setTimeout(function(){ window.location = "http://localhost:3000/"; },5000)
                  return <Page404/> 
                  }}}/>
        </main>
         </Switch>
      </div>
     )
 }


export default App;
