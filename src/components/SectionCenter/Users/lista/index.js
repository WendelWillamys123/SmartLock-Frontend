import React, {useState, useEffect} from "react";
import './style.css';
import ItemUser from '../item/itemUser';
import Cadastro from '../../../utils/User/cadastro/cadastro';
import api from '../../../../services/api';
import UserAdd from '@material-ui/icons/PersonAdd';

function Lista ({idAdd = "add-area"}){

    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [array, setArray] = useState([]);
   
    const [visibleForm, setVisibleForm] = useState(false);


    async function load() {
        var data = sessionStorage.getItem("myID");
        var myID = JSON.parse(data);
        
        const response = await api.get('/app/organizations/search', {
            headers: {
                 _id: myID
            }})

        setUsers(response.data.users.slice(-6));
        setArray(response.data.users.slice(-6));
     }


    useEffect(()=>{
        async function loaderUser() {
            var data = sessionStorage.getItem("myID");
            var myID = JSON.parse(data);
            
            const response = await api.get('/app/organizations/search', {
                headers: {
                     _id: myID
                }})

            setUsers(response.data.users.slice(-6));
            setArray(response.data.users.slice(-6));
         }
         loaderUser();
     }, []);

     async function handleReset() {
        setArray(users);
        setName('');
    }

    async function handleClick(e){
        e.preventDefault();

       await setArray(users.filter( user =>  (user.name.includes(name))));
      
    }

    const handleClose = (e) => {
        if(e.target.id === "listagem" || e.target.id === "itens" || e.target.id === "liUser") setVisibleForm(false);
        else ;
    }

    const handleClickAdd = (e) => {
        if(e.target.id === idAdd) setVisibleForm(!visibleForm);
        else ;
    }


    return (
        <>
            <div className="main-seach">
                <form className="seachForm" onSubmit={handleClick}>
                    <strong>Filter</strong>
                    <div className="input-block">
                        <label htmlFor="nameUser">User name</label>
                        <input 
                        name="nameUser" 
                        id="nameUser"
                        type="text" 
                        required 
                        value={name}
                        onChange={e => setName(e.target.value)}/>   
                    </div>

                    <button type="reset" className="excluir" onClick={handleReset}>Delete filter</button>
                    <button type="submit" className="filtrar">Search</button>
                </form>
            </div>

            <main className="main-list" onClick={handleClose}>
                <div id="listagem" onClick={handleClose}>
                <ul id="itens">
                    {array.map(user => (
                        <ItemUser onCloseForm={handleClose} load={load} user={user} key={user._id}/>
                        ))}
                </ul>
                </div>
            <div className="add" id="add-area" onClick={handleClickAdd}>
                <UserAdd style={{margin: '20px 0px 0px 20px'}}/>
                {visibleForm ? <Cadastro onClose={()=> setVisibleForm(false)} load={load}/> : null}
                </div>
        
        </main>
    </>

);
    }

    export default Lista;