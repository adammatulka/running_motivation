import React, { useRef, useState } from 'react';   
import dayjs from 'dayjs';

export const History = () => {
    const [pace, setPace] = useState(0);
    const [runtime, setRuntime] = useState(''); 

    return(
        <div>

            <div id="stathistory">
                <ul>

                </ul>
            </div>

        </div>
    )
}
