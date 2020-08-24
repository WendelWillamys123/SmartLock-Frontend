import React, { useEffect, useState } from "react";
import "./style.css";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import api from "../../services/api";

function Header() {

    const [organization, setOrganization] = useState('');

    useEffect(()=>{
        async function load(){
            var data = sessionStorage.getItem("myID");
            var myID = JSON.parse(data);
            
            const response = await api.get('/app/organizations/search', {
                headers: {
                     _id: myID
                }})

            setOrganization(response.data);
        }
        load();
    }, []);

    return( 
        <header id="main-header">
            <AccountCircleIcon style={{fontSize: 30, margin: '0px 0px 0px 25px'}}/>
            <strong>{organization.name}</strong>
        </header>
    );
}

export default Header;