import React, {useRef, useState} from 'react';
//import moment from 'moment';   

export const Main = () => {

    const [pace, setPace] = useState();
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [runtime, setRuntime] = useState(3555);
    const countRef = useRef(null) 
     
    const handleStart = (e) => {
        e.preventDefault(); 
        setIsRunning(true)
        setIsPaused(false)
        countRef.current = setInterval(() => {
            setRuntime((runtime) => runtime + 1)
        }, 1000)
    }    

    const handleStop = (e) => {
        e.preventDefault(); 
        clearInterval(countRef.current)
        setIsPaused(true)
    }
 /*   const handleStart = (e) =>{
        e.preventDefault(); 
        setRuntime(moment().format("h:mm:ss:SS"));
        setInterval(function(){ setRuntime(moment().format("h:mm:ss:SS")); },100);
    }    

    const handleStop = (e) =>{
        e.preventDefault(); 
        setRuntime();
    }
*/
    const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 420)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }


    const handleAdd = () =>  {

    }

    const handleSub = () =>  {
        
    }

    return(
        <div>
            <button onClick={handleSub}>-</button>
                <label>
                    <input type="text" value={ pace } onChange={(e) => setPace(e.target.value)} />
                </label>
            <button onClick={handleAdd}>+</button>

            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <p>
                <strong>{runtime}</strong>
            </p>
        </div>
    )
}