const path = require('path');

const getPaths = webroot => ({
    root: path.resolve(webroot),
    src: path.resolve(webroot, './src'),
    dist: path.resolve(webroot, './dist'),
    api: path.resolve(webroot, './src/api'),
    components: path.resolve(webroot, './src/components'),
    containers: path.resolve(webroot, './src/containers'),
    elements: path.resolve(webroot, './src/elements'),
    images: path.resolve(webroot, './src/images'),
    utils: path.resolve(webroot, './src/utils'),
    helpers: path.resolve(webroot, './src/helpers'),
    scss: path.resolve(webroot, './src/scss'),
});

const webroot = path.resolve(__dirname, '../');
const paths = getPaths(webroot);

module.exports = paths;
 