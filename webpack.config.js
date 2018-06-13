const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
	template: 'src/index.html',
	filename: 'index.html'
});

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css|.scss|.sass/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			}
		]
	},
	plugins: [htmlPlugin],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		historyApiFallback: true,
		inline: true
	}
};
