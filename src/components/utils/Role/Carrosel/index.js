import React, {useState} from 'react';
import './style.css'

import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';
import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import LockIcon from '@material-ui/icons/LockOutlined';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Check from './check';

function Carrosel({type, render, role, reload= ()=>{}}) {

    const [positionOne, setPositionOne] = useState(0);
    const [positionTwo, setPositionTwo] = useState(4);
    const [visibility, setVisibility] = useState(false);
    const [item, setItem] = useState()

    function setIcon(){
        if(type === "groups") return <GroupIcon style={{margin: " 0 0 10px 0", fontSize: 30}}/>
        if(type === "locks") return <LockIcon style={{margin: " 0 0 10px 0", fontSize: 30}}/>
        if(type === "physicalLocal") return <DoorIcon style={{margin: " 0 0 10px 0", fontSize: 30}}/>
    }

    function handleClose(){
        setVisibility(false);
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
                        <div className="itemCarrosel" key={item._id}>
                            <button type="button" onClick={ () =>{
                                setVisibility(true);
                                setItem(item)
                                }}className="minibuttonRemove"><span className="miniX"></span></button>
                            {setIcon()}
                            <strong className="Right Item">{item.name}</strong>
                        </div>
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
                    
                    {visibility? <Check item={item} type={type} role={role} reload={reload} handleClose={()=>handleClose()}/> : null}
                    
                </div>
            
        );
    }


export default Carrosel;
