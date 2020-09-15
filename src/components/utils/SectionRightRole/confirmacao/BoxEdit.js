import React, { useState } from 'react';
import './style.css';

import api from '../../../services/api';

function Check({ id = 'shadow', onClose = () => {}, _id, load = () =>{}, type}){

    const [name, setName] = useState('');

    const handleClose = (e) => {
        if(e.target.id === id) onClose();
        else ;
    }

    async function onUpdate(){

        if(type==="Grupo"){
            const response = await api.put('/groups', { _id, name});
            load(response.data);
        } else if(type==="Trava"){
            const response = await api.put('/locks', { _id, name});
            load(response.data);
        } else if(type==="Local Fisíco"){
            const response = await api.put('/localFisico', { _id, name});
            load(response.data);
        }     
     }

    async function handleUpdate() {
        await onUpdate();
        onClose();
    }

    return(
        <div className="shadow" id={id} onClick={handleClose}>
            <div className="modal">
                <h1>{`Editar ${type}`}</h1>
                <div className="input">
                        <label htmlFor="nameComponent" id="name">Digite o nome abaixo</label>
                        <input 
                        name="nameComponent" 
                        id="nameComponent"
                        type="text" 
                        required 
                        value={name}
                        onChange={e => setName(e.target.value)}/>   
                    </div>
                <div className="buttons">
                <button type="reset" className="cancelar" id="menorButton" onClick={onClose}>Cancelar</button>
               <button type="submit" className="cadastrar" id="menorButton" onClick={handleUpdate}>Editar</button>
               </div>
            </div>
        </div>
    );
}

export default Check;