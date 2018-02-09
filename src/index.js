import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

require('./scss/app.scss');

const App = require('./containers/App');

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);
