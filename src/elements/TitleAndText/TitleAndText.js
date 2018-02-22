import React from 'react';

import './titleandtext.scss';

const TitleAndText = (props) => {

    let titleClass = 'tt__title',
        textClass = 'tt__text';

    if(props.titleSize) {
        titleClass = `${titleClass} ${titleClass}--${props.titleSize}`;
    }

    if(props.textSize) {
        textClass = `${textClass} ${textClass}--${props.textSize}`;
    }
    
    return (
        <div className="tt">
           <h2 className={titleClass}>{props.title}</h2>
           <div className={textClass}>{props.children}</div>
        </div>
    );
}

export default TitleAndText;