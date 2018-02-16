import React from 'react';

const Title = (props) => {
    return (
        <h1 className="titleandtext_title">
           {props.children}
        </h1>
    );
}

export default Title;