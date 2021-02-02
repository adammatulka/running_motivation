import React, {useRef, useState} from 'react';   
import dayjs from 'dayjs';

export const Main = () => {

    var isRunning;

    const [pace, setPace] = useState(0);
    const [runtime, setRuntime] = useState(''); 

    const bminus = document.getElementById('bminus');
    const bplus = document.getElementById('bplus');
    const paceinput = document.getElementById('paceinput');

    const handleStart = (e) =>{ 
        e.preventDefault();

        isRunning = setInterval(function(){ setRuntime(dayjs().startOf('day').format('[Time:] HH:mm:ss')); },100);

        bminus.disabled = true;
        bplus.disabled = true;
        paceinput.disabled = true;
    }    

    const handleStop = (e) =>{
        e.preventDefault(); 

        clearInterval(isRunning);
        setRuntime('')

        bminus.disabled = false;
        bplus.disabled = false;
        paceinput.disabled = false;
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
            <button id="bminus" onClick={handleSub}>-</button>
                <label>
                    <input type="text" value={ pace } id="paceinput" onChange={(e) => setPace(e.target.value)} />
                </label>
            <button id="bplus" onClick={handleAdd}>+</button>
            </div>

            <div id="runstats">
                <button onClick={handleStart}>Start</button>
                <button onClick={handleStop}>Stop</button>
                    <p>
                        <strong>{ runtime }</strong>
                    </p>
            </div>

            <div id="stathistory">
                <ul>

                </ul>
            </div>

        </div>
    )
}