import React from 'react';
import ReactDOM from 'react-dom';

import { Timer } from './timer'
import { History } from './timerHistory';

ReactDOM.render(<div>
    <Timer />
    <History />
</div>,document.getElementById('root'));
