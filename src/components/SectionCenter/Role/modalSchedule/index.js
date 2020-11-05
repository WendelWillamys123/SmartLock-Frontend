import React, {useState, useEffect} from 'react';
import "./style.css";
import api from '../../../../services/api.js';
import { TimeToLeave } from '@material-ui/icons';

function ModalSchedule ({onClose = () => {}, role, load, time}){

    const [Mytime, setTime] = useState('');
    const [timeName, setTimeName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');



    const [days, setDays] = useState([false, false, false, false, false, false, false]);

    const [newDays, setNewDays] = useState([false, false, false, false, false, false, false]);

    useEffect(()=>{
        function loader(){
            var start, end;

            if(time.start.hours < 10 && time.start.minutes < 10) start = "0" + time.start.hours + ":" + time.start.minutes + "0";
            if(time.start.hours >= 10 && time.start.minutes < 10) start = time.start.hours + ":" + time.start.minutes + "0";
            if(time.start.hours < 10 && time.start.minutes >= 10) start = "0" + time.start.hours + ":" + time.start.minutes;
            
            if(time.end.hours < 10 && time.end.minutes < 10) end = "0" + time.end.hours + ":" + time.end.minutes + "0";
            if(time.end.hours >= 10 && time.end.minutes < 10) end = time.end.hours + ":" + time.end.minutes + "0";
            if(time.end.hours < 10 && time.end.minutes >= 10) end = "0" + time.end.hours + ":" + time.end.minutes;
            
            setStartTime(start);
            setEndTime(end);
            setTimeName(time.name);
            setTime(time)
            setDays(time.day)
        }

        loader()
    }, [])

    async function newShedule(e) {
       if(e.preventDefault()!==undefined) e.preventDefault();

        var start = startTime.split(':')
        var end = endTime.split(':')


        try{
            if(newDays.every(elem => elem===false)){

                var newTime = {
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
                
                role.times.map(tm => {
                    if(tm.name === Mytime.name){
                        tm.name = newTime.name;
                        tm.day = newTime.day;
                        tm.start = newTime.start;
                        tm.end = newTime.end;   
                    }
                })

                const response = await api.put('/roles/update', {
                    _id: role._id,
                    name: role.name,
                    times: role.times
                });
        
                onClose();
                sessionStorage.setItem("role", JSON.stringify(response.data));
                window.location.reload()

            }else{
                 var newTime = {
                    start: { 
                        hours: parseInt(start[0]),
                        minutes: parseInt(start[1])
                    },
                    end: {
                        hours: parseInt(end[0]),
                        minutes: parseInt(end[1])
                    },
                    day: newDays,
                    name: timeName
                }
        
                role.times.map(tm => {
                    if(tm.name === Mytime.name){
                        tm = newTime;
                    }
                })
                
                const response = await api.put('/roles/update', {
                    _id: role._id,
                    name: role.name,
                    times: role.times
                });
        
                console.log("Response do else",response.data);
                setStartTime('');
                setEndTime('')
                onClose();
            }
        }catch(error){
            console.log(error.response);
        }

    }

    function setDay(day){
        var aux = newDays;
        aux[day] = (!newDays[day]);
        setNewDays(aux);
    }

    function verify(index){
        
        if(index === 0){
           return (days[0])? true : false;
        }
        if(index === 1){
            return (days[1])? true : false;
        }
        if(index === 2){
            return (days[2])? true : false;
        }
        if(index === 3){
            return (days[3])? true : false;
        }
        if(index === 4){
            return (days[4])? true : false;
        }
        if(index === 5){
            return (days[5])? true : false;
        }
        if(index === 6){
            return (days[6])? true : false;            
        }
    }
    function InvertVerify(index){
        
        if(index === 0){
           return (days[0])? false : true;
        }
        if(index === 1){
            return (days[1])? false : true;
        }
        if(index === 2){
            return (days[2])? false : true;
        }
        if(index === 3){
            return (days[3])? false : true;
        }
        if(index === 4){
            return (days[4])? false : true;
        }
        if(index === 5){
            return (days[5])? false : true;
        }
        if(index === 6){
            return (days[6])? false : true;            
        }
    }
    return(
        <div className="shadowCheck Modal">
            <div className="modalCheck Modal Shedule" >
                <form className="FormEditSchedule" onSubmit={newShedule}>
                
                    <strong>Editing Schedule {time.name}</strong>

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
               

                    <div className="antigoHorario">

                        <div className="semanaBox FromModal">
                        
                            <p className="descriptionDias" style={{marginLeft: '70px'}}>Your current time</p>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Sun</label>
                                <input type="checkbox" className="campo-checkbox1" checked={verify(0)} disabled={InvertVerify(0)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Mon</label>
                                <input type="checkbox" className="campo-checkbox1" checked={verify(1)} disabled={InvertVerify(1)} />
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Tue</label>
                                <input type="checkbox" className="campo-checkbox1" checked={verify(2)} disabled={InvertVerify(2)} />
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Wed</label>
                                <input type="checkbox"  className="campo-checkbox1" checked={verify(3)} disabled={InvertVerify(3)} />
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Thu</label>
                                <input type="checkbox"  className="campo-checkbox1" checked={verify(4)} disabled={InvertVerify(4)} />
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Fri</label>
                                <input type="checkbox"  className="campo-checkbox1" checked={verify(5)} disabled={InvertVerify(5)} />
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Sat</label>
                                <input type="checkbox"  className="campo-checkbox1" checked={verify(6)} disabled={InvertVerify(6)} />
                            </div>
                            
                        </div>
                            
                    </div>
        
                    <div className="antigoHorario">

                        <div className="semanaBox FromModal" style={{margin: "20px 0px 50px 0"}}>
                        
                            <p className="descriptionDias" style={{margin: "30px 0 25px 0", fontSize: "14px", marginLeft: '-20px'}}>Select the days of the week to reset the schedule</p>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Sun</label>
                                <input type="checkbox" className="campo-checkbox1" 
                                onChange={()=>setNewDays(0)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Mon</label>
                                <input type="checkbox" className="campo-checkbox1" 
                                onChange={()=>setNewDays(1)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Tue</label>
                                <input type="checkbox" className="campo-checkbox1" 
                                onChange={()=>setNewDays(2)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Wed</label>
                                <input type="checkbox"  className="campo-checkbox1" 
                                onChange={()=>setNewDays(3)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Thu</label>
                                <input type="checkbox"  className="campo-checkbox1" 
                                onChange={()=>setNewDays(4)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Fri</label>
                                <input type="checkbox"  className="campo-checkbox1" 
                                onChange={()=>setNewDays(5)}/>
                            </div>

                            <div className="dias-checkbox">
                                <label for="campo-checkbox1">Sat</label>
                                <input type="checkbox"  className="campo-checkbox1" 
                                onChange={()=>setNewDays(6)}/>
                            </div>
                            
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