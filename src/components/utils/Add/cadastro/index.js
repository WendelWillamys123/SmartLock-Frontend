import React, {useState, useEffect} from 'react';
import "./styleCadastro.css";

import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import api from '../../../../services/api';

function AddComponents({reload = () =>{}}){

    const [name, setName] = useState('');
    const [nameAdd, setNameAdd] = useState('');
    const [component, setComponent] = useState('None')
    const [array, setArray] = useState([]);
    const [type, setType] = useState('');
    const [typeSelect, setTypeSelect] = useState('Group');
    const [Strong, setStrong] = useState('Groups: ');
    const [positionOne, setPositionOne] = useState(0);
    const [positionTwo, setPositionTwo] = useState(4);

    useEffect(()=>{
        async function loadComponents(){
            var dataSource = sessionStorage.getItem("source");
            var source = JSON.parse(dataSource);

            if(source !== "None"){
                const data = await api.get(`${source.type}/search`, {_id: source.component});
                setComponent(data.data);
            }

            const groups = await api.get('/groups');
          
            if(window.location.href==="http://localhost:3000/physicalLocal") setType("Physical Local");
            if(window.location.href==="http://localhost:3000/locks") setType("Locks");
            if(window.location.href==="http://localhost:3000/groups") setType("Groups");
            
            setArray(groups.data);
        }
        loadComponents();
    }, [])

    async function addComponent(e) {
        e.preventDefault();

        var typeBox = document.getElementById('TypeBox');
        var value = typeBox.options[typeBox.selectedIndex].value;

        if(window.location.href==="http://localhost:3000/physicalLocal"){
            if(component !== "None"){
                const response = await api.post('physicalLocals/create', {_id : component._id, name: nameAdd,  longitude: 0, latitude: 0})
                if(response.status===200){
                alert(`Physical Local ${response.data.name} was created in the group ${component.name}`)
                    reload();
                    setNameAdd('');
                    window.location.replace("http://localhost:3000/physicalLocal");
                }
            } else alert("Select a source group");
        } 

        if(window.location.href==="http://localhost:3000/groups"){
            if(component !== "None"){
                    const response = await api.post('groups/create', {_id : component._id, Localtype: value, name: nameAdd})
                    if(response.status===200){
                        alert(`Group ${response.data.name} was created in the ${type.toLowerCase()} ${component.name}`)
                        reload();
                        setNameAdd('');
                    }

            } else {
                const response = await api.post('groups/create', {name: nameAdd})
                if(response.status===200){
                    alert(`Group ${response.data.name} was created`)
                    reload();
                    setNameAdd('');
                    window.location.replace("http://localhost:3000/groups");
                }
            }
        } 
          
        if(window.location.href==="http://localhost:3000/locks"){
            if(component !== "None"){
                const response = await api.post('locks/create', {_id : component._id, name: nameAdd, Localtype: value})
                if(response.status===200){
                    alert(`Lock ${response.data.name} was created in the ${type.toLowerCase()} ${component.name}`)
                    reload();
                    setNameAdd('');
                    window.location.replace("http://localhost:3000/locks");
                }
            } else alert("Select a source group ou source physical local");
        } 
    }

    async function handleClick(e){
        e.preventDefault();

        var typeBox = document.getElementById('TypeBox');
        var value = typeBox.options[typeBox.selectedIndex].value;
        
        if(value === "groups") setTypeSelect("Group")
        if(value === "physicalLocal") setTypeSelect("Physical Local")
        
        const response = await api.get(`/${value}s/search/name`, { headers: { name: name}});

        setArray(response.data);
        if(value=== "groups") setStrong('Groups: ');
        if(value=== "physicalLocals") setStrong("Physical Local: ");
    }

    return(

        <div className="sectionAddComponent">
            <header className="headerAdd">
                <h2>Add a new {type}</h2>
            </header>

            <div className="main-seach search-add">
                <form className="seachFormAdd" onSubmit={(e)=> handleClick(e)}>
                    <strong>Filter</strong>
                    <input
                        className="inputAdd" 
                        name="namePhysicalLocal" 
                        id="namePhysicalLocal"
                        placeholder="Name"
                        type="text"  
                        value={name}
                        onChange={e => setName(e.target.value)}/>   
                      
                    <select name="typeBox" defaultValue='DEFAULT' id="TypeBox">
                        <option className="TypeBoxOptions" value="group" selected>Groups</option>
                        {type !== "Physical Local" &&(<option className="TypeBoxOptions" value="physicalLocal">Physical Local</option>)}
                    </select>                    
                    
                    <button type="submit" className="filtrar formAdd">Search</button>                    
                </form>
            </div>

            <div className="carrosel">
                <strong className="carroselTitle"> { Strong } </strong>
                <NavigateBeforeIcon style={{margin: "50px 10px 0 0"}} 
                onClick={() => {
                    if(positionOne === 0)alert("Sem mais resultados");
                    else {
                        setPositionOne(positionOne-4);
                        setPositionTwo(positionTwo-4);
                    }
                }}/>
            
                {array!== undefined && (array.slice(positionOne, positionTwo).map( group => (
                        <div className="RightbuttonComponent typeAdd" key={group._id} onClick={()=>{
                            setComponent(group);
                        }}>
                            <GroupIcon style={{fontSize: 30}}/>
                            <strong className="Right groups">{group.name}</strong>
                        </div>
                    )))}
                <NavigateNextIcon style={{position: "absolute", right: "50px", margin: "50px 0 0 0"}}
                onClick={() => {
                    if(positionTwo >= array.length) alert("Sem mais resultados");
                    else {
                        setPositionOne(positionTwo);
                        setPositionTwo(positionTwo+4);
                    }
                }}/>
            </div>

            <form className="FormAdd" onSubmit={addComponent}>
                <strong className="TitleFormAdd">Name of {type}</strong>
                
                <div className="inputFormAdd">
                        <input 
                        maxlength="24"
                        data-ls-module="charCounter"
                        name="name" 
                        id="nameComponent"
                        type="text" 
                        required
                        placeholder="Name" 
                        value={nameAdd}
                        onChange={e => setNameAdd(e.target.value)}/>   
                </div>
                {(component !== "None") && (<strong id="sourceSelected"> {typeSelect} selected: {component.name} </strong>)}
                <div id="buttonDirection">
                    <button type="submit" className="cadastrar">Cadastrar</button>
                </div>
            </form>

            <div className="FAQAdd">
                <img id="FAQ-Add" src="https://media-public.canva.com/bgXq4/MAD-vnbgXq4/1/s.svg"/>
                {(type === "Physical Local")? 
                (<p className="descriptionADD faq">To create a new Physical Local you need to choose a source group</p>) : null }
                {(type === "Locks")? 
                (<p className="descriptionADD faq">To create a new Lock you need to choose a source group our a source physical local</p>) : null }
            </div>
        </div>
    );
}

export default AddComponents;