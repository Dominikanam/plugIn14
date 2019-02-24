var path = require('path');

module.exports = {
	mode: 'development',
	entry: './js/index.js',
	output: {
		path: path.resolve(__dirname, 'js'),
		filename: 'scripts.bundle.js'
	},
	module: {
		rules: [
			{ test: /\.mustache$/, use: 'raw-loader' }
		]
	}
};