const path = require('path');

module.exports = {
	entry: './src/index.ts',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.svg/,
				type: 'asset/inline',
			},
			{
				test: /\.png$/,
				type: 'asset/inline',
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.svg', '.png'],
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'out/src'),
		publicPath: '/',
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'out/src'),
		},
		port: 8080,
		historyApiFallback: true,
		compress: true,
		hot: false,
		liveReload: false,
	},
	cache: false,
};
