import React, {useState, useEffect} from "react";
import './style.css';

import api from '../../../services/api';

import SectionRigth from "../../utils/SectionRight"
import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import AddComponents from "../../utils/Add/cadastro";

function Groups(){

    const [groups, setGroups] = useState([]);
    const [name, setName] = useState('');
    const [array, setArray] = useState([]);

    const [visibleRigth, setVisibleRigth] = useState(false)
    const [type, setType] = useState('')
    const [component, setComponent] = useState('')
    const [owner, setOwner] = useState('')


    useEffect(()=>{
        async function loaderGroups() {
            
             const response = await api.get('/groups');

             var height = window.screen.height;
             
                var main = document.getElementById("centerGroup");

                if(height >= 761){ 
                if(response.data.slice(0, 24).length === 24) main.style.gridTemplateRows = `repeat(${((response.data.slice(0, 24).length)/4)}, 120px)`;
                setGroups(response.data.slice(0, 24));
                setArray(response.data.slice(0, 24));
             } 
             if(height < 760 && height>= 690){
                if(response.data.slice(0, 24).length === 20) main.style.gridTemplateRows = `repeat(${((response.data.slice(0, 20).length)/4)}, 120px)`;
                setGroups(response.data.slice(0, 20));
                setArray(response.data.slice(0, 20));
             }
         }
         loaderGroups();
     }, []);

     async function handleReset() {
        setArray(groups);
        setName('');
    }

    async function handleClick(e){
        e.preventDefault();

       const response = await api.get('/groups/search/name', { headers: { name: name}})

       setArray(response.data);
      
    }

    async function reloadComponents() {
        const response = await api.get('/groups');

        var height = window.screen.height;

        if(height >= 810){
           setGroups(response.data.slice(0, 24));
           setArray(response.data.slice(0, 24));
        }
        if(height < 810 && height>= 690){
           setGroups(response.data.slice(0, 20));
           setArray(response.data.slice(0, 20));
        }
    }

    async function onUpdate(){
        await reloadComponents();
        setVisibleRigth(true);
    }

    async function onDelete(){
       await reloadComponents();
        setVisibleRigth(false);
    }

     const handleClose = (e) => {
        if(e.target.className ==="center groups") setVisibleRigth(false);
        else ;
    }

    function getOwner(group){
            group.holder.map(async item => {
                item.groups.map(el => () => { if (group._id === el)  setOwner(item)})
            }); 
      
    }

    function getMyOwner(group){
        var myOwner;
        
           if(group.holderPhysicalLocal !== null ){
               group.holderPhysicalLocal.groups.map(el => {
                if (group._id === el)  myOwner = group.holderPhysicalLocal;             
               })
           }

           group.holder.map(async item => {
            item.groups.map(el => {
                if (group._id === el)  myOwner = item;
            })
        }); 

        return myOwner;
    }

    async function reload(){
        sessionStorage.setItem("source", JSON.stringify("None"));
        var input = document.getElementById("Hchecked");
        var body = document.querySelector("body");
        if(body.className === "NewRight") body.className = "OldRight";
        if(input.checked) input.checked = false;

        const response = await api.get('/groups');

        var height = window.screen.height;

        if(height >= 757){
           setGroups(response.data.slice(0, 24));
           setArray(response.data.slice(0, 24));
        }
        if(height <= 756 && height>= 590){
           setGroups(response.data.slice(0, 20));
           setArray(response.data.slice(0, 20));
        }
    }
    return (
       
        <>
                <div className="main-seach">
                <form className="seachForm" onSubmit={(e)=> handleClick(e)}>
                <strong>Filter</strong>
                    <div className="input-block">
                        <label htmlFor="nameGroup">Group name</label>
                        <input 
                        name="nameGroup" 
                        id="nameGroup"
                        type="text" 
                        required 
                        value={name}
                        onChange={e => setName(e.target.value)}/>   
                    </div>
                <button type="reset" className="excluir" onClick={handleReset}>Delete filter</button>
               <button type="submit" className="filtrar">Search</button>
            </form>
            </div>
      
            <main className="center groups" id="centerGroup" onClick={e => handleClose(e)}>
            {array.map( item => {
                var myOwner = getMyOwner(item);
                   return(
                   <div className="buttonComponent groups" 
                   key={item._id} onClick={() => {
                      getOwner(item);
                      setType('Group');
                      setComponent(item); 
                      setVisibleRigth(!visibleRigth);
                   }}>
                   <GroupIcon style={{margin: '0px 10px 0px 10px'}}/>
                   <strong id="name">{item.name}</strong>
                   {myOwner !== undefined &&(<p className="description owner">{myOwner.name} </p>)}
                   </div>
                   )})}
        </main>
        <input id="Hchecked" type="checkbox" onClick={()=>{
                  sessionStorage.setItem("source", JSON.stringify("None"));
                      var body = document.querySelector("body");
                      if(body.className === "NewRight") body.className = "OldRight";
                      else body.className = "NewRight";
                  }}/>
                  
                  <label htmlFor="Hchecked">
                            <div className="menuH center">
                                <span className="hamburguer center"></span>
                            </div>
                        </label>
                  <AddComponents reload={reload}/>
        {(visibleRigth)? <SectionRigth owner={owner} type={type} component={component} onDelete={onDelete} onUpdate={onUpdate}/> : (
        <div className="FAQ-main">
        <img id="FAQ-main" src="https://media-public.canva.com/7co2c/MAD0tS7co2c/1/s.svg"/>
        <p className="sectionRigth description faq-main">Click on a group to show more details</p>
        </div>
        )}
    </>

); 
    }

    export default Groups;