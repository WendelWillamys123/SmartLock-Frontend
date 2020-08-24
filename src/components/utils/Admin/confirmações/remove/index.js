import React from 'react';
import './style.css';

import api from '../../../../../services/api';

function Check({ idAdmin = 'shadow', onClose = () => {}, admin, load = false}){

    const handleClose = (e) => {
        if(e.target.id === idAdmin) onClose();
        else ;
    }

    async function onDelete(){
        var dataToken = sessionStorage.getItem("tokenLocal");
        var tokenLocal = JSON.parse(dataToken);

        await api.delete('/admins/delete', { 
           headers:{
            _id : admin._id,
            authorization: `Bearer ${tokenLocal}`
           }, 
        });

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
        <div className="shadow" id={idAdmin} onClick={handleClose}>
            <div className="modal">
                <h1>Delete administrator</h1>
                <p>The administrator date will be permanently deleted. Want to delete anyway?</p>
                <div className="buttons">
                <button type="reset" className="cancelar" id="menorButton" onClick={onClose}>Cancel</button>
               <button type="submit" className="cadastrar" id="menorButton" onClick={handlDelete}>Delete</button>
               </div>
            </div>
        </div>
    );
}

export default Check;