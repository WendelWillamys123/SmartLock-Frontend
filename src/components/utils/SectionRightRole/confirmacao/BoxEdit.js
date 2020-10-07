import React, { useState } from 'react';
import './style.css';

import api from '../../../../services/api';

function Check({ id = 'shadow', onClose = () => {}, _id, load = () =>{}, times}){

    const [name, setName] = useState('');

    const handleClose = (e) => {
        if(e.target.id === id) onClose();
        else ;
    }

    async function onUpdate(){

        console.log(_id, name, times);  
        const response = await api.put('/roles/update', 
            {
                _id: _id,
                name: name,
                times: times
            }
        );

        load(response.data);    
     }

    async function handleUpdate() {
        await onUpdate();
        onClose();
    }

    return(
        <div className="shadow" id={id} onClick={handleClose}>
            <div className="modal">
                <h1>Edit role</h1>
                <div className="input">
                        <label htmlFor="nameComponent" id="name">Enter the new name</label>
                        <input 
                        autocomplete="off"
                        name="nameComponent" 
                        id="nameComponent"
                        type="text" 
                        required 
                        value={name}
                        onChange={e => setName(e.target.value)}/>   
                    </div>
                <div className="buttons">
                <button type="reset" className="cancelar" id="menorButton" onClick={onClose}>Cancel</button>
               <button type="submit" className="cadastrar" id="menorButton" onClick={handleUpdate}>Edit</button>
               </div>
            </div>
        </div>
    );
}

export default Check;