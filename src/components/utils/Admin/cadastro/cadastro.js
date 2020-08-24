import React, {useState, useEffect} from 'react';
import "./styleCadastro.css";
import api from '../../../../services/api.js';

function Cadastro ({onClose = () => {}, load}){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState([]);

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

    async function cadastrarAdmin(e) {
        e.preventDefault();

        await api.post('/admins/create', {
            name,
            email,
            password,
            organization
        }, {
            headers: { 
                authorization: token
            }});

        setName('');  
        setEmail('');
        setPassword('');
        load();
        onClose();
    }

    return(
        <div className="containerFormAdmin">
            <div id="BoxCadastroAdmin" >
                <form className="FormAddAdmin" onSubmit={cadastrarAdmin}>
                <strong>Cadastro</strong>
                    <div className="inputFormAdd">
                        <label htmlFor="nameAdmin">Nome</label>
                        <input 
                        name="nameAdmin" 
                        id="nameAdmin"
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
                        <label htmlFor="password">Password</label>
                        <input 
                        name="password" 
                        id="password"
                        type="text" 
                        required 
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>   
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