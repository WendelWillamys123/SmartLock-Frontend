import React, {useState, useEffect} from 'react';
import "./styleCadastro.css";
import api from '../../../../services/api.js';

function Cadastro ({onClose = () => {}, load}){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [registry, setRegistry] = useState([]);
    const [pin, setPin] = useState('');

    const [organization, setOrganization] = useState('');
    const [token, setToken] = useState('');

    useEffect(()=>{
        async function load(){
            var data = sessionStorage.getItem("myID");
            var myID = JSON.parse(data);
            
            var dataToken = sessionStorage.getItem("tokenLocal");
            var tokenLocal = JSON.parse(dataToken);
            
            setToken("Bearer "+tokenLocal)
            setOrganization(myID);
        }
        load();
    }, []);

    async function cadastrarUser(e) {
        e.preventDefault();

        await api.post('/users/create', {
            name,
            email,
            pin,
            registry,
            organization
        }, {
            headers: { 
                authorization: token
            }});

        setName('');  
        setEmail('');
        setRegistry('');
        setPin('');
        load();
        onClose();
    }

    return(
        <div className="containerFormUser">
            <div id="BoxCadastroUser" >
                <form className="FormAddUser" onSubmit={cadastrarUser}>
                <strong>Cadastro</strong>
                    <div className="inputFormAdd">
                        <label htmlFor="nameUser">Name</label>
                        <input 
                        name="nameUser" 
                        id="nameUser"
                        type="text" 
                        required 
                        value={name}
                        onChange={e => setName(e.target.value)}/>   
                    </div>
                
                    <div className="inputFormAdd">
                        <label htmlFor="email">Email</label>
                        <input 
                        name="email" 
                        id="email"
                        type="text" 
                        required 
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>   
                    </div>

                    <div className="inputFormAdd">
                        <label htmlFor="registry">Registry</label>
                        <input 
                        name="registry" 
                        id="registry"
                        type="text" 
                        required 
                        value={registry}
                        onChange={e => setRegistry(e.target.value)}/>   
                    </div>

                    <div className="inputFormAdd">
                        <label htmlFor="pin">Pin</label>
                        <input 
                        name="pin" 
                        id="pin"
                        type="text" 
                        required 
                        value={pin}
                        onChange={e => setPin(e.target.value)}/>   
                    </div>

                <div id="buttonDirection">
                <button type="reset" className="cancelar" onClick={onClose}>Cancelar</button>
               <button type="submit" className="cadastrar">Cadastrar</button>
               </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;