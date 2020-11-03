import React from 'react';
import api from '../../../../../services/api';
import './style.css';

function CheckCarrosel(item) {

    async function onDelete(){
        var index = 0;
        var data =0;
        
        index = item.item.roles.indexOf(item.role)
        item.item.roles.splice(index, 1)
        
        if(item.type === "groups") {
            const response = await api.put('groups/removeRole', {roleID: item.role, _id: item.item._id, roles: item.item.roles})
            data = response.data            
        }
        if(item.type === "locks") {
            const response = await api.put('locks/removeRole', {roleID: item.role, _id: item.item._id, roles: item.item.roles})
        }
        if(item.type === "physicalLocal") {
            const response = await api.put('physicalLocal/removeRole', {roleID: item.role, _id: item.item._id, roles: item.item.roles})
            data = response.data
        }
        if(item.type === "users") {
            const response = await api.put('users/removeRole', {roleID: item.role, _id: item.item._id, roles: item.item.roles})
            data = response.data
        }

        
        item.handleClose();
        item.reload();
    }
        return (
            <div className="shadowCheck">
                <div className="modalCheck">
                    <h1>Remove access</h1>
                    <p>Do you want to remove {item.item.name} from the accesses of this role?</p>
                    <div className="buttons">
                    <button className="cancelar menor" type="button" onClick={item.handleClose}>Cancel</button>
                    <button className="cadastrar menor" type="button" onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }


export default CheckCarrosel;