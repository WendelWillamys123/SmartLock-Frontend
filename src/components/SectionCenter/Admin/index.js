import React, {useState, useEffect} from 'react';
import api from '../../../services/api'
import './style.css';

import { Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Check from '../../utils/Admin/confirmações/remove';

import AdminIcon from '@material-ui/icons/AccountCircle';

function Admin(){

    const [id, setId] = useState("");
    const [admin, setAdmin] = useState("");
    const [check, setCheck] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [registry, setRegistry] = useState("");
    const [pins, setPins] = useState([]);
    const [newPin, setNewPins] = useState("");
    
    useEffect(()=>{
        async function load(){
            var data = sessionStorage.getItem("adminId");
            var adminId= JSON.parse(data);

            if( adminId === "notAdmin") adminId =false;

            if(adminId !== null || adminId !== undefined || adminId !== false){

            const response = await api.get('/admins/search', {
                headers: {
                    _id : adminId,
                }
            });

            console.log(response.data)
            
            setAdmin(response.data);
            setId(response.data._id);
            setName(response.data.name);
            setEmail(response.data.email);
            
            } else {
                console.log("aqui");
                window.location = "http://localhost:3000/home";
                window.location.reload();
            }
            
        }
        load();
    },[]);

   async function handleReset(){

        const response = await api.get('/admins/search', {_id: id});

        await sessionStorage.setItem("adminId", JSON.stringify(response.data._id));

        setName(response.data.name);
        setEmail(response.data.email);
        if(response.data.registry==="") setRegistry("Add a registry");
        else setRegistry(response.data.registry);
        setPins(response.data.pins);
    }

    async function handleUpdate(e){

        e.preventDefault();

        var newPins = pins;

        if(newPin !== "") newPins.push(newPin);        

        await api.put('/admins/update', {
             _id: id,
            name: name,
            email: email,
            
        })
    
        window.location.reload()
    }

    function handleClick() {
        setCheck(true);
    };

    return(
        <div className="body">
        <header className="admin">
        <AdminIcon style={{ fontSize: 48, color: 'seashell', margin: '-5px 10px 0px 10px'}}/>
            <label htmlFor="name">{name}</label>

            <div id="deletePerson">
                <Fab aria-label="delete"  margin="0px 5px 0px 5px" size="small" onClick={handleClick}>
                    <DeleteIcon style={{ fontSize: 20}}/>
                </Fab>
            </div>

            </header>
        <div className="dados">
            <form className="adminData" onSubmit={e => handleUpdate(e)}>
                <div className="infos" id="admin_Name">
                    <label htmlFor="">Name</label>
                    <input  name="nameAdmin" 
                        type="text" 
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                        />
                </div>
                <div className="infos" id="admin_Email">
                    <label htmlFor="">Email</label>
                    <input  name="nameAdmin" 
                        type="text" 
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}/>
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
            {check ? <Check admin={admin} onClose={()=> setCheck(false)}/> : null}
        </div>
    )
}

export default Admin;