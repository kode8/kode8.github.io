const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const paths = require('./config/paths');

/* Post CSS plugins */
const autoprefixer = require('autoprefixer');
const postcssflexbugsfixes = require('postcss-flexbugs-fixes');
const postcsspxtorem = require('postcss-pxtorem');
const postcssinlinesvg = require('postcss-inline-svg');
const postcssobjectfitimages = require('postcss-object-fit-images');
const postcssfiltergradient = require('postcss-filter-gradient');
const postcssopacity = require('postcss-opacity');

const config = {
    entry: `${paths.src}/index.js`,
    output: {
        path: paths.dist,
        filename: 'index_bundle.js'
    },
    resolve: {
        alias: {
            Api: paths.api,
            Components: paths.components,
            Containers: paths.containers,
            Elements: paths.elements,
            Images: paths.images,
            Utils: paths.utils,
            Helpers: paths.helpers
        },
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader', // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            autoprefixer({
                                browserlist: ['last 3 versions', 'ie 10'],
                            }),
                            postcssflexbugsfixes(),
                            postcsspxtorem(),
                            postcssinlinesvg({
                                removeFill: true,
                                path: path.resolve(paths.images),
                            }),
                            postcssobjectfitimages(),
                            postcssfiltergradient(),
                            postcssopacity(),
                        ],
                    },
                }, {
                    loader: 'sass-loader', // compiles Sass to CSS
                    options: {
                        includePaths: [paths.scss]
                    }
                }],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [new HtmlWebpackPlugin({
        template: `${paths.src}/index.html`,
    })],
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify.apply('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin(),
    );
} else {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify.apply('development'),
            },
        }),
    );
}

module.exports = config;
