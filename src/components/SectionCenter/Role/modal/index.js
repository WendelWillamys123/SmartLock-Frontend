import React, {useEffect, useState} from 'react';
import api from '../../../../services/api'
import Carrosel from './Carrosel';
import './style.css';

function Modal({role, onClose = () => {} }) {

    const [compsSave, setCompsSave] = useState({});
    const [array, setArray] = useState([]);
    const [typeComponent, setTypeComponent] = useState("groups");
    const [nameComponent, setNameComponent] = useState("");

    useEffect(()=>{
        async function load(){

            const response = await api.get('/app/organizations/search', {headers: {_id: role.organization}})
            
            var aux = carrosselGroups(response.data.groups, role._id)
            setArray(aux)
            
        }
        load();
    },[]);


    async function handleClickComponents(e){
        e.preventDefault();

        console.log(e.target);
        var typeBox = document.getElementById('TypeBoxModal');
        var value = typeBox.options[typeBox.selectedIndex].value;
        
        const response = await api.get(`/${value}s/search/name`, { headers: { name: nameComponent}});

        console.log(response.data);
        var renderCarrossel = [];

        if(value === "group"){
            setTypeComponent(value+"s")
            renderCarrossel =  carrosselGroups(response.data, role._id);
        }
        if(value === "physicalLocal") {
            setTypeComponent(value)
            renderCarrossel =  carrosselPhysicalLocal(response.data, role._id);
        }
        if(value === "lock")  {
            setTypeComponent(value+"s")
            renderCarrossel = carrosselLocks(response.data, role._id);
        }

        if(value === "users")  {
            setTypeComponent(value)
            renderCarrossel = carrosselUsers(response.data, role._id);
        }

        setArray(renderCarrossel);
        
    }

    function SAVE(){
        var type, comps;

        ({type, comps} = {type: compsSave.type, comps: compsSave.comps});

        var aux = [];
        
        comps.filter( item => {
            if(item.selected){
                aux.push(item)
            }
        })

        comps = aux;

        Promise.all(comps.map( async item => {
            try{
                const response = await api.post('/roles/assign', {_id: role._id, componentID: item.object._id, type: type});
                if(response.status === 200){
                    alert(response.data.message)
                }
            }catch(error){
                alert(error.response.data.error)
            }
        }))
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

        if(props !== undefined){
            if(props !== null){
                props.map(user => {
                    if(user.roles !== undefined && user.roles !== null && user.roles.length > 0) {
                        var exist = false
                        user.roles.map(item =>{
                            if(role.toString() === item.toString()){
                                exist = true;
                            }
                        })
                        if(exist === false){
                            users.push({selected: false, object: user});
                            cont++;
                        }
                    } else{
                        users.push({selected: false, object: user});
                        cont++;
                    }
                 })

            }
            
        }

    }
    
    function carrosselGroups(props, role){
        var groups = [];
        var cont = 0

        if(props !== undefined){
            if(props !== null){
                props.map(group => {
                    if(group.roles !== undefined && group.roles !== null && group.roles.length > 0) {
                        var exist = false
                        group.roles.map(item =>{
                            if(role.toString() === item.toString()){
                                exist = true;
                            }
                        })
                        if(exist === false){
                            groups.push({selected: false, object: group});
                            cont++;
                        }
                    } else{
                        groups.push({selected: false, object: group});
                        cont++;
                    }
                 })

            }
            
        }

        if (cont > 0) return groups; 
        else return null
    }

    function carrosselPhysicalLocal(props, role){
  
        var physicalLocal = [];
        var cont = 0

        if(props !== undefined){
            if(props !== null){
                props.map(local => {
                    if(local.roles !== undefined && local.roles !== null && local.roles.length > 0) {
                        var exist = false
                        local.roles.map(item =>{
                            if(role.toString() === item.toString()){
                                exist = true;
                            }
                        })
                        if(exist === false){
                            physicalLocal.push({selected: false, object: local});
                            cont++;
                        }
                    } else{
                        physicalLocal.push({selected: false, object: local});
                        cont++;
                    }
                 })

            }
        }
        
        if (cont > 0) return physicalLocal
        else return null
    }

    function carrosselLocks(props, role){
 
        var locks = [];
        var cont = 0

        if(props !== undefined){
        props.map(lock => {
            lock.roles.map(item =>{
                if(role !== item){
                    locks.push(lock);
                    cont++;
                }
            })
        })
            
        }
        
        if (cont > 0) return locks
        else return null
    }

    function setComponentsCarrossel(...props){
        var [type, comps] = [...props];

        setCompsSave({type, comps});
    }

        return (
            <div className="shadowCheck Modal">
                <div className="modalCheck Modal">
                    <h1>Assign access</h1>
                    <p>You can assign this role to groups, locks, physical locals and users, just search and select!</p>

                    
                <div className="formComponents FromModal">
                    <form className="seachFormAdd FromModal" onSubmit={e => handleClickComponents(e)}>
                        <strong>Filter</strong>
                        <input
                            className="inputAdd" 
                            name="name" 
                            id="name"
                            placeholder="Name"
                            type="text"  
                            value={nameComponent}
                            onChange={event => setNameComponent(event.target.value)}/>   
                        
                        <select name="typeBox" defaultValue='DEFAULT' id="TypeBoxModal">
                            <option className="TypeBoxOptions" value="group" selected>Groups</option>
                        <option className="TypeBoxOptions" value="physicalLocal">Physical Local</option>
                        <option className="TypeBoxOptions" value="lock">Locks</option>
                        <option className="TypeBoxOptions" value="users">Users</option>
                        </select>                    
                        
                        <button type="submit" className="filtrar formAdd">Search</button>                    
                    </form>
                    <div className="ArrayModal">
                    {array !== null ? (<Carrosel type={typeComponent} updateComponentes={setComponentsCarrossel} render={array}/> ): 
                    (<p className="Right-Notify Condicional"><b>{typeComponent}:</b> No {typeComponent}</p>)}
                    </div>
                </div>

                    <div className="buttons FromModal">
                    <button className="cancelar" type="button" onClick={onClose}>Cancel</button>
                    <button className="cadastrar" type="button" onClick={SAVE}>Save</button>
                    </div>
                </div>
            </div>
        );
    }


export default Modal;