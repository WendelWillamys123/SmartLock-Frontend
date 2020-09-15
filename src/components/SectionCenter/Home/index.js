import React, {useState, useEffect} from "react";
import "./style.css";

import api from '../../../services/api'
import UserIcon from '@material-ui/icons/PersonOutlineOutlined';
import AdminIcon from '@material-ui/icons/HowToReg';


function Home() {

    
   
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([])
   
    useEffect(()=>{
        async function loaderOrganization() {
            var data = sessionStorage.getItem("myID");
            var myID = JSON.parse(data);
            
            const response = await api.get('/app/organizations/search', { headers:{ _id: myID}})

            response.data.users.length <= 4 ? setUsers(response.data.users.slice(-4)) : setUsers(response.data.users);
            response.data.admins.length <= 4 ? setAdmins(response.data.admins.slice(-4)) : setAdmins(response.data.admins);
         }
         loaderOrganization();
     }, []);

    
     return( 
        
        <div id="home">
        
            <div className="section">
                <p className="Title">Users</p>
            </div>

            <div className="section" id="sectionAdmins">
                <p className="Title">Admins</p>
            </div> 
            

    
        <div className="sectionComponent">
            {users.map(user => 
                 <div className="buttonComponent" 
                    key={user._id} 
                    onDoubleClick={()=> {
                        sessionStorage.setItem("userId", JSON.stringify(user._id));
                        window.location.replace("http://localhost:3000/user");
                    }}>
                    
                    <UserIcon style={{margin: '0px 10px 0px 10px'}}/>
                    <strong id="name">{user.name}</strong>
                </div>
            )}
        </div>

        <div className="sectionComponent" id="admins">
            {admins.map(admin => 
                 <div className="buttonComponent" 
                    key={admin._id} 
                    onDoubleClick={()=> {
                        sessionStorage.setItem("adminId", JSON.stringify(admin._id));
                        window.location.replace("http://localhost:3000/admin");
                    }}>
                    
                    <AdminIcon style={{margin: '0px 10px 0px 10px'}}/>
                    <strong id="name">{admin.name}</strong>
                </div>
            )}
        </div>
        </div>
    ); 
}

export default Home;