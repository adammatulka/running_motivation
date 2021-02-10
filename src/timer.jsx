import React, { useRef, useState } from 'react';   
import dayjs from 'dayjs';

import './styles.css';

const STORAGE_KEY = 'lastRun';

export const Timer = () => {
    const [pace, setPace] = useState(dayjs().startOf('day').valueOf()); // uuuuhhh
    const [runtime, setRuntime] = useState('');
    const [runStart, setRunStart] = useState();
    const [running, setRunning] = useState(false);

    const [runHistory, setRunHistory] = useState(() => {
        let runHistoryCurrent = [];
        const runHistoryCurrentRaw = localStorage.getItem(STORAGE_KEY);
        if (runHistoryCurrentRaw) {
            runHistoryCurrent = JSON.parse(runHistoryCurrentRaw);
        }
        return runHistoryCurrent;
    });
    
    const runningInterval = useRef();
    
    const handleStart = (e) =>{ 
        e.preventDefault();

        const startDate = new Date();
        setRunStart(startDate);
        runningInterval.current = setInterval(function(){
            const now = new Date();
            const runtime = now - startDate;
            const runtimeFormatted = dayjs().startOf('day').add(runtime, 'milliseconds').format('[Time:] HH:mm:ss');
            setRuntime(runtimeFormatted);
        }, 100);

        setRunning(true);
    }    

    const loadRunHistoryFromStorage = () => {
        let runHistoryCurrent = [];
        const runHistoryCurrentRaw = localStorage.getItem(STORAGE_KEY);
        if (runHistoryCurrentRaw) {
            runHistoryCurrent = JSON.parse(runHistoryCurrentRaw);
        }
        setRunHistory(runHistoryCurrent);
    };

    const handleStop = (e) =>{
        e.preventDefault(); 

        clearInterval(runningInterval.current);
        setRuntime('')
        setRunning(false);

        const now = new Date();
        const stats = now - runStart;

        // --- get current storage state ---
        let runHistoryCurrent = [];
        const runHistoryCurrentRaw = localStorage.getItem(STORAGE_KEY);
        if (runHistoryCurrentRaw) {
            runHistoryCurrent = JSON.parse(runHistoryCurrentRaw);
        }

        // --- add new run time ---
        runHistoryCurrent.push(stats);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(runHistoryCurrent));

        // -- refresh ---
        loadRunHistoryFromStorage();
    }
    
    const handleAdd = () =>  {
        const paceIncrement = pace + 5000; // + 5 sec.
        const formattedPace = dayjs(paceIncrement).format('mm:ss [min/km]'); // Invalid date when displayed by setPace()
        setPace(paceIncrement)
        
        console.log(formattedPace); // displayed just fine when logged in console
    }

    const handleSub = () =>  {
        const paceDecrement = pace - 5000; // - 5 sec.
        const formattedPace = dayjs(paceDecrement).format('mm:ss [min/km]'); // Invalid date when displayed by setPace()
        setPace(paceDecrement)

        console.log(formattedPace); // displayed just fine when logged in console
    }

    const formattedPace = dayjs(pace).format('mm:ss [min/km]');

    const runHistoryItems = runHistory.map((time, index) => {
        const formattedRun = dayjs().startOf('day').add(time, 'milliseconds').format(`[Run n.${index + 1}:] HH:mm:ss`);
        return <li>{formattedRun}</li>;
    });

    return(
        <div id="whole">
            <div id="pacestats">
            <button id="btnplus" disabled={ running } onClick={handleSub}>-</button>
                <label>
                    <input type="text" readOnly="readonly" value={formattedPace} disabled={ running } onChange={(e) => setPace(e.target.value)} />
                </label>
            <button id="btnminus" disabled={ running } onClick={handleAdd}>+</button>
            </div>

            <div id="runstats">
                {!running && <button id="btnstart" onClick={handleStart}>Start</button>}
                {running && <button id="btnstop" onClick={handleStop}>Stop</button>}
                    <p>
                        <strong>{ runtime }</strong>
                    </p>
            </div>

            <div id="stathistory">
                <p>
                    <strong>{ stats }</strong>
                </p>
            </div>

            <ul>{runHistoryItems}</ul>
        </div>
    )
}