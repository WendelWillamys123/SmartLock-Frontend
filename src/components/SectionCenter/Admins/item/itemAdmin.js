import React from 'react';

import './style.css';

import AdminIcon from '@material-ui/icons/HowToReg';
import Button from '../../../utils/Admin/button/button';

function ItemAdmin ({idAdmin = () => {}, admin, load, onCloseForm = () =>{}}){

    return(
        <li className="adminItem" id="liAdmin" onClick={ e => onCloseForm(e)}>
        <header id="liAdmin" onClick={ e => onCloseForm(e)}>
        <AdminIcon style={{ fontSize: 35, color: 'seashell', margin: '0px 10px 0px 10px'}}/>
            <div className="adminInfo">
                <strong>{admin.name}</strong>
            </div>
          
        </header> 
        <div id="button">
        <Button admin={admin} load={load} idAdmin={idAdmin}/>
        </div>
    </li>

   );
}



export default ItemAdmin;