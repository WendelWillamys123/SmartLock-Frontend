import React, { useEffect, useState } from 'react';
import api from '../../../../services/api';
import './style.css'

function Assign({role}) {

    const [ornwe, setOwner] = useState({});

    useEffect(()=>{
        function getOwner(){
            const organization = await api.get('auth/organizations/search', { headers: {_id: role.organization}})
            
        }
        getOwner();
    },[])

    return (
        <div>

        </div>
    );
};

export default Assign;
