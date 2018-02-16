import React from 'react';

import './signature.scss';

const Signature = (props) => {
    return (
        <span className="signature">
           {props.children}
        </span>
    );
}

export default Signature;