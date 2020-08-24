import React from 'react';
import './style.css';

import api from '../../../services/api';

function Check({ id = 'shadow', onClose = () => {}, _id, type, onDelete=()=>{}}){

    const handleClose = (e) => {
        if(e.target.id === id) onClose();
        else ;
    }

    async function onDeleteComponent(){
        
        if(type==="Grupo"){
             await api.delete('/groups/delete', { 
                headers:{
                    _id: _id,
                }, 
            });
        } else if(type==="Trava"){
            await api.delete('/locks/delete', { 
                headers:{
                    _id: _id,
                }, 
            });
        }
        else if(type==="Local Fisíco"){
            await api.delete('/localFisico/delete', { 
                headers:{
                    _id: _id,
                }, 
            });
        }
        
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
                <h1>{`Excluir ${type}`}</h1>
                <p>{`Os dados do ${type} serão apagados permanentemente. Deseja excluir mesmo assim?`}</p>
                <div className="buttons">
                <button type="reset" className="cancelar" id="menorButton" onClick={onClose}>Cancelar</button>
               <button type="submit" className="cadastrar" id="menorButton" onClick={handlDelete}>Excluir</button>
               </div>
            </div>
        </div>
    );
}

export default Check;