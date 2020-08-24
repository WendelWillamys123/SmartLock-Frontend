import React, {useState, useEffect} from "react";
import './style.css';

import api from '../../../services/api';

import SectionRigth from "../../utils/SectionRight"
import LockIcon from '@material-ui/icons/LockOutlined';

function Locks (){

    const [locks, setLocks] = useState([]);
    const [name, setName] = useState('');
    const [array, setArray] = useState([]);

    const [visibleRigth, setVisibleRigth] = useState(false)
    const [type, setType] = useState('')
    const [component, setComponent] = useState('')
    const [owner, setOwner] = useState('')

    const [height, setHeight] = useState(window.screen.height)

    useEffect(()=>{
        async function loaderLocks() {
            
             const response = await api.get('/locks');

             var height = window.screen.height;

             setHeight(height);

             if(height >= 810){
                setLocks(response.data.slice(0, 24));
                setArray(response.data.slice(0, 24));
             }
             if(height < 810 && height>= 690){
                setLocks(response.data.slice(0, 20));
                setArray(response.data.slice(0, 20));
             }
            
         }
         loaderLocks();
     }, [height]);

     async function handleReset() {
        setArray(locks);
        setName('');
    }

    async function handleClick(e){
        e.preventDefault();

       const response = await api.get('/locks/search/name', { headers: { name: name}})

       setArray(response.data);
      
    }

    async function reloadComponents() {
        const response = await api.get('/locks');

        setLocks(response.data);
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
        if(e.target.className ==="center locks") setVisibleRigth(false);
        else ;
    }

    function getOwner(lock){
        
        if(lock.holderPhysicalLocal !== null){
            lock.holder.map(async item => {
            item.locks.map(el => {
                if (lock._id === el)  setOwner(item);
            })
        }); 

        lock.holderPhysicalLocal.locks.map(async item => {
                if (lock._id === item)  setOwner(lock.holderPhysicalLocal);
        });
        } 
        else{
            lock.holder.map(async item => {
                item.locks.map(el => {
                    if (lock._id === el)  setOwner(item);
                })
            }); 
        }       
    }

    function getMyOwner(lock){
        var myOwner;
        
        if(lock.holderPhysicalLocal !== null){
            lock.holder.map(async item => {
            item.locks.map(el => {
                if (lock._id === el)  myOwner = item.name;
            })
        }); 

        lock.holderPhysicalLocal.locks.map(async item => {
                if (lock._id === item) myOwner = lock.holderPhysicalLocal.name;
        });
        } 
        else{
            lock.holder.map(async item => {
                item.locks.map(el => {
                    if (lock._id === el)  myOwner = item.name;
                })
            }); 
        } 
        
        return myOwner;
    }
    return (
       
        <>
       
                <div className="main-seach">
                <form className="seachForm" onSubmit={(e)=> handleClick(e)}>
                <strong>Filter</strong>
                    <div className="input-block">
                        <label htmlFor="nameLock">Lock name</label>
                        <input 
                        name="nameLock" 
                        id="nameLock"
                        type="text" 
                        required 
                        value={name}
                        onChange={e => setName(e.target.value)}/>   
                    </div>
                <button type="reset" className="excluir" onClick={handleReset}>Delete filter</button>
               <button type="submit" className="filtrar">Search</button>
            </form>
            </div>
      
            <main className="center locks" onClick={e => handleClose(e)}>
            {array.map( item => {
                var  myOwner = getMyOwner(item);
                   return(
                   <div className="buttonComponent locks" 
                   key={item._id} onClick={() => {
                      getOwner(item);
                      setType('Lock');
                      setComponent(item); 
                      setVisibleRigth(!visibleRigth);
                   }}>
                   <LockIcon style={{margin: '0px 10px 0px 10px'}}/>
                   <strong id="name">{item.name}</strong>
                   <p className="description owner">{myOwner}</p>
                   </div>
                   )})}
        </main>
        {(visibleRigth)? <SectionRigth owner={owner} type={type} component={component} onDelete={onDelete} onUpdate={onUpdate}/> : (
        <div className="FAQ-main">
        <img id="FAQ-main" src="https://media-public.canva.com/cTjy8/MAD0-5cTjy8/1/s.svg"/>
        <p className="sectionRigth description faq-main">Click on a lock to show more details</p>
        </div>
        )}
    </>

); 
    }

    export default Locks;