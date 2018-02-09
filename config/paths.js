const path = require('path');

const getPaths = webroot => ({
    root: path.resolve(webroot),
    src: path.resolve(webroot, './src'),
    build: path.resolve(webroot, './build'),
    dist: path.resolve(webroot, './dist'),
    api: path.resolve(webroot, './api'),
    components: path.resolve(webroot, './components'),
    containers: path.resolve(webroot, './containers'),
    images: path.resolve(webroot, './images'),
    utils: path.resolve(webroot, './utils'),
});

const webroot = path.resolve(__dirname, '../');
const paths = getPaths(webroot);

module.exports = paths;
