var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract('style', 'css!sass')
}