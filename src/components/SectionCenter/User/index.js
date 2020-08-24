import React, {useState, useEffect} from 'react';
import api from '../../../services/api'
import './style.css';

import { Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Check from '../../utils/User/confirmações/remove';

import UserIcon from '@material-ui/icons/AccountCircle';

function User(){

    const [id, setId] = useState("");
    const [user, setUser] = useState("");
    const [check, setCheck] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [registry, setRegistry] = useState("");
    const [pins, setPins] = useState([]);
    const [newPin, setNewPins] = useState("");
    
    useEffect(()=>{
        async function load(){
            var data = sessionStorage.getItem("userId");
            var userId= JSON.parse(data);

            if( userId === "notUser") userId =false;

            var dataToken = sessionStorage.getItem("tokenLocal");
            var tokenLocal = JSON.parse(dataToken);
            
            console.log(userId);

            if(userId !== null || userId !== undefined || userId !== false){

            const response = await api.get('/users/search', {
                headers: {
                    _id : userId,
                    authorization: `Bearer ${tokenLocal}`
                }
            });
            
            setUser(response.data);
            setId(response.data._id);
            setName(response.data.name);
            setEmail(response.data.email);
            if(response.data.registry==="") setRegistry("Add a registry");
            else setRegistry(response.data.registry);
            setPins(response.data.pins);  
            } else {
                console.log("aqui");
                window.location = "http://localhost:3000/home";
                window.location.reload();
            }
            
        }
        load();
    },[]);

   async function handleReset(){
    
        var dataToken = sessionStorage.getItem("tokenLocal");
        var tokenLocal = JSON.parse(dataToken);

        const response = await api.get('/search/users', {_id: id}, {
            headers: {
                authorization: `Bearer ${tokenLocal}`
            }
        });

        await sessionStorage.setItem("userId", JSON.stringify(response.data._id));

        setName(response.data.name);
        setEmail(response.data.email);
        if(response.data.registry==="") setRegistry("Adicionar uma registry");
        else setRegistry(response.data.registry);
        setPins(response.data.pins);
    }

    async function handleUpdate(e){

        e.preventDefault();

        var dataToken = sessionStorage.getItem("tokenLocal");
        var tokenLocal = JSON.parse(dataToken);

        var newPins = pins;

        if(newPin !== "") newPins.push(newPin);        

        const response = await api.put('/users/update', {
             _id: id,
            name: name,
            email: email,
            pins: newPins,
            registry: registry
        }, {
            headers: {
                authorization: `Bearer ${tokenLocal}`
            }
        })
    
        window.location.reload()
    }

    function handleClick() {
        setCheck(true);
    };

    return(
        <div className="body">
        <header className="user">
        <UserIcon style={{ fontSize: 48, color: 'seashell', margin: '-5px 10px 0px 10px'}}/>
            <label htmlFor="name">{name}</label>

            <div id="deletePerson">
                <Fab aria-label="delete"  margin="0px 5px 0px 5px" size="small" onClick={handleClick}>
                    <DeleteIcon style={{ fontSize: 20}}/>
                </Fab>
            </div>

            </header>
        <div className="dados">
            <form className="userData" onSubmit={e => handleUpdate(e)}>
                <div className="infos" id="user_Name">
                    <label htmlFor="">Name</label>
                    <input  name="nameUser" 
                        type="text" 
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                        />
                </div>
                <div className="infos" id="user_Email">
                    <label htmlFor="">Email</label>
                    <input  name="nameUser" 
                        type="text" 
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="infos" id="user_Registry">
                    <label htmlFor="">Registry</label>
                    <input  name="nameUser" 
                        type="text" 
                        value={registry}
                        onChange={e => setRegistry(e.target.value)}
                        />
                </div>
                <div className="infos" id="user_pins">
                <label htmlFor="">Pins</label>
                { pins !== undefined &&
                  pins.map(pin => (
                    <input key={pin} name="pinUser" 
                        type="text" 
                        value={pin}
                        origemPin= {pin}
                        />
                    ))
               }
               {pins !== undefined && pins.length <= 2 && (<input name="pinUser" 
                        type="text" 
                        placeholder="Add a new pin..."
                        onChange={e => setNewPins(e.target.value)}/>)}
                </div>
                 <div id="buttons">

                <button type="reset" className="excluir" onClick={handleReset}>Cancel</button>
                <button type="submit" className="filtrar">Save</button>

            </div> 
            </form>
           
        </div>
        <div className="section" id="sectionRoles">
                <p className="Title">Roles</p>
            </div> 
            {check ? <Check user={user} onClose={()=> setCheck(false)}/> : null}
        </div>
    )
}

export default User;