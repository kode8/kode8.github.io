import React from 'react';

import './container.scss';

const Container = props => (
  <div className={props.menuExpanded ? 'container container--open' : 'container'}>
    { props.children }
  </div>
);

export default Container;
