import React, { Component } from "react";
import './style.css';

import { useState } from "react";
import { useEffect } from "react";

import LockIcon from '@material-ui/icons/LockOutlined';
import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';
import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import RoleIcon from '@material-ui/icons/SettingsOutlined';


function SectionLeft({type, owner, component, onDelete=() =>{}, onUpload=() =>{}}){ 

    const [render, setRender] = useState('');
    const [boxRm, setBoxRm] = useState(false);

    useEffect(()=>{
        if(type === "Physical Local"){
            var {locks, roles, groups, name, organization, holder, location} = component;
        
        locks = locks.slice(0,3);
        
        var newComponent = { 
            name,
            holder,
            groups,
            locks,
            roles,
            location,
            organization
        }
        setRender(newComponent);
        }
        if(type === "Lock") setRender(component);

    }, []);

    async function reload(updateComponent){
        await onUpload(updateComponent);
        setRender(updateComponent);
    }

return(
    <div id="sectionRigth">
       <div className="headerRigth">
           <div className="sectionRigth elipse ">{
               type==="Lock"? 
               <LockIcon style={{fontSize: 30, margin: '15px 10px 0px 0px'}}/> :
               <DoorIcon style={{fontSize: 30, margin: '15px 10px 0px 0px'}}/>
               }</div>
           <strong className="sectionRigth title "> {render.name} </strong>
           <p className="sectionRigth description"> Type Component: {type} </p>
       </div>
       <div className="dataComponent">
            <p className="dataComponent description">Owner: {owner.name} </p>
            <div className="Right Roles">
                <p className="dataComponent description">Roles: </p>
                {console.log(render)}
                {(render.roles === undefined) || render.roles.length === 0? <p className="Right-Notify">No access role</p>:null}
                {render.roles !== undefined && (render.roles.map( role => (
                        <div className="RightbuttonComponent" key={role._id}>
                            <RoleIcon style={{margin: '5px 10px 0px 10px'}}/>
                            <strong className="Right roles">{role.name}</strong>
                        </div>
                    )))}
            </div>
            {type === "Physical Local" &&(<>
            <div className="Right Locks">
                <p className="dataComponent description">Locks: </p>
                {(render.locks === undefined) || render.locks.length === 0? <p className="Right-Notify">No locks</p>:null}
                {render.locks !== undefined && (render.locks.map( lock => (
                        <div className="RightbuttonComponent" key={lock._id}>
                            <LockIcon style={{margin: '5px 10px 0px 10px'}}/>
                            <strong className="Right locks">{lock.name}</strong>
                        </div>
                    )))}
            </div>
            <div className="Right Groups">
                <p className="dataComponent description">Groups: </p>
                {(render.groups === undefined) || render.groups.length === 0? <p className="Right-Notify">No group</p>:null}
                {render.groups !== undefined && (render.groups.map( group => (
                        <div className="RightbuttonComponent" key={group._id}>
                            <GroupIcon style={{margin: '0px 10px 0px 10px'}}/>
                            <strong className="Right groups">{group.name}</strong>
                        </div>
                    )))}
            </div>
            </>)}
        </div>
        <div className="FAQ">
        <img id="FAQ" src="https://media-public.canva.com/IcjoU/MAD0-_IcjoU/1/s.svg"/>
        <p className="sectionRigth description faq main">Do you want to perform any of the following actions? </p>
        <div className="buttonsCRUD">
            <button className="btn edit">Edit name</button>
            <button className="btn delete">Delete</button>
        </div>
        </div>
    </div>
);
};

export default SectionLeft;
