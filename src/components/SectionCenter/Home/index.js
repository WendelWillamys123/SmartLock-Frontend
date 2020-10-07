import React, {useState, useEffect} from "react";
import "./style.css";

import api from '../../../services/api'
import UserIcon from '@material-ui/icons/PersonOutlineOutlined';
import AdminIcon from '@material-ui/icons/HowToReg';
import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import LockIcon from '@material-ui/icons/LockOutlined';
import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';



function Home() {    
   
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([])
    
    const [groups, setGroups] = useState([]);
    const [locks, setLocks] = useState([]);
    const [physicalLocal, setPhysicalLocal] = useState([]);


    useEffect(()=>{
        async function loaderOrganization() {
            var data = sessionStorage.getItem("myID");
            var myID = JSON.parse(data);
            
            const response = await api.get('/app/organizations/search', { headers:{ _id: myID}})

            
            response.data.users.length <= 4 ? setUsers(response.data.users.slice(-4)) : setUsers(response.data.users);
            response.data.admins.length <= 4 ? setAdmins(response.data.admins.slice(-4)) : setAdmins(response.data.admins);

           
            response.data.groups.length >= 4 ? setGroups(response.data.groups.slice(-4)) : setGroups(response.data.groups);
            response.data.locks.length >= 4 ? setLocks(response.data.locks.slice(-4)) : setLocks(response.data.locks);
            response.data.physicalLocal.length >= 4 ? setPhysicalLocal(response.data.physicalLocal.slice(-4)) : setPhysicalLocal(response.data.physicalLocal);


         }
         loaderOrganization();
     }, []);
     



    
     return( 
        
        <div id="home">    

        <div className="sectionComponent">
            <div className="section">
                <p className="Title">Users</p>
            </div>

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
            
            <div className="section" id="sectionAdmins">
                <p className="Title">Admins</p>
            </div> 

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

        <div className="sectionComponent groups">

            <div className="section" id="sectionAdmins">
                <p className="Title">Groups</p>
            </div>

            {groups.map( item => {
                return(
                    <div className="buttonComponent groups" 
                        key={item._id} >

                    <DoorIcon style={{margin: '0px 10px 0px 10px'}}/>
                    <strong id="name">{item.name}</strong>
                    </div>
                    )})}
        </div>

        <div className="sectionComponent physicalLocal">

            <div className="section" id="sectionAdmins">
                <p className="Title">Physical Local</p>
            </div>

            {physicalLocal.map( item => {
                return(
                    <div className="buttonComponent groups" 
                        key={item._id} >

                    <DoorIcon style={{margin: '0px 10px 0px 10px'}}/>
                    <strong id="name">{item.name}</strong>
                    </div>
                    )})}
        </div>

        <div className="sectionComponent locks">

            <div className="section" id="sectionAdmins">
                <p className="Title">Locks</p>
            </div>

            {locks.map( item => {
                return(
                    <div className="buttonComponent groups" 
                        key={item._id}>

                    <LockIcon style={{margin: '0px 10px 0px 10px'}}/>
                    <strong id="name">{item.name}</strong>
                    </div>
                    )})}
        </div>

        </div>
    ); 
}

export default Home;