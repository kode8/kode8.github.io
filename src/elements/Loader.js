import React from 'react';

import './loader.scss';

const Loader = () => (
  <div className="loader">
    <div className="loader__cube1" />
    <div className="loader__cube2" />
    <span className="loader__fallback">Loading</span>
  </div>
);

export default Loader;
