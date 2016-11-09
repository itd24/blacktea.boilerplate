module.exports = {
	test: /\.js$/,
	exclude: /(node_modules|web_modules)/,
	loader: 'babel',
	query: {
		presets: ['es2015'],
		plugins: ['transform-runtime']
	}
}