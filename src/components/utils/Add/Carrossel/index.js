import React, {useState} from 'react';
import './style.css'

import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';
import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import LockIcon from '@material-ui/icons/LockOutlined';
import RoleIcon from '@material-ui/icons/SettingsOutlined';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function Carrossel({type, position = "absolute", index = 3, render}) {

    const [positionOne, setPositionOne] = useState(0);
    const [positionTwo, setPositionTwo] = useState(4);

    function arrowPosition (){
        if(position==="relative"){
        if(type === "locks") return "200px"
        if(type === "groups") return "200px"
        if(type === "physicalLocal") return "570px"
        } else {
            return "100px"
        }
    }
   
    function setIcon(){
        if(type === "roles") return <RoleIcon style={{margin: " 0 0 10px 0", fontSize: 30}}/>
        if(type === "groups") return <GroupIcon style={{margin: " 0 0 10px 0", fontSize: 30}}/>
        if(type === "locks") return <LockIcon style={{margin: " 0 0 10px 0", fontSize: 30}}/>
        if(type === "physicalLocal") return <DoorIcon style={{margin: " 0 0 10px 0", fontSize: 30}}/>
    }
        return (
            <div className="carrosel rigth">
                    
                    <strong className="carroselTitle Rigth" > <b>{type}</b> </strong>
                    <div className="carroselBody">
                    <NavigateBeforeIcon style={{margin: "50px 0px 0 0"}} 
                        onClick={() => {
                            if(positionOne === 0)alert("Sem mais resultados");
                            else {
                                setPositionOne(positionOne-index);
                                setPositionTwo(positionTwo-index);
                            }
                        }}/>
            
                    {render!== undefined && (render.slice(positionOne, positionTwo).map( item => (
                        <div className="RightbuttonComponent typeRigth" key={item._id}>
                            {setIcon()}
                            <strong className="Right Item">{item.name}</strong>
                        </div>
                    )))}

                    <NavigateNextIcon style={{margin: "50px 0 0 0"}}
                        onClick={() => {
                            if(positionTwo >= render.length) alert("Sem mais resultados");
                            else {
                                setPositionOne(positionTwo);
                                setPositionTwo(positionTwo+index);
                            }
                        }}/>
                    </div>
                    
                </div>
            
        );
    }


export default Carrossel;