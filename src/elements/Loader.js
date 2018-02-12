import React from 'react';

import './loader.scss';

const Loader = () => {
    return (
        <div class="loader">
            <div class="loader__cube1"></div>
            <div class="loader__cube2"></div>
            <span class="loader__fallback">Loading</span>
        </div>
    );
}

export default Loader;