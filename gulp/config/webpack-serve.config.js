/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const configDev = require('./webpack-dev.config');

const babelrcString = fs.readFileSync(path.resolve(__dirname, '../../.babelrc'));
const babelrc = JSON.parse(babelrcString.toString());

// Update
configDev.bail = false;
configDev.module.preLoaders = [];
configDev.module.loaders[0].query = babelrc;
configDev.module.loaders[0].query.presets.push('react-hmre');
configDev.module.loaders[0].query.babelrc = false;
configDev.entry.app.push('webpack-dev-server/client?http://localhost:8080');
configDev.entry.app.push('webpack/hot/only-dev-server');
configDev.plugins.push(new webpack.NoErrorsPlugin());
configDev.plugins.push(new webpack.HotModuleReplacementPlugin());

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */

module.exports = configDev;

