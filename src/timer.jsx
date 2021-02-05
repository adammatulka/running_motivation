import React, { useRef, useState } from 'react';   
import dayjs from 'dayjs';


export const Timer = () => {
    const [pace, setPace] = useState(0);
    const [runtime, setRuntime] = useState('');
    const [runStart, setRunStart] = useState();
    const [running, setRunning] = useState(false);
    
    const [stats, setStats] = useState('')

    const [changebtn, setChangebtn] = useState('Start');

    const runningInterval = useRef();
    
    const handleStart = (e) =>{ 
        e.preventDefault();

        const startDate = new Date();
        setRunStart(startDate);
        runningInterval.current = setInterval(function(){
            const now = new Date();
            const runtime = now - startDate;
            
            const runtimeFormatted = dayjs().startOf('day').add(runtime, 'milliseconds').format('[Time:] HH:mm:ss')
            setRuntime(runtimeFormatted);
        }, 100);

        setRunning(true);
    }    

    const handleStop = (e) =>{
        e.preventDefault(); 

        clearInterval(runningInterval.current);
        setRuntime('')
        setRunning(false);

        const now = new Date();
        localStorage.setItem('lastRun', now - runStart);
        const listLastRun = localStorage.getItem('lastRun');
        console.log(dayjs().startOf('day').add(listLastRun, 'milliseconds').format('[Time:] HH:mm:ss'));

        const statsFormatted = dayjs().startOf('day').add(listLastRun, 'milliseconds').format('[Time:] HH:mm:ss')
        setStats(statsFormatted);
    }

    const handleAdd = () =>  {
        setPace(pace + 1)
    }

    const handleSub = () =>  {
        setPace(pace - 1)
    }

    return(
        <div>
            <div id="pacestats">
            <button disabled={ running } onClick={handleSub}>-</button>
                <label>
                    <input type="text" value={ pace } disabled={ running } onChange={(e) => setPace(e.target.value)} />
                </label>
            <button disabled={ running } onClick={handleAdd}>+</button>
            </div>

            <div id="runstats">
                <button disabled={ running } onClick={handleStart}>{ changebtn }</button>
                <button disabled={ !running } onClick={handleStop}>Stop</button>
                    <p>
                        <strong>{ runtime }</strong>
                    </p>
            </div>

            <div id="stathistory">
                <ul>
                    <p>
                        { stats }
                    </p>
                </ul>
            </div>

        </div>
    )
}