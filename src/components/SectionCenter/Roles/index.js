import React, {useState, useEffect} from "react";
import './style.css';

import api from '../../../services/api';

import SectionRigthRole from "../../utils/SectionRightRole"
import RoleIcon from '@material-ui/icons/SettingsOutlined';
import Cadastro from '../../utils/SectionRightRole/cadastro/cadastro';

function Roles (){

    const [roles, setRoles] = useState([]);
    const [name, setName] = useState('');
    const [array, setArray] = useState([]);

    const [visibleRigth, setVisibleRigth] = useState(false)
    const [type, setType] = useState('')
    const [component, setComponent] = useState('')

    const [visibleForm, setVisibleForm] = useState(false);


    useEffect(()=>{
        async function loaderRoles() {
            
             const response = await api.get('/roles');

             var height = window.screen.height;
             
             var main = document.getElementById("centerRoles");

                if(height >= 761){ 
                if(response.data.slice(0, 24).length === 24) main.style.gridTemplateRows = `repeat(${((response.data.slice(0, 24).length)/4)}, 120px)`;
                setRoles(response.data.slice(0, 24));
                setArray(response.data.slice(0, 24));
             } 
             if(height < 760 && height>= 690){
                if(response.data.slice(0, 24).length === 20) main.style.gridTemplateRows = `repeat(${((response.data.slice(0, 20).length)/4)}, 120px)`;
                setRoles(response.data.slice(0, 20));
                setArray(response.data.slice(0, 20));
             }
            
         }
         loaderRoles();
     }, []);

     async function handleReset() {
        setArray(roles);
        setName('');
    }

    async function handleClick(e){
        e.preventDefault();

       const response = await api.get('/roles/search/name', { headers: { name: name}})

       setArray(response.data);
      
    }

    async function reloadComponents() {
        const response = await api.get('/roles');

        setRoles(response.data);
        setArray(response.data);
    }

    async function onUpdate(){
        reloadComponents();
        setVisibleRigth(true);
    }

    async function onDelete(){
        reloadComponents();
        setVisibleRigth(false);
    }

     const handleClose = (e) => {
        if(e.target.className ==="center roles") {
                var body = document.querySelector("body");
                body.className = "OldRight";
            setVisibleRigth(false);
        }
        else ;
        if(e.target.id === "centerRoles") setVisibleForm(false);
    }


    const handleClickAdd = (e) => {
        if(e.target.id === "add-area" || e.target.id === "add-area2") setVisibleForm(!visibleForm);
        else ;
    }

    const load = async () => {
        const response = await api.get('/roles');

        var height = window.screen.height;
        
        var main = document.getElementById("centerRoles");

           if(height >= 761){ 
           if(response.data.slice(0, 24).length === 24) main.style.gridTemplateRows = `repeat(${((response.data.slice(0, 24).length)/4)}, 120px)`;
           setRoles(response.data.slice(0, 24));
           setArray(response.data.slice(0, 24));
        } 
        if(height < 760 && height>= 690){
           if(response.data.slice(0, 24).length === 20) main.style.gridTemplateRows = `repeat(${((response.data.slice(0, 20).length)/4)}, 120px)`;
           setRoles(response.data.slice(0, 20));
           setArray(response.data.slice(0, 20));
        }
    }

    return (
       
        <>
       
                <div className="main-seach">
                <form className="seachForm" onSubmit={(e)=> handleClick(e)}>
                <strong>Filter</strong>
                    <div className="input-block">
                        <label htmlFor="nameRole">Role name</label>
                        <input 
                        name="nameRole" 
                        id="nameRole"
                        type="text" 
                        required 
                        value={name}
                        onChange={e => setName(e.target.value)}/>   
                    </div>
                <button type="reset" className="excluir" onClick={handleReset}>Delete filter</button>
               <button type="submit" className="filtrar">Search</button>
            </form>
            </div>
      
            <main className="center roles" id="centerRoles" onClick={e => handleClose(e)}>
            {array.map( item => {
                   return(
                   <div className="buttonComponent roles" 
                   key={item._id} 
                   onDoubleClick={()=>{
                    sessionStorage.setItem("role", JSON.stringify(item));
                    window.location.replace("http://localhost:3000/role");
                }}>
                   <RoleIcon style={{margin: '0px 10px 0px 10px'}}/>
                   <strong id="name">{item.name}</strong>
                   </div>
                   )})}
        </main>

        <div className="add role" id="add-area" onClick={handleClickAdd}>
                <RoleIcon id="add-area2" onClick={handleClickAdd} style={{margin: '20px 0px 0px 20px'}}/>
                {visibleForm ? <Cadastro onClose={()=> setVisibleForm(false)} load={load}/> : null}
                </div>
                  

        {(visibleRigth)? <SectionRigthRole type={type} component={component} onDelete={onDelete} onUpdate={onUpdate}/> : null}
        
        {(visibleRigth) || (visibleForm)? null : (
        
        <div className="FAQ-main">
        <img id="FAQ-main" src="https://media-public.canva.com/cTjy8/MAD0-5cTjy8/1/s.svg"/>
        <p className="sectionRigth description faq-main">Click on a role to show more details</p>
        </div>
        )}

    
    </>

); 
    }

    export default Roles;