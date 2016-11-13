import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = function(useExtractText) {
	if (!!useExtractText) {
		return {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style', 'css')
		};
	} else {
		return {
			test: /\.css$/,
			loader: 'style!css'
		};
	}
}