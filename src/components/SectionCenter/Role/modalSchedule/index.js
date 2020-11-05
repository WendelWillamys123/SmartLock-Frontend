import React, {useState, useEffect} from 'react';
import "./style.css";
import api from '../../../../services/api.js';

function ModalSchedule ({onClose = () => {}, id, load, time}){

    const [timeName, setTimeName] = useState(time.name);
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('23:59');

    const [days, setDays] = useState([true, false, false, false, false, false, false]);

    useEffect(()=>{
        function loader(){

        }

        loader()
    }, [])

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
        aux[day] = (!days[day]);
        setDays(aux);
    }

    function see(){
        console.log(days);
    }

    function verify(index){
        
        if(index === 0){
           return (days[0])? true : false;
        }
        if(index === 1){
            
        }
        if(index === 2){
            
        }
        if(index === 3){
            
        }
        if(index === 4){
            
        }
        if(index === 5){
            
        }
        if(index === 6){
            
        }
    }

    return(
        <div className="shadowCheck Modal">
            <div className="modalCheck Modal Shedule" >
                <form className="FormEditSchedule" onSubmit={newShedule}>
                
                    <strong>Editing {time.name}</strong>

                    <div className="inputFormEdit">
                        <label htmlFor="nameSchedule">Schedule name</label>
                        <input 
                        autocomplete="off"
                        maxlength="15"
                        name="nameTime" 
                        id="inputSchedule"
                        type="text" 
                        required 
                        value={timeName}
                        onChange={e => setTimeName(e.target.value)}/>   
                    </div>

                    <div className="inputFormEdit">
                        <label htmlFor="pin">Start time</label>
                        <input autocomplete="off" type="time" id="appt" name="appt"
                        name="startTime" 
                        id="inputSchedule" 
                        required 
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}/>   
                    </div> 

                    <div className="inputFormEdit finalTime">
                        <label htmlFor="pin">Final time</label>
                        <input  autocomplete="off" type="time" id="appt" name="appt"
                        name="endTime" 
                        id="inputSchedule" 
                        required 
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}/>   
                    </div>
               

                    <div className="knsxon">

                        <div className="semanaBox FromModal">
                        
                        <p className="descriptionDias" style={{marginLeft: '50px'}}>Select days of the week</p>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Mon</label>
                                <input type="checkbox" className="campo-checkbox1" 
                                onChange={()=>see()}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Mon</label>
                                <input type="checkbox" className="campo-checkbox1" 
                                onChange={()=>setDay(1)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Tue</label>
                                <input type="checkbox" className="campo-checkbox1" 
                                onChange={()=>setDay(2)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Wed</label>
                                <input type="checkbox"  className="campo-checkbox1" 
                                onChange={()=>setDay(3)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Thu</label>
                                <input type="checkbox"  className="campo-checkbox1" 
                                onChange={()=>setDay(4)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Fri</label>
                                <input type="checkbox"  className="campo-checkbox1" 
                                onChange={()=>setDay(5)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Sat</label>
                                <input type="checkbox"  className="campo-checkbox1" 
                                onChange={()=>setDay(6)}/>
                            </div>
                            
                            </div>
                            
                            </div>
                
                <div className="antigoHorario">

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Sun</label>
                    <input type="checkbox" className="campo-checkbox1" 
                    onChange={()=>setDay(0)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Mon</label>
                    <input type="checkbox" className="campo-checkbox1" 
                    onChange={()=>setDay(1)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Tue</label>
                    <input type="checkbox"  className="campo-checkbox1" 
                    onChange={()=>setDay(2)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Wed</label>
                    <input type="checkbox" className="campo-checkbox1" 
                    onChange={()=>setDay(3)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Thu</label>
                    <input type="checkbox"  className="campo-checkbox1" 
                    onChange={()=>setDay(4)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Fri</label>
                    <input type="checkbox"  className="campo-checkbox1" 
                    onChange={()=>setDay(5)}/>
                </div>

                <div className="dias-checkbox">
                    <label for="campo-checkbox1">Sat</label>
                    <input type="checkbox"  className="campo-checkbox1" 
                    onChange={()=>setDay(6)}/>
                </div>
                
                </div>

                

                <div id="buttonDirection">
                <button type="reset" className="cancelar " onClick={onClose}>Cancel</button>
               <button type="submit" className="cadastrar ">Edit</button>
               </div>
                </form>
            </div>
        </div>
    );
}

export default ModalSchedule;