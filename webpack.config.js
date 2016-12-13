'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
	module:	{
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
		]
	},
	context: path.resolve(process.cwd(), 'example'),
	output: {
		filename: 'test.bundle.js'
	},
	devServer: {
		publicPath: '/',
		outputPath: '/',
		watchOptions: undefined,
		watchDelay: undefined,
		contentBase: path.resolve(process.cwd(), 'example'),
		stats: {
			cached: false,
			cachedAssets: false,
			colors: true
		}
	}
};
