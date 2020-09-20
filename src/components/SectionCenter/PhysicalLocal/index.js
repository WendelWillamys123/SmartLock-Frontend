import React, {useState, useEffect} from "react";
import './style.css';

import api from '../../../services/api';

import SectionRigth from "../../utils/SectionRight"
import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';
import AddComponents from "../../utils/Add/cadastro";

function PhysicalLocals(){

    const [physicalLocals, setPhysicalLocals] = useState([]);
    const [name, setName] = useState('');
    const [array, setArray] = useState([]);

    const [visibleRigth, setVisibleRigth] = useState(false)
    const [type, setType] = useState('')
    const [component, setComponent] = useState('')
    const [owner, setOwner] = useState('')


    useEffect(()=>{
        async function loaderPhysicalLocals() {
            
             const response = await api.get('/physicalLocals');

             var height = window.screen.height;
             
                var main = document.getElementById("centerPhysicalLocal");

                if(height >= 761){ 
                if(response.data.slice(0, 24).length === 24) main.style.gridTemplateRows = `repeat(${((response.data.slice(0, 24).length)/4)}, 120px)`;
                setPhysicalLocals(response.data.slice(0, 24));
                setArray(response.data.slice(0, 24));
             } 
             if(height < 760 && height>= 690){
                if(response.data.slice(0, 24).length === 20) main.style.gridTemplateRows = `repeat(${((response.data.slice(0, 20).length)/4)}, 120px)`;
                setPhysicalLocals(response.data.slice(0, 20));
                setArray(response.data.slice(0, 20));
             }
         }
         loaderPhysicalLocals();
     }, []);

     async function handleReset() {
        setArray(physicalLocals);
        setName('');
    }

    async function handleClick(e){
        e.preventDefault();

       const response = await api.get('/physicalLocals/search/name', { headers: { name: name}})

       setArray(response.data);
      
    }

    async function reloadComponents() {
        const response = await api.get('/physicalLocals');

        var height = window.screen.height;

        if(height >= 810){
           setPhysicalLocals(response.data.slice(0, 24));
           setArray(response.data.slice(0, 24));
        }
        if(height < 810 && height>= 690){
           setPhysicalLocals(response.data.slice(0, 20));
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
        if(e.target.className ==="center physicalLocals") setVisibleRigth(false);
        else ;
    }

    function getOwner(physicalLocal){

            physicalLocal.holder.map(async item => {
                item.physicalLocal.map(el =>{ if (physicalLocal._id === el)  setOwner(item)})
            }); 
      
    }

    function getMyOwner(physicalLocal){
        var myOwner;
    
            physicalLocal.holder.map(async item => {
                item.physicalLocal.map(el => {
                    if (physicalLocal._id === el)  myOwner = item;
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

        const response = await api.get('/physicalLocals');

        var height = window.screen.height;

        if(height >= 757){
           setPhysicalLocals(response.data.slice(0, 24));
           setArray(response.data.slice(0, 24));
        }
        if(height <= 756 && height>= 590){
           setPhysicalLocals(response.data.slice(0, 20));
           setArray(response.data.slice(0, 20));
        }
    }
    return (
       
        <>
                <div className="main-seach">
                <form className="seachForm" onSubmit={(e)=> handleClick(e)}>
                <strong>Filter</strong>
                    <div className="input-block">
                        <label htmlFor="namePhysicalLocal">Physical local name</label>
                        <input 
                        name="namePhysicalLocal" 
                        id="namePhysicalLocal"
                        type="text" 
                        required 
                        value={name}
                        onChange={e => setName(e.target.value)}/>   
                    </div>
                <button type="reset" className="excluir" onClick={handleReset}>Delete filter</button>
               <button type="submit" className="filtrar">Search</button>
            </form>
            </div>
      
            <main className="center physicalLocals" id="centerPhysicalLocal" onClick={e => handleClose(e)}>
            {array.map( item => {
                var myOwner = getMyOwner(item);
                   return(
                   <div className="buttonComponent physicalLocals" 
                   key={item._id} onClick={() => {
                      getOwner(item);
                      setType('Physical Local');
                      setComponent(item); 
                      setVisibleRigth(!visibleRigth);
                   }}>
                   <DoorIcon style={{margin: '0px 10px 0px 10px'}}/>
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
        <p className="sectionRigth description faq-main">Click on a physical local to show more details</p>
        </div>
        )}
    </>

); 
    }

    export default PhysicalLocals;