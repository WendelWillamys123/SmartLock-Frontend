import React from "react";
import './style.css';
import {Link} from 'react-router-dom';

import UserIcon from '@material-ui/icons/PersonOutlineOutlined';
import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';
import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/LockOutlined';
import PermissoesIcon from '@material-ui/icons/SettingsOutlined';

function Aplication(){ 

    
return(
    <div id="sectionLeft">

        <Link to="/home" style={{textDecoration: 'none'}}><div className="button">
        {<HomeIcon style={{color: '#18A0FB', margin: '0px 10px 0px 10px'}}/>}
        <label id="label1">Home</label>
        </div>
        </Link>

        <Link to="/groups" style={{textDecoration: 'none'}}>
        <div className="button" onClick={ ()=>  {
        sessionStorage.setItem("componentMaster", JSON.stringify("reload"));
       
        if(window.location.href==="http://localhost:3000/groups")window.location.reload();
        }}>
        <GroupIcon style={{color: '#18A0FB', margin: '0px 10px 0px 10px'}}/>
        <label id="label1">Grupos</label>
        </div>
        </Link>

        <Link to="/listaLocalFisico" style={{textDecoration: 'none'}}>
        <div className="button">
        <DoorIcon style={{color: '#18A0FB', margin: '0px 12px 0px 12px'}}/>
        <label id="label1">Local físico</label>
        </div>
        </Link>

        <Link to="/locks" style={{textDecoration: 'none'}}>
        <div className="button">
        <LockIcon  style={{color: '#18A0FB', margin: '0px 10px 0px 10px'}} />
        <label id="label1">Locks</label>
        </div>
        </Link>

        <Link to="/permissoes" style={{textDecoration: 'none'}}>
        <div className="button">
        <PermissoesIcon  style={{color: '#18A0FB', margin: '0px 10px 0px 10px'}} />
        <label id="label1">Permissões</label>
        </div>
        </Link>

        <Link to="/listaUser" style={{textDecoration: 'none'}}>
        <div className="button">
        <UserIcon style={{color: '#18A0FB', margin: '0px 10px 0px 10px'}} />
        <label id="label1">Usuários</label>
        </div>
        </Link>
    </div>
);
};

export default Aplication;