import React from 'react';

import './style.css';

import UserIcon from '@material-ui/icons/AccountCircle';
import Button from '../../../utils/User/button/button';

function ItemUsuario ({user, load, onCloseForm = () =>{}}){

    return(
        <li className="userItem" id="liUser" onClick={ e => onCloseForm(e)}>
        <header id="liUser" onClick={ e => onCloseForm(e)}>
        <UserIcon style={{ fontSize: 35, color: 'seashell', margin: '0px 20px 0px 0px'}}/>
            <div className="userInfo">
                <strong>{user.name}</strong>
            </div>
          
        </header> 
        <div id="button">
        <Button user={user} load={load}/>
        </div>
    </li>

   );
}



export default ItemUsuario;