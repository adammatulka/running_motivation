import React, {useState} from 'react';
import moment from 'moment';

export const Main = () => {

    const [pace, setPace] = useState('00:00 min/km');
    const [runtime, setRuntime] = useState("Time: 00:12:34");

    return(
        <div>
            <button>-</button>
                <label>
                    <input type="text" value={ pace } onChange={(e) => setPace(e.target.value)} />
                </label>
            <button>+</button>

            <button>Start</button>
            <p>
                <strong>{runtime}</strong>
            </p>
        </div>
    )
}