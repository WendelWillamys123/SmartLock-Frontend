import React from 'react';
import './style.css';

import api from '../../../../services/api';

function Check({ id = 'shadow', onClose = () => {}, _id, type, onDelete=()=>{}}){

    const handleClose = (e) => {
        if(e.target.id === id) onClose();
        else ;
    }

    async function onDeleteComponent(){
        
        if(type==="Group") await api.delete('/groups/delete', {
            headers: {
                 _id: _id
            }
         });

        if(type==="Lock") await api.delete('/locks/delete', {
            headers: {
                 _id: _id
            }
         });
        
        if(type==="Physical Local") await api.delete('/physicalLocals/delete', {
            headers: {
                 _id: _id
            }
         });
                
         onDelete();
         onClose();
     }

    async function handlDelete() {
        await onDeleteComponent();
        onClose();
    }

    return(
        <div className="shadow" id={id} onClick={handleClose}>
            <div className="modal">
                <h1>{`Delete ${type}`}</h1>
                <p>{`The ${type} data will be permanently deleted. Do you want to delete anyway?`}</p>
                <div className="buttons">
                <button type="reset" className="cancelar" id="menorButton" onClick={onClose}>Cancel</button>
               <button type="submit" className="cadastrar" id="menorButton" onClick={handlDelete}>Delete</button>
               </div>
            </div>
        </div>
    );
}

export default Check;