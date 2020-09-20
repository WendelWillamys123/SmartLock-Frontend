import React, { Component } from "react";
import './style.css';

import { useState } from "react";
import { useEffect } from "react";

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import RoleIcon from '@material-ui/icons/SettingsOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import UpdateIcon from '@material-ui/icons/Update';

function SectionLeft({component, onDelete=() =>{}, onUpload=() =>{}}){ 

    const [render, setRender] = useState('');
    const [positionOne, setPositionOne] = useState(0);
    const [positionTwo, setPositionTwo] = useState(3);
    const [componentTime, setComponentTime] = useState('')
    const [Strong, setStrong] = useState('Groups: ');


    useEffect(()=>{
       setRender(component);

    }, []);

    async function reload(updateComponent){
        await onUpload(updateComponent);
        setRender(updateComponent);
    }

        return(
            <>
            <div id="sectionRigth">
                  { /* Header */ }
                <div className="headerRigth role">
                    <div className="sectionRigth elipse ">
                        <RoleIcon style={{fontSize: 30, margin: '15px 10px 0px 0px'}}/>
                    </div>
                    <strong className="sectionRigth title "> {render.name} </strong>
                    <p className="sectionRigth description"> Type Component: Role </p>
                </div>
                
                { /* menu */ }

                        <input id="Hchecked" type="checkbox" onClick={()=>{
                      var body = document.querySelector("body");
                      if(body.className === "NewRight") body.className = "OldRight";
                      else body.className = "NewRight";
                  }}/>
                  
                  <label for="Hchecked">
                            <div className="menuH">
                                <span className="hamburguer"></span>
                            </div>
                        </label>

                { /* Body */ }
                    
                <div className="carrosel">
                    
                    <strong className="carroselTitle"> { Strong } </strong>
                    <NavigateBeforeIcon style={{margin: "50px 10px 0 0"}} 
                        onClick={() => {
                            if(positionOne === 0)alert("Sem mais resultados");
                            else {
                                setPositionOne(positionOne-3);
                                setPositionTwo(positionTwo-3);
                            }
                        }}/>
            
                    {render.times!== undefined && (render.times.slice(positionOne, positionTwo).map( time => (
                        <div className="RightbuttonComponent typeAdd" key={time._id} onClick={()=>{setComponentTime(time)}}>
                            <ScheduleIcon style={{fontSize: 30}}/>
                            <strong className="Right times">{time.name}</strong>
                        </div>
                    )))}

                    <NavigateNextIcon style={{position: "absolute", right: "100px", margin: "50px 0 0 0"}}
                        onClick={() => {
                            if(positionTwo >= render.times.length) alert("Sem mais resultados");
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
                        <button className="btn edit">Edit name</button>
                        <button className="btn delete">Delete</button>
                    </div>
                </div>
            </div>
            
            <div className="menuH-Open">
                <header className="NewRight-header">
                    <UpdateIcon style={{fontSize: 30, color: '#fff',margin: '15px 10px 0px 0px'}}/>
                    <strong className="sectionRigth title new">Set up {render.name} schedule</strong>
                </header>
                <label className="labelDivisoria" type="text">Schedule</label>

                <div className="carrosel">
                <NavigateBeforeIcon style={{margin: "50px 10px 0 0"}} 
                onClick={() => {
                    if(positionOne === 0)alert("Sem mais resultados");
                    else {
                        setPositionOne(positionOne-3);
                        setPositionTwo(positionTwo-3);
                    }
                }}/>
            
                
                {render.times !== undefined && (render.times.slice(positionOne, positionTwo).map( time => (
                        <div className="RightbuttonComponent typeAdd" key={time.name} onClick={()=>{
                            setComponentTime(time);
                        }}>
                            <RoleIcon style={{fontSize: 30}}/>
                            <strong className="Right times">{time.name}</strong>
                        </div>
                    )))}

                <NavigateNextIcon style={{position: "absolute", right: "50px", margin: "50px 0 0 0"}}
                onClick={() => {
                    if(positionTwo >= render.length) alert("Sem mais resultados");
                    else {
                        setPositionOne(positionTwo);
                        setPositionTwo(positionTwo+3);
                    }
                }}/>
            </div>

                <label className="labelDivisoria" type="text">New schedule</label>
                <div className="semanaBox">
                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Seg</label>
                    <input type="checkbox" value="0" name="campo-checkbox" id="campo-checkbox1" />
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Ter</label>
                    <input type="checkbox" value="0" name="campo-checkbox" id="campo-checkbox1" />
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Qua</label>
                    <input type="checkbox" value="0" name="campo-checkbox" id="campo-checkbox1" />
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Qui</label>
                    <input type="checkbox" value="0" name="campo-checkbox" id="campo-checkbox1" />
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Sex</label>
                    <input type="checkbox" value="0" name="campo-checkbox" id="campo-checkbox1" />
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Sab</label>
                    <input type="checkbox" value="0" name="campo-checkbox" id="campo-checkbox1" />
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Dom</label>
                    <input type="checkbox" value="0" name="campo-checkbox" id="campo-checkbox1" />
                </div>
                </div>

                <div className="FAQ-New">
                    <img id="FAQ-NEW" style={{zIndex: "9"}} src="https://media-public.canva.com/MDWv4/MADuakMDWv4/1/s.svg"/>
                        
                    <p style={{width:"300px", margin: "-65px 0 0 -60px",color: "#000", fontWeight: "bolder", zIndex:"10"}} 
                        className="sectionRigth description faq main">
                            You can add a new schedule or edit existing schedules. 
                            Remember each time, when together, form the access time of your role</p>
                </div>
            </div>
            </>
);
};

export default SectionLeft;
