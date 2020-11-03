import React, {useState, useEffect} from 'react';
import api from '../../../services/api'
import './style.css';

import { Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Check from '../../utils/Role/confirmacao/BoxRM';

import RoleIcon from '@material-ui/icons/SettingsOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Carrossel from '../../utils/Role/Carrosel'
import NewShedule from '../../utils/Role/NewShedule/cadastro';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function Role(){

    const [id, setId] = useState("");
    const [role, setRole] = useState("");
    const [render, setRender] = useState([]);
    const [check, setCheck] = useState(false);

    const [name, setName] = useState(role.name);
    const [times, setTimes] = useState([]);

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
            setRender(response.data)
            } else {
                window.location = "http://localhost:3000/home";
                window.location.reload();
            }
            
        }
        load();
    },[]);

    async function load(dataRole){

        sessionStorage.setItem("role", JSON.stringify(dataRole));

        var data = sessionStorage.getItem("role");
        var localRole= JSON.parse(data);


        const response = await api.get('/app/organizations/search', {headers: {_id: localRole.organization}})

        if( localRole === null) localRole =false;
       
        if(localRole !== null || localRole !== undefined || localRole !== false){

            setRole(localRole);
            setId(localRole._id);
            setName(localRole.name);
            setTimes(localRole.times);
            setRender(response.data)}
    }

    async function reload(){
        var data = sessionStorage.getItem("role");
            var localRole= JSON.parse(data);


            const response = await api.get('/app/organizations/search', {headers: {_id: localRole.organization}})

            if( localRole === null) localRole =false;
           
            if(localRole !== null || localRole !== undefined || localRole !== false){
            
            setRole(localRole);
            setId(localRole._id);
            setName(localRole.name);
            setTimes(localRole.times);
            setRender(response.data)
            } else {
                window.location = "http://localhost:3000/home";
                window.location.reload();
            }
            
    }

    const handleClickAdd = (e) => {
        if(e.target.id === "add-area" || e.target.id === "add-area2") setVisibleForm(!visibleForm);
        else ;
    }

   async function handleReset(){

        const response = await api.get('/search/roles', {
            headers: {
                _id: id
            }
        });

        await sessionStorage.setItem("localRole", JSON.stringify(response.data._id));

        setName(response.data.name);
        setTimes(response.data.times);
    }

    async function handleUpdate(e){

        e.preventDefault();   

        await api.put('/roles/update', {
             _id: id,
            name: name,
            times: times,
        })
    
        window.location.reload()
    }

    function handleClick() {
        setCheck(true);
    };

    function setTime(e, time){
        var value = e;

        var start = value.split(':')

        var aux = time

        aux.start = {
            hours: parseInt(start[0]),
            minutes: parseInt(start[1])
        }

        time.start = aux.start
    }


    function carrosselGroups(){
        var groups = [];
        var cont = 0

        if(render.groups !== undefined){
        render.groups.map(group => {
            group.roles.map(item =>{
                if(role._id === item){
                    groups.push(group);
                    cont++;
                }
            })
        })
            if (cont > 0) return (<Carrossel role={role._id} reload={reload} type="groups" render={groups}/>); 
            else return (<p className="Right-Notify Condicional"><b>Groups:</b> No groups</p>)
        }
    }

    function carrosselPhysicalLocal(){
  
        var physicalLocal = [];
        var cont = 0

        if(render.physicalLocal !== undefined){
        render.physicalLocal.map(local => {
            local.roles.map(item =>{
                if(role._id === item){
                    physicalLocal.push(local);
                    cont++;
                }
            })
        })
            if (cont > 0) return (<Carrossel role={role._id} reload={reload} type="physicalLocal" render={physicalLocal}/> )
            else return (<p className="Right-Notify Condicional"><b>Physical Local:</b> No physical locals</p>);
        }
    }

    function carrosselLocks(){
 
        var locks = [];
        var cont = 0

        if(render.locks !== undefined){
        render.locks.map(lock => {
            lock.roles.map(item =>{
                if(role._id === item){
                    locks.push(lock);
                    cont++;
                }
            })
        })
            if (cont > 0) return (<Carrossel position="relative" index={4} role={role._id} type="locks" render={locks}/> )
            else return (<p className="Right-Notify Condicional"><b>Locks:</b> No locks</p>)
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
                    <label className="labelBold" htmlFor=""><b>Name</b></label>
                    <input  name="nameUser" 
                        type="text" 
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                        />
                </div>
                <div className="main-seach search-add">

                <form className="seachFormAdd" onSubmit={(e)=> handleClick(e)}>
                    <strong>Filter</strong>
                    <input
                        className="inputAdd" 
                        name="namePhysicalLocal" 
                        id="namePhysicalLocal"
                        placeholder="Name"
                        type="text"  
                        value={name}
                        onChange={e => setName(e.target.value)}/>   
                      
                    <select name="typeBox" defaultValue='DEFAULT' id="TypeBox">
                        <option className="TypeBoxOptions" value="group" selected>Groups</option>
                        {role.name !== "Physical Local" &&(<option className="TypeBoxOptions" value="physicalLocal">Physical Local</option>)}
                    </select>                    
                    
                    <button type="submit" className="filtrar formAdd">Search</button>                    
                </form>
                
            </div>
            <div className="carrosseisRole">
                <div className="carrosel role">
                    <strong className="carroselTitle Rigth"> <b>Schedules</b> </strong>
                    <div className="carroselBody">
                    <NavigateBeforeIcon style={{margin: "50px 10px 0 0"}} 
                        onClick={() => {
                            if(positionOne === 0)alert("Sem mais resultados");
                            else {
                                setPositionOne(positionOne-4);
                                setPositionTwo(positionTwo-4);
                            }
                        }}/>
            
                    {role.times!== undefined && (role.times.slice(positionOne, positionTwo).map( item => (
                        <div className="RightbuttonComponent typeRole" key={item._id}>
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

                    <div className="carrosselLocks">
                    {carrosselLocks()}
                    </div>
                    <div className="carrosselLocks">
                    {carrosselPhysicalLocal()}
                    </div>
                    <div className="carrosselLocks">
                    {carrosselGroups()}
                    </div>

                </div>

                 <div id="buttonsRole">

                <button type="reset" className="excluir" onClick={handleReset}>Cancel</button>
                <button type="submit" className="filtrar">Save</button>

            </div> 
            </form>
           
        </div>
        <div className="add Shedule" id="add-area" onClick={handleClickAdd}>
                <RoleIcon id="add-area2" onClick={handleClickAdd} style={{margin: '20px 0px 0px 20px'}}/>
                {visibleForm ? <NewShedule id={id} onClose={()=> setVisibleForm(false)} load={load}/> : null}
                </div>
            {check ? <Check role={role} onClose={()=> setCheck(false)}/> : null}
        </div>
    )
}

export default Role;