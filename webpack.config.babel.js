import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import ReplacePlugin from 'replace-bundle-webpack-plugin';
import path from 'path';

const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV!=='production';

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: './index.js',

	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: '/',
		filename: 'bundle.js'
	},

	resolve: {
		extensions: ['', '.jsx', '.js', '.json', '.less'],
		modulesDirectories: [
			path.resolve(__dirname, "src/lib"),
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, "src/components"),    // used for tests
			style: path.resolve(__dirname, "src/style")
		}
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				// exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					babelrc: false,
					presets: [
						['es2015', { loose:true }],
						'stage-0'
					],
					plugins: [
						'transform-react-remove-prop-types',
						['transform-react-jsx', { 'pragma': 'h' }]
					]
				}
			},
			{
				// Transform our own .(less|css) files with PostCSS and CSS-modules
				test: /\.(less|css)$/,
				include: [path.resolve(__dirname, 'src/components')],
				loader: ExtractTextPlugin.extract('style-loader', [
					`css-loader?modules&importLoaders=1&sourceMap=${CSS_MAPS}`,
					'postcss-loader',
					`less-loader?sourceMap=${CSS_MAPS}`
				].join('!'))
			},
			{
				test: /\.(less|css)$/,
				exclude: [path.resolve(__dirname, 'src/components')],
				loader: ExtractTextPlugin.extract('style-loader', [
					`css-loader?sourceMap=${CSS_MAPS}`,
					`postcss-loader`,
					`less-loader?sourceMap=${CSS_MAPS}`
				].join('!'))
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(xml|html|txt|md)$/,
				loader: 'raw-loader'
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				loader: ENV==='production' ? 'file-loader' : 'url-loader'
			}
		]
	},

	postcss: () => [
		autoprefixer({ browsers: 'last 2 versions' })
	],

	plugins: ([
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('style.css', {
			allChunks: true,
			disable: ENV!=='production'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: { collapseWhitespace: true }
		})
	]).concat( ENV==='production' ? [
		new ReplacePlugin([
			{
				partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
				replacement: (s) => 'throw 0;'+s
			},
			{
				partten: /\binvariant\s\(/g,
				replacement: () => '('
			}
		]),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				unsafe: true,
				collapse_vars: true,
				pure_getters: true,
				pure_funcs: [
					'classCallCheck',
					'_possibleConstructorReturn',
					'_classCallCheck',
					'Object.freeze',
					'invariant',
					'warning'
				]
			}
		})
	] : []),

	stats: { colors: true },

	node: {
		global: true,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	},

	devtool: ENV==='production' ? 'source-map' : 'inline-source-map',

	devServer: {
		port: process.env.PORT || 8080,
		host: 'localhost',
		colors: true,
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: true
	}
};
