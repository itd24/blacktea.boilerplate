import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
	test: /\.css$/,
	loader: ExtractTextPlugin.extract('style', 'css')
}