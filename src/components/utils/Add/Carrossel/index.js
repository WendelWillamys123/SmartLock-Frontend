import React, {useState} from 'react';
import './style.css'

import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import RoleIcon from '@material-ui/icons/SettingsOutlined';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function Carrossel({type, render}) {

    const [positionOne, setPositionOne] = useState(0);
    const [positionTwo, setPositionTwo] = useState(4);
   
        return (
            <div className="carrosel rigth">
                    
                    <strong className="carroselTitle Rigth"> <b>{type}</b> </strong>
                    <NavigateBeforeIcon style={{margin: "50px 10px 0 0"}} 
                        onClick={() => {
                            if(positionOne === 0)alert("Sem mais resultados");
                            else {
                                setPositionOne(positionOne-3);
                                setPositionTwo(positionTwo-3);
                            }
                        }}/>
            
                    {render!== undefined && (render.slice(positionOne, positionTwo).map( item => (
                        <div className="RightbuttonComponent typeRigth" key={item._id}>
                            <RoleIcon style={{fontSize: 30}}/>
                            <strong className="Right Item">{item.name}</strong>
                        </div>
                    )))}

                    <NavigateNextIcon style={{position: "absolute", right: "100px", margin: "50px 0 0 0"}}
                        onClick={() => {
                            if(positionTwo >= render.length) alert("Sem mais resultados");
                            else {
                                setPositionOne(positionTwo);
                                setPositionTwo(positionTwo+3);
                            }
                        }}/>
                </div>
            
        );
    }


export default Carrossel;