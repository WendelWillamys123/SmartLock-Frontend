import React from "react";
import './style.css';

import { useState } from "react";

import LockIcon from '@material-ui/icons/LockOutlined';
import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';
import Carrossel from '../../utils/Add/Carrossel'

import BoxRM from './confirmacao/BoxRM';
import BoxEdit from './confirmacao/BoxEdit';

function SectionLeft({type, owner, component, onDelete=() =>{}, onUpdate=() =>{}}){ 

    const [render, setRender] = useState(component);
    const [boxRm, setBoxRm] = useState(false);
    const [boxEdit, setBoxEdit] = useState(false);

    async function reload(updateComponent){
        await onUpdate();
        setRender(updateComponent);
    }

    function carrosselRoles(){
        if(window.location.href ==="http://localhost:3000/groups"){
            
            if (render.roles.length !== 0) return (<Carrossel type="roles" render={render.roles}/> );
            else return (<p className="Right-Notify Condicional"><b>Roles:</b> No access role</p>);
      
        }
        if(window.location.href ==="http://localhost:3000/physicalLocal"){

            if (render.roles.length !== 0) return (<Carrossel type="roles" render={render.roles}/> );
            else return (<p className="Right-Notify Condicional"><b>Roles:</b> No access role</p>);
        
        }
        if(window.location.href ==="http://localhost:3000/locks"){
           
            if (render.roles.length !== 0) return (<Carrossel type="roles" render={render.roles}/> );
            else return (<p className="Right-Notify Condicional"><b>Roles:</b> No access role</p>);
        
        }
    }

    function carrosselGroups(){
        if(window.location.href ==="http://localhost:3000/groups"){
            
            if (render.groups.length !== 0) return (<Carrossel type="groups" render={render.groups}/>); 
            else return (<p className="Right-Notify Condicional"><b>Groups:</b> No groups</p>)
      
        }

        if(window.location.href ==="http://localhost:3000/physicalLocal"){
            
            if (render.groups.length !== 0) return (<Carrossel type="groups" render={render.groups}/>); 
            else return (<p className="Right-Notify Condicional"><b>Groups:</b> No groups</p>)
        
        }
        
    }

    function carrosselPhysicalLocal(){
        if(window.location.href ==="http://localhost:3000/groups"){

            if (render.physicalLocal.length !== 0) return (<Carrossel type="physicalLocal" render={render.physicalLocal}/> )
            else return (<p className="Right-Notify Condicional"><b>Physical Local:</b> No physical locals</p>);

        }
    }

    function carrosselLocks(){
        if(window.location.href ==="http://localhost:3000/groups"){

            if (render.locks.length !== 0) return (<Carrossel type="locks" render={render.locks}/> )
            else return (<p className="Right-Notify Condicional"><b>Locks:</b> No locks</p>)
      
        }

        if(window.location.href ==="http://localhost:3000/physicalLocal"){

            if (render.locks.length !== 0) return (<Carrossel type="locks" render={render.locks}/> )
            else return (<p className="Right-Notify Condicional"><b>Locks:</b> No locks</p>)
        
        }

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

                <div className="RigthBody">
                    {carrosselRoles()}
                    {carrosselLocks()}
                    {carrosselPhysicalLocal()}
                    {carrosselGroups()}
                    
                    
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
