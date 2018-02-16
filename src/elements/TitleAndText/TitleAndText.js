import React from 'react';

import './titleandtext.scss';

const TitleAndText = (props) => {
    const titleSize = `tt__title tt__title-${props.titleSize}`;
    const textSize = `tt__text tt__text-${props.textSize}`;
    return (
        <div className="tt">
           <h2 className={titleSize}>{props.title}</h2>
           <div className={textSize}>{props.children}</div>
        </div>
    );
}

export default TitleAndText;