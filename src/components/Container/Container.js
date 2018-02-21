import React from 'react'

import './container.scss';

const Container = (props) => {
    return (
        <div className={props.menuExpanded ? 'container container--open': 'container' }>
            { props.children }
        </div>
    );
}

export default Container;