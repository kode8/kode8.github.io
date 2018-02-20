import React from 'react';

import './historyblock.scss';

const HistoryBlock = (props) => {
    return (
        <div className="history-block">
           <h2 className="history-block__title">{props.title}</h2>
           <h3 className="history-block__jobtitle">{props.jobtitle}</h3>
           <span className="history-block__date">{props.date}</span>
           <div className="history-block__brief">{props.children}</div>
        </div>
    );
}

export default HistoryBlock;