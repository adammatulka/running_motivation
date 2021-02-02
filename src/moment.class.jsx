import React, {useRef, useState} from 'react';
//import moment from 'moment';   
import dayjs from 'dayjs';

export const Main = () => {

    var zero = dayjs().startOf('day').format('[Time:] HH:mm:ss');
    var isRunning;

    const [pace, setPace] = useState(0);
    const [runtime, setRuntime] = useState(''); 
    
     const handleStart = (e) =>{
        e.preventDefault(); 
        
       // setRuntime(zero)
      //  isRunning = setInterval()
        
        isRunning = setInterval(function(){ setRuntime(dayjs().startOf('day').format('[Time:] HH:mm:ss')); },1000);
    }    

    const handleStop = (e) =>{
        e.preventDefault(); 
        clearInterval(isRunning);
    }

    const handleReset = (e) => {
        e.preventDefault(); 
        clearInterval(setRuntime());
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
            <button onClick={handleSub}>-</button>
                <label>
                    <input type="text" value={ pace } onChange={(e) => setPace(e.target.value)} />
                </label>
            <button onClick={handleAdd}>+</button>
            </div>

            <div id="runstats">
                <button onClick={handleStart}>Start</button>
                <button onClick={handleStop}>Stop</button>
                <button onClick={handleReset}>Reset</button>
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