
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
	// mode默认production会压缩  development不会压缩,development默认没有Tree Shaking
	mode:'development',
	// development建议使用cheap-module-eval-source-map，production使用cheap-module-source-map
	devtool:'cheap-module-eval-source-map',
	// enter 入口省略了main
	// entry: './src/index.js',
	module:{
		rules:[
			{
				test:/\.scss$/,
				use:[
				'style-loader',
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
				use:['style-loader','css-loader','postcss-loader']
			}
		]
	},
	devServer:{
		contentBase:'/dist',//
		open:true, //自动打开浏览器
		// proxy:{//代理
		// 	'api':'http://'
		// },
		hot:true,//开启热更新只替换样式不刷新页面
		// hotOnly:true,//即使hot不生效也不更新页面
		// port: 9000 //端口?号
	},
	// module里面配置图片首先安装file-loader
	
	plugins:[
		new webpack.HotModuleReplacementPlugin()
		
	 ],
	 // production下不必写，自动会写好
	 // optimization:{
	 // 	usedExports:true
	 // },
}

module.exports=merge(commonConfig,devConfig);