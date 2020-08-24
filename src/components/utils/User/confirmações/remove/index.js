import React, {useState, useEffect} from 'react';
import './style.css';

import api from '../../../../../services/api';

function Check({ idUser = 'shadow', onClose = () => {}, user, load = false }){

    const [token, setToken] = useState('');

    useEffect(()=>{
        async function load(){
            var dataToken = sessionStorage.getItem("tokenLocal");
            var tokenLocal = JSON.parse(dataToken);
            console.log({user,tokenLocal})
            
            setToken("Bearer "+tokenLocal)
        }
        load();
    }, []);

    const handleClose = (e) => {
        if(e.target.id === idUser) onClose();
        else ;
    }

    async function onDelete(){

        await api.delete('/users/delete',  {
            headers: { 
                _id: user._id,
                authorization: token
        }});

        if(load === false){
            sessionStorage.setItem("userId", JSON.stringify("notUser"));
            window.location.href = "http://localhost:3000/home";
        }

         load();
     }

    async function handlDelete() {
        await onDelete();
        onClose();
    }

    return(
        <div className="shadow" id={idUser} onClick={handleClose}>
            <div className="modal">
                <h1>Delete user</h1>
                <p>The user date will be permanently deleted. Want to delete anyway?</p>
                <div className="buttons">
                <button type="reset" className="cancelar" id="menorButton" onClick={onClose}>Cancel</button>
               <button type="submit" className="cadastrar" id="menorButton" onClick={handlDelete}>Delete</button>
               </div>
            </div>
        </div>
    );
}

export default Check;