
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const prodConfig = {
	// mode默认production会压缩  development不会压缩,development默认没有Tree Shaking
	mode:'production',
	// development建议使用cheap-module-eval-source-map，production使用cheap-module-source-map
	devtool:'cheap-module-source-map',
	module:{
		rules:[
		{
			test:/\.scss$/,
			use:[
			MiniCssExtractPlugin.loader,
			// 'css-loader',
			// css配置项
			{
				loader:'css-loader',
				options:{
					//在css里面引入别的css不会走下面的loader只会走style-loader，2代表可以走两次improt嵌套
					importLoaders:2,
					// 使用局部样式，避免全局使用
					// modules:true
				}
			},
			'sass-loader',
			'postcss-loader'
			]
		},{
			test:/\.css$/,
			use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
		}
		]
	},
	optimization:{
		minimizer:[new OptimizeCSSAssetsPlugin({})]
	},
	plugins:[new MiniCssExtractPlugin({
		filename:'[name].css',
		chunkFilename:'[name].chunk.js'
		})
	]
	// enter 入口省略了main
	// entry: './src/index.js',
	// module里面配置图片首先安装file-loader
}
module.exports = merge(commonConfig,prodConfig);