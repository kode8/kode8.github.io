import React from 'react';

import './loader.scss';

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader__cube1"></div>
            <div className="loader__cube2"></div>
            <span className="loader__fallback">Loading</span>
        </div>
    );
}

export default Loader;