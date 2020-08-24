import React, {useEffect, useState} from "react";
import './style.css';
import {Link} from 'react-router-dom';

import UserIcon from '@material-ui/icons/PersonOutlineOutlined';
import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';
import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import HomeIcon from '@material-ui/icons/Home';
import AdminIcon from '@material-ui/icons/HowToReg';
import LockIcon from '@material-ui/icons/LockOutlined';
import PermissoesIcon from '@material-ui/icons/SettingsOutlined';

function SectionLeft(){ 

    const [org, setOrg] = useState('');

    useEffect(()=>{
        function load(){
            var data = sessionStorage.getItem("myID");
            var myID = JSON.parse(data);
            
            if(myID === undefined || myID === null);
            else setOrg(true);
            
        }
        load();
    }, []);
    
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
        <label id="label1">Groups</label>
        </div>
        </Link>

        <Link to="/physicalLocal" style={{textDecoration: 'none'}}>
        <div className="button">
        <DoorIcon style={{color: '#18A0FB', margin: '0px 12px 0px 12px'}}/>
        <label id="label1">Physical Local</label>
        </div>
        </Link>

        <Link to="/locks" style={{textDecoration: 'none'}}>
        <div className="button">
        <LockIcon  style={{color: '#18A0FB', margin: '0px 10px 0px 10px'}} />
        <label id="label1">Locks</label>
        </div>
        </Link>

        <Link to="/roles" style={{textDecoration: 'none'}}>
        <div className="button">
        <PermissoesIcon  style={{color: '#18A0FB', margin: '0px 10px 0px 10px'}} />
        <label id="label1">Roles</label>
        </div>
        </Link>

        <Link to="/users" style={{textDecoration: 'none'}}>
        <div className="button">
        <UserIcon style={{color: '#18A0FB', margin: '0px 10px 0px 10px'}} />
        <label id="label1">Users</label>
        </div>
        </Link>

        {org && (
            <Link to="/admins" style={{textDecoration: 'none'}}>
            <div className="button">
            <AdminIcon style={{color: '#18A0FB', margin: '0px 10px 0px 10px'}} />
            <label id="label1">Admins</label>
            </div>
            </Link>
        )}
    </div>
);
};

export default SectionLeft;