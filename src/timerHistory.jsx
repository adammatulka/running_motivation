import React, { useRef, useState } from 'react';   
import dayjs from 'dayjs';

export const History = () => {
    const [pace, setPace] = useState(0);
    const [runtime, setRuntime] = useState(''); 

    const [changebtn, setChangebtn] = useState('Start');

    const bminus = document.getElementById('bminus');
    const bplus = document.getElementById('bplus');
    const paceinput = document.getElementById('paceinput');

    const handleStart = (e) =>{ 
        e.preventDefault();

        console.log('start')

        const startDate = new Date();
        setInterval(function(){
            const now = new Date();
            const runtime = now - startDate;
            
            const runtimeFormatted = dayjs().startOf('day').add(runtime, 'milliseconds').format('[Time:] HH:mm:ss')
            console.log('runtime', runtime)
            console.log('runtimeFormatted', runtimeFormatted)

            // setRuntime(runtimeFormatted);
        }, 100);

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

            <div id="stathistory">
                <ul>

                </ul>
            </div>

        </div>
    )
}
