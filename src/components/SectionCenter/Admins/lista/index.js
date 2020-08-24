import React, {useState, useEffect} from "react";
import './styleList.css';
import './style.css';
import ItemAdmin from '../item/itemAdmin';
import Cadastro from '../../../utils/Admin/cadastro/cadastro';
import api from '../../../../services/api';
import AdminAdd from '@material-ui/icons/HowToReg';

function Lista ({idAdmin = () => {}, idAdd = "add-area"}){

    const [admins, setAdmins] = useState([]);
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

        response.data.admins.length <= 6? setAdmins(response.data.admins.slice(-6)) : setAdmins(response.data.admins);
        response.data.admins.length <= 6? setArray(response.data.admins.slice(-6)) : setArray(response.data.admins);

     }


    useEffect(()=>{
        async function loaderAdmin() {
            var data = sessionStorage.getItem("myID");
            var myID = JSON.parse(data);
            
            const response = await api.get('/app/organizations/search', {
                headers: {
                     _id: myID
                }})
               
            response.data.admins.length <= 6? setAdmins(response.data.admins.slice(-6)) : setAdmins(response.data.admins);
            response.data.admins.length <= 6? setArray(response.data.admins.slice(-6)) : setArray(response.data.admins);

         }
         loaderAdmin();
     }, []);

     async function handleReset() {
        setArray(admins);
        setName('');
    }

    async function handleClick(e){
        e.preventDefault();

       await setArray(admins.filter( admin =>  (admin.name.includes(name))));
      
    }

    const handleClose = (e) => {
        if(e.target.id === "listagem" || e.target.id === "itens" || e.target.id === "liAdmin" ) setVisibleForm(false);
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
                        <label htmlFor="nameAdmin">Administrator name</label>
                        <input 
                        name="nameAdmin" 
                        id="nameAdmin"
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
                <ul id="itens" onClick={handleClose}>
                    {array.map(admin => (
                        <ItemAdmin onCloseForm={handleClose} load={load} admin={admin} key={admin._id} idAdmin={idAdmin} />
                        ))}
                </ul>
                </div>
            <div className="add" id="add-area" onClick={handleClickAdd}>
                <AdminAdd style={{margin: '20px 0px 0px 20px'}}/>
                {visibleForm ? <Cadastro onClose={()=> setVisibleForm(false)} load={load}/> : null}
                </div>
        
        </main>
    </>

);
    }

    export default Lista;