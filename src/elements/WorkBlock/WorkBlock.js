import React from 'react';
import { Link } from 'react-router-dom';

import './workblock.scss';

const WorkBlock = (props) => {
    return (
        <div className="work-block">
           <h2 className="work-block__title">{props.title}</h2>
           <h3 className="work-block__url underline"><a href={props.url}>{props.url}</a></h3>
           <span className="work-block__date">{props.date}</span>
           <div className="work-block__brief">{props.children}</div>
        </div>
    );
}

export default WorkBlock;