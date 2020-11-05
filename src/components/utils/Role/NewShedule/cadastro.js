import React, {useState, useEffect} from 'react';
import "./styleCadastro.css";
import api from '../../../../services/api.js';

function Cadastro ({onClose = () => {}, id, load}){

    const [timeName, setTimeName] = useState('');

    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('23:59');

    const [days, setDays] = useState([false, false, false, false, false, false, false]);


    async function newShedule(e) {
       if(e.preventDefault()!==undefined) e.preventDefault();

        var start = startTime.split(':')
        var end = endTime.split(':')

        if(days.every(elem => elem===false)){
            alert("Select at least one day of the week");
        }else{
            const response = await api.post('/roles/newShedule', {
                _id: id,
                time: {
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
    
            setStartTime('');
            setEndTime('')
            load(response.data);
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
                <form className="FormAddRole" onSubmit={newShedule}>
                <strong>Add a new role</strong>

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
                    <input type="checkbox" value="0" id="campo-checkbox1" 
                    onChange={()=>setDay(0)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Mon</label>
                    <input type="checkbox" value="0" id="campo-checkbox1" 
                    onChange={()=>setDay(1)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Tue</label>
                    <input type="checkbox" value="0" id="campo-checkbox1" 
                    onChange={()=>setDay(2)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Wed</label>
                    <input type="checkbox" value="0"  id="campo-checkbox1" 
                    onChange={()=>setDay(3)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Thu</label>
                    <input type="checkbox" value="0" name="campo-checkbox" id="campo-checkbox1" 
                    onChange={()=>setDay(4)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Fri</label>
                    <input type="checkbox" value="0" name="campo-checkbox" id="campo-checkbox1" 
                    onChange={()=>setDay(5)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Sat</label>
                    <input type="checkbox" value="0" name="campo-checkbox" id="campo-checkbox1" 
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