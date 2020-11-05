import React, {useState, useEffect} from 'react';
import './style.css'

import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';
import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import LockIcon from '@material-ui/icons/LockOutlined';
import UserIcon from '@material-ui/icons/PersonOutlineOutlined';


import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


function CarroselModal({type, render, updateComponentes = () => {}}) {

    const [positionOne, setPositionOne] = useState(0);
    const [positionTwo, setPositionTwo] = useState(4);
    const [visibility, setVisibility] = useState(false);

    const [comps, setComps] = useState([]);

    const [item, setItem] = useState()


    function setIcon(){
        if(type === "groups") return <GroupIcon style={{margin: " 0 0 10px 0", fontSize: 30}}/>
        if(type === "locks") return <LockIcon style={{margin: " 0 0 10px 0", fontSize: 30}}/>
        if(type === "physicalLocal") return <DoorIcon style={{margin: " 0 0 10px 0", fontSize: 30}}/>
        if(type === "users") return <UserIcon style={{margin: " 0 0 10px 0", fontSize: 30}}/>
    }

    function handleClose(){
        setVisibility(false);
    }

    function setComp(comp){

        var aux = [];

        if(comps.length !== 0) aux = comps;
        else aux = render;
        
        var index = aux.findIndex(item => item.object === comp.object)

        aux[index].selected = !aux[index].selected;

       setComps(aux);

       updateComponentes(type, aux);
    }

        return (
            <div className="CarroselX">
                    
                    <strong className="carroselXTitle" > <b>{type}</b> </strong>
                    <div className="carroselXBody">
                    <NavigateBeforeIcon style={{margin: "50px 0px 0 0"}} 
                        onClick={() => {
                            if(positionOne === 0)alert("Sem mais resultados");
                            else {
                                setPositionOne(positionOne-3);
                                setPositionTwo(positionTwo-3);
                            }
                        }}/>
            
                    {render!== undefined && (render.slice(positionOne, positionTwo).map( item => (
                        <>
                       
                        <label for="campo-chechbox-modal">
                        <div className="itemCarrosel" mudacor key={item.object._id}>    
                        <div className="boxSelect-Modal">
                            <input type="checkbox" id={item.object._id}  className="campo-checkbox-modal" onChange={()=>setComp(item)}/>    
                            </div>   
                            {setIcon()}
                            <strong className="Right Item">{item.object.name}</strong>
                        </div>
                        </label>
                        </>
                    )))}

                    <NavigateNextIcon style={{margin: "50px 0 0 0"}}
                        onClick={() => {
                            if(positionTwo >= render.length) alert("Sem mais resultados");
                            else {
                                setPositionOne(positionTwo);
                                setPositionTwo(positionTwo+3);
                            }
                        }}/>
                    </div>
                    
                    
                </div>
            
        );
    }


export default CarroselModal;
