import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = function(useExtractText) {
	if (useExtractText) {
		return {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style', 'css!sass')
		};
	} else {
		return {
			test: /\.scss$/,
			loader: 'style!css!sass'
		};
	}
}