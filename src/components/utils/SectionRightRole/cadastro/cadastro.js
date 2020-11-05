import React, {useState, useEffect} from 'react';
import "./styleCadastro.css";
import api from '../../../../services/api.js';

function Cadastro ({onClose = () => {}, load}){

    const [name, setName] = useState('');
    const [timeName, setTimeName] = useState('');

    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('23:59');

    const [days, setDays] = useState([false, false, false, false, false, false, false]);


    async function cadastrarRole(e) {
        e.preventDefault();

        var start = startTime.split(':')
        var end = endTime.split(':')

        if(days.every(elem => elem===false)){
            alert("Select at least one day of the week");
        }else{
            await api.post('/roles/create', {
                name,
                times: {
                    start: {
                        hours: parseInt(start[0]),
                        minutes: parseInt(start[1])
                    },
                    end: {
                        hours: parseInt(end[0]),
                        minutes: parseInt(end[1])
                    },
                    day: days,
                    name: timeName
                }
            });
    
            setName('');  
            setStartTime('');
            setEndTime('')
            load();
            onClose();
        }

    }

    function setDay(day){
        var aux = days;
        aux[day] = !days[day];
        setDays(aux);
    }

    return(
        <div className="containerFormRole">
            <div id="BoxCadastroRole" >
                <form className="FormAddRole" onSubmit={cadastrarRole}>
                <strong>Add a new role</strong>
                    <div className="inputFormAdd">
                        <label htmlFor="nameRole">Name</label>
                        <input 
                        maxlength="24"
                        autocomplete="off"
                        name="nameRole" 
                        id="inputRole"
                        type="text" 
                        required 
                        value={name}
                        onChange={e => setName(e.target.value)}/>   
                    </div>

                    <div className="inputFormAdd">
                        <label htmlFor="nameRole">Schedule name</label>
                        <input 
                        autocomplete="off"
                        maxlength="15"
                        name="nameTime" 
                        id="inputRole"
                        type="text" 
                        required 
                        value={timeName}
                        onChange={e => setTimeName(e.target.value)}/>   
                    </div>

                    <div className="inputFormAdd">
                        <label htmlFor="pin">Start time</label>
                        <input autocomplete="off" type="time" id="appt" name="appt"
                        name="startTime" 
                        id="inputRole" 
                        required 
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}/>   
                    </div> 

                    <div className="inputFormAdd finalTime">
                        <label htmlFor="pin">Final time</label>
                        <input  autocomplete="off" type="time" id="appt" name="appt"
                        name="endTime" 
                        id="inputRole" 
                        required 
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}/>   
                    </div>

                    <div className="semanaBox">
                        
                        <p className="descriptionDias">Select days of the week</p>
                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Sun</label>
                    <input type="checkbox" value="0" name="campo-checkbox" className="campo-checkbox1" 
                    onChange={()=>setDay(0)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Mon</label>
                    <input type="checkbox" value="0" name="campo-checkbox" className="campo-checkbox1" 
                    onChange={()=>setDay(1)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Tue</label>
                    <input type="checkbox" value="0" name="campo-checkbox" className="campo-checkbox1" 
                    onChange={()=>setDay(2)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Wed</label>
                    <input type="checkbox" value="0" name="campo-checkbox" className="campo-checkbox1" 
                    onChange={()=>setDay(3)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Thu</label>
                    <input type="checkbox" value="0" name="campo-checkbox" className="campo-checkbox1" 
                    onChange={()=>setDay(4)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Fri</label>
                    <input type="checkbox" value="0" name="campo-checkbox" className="campo-checkbox1" 
                    onChange={()=>setDay(5)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Sat</label>
                    <input type="checkbox" value="0" name="campo-checkbox" className="campo-checkbox1" 
                    onChange={()=>setDay(6)}/>
                </div>
                </div>

                <div id="buttonDirection">
                <button type="reset" className="cancelar" onClick={onClose}>Cancelar</button>
               <button type="submit" className="cadastrar">Cadastrar</button>
               </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;