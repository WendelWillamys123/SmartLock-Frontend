import React, {useState, useEffect} from "react";
import './style.css';

import api from '../../../services/api';

import SectionRigth from "../../utils/SectionRight"
import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';

function PhysicalLocals(){

    const [physicalLocals, setPhysicalLocals] = useState([]);
    const [name, setName] = useState('');
    const [array, setArray] = useState([]);

    const [visibleRigth, setVisibleRigth] = useState(false)
    const [type, setType] = useState('')
    const [component, setComponent] = useState('')
    const [owner, setOwner] = useState('')

    const [height, setHeight] = useState(window.screen.height)

    useEffect(()=>{
        async function loaderPhysicalLocals() {
            
             const response = await api.get('/physicalLocals');

             var height = window.screen.height;

             setHeight(height);

             if(height >= 810){
                setPhysicalLocals(response.data.slice(0, 24));
                setArray(response.data.slice(0, 24));
             }
             if(height < 810 && height>= 690){
                setPhysicalLocals(response.data.slice(0, 20));
                setArray(response.data.slice(0, 20));
             }
            
         }
         loaderPhysicalLocals();
     }, [height]);

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

        setPhysicalLocals(response.data);
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
        if(e.target.className ==="center physicalLocals") setVisibleRigth(false);
        else ;
    }

    function getOwner(physicalLocal){

            physicalLocal.holder.map(async item => {
                item.physicalLocal.map(el => {
                    if (physicalLocal._id === el)  setOwner(item);
                })
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
      
            <main className="center physicalLocals" onClick={e => handleClose(e)}>
            {array.map( item => {
                var {name: myOwner} = getMyOwner(item);
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
                   <p className="description owner">{myOwner} </p>
                   </div>
                   )})}
        </main>
        {(visibleRigth)? <SectionRigth owner={owner} type={type} component={component} onDelete={onDelete} onUpdate={onUpdate}/> : (
        <div className="FAQ-main">
        <img id="FAQ-main" src="https://media-public.canva.com/cTjy8/MAD0-5cTjy8/1/s.svg"/>
        <p className="sectionRigth description faq-main">Click on a physical local to show more details</p>
        </div>
        )}
    </>

); 
    }

    export default PhysicalLocals;