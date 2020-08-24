import React, {useState} from 'react';
import './style.css';
import {Link} from 'react-router-dom';

import ListIcon from '@material-ui/icons/List';
import { Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Check from '../confirmações/remove';

function MenuItem ({user, load}){

  const [check, setCheck] = useState(false);

  function handleClick() {
    setCheck(true);
  };

  function handleUser() {
    sessionStorage.setItem("userId", JSON.stringify(user._id));
  };


    return(
      <>
        <div id="itens">
            <div id="item">
              <Fab color="primary" aria-label="delete"  margin="0px 5px 0px 5px" size="small" onClick={handleClick}>
                <DeleteIcon style={{ fontSize: 20}}/>
              </Fab>
            </div>
            <div id="item2">
            <Link to="/user" >
                <Fab color="primary" aria-label="list" size="small" onClick={handleUser}>
                <ListIcon style={{ fontSize: 20}}/>
              </Fab>
              </Link>
            </div>
        </div>
        {check ? <Check user={user} load={load} onClose={()=> setCheck(false)}/> : null}
      </>
   );
}



export default MenuItem;