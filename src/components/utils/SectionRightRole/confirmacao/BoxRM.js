import React from 'react';
import './style.css';

import api from '../../../../services/api';

function Check({ id = 'shadow', onClose = () => {}, _id, onDelete=()=>{}}){

    const handleClose = (e) => {
        if(e.target.id === id) onClose();
        else ;
    }

    async function onDeleteComponent(){
        
        await api.delete('/roles/delete', {headers: {_id: _id}})
        
         onDelete();
     }

    async function handlDelete() {
        await onDeleteComponent();
        onClose();
    }

    return(
        <div className="shadow" id={id} onClick={handleClose}>
            <div className="modal">
            <h1>{`Delete role`}</h1>
            <p>{`The role data will be permanently deleted. Do you want to delete anyway?`}</p>                <div className="buttons">
                <button type="reset" className="cancelar" id="menorButton" onClick={onClose}>Cancel</button>
               <button type="submit" className="cadastrar" id="menorButton" onClick={handlDelete}>Delete</button>
               </div>
            </div>
        </div>
    );
}

export default Check;