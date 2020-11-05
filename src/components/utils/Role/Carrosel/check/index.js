import React from 'react';
import api from '../../../../../services/api';
import './style.css';

function CheckCarrosel({type, item, role, reload = ()=>{}, handleClose = ()=>{}}) {

    async function onDelete(){
        var index;
        var data;
       
        try{
        index = item.roles.indexOf(role);
        item.roles.splice(index, 1)
        
        if(type === "groups") {
            const response = await api.put('groups/removeRole', {roleID: role, _id: item._id, roles: item.roles})
            data = response.data.message    
        }
        if(type === "locks") {
            const response = await api.put('locks/removeRole', {roleID: role, _id: item._id, roles: item.roles})
            data = response.data.message
        }
        if(type === "physicalLocal") {
            const response = await api.put('physicalLocals/removeRole', {roleID: role, _id: item._id, roles: item.roles})
            data = response.data.message
        }
        if(type === "users") {
            const response = await api.put('users/removeRole', {roleID: role, _id: item._id, roles: item.roles})
            data = response.data.message
        }

        alert(data);
        handleClose();
        window.location.reload();
        }catch(error){
            alert(error.response.data.message);
        }
    }
        return (
            <div className="shadowCheck">
                <div className="modalCheck">
                    <h1>Remove access</h1>
                    <p>Do you want to remove {item.name} from the accesses of this role?</p>
                    <div className="buttons">
                    <button className="cancelar menor" type="button" onClick={handleClose}>Cancel</button>
                    <button className="cadastrar menor" type="button" onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }


export default CheckCarrosel;