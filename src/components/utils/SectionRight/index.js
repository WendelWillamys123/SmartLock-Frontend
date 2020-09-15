import React, { Component } from "react";
import './style.css';

import { useState } from "react";
import { useEffect } from "react";

import LockIcon from '@material-ui/icons/LockOutlined';
import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';
import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import RoleIcon from '@material-ui/icons/SettingsOutlined';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import BoxRM from './confirmacao/BoxRM';
import BoxEdit from './confirmacao/BoxEdit';

function SectionLeft({type, owner, component, onDelete=() =>{}, onUpdate=() =>{}}){ 

    const [render, setRender] = useState('');
    const [boxRm, setBoxRm] = useState(false);
    const [boxEdit, setBoxEdit] = useState(false);

    const [positionOne, setPositionOne] = useState(0);
    const [positionTwo, setPositionTwo] = useState(4);

    useEffect(()=>{
        if(type === "Physical Local"){
            var {locks, roles, groups, name, organization, holder, location, _id} = component;
        
        locks = locks.slice(0,3);
        
        var newComponent = { 
            _id,
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
        await onUpdate();
        setRender(updateComponent);
    }

    return(

        <div id="sectionRigth">
            <div className="headerRigth">
                <div className="sectionRigth elipse ">{
                    type==="Lock"? 
                    <LockIcon style={{fontSize: 30, margin: '15px 10px 0px 0px'}}/> :
                    <DoorIcon style={{fontSize: 30, margin: '15px 10px 0px 0px'}}/>}
                </div>
                <strong className="sectionRigth title "> {render.name} </strong>
                <p className="sectionRigth description"> Type Component: {type} </p>
            </div>
        
                <p className="dataComponent description">Owner: {owner.name} </p>
            
            {console.log(render.roles)}
                    {(render.roles === undefined) || render.roles.length === 0? <p className="Right-Notify">No access role</p>:null}
                    {render.roles === undefined && (
                    <div className="carrosel">
                    
                    <strong className="carroselTitle"> Roles </strong>
                    <NavigateBeforeIcon style={{margin: "50px 10px 0 0"}} 
                        onClick={() => {
                            if(positionOne === 0)alert("Sem mais resultados");
                            else {
                                setPositionOne(positionOne-3);
                                setPositionTwo(positionTwo-3);
                            }
                        }}/>
            
                    {render.roles!== undefined && (render.roles.slice(positionOne, positionTwo).map( role => (
                        <div className="RightbuttonComponent typeAdd" key={role._id}>
                            <RoleIcon style={{fontSize: 30}}/>
                            <strong className="Right roles">{role.name}</strong>
                        </div>
                    )))}

                    <NavigateNextIcon style={{position: "absolute", right: "100px", margin: "50px 0 0 0"}}
                        onClick={() => {
                            if(positionTwo >= render.roles.length) alert("Sem mais resultados");
                            else {
                                setPositionOne(positionTwo);
                                setPositionTwo(positionTwo+3);
                            }
                        }}/>
                </div>
                    )}
                

                
           
            <div className="carrosel">
                    
                    <strong className="carroselTitle"> Groups </strong>
                    <NavigateBeforeIcon style={{margin: "50px 10px 0 0"}} 
                        onClick={() => {
                            if(positionOne === 0)alert("Sem mais resultados");
                            else {
                                setPositionOne(positionOne-3);
                                setPositionTwo(positionTwo-3);
                            }
                        }}/>
            
                    {render.groups!== undefined && (render.groups.slice(positionOne, positionTwo).map( group => (
                        <div className="RightbuttonComponent typeAdd" key={group._id}>
                            <GroupIcon style={{fontSize: 30}}/>
                            <strong className="Right groups">{group.name}</strong>
                        </div>
                    )))}

                    <NavigateNextIcon style={{position: "absolute", right: "100px", margin: "50px 0 0 0"}}
                        onClick={() => {
                            if(positionTwo >= render.groups.length) alert("Sem mais resultados");
                            else {
                                setPositionOne(positionTwo);
                                setPositionTwo(positionTwo+3);
                            }
                        }}/>
                </div>
      
        <div className="FAQ">
        <img id="FAQ" src="https://media-public.canva.com/IcjoU/MAD0-_IcjoU/1/s.svg"/>
        <p className="sectionRigth description faq main">Do you want to perform any of the following actions? </p>
        <div className="buttonsCRUD">
            <button className="btn edit" onClick={()=>setBoxEdit(true)}>Edit name</button>
            <button className="btn delete" onClick={()=>setBoxRm(true)}>Delete</button>
        </div>
        </div>
        {boxEdit? <BoxEdit type={type} _id={render._id} onClose={()=> setBoxEdit(false)} load={reload}/> : null}
        {boxRm? <BoxRM type={type} _id={render._id} onClose={()=> setBoxRm(false)} onDelete={onDelete}/> : null}
    </div>
);
};

export default SectionLeft;
