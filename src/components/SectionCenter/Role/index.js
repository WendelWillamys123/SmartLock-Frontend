import React, {useState, useEffect} from 'react';
import api from '../../../services/api'
import './style.css';

import {Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Check from '../../utils/Role/confirmacao/BoxRM';

import RoleIcon from '@material-ui/icons/SettingsOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Carrossel from '../../utils/Role/Carrosel'
import NewShedule from '../../utils/Role/NewShedule/cadastro';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Modal from './modal';
import ModalSchedule from './modalSchedule';

function Role(){

    const [id, setId] = useState("");
    const [role, setRole] = useState("");
    

    const [renderComponent, setRenderComponent] = useState([]);
    const [renderUsers, setRenderUsers] = useState([]);
    const [typeComponent, setTypeComponent] = useState("groups");
    const [nameComponent, setNameComponent] = useState("");
    const [nameUsers, setNameUsers] = useState("");

    const [check, setCheck] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalSchedule, setModalSchedule] = useState(false);

    const [name, setName] = useState(role.name);
    const [times, setTimes] = useState([]);
    const [time, setTime] = useState("");

    const [positionOne, setPositionOne] = useState(0);
    const [positionTwo, setPositionTwo] = useState(4);

    const [visibleForm, setVisibleForm] = useState(false);
   
    
    useEffect(()=>{
        async function load(){
            var data = sessionStorage.getItem("role");
            var localRole= JSON.parse(data);


            const response = await api.get('/app/organizations/search', {headers: {_id: localRole.organization}})

            if( localRole === null) localRole =false;
           
            if(localRole !== null || localRole !== undefined || localRole !== false){
            
            setRole(localRole);
            setId(localRole._id);
            setName(localRole.name);
            setTimes(localRole.times);
            setRenderComponent(carrosselGroups(response.data.groups, localRole._id));
            setRenderUsers(carrosselUsers(response.data.users, localRole._id));
        } else {
                window.location = "http://localhost:3000/home";
                window.location.reload();
            }
            
        }
        load();
    },[]);

    const handleClickAdd = (e) => {
        if(e.target.id === "add-area" || e.target.id === "add-area2") setVisibleForm(!visibleForm);
        else ;
    }

    async function handleUpdate(e){

        e.preventDefault();   

        const response = await api.put('/roles/update', {
             _id: id,
            name: name,
            times: times,
        })
    
        sessionStorage.setItem("role", JSON.stringify(response.data));
        window.location.reload()
    }

    function handleClick() {
        setCheck(true);
    };

    function handleClickModal() {
        setModal(true);
    };

    async function handleClickComponents(e){
        e.preventDefault();

        var typeBox = document.getElementById('TypeBox');
        var value = typeBox.options[typeBox.selectedIndex].value;
        
        const response = await api.get(`/${value}s/search/name`, { headers: { name: nameComponent}});

        var renderCarrossel = [];

        if(value === "group"){
            setTypeComponent(value+"s")
            renderCarrossel =  carrosselGroups(response.data, role._id);
        }
            if(value === "physicalLocal") {
            setTypeComponent(value)
            renderCarrossel =  carrosselPhysicalLocal(response.data);
        }
            if(value === "lock")  {
            setTypeComponent(value+"s")
            renderCarrossel = carrosselLocks(response.data);
        }

        setRenderComponent(renderCarrossel);
        
    }

    async function handleClickUsers(e){
        e.preventDefault();

        const response = await api.get("/users/search/name", { headers: { name: nameUsers}});

        var renderCarrossel = [];
        
        renderCarrossel = carrosselUsers(response.data);
         
        setRenderComponent(renderCarrossel);
        
    }

    function carrosselUsers(props, role){
        var users = [];
        var cont = 0

        if(props !== undefined){
            props.map(user => {

                if(user.roles !== null){

                    user.roles.map(item =>{
                        if(role === item){
                            users.push(user);
                            cont++;
                    }})
                }})
        if (cont > 0) return users; 
        else return null
        }

    }

    function carrosselGroups(props, role){
        var groups = [];
        var cont = 0


        if(props !== undefined){
        props.map(group => {
            
            group.roles.map(item =>{
                if(role === item){
                    groups.push(group);
                    cont++;
                }
            })
        })
            
        }

        if (cont > 0) return groups; 
        else return null
    }

    function carrosselPhysicalLocal(props){
  
        var physicalLocal = [];
        var cont = 0

        if(props !== undefined){
        props.map(local => {
            local.roles.map(item =>{
                if(role._id === item){
                    physicalLocal.push(local);
                    cont++;
                }
            })
        })
            if (cont > 0) return physicalLocal
            else return null
        }
    }

    function carrosselLocks(props){
 
        var locks = [];
        var cont = 0

        if(props !== undefined){
        props.map(lock => {
            lock.roles.map(item =>{
                if(role._id === item){
                    locks.push(lock);
                    cont++;
                }
            })
        })
            if (cont > 0) return locks
            else return null
        }

    }


    return(
        
        <div className="body">
            <header className="role">
                <RoleIcon style={{ fontSize: 48, color: 'seashell', margin: '-5px 10px 0px 10px'}}/>
                <label htmlFor="name">{role.name}</label>

                <div id="deletePersonRole">
                    <Fab aria-label="delete"  margin="0px 5px 0px 5px" size="small" onClick={handleClick}>
                        <DeleteIcon style={{ fontSize: 20}}/>
                    </Fab>
                </div>

            </header>

            <div className="dadosRole">
                
                <form className="roleData" onSubmit={e => handleUpdate(e)}>
                    
                    <div className="infosRole" id="role_Name">
                        <label className="labelBold" htmlFor=""> <b>Name</b> </label>
                        <input  name="nameUser" 
                            type="text" 
                            value={name}
                            required
                            onChange={e => setName(e.target.value)}
                            />
                    </div>

                    <div id="buttonsRole">
                        <button type="reset" className="excluir menor" onClick={handleClickModal}>Assign</button>
                        <button type="submit" className="filtrar menor">Edit</button>

                    </div> 
                    
                    
                        <div className="formComponents" style={{margin: "0 0 -50px 0px"}}>
                            <div className="shadowSection">
                                <div className="CarroselX" >
                        <strong className="carroselXTitle"> <b>Schedules</b> </strong>
                        <div className="carroselXBody">
                            
                            <NavigateBeforeIcon style={{margin: "50px 10px 0 0"}} 
                                onClick={() => {
                                    if(positionOne === 0)alert("Sem mais resultados");
                                    else {
                                        setPositionOne(positionOne-4);
                                        setPositionTwo(positionTwo-4);
                                    }
                                }}/>
                
                            {role.times!== undefined && (role.times.slice(positionOne, positionTwo).map( item => (
                                <div className="RightbuttonComponent typeRole" key={item._id} onClick={()=>{
                                    setTime(item);
                                    setModalSchedule(true);
                                }}>
                                    <ScheduleIcon style={{margin: "0 0 10px 0 " , fontSize: 30}}/>
                                    <strong className="Right Item">{item.name}</strong>
                                </div>
                            )))}

                            <NavigateNextIcon style={{margin: "50px 0 0 0"}}
                                onClick={() => {
                                    if(positionTwo >= role.times.length) alert("Sem mais resultados");
                                    else {
                                        setPositionOne(positionTwo);
                                        setPositionTwo(positionTwo+4);
                                    }
                                }}/>
                        </div>
                    </div>
                            </div>
                        </div>
                    
                    <div className="carrosseisRole">
                        <div className="formComponents">
                    
                            <form className="seachFormAdd  FromModal" onSubmit={e => handleClickComponents(e)}>
                                <strong>Filter</strong>
                                <input
                                    className="inputAdd" 
                                    name="name" 
                                    id="name"
                                    placeholder="Name"
                                    type="text"  
                                    value={nameComponent}
                                    onChange={event => setNameComponent(event.target.value)}/>   
                            
                                <select name="typeBox" defaultValue='DEFAULT' id="TypeBox">
                                    <option className="TypeBoxOptions" value="group" selected>Groups</option>
                                    <option className="TypeBoxOptions" value="physicalLocal">Physical Local</option>
                                    <option className="TypeBoxOptions" value="lock">Locks</option>
                                </select>                    
                            
                                <button type="submit" onClick={ handleClickComponents} className="filtrar formAdd">Search</button>                    
                            </form>

                            <div className="shadowSection">
                            {renderComponent !== null ? (<Carrossel role={role._id} type={typeComponent} render={renderComponent}/> ): 
                            (<p className="Right-Notify Condicional"><b>{typeComponent}:</b> No {typeComponent}</p>)}
                            </div>
                        
                        </div>
                
                        <div className="formComponents">
                            <form className="seachFormAdd FromModal" onSubmit={e => handleClickUsers(e)}>
                                <strong>Filter</strong>
                                <input
                                    className="inputAdd" 
                                    name="name" 
                                    id="name"
                                    placeholder="Name"
                                    type="text"  
                                    value={nameUsers}
                                    onChange={event => setNameUsers(event.target.value)}/>   
                                                
                                <button type="submit" onClick={ handleClickComponents} className="filtrar formAdd">Search</button>                    
                            </form>
     
                            <div className="shadowSection">
                                {renderUsers !== null ? (<Carrossel role={role._id} type="users" render={renderUsers}/> ): 
                                (<p className="Right-Notify Condicional"><b>Users:</b> No users</p>)}
                            </div>
                        </div>
                    </div>
            
                </form>
           
            </div>


            <div className="add Shedule" id="add-area" onClick={handleClickAdd}>
                <RoleIcon id="add-area2" onClick={handleClickAdd} style={{margin: '20px 0px 0px 20px'}}/>
                {visibleForm ? <NewShedule id={id} onClose={()=> setVisibleForm(false)}/> : null}
            </div>

            {check ? <Check role={role} onClose={()=> setCheck(false)}/> : null}
            {modal ? <Modal role={role} onClose={()=> setModal(false)}/> : null}
            {modalSchedule ? <ModalSchedule time={time} role={role} onClose={()=> setModalSchedule(false)}/> : null}

        </div>
    )
}

export default Role;