
const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
module.exports={
	entry:{
		main:'./src/index.js'
	},
	module:{
		rules:[
		{ test: /\.js$/, 
			// 排除在node_modules外，只有在js下面
			exclude: /node_modules/, 
			loader: "babel-loader" ,
			// options:{
			// 	// presets: [["@babel/preset-env",{
			// 	// 	targets: {
			// 	// 		// 67以上版本运行已经支持es6，不需要在进行转换，减小打包大小
			//  //          "chrome": "67"
			//  //        },
			// 	// 	// 用到哪个es6添加哪个,实现按需添加。减少打包文件大小
			// 	// 	useBuiltIns:'usage'
			// 	// }]]
			// 	 "plugins": [["@babel/plugin-transform-runtime",{
			// 	 	// "absoluteRuntime": false,
			//         "corejs": 2,
			//         "helpers": true,
			//         "regenerator": true,
			//         "useESModules": false,
			//         // "version": "7.0.0-beta.0"
			// 	 }]]
			// }
		},
		{
			test:/\.(jpg|png|gif|woff|svg|eot|ttf)$/,
			use:{
				// loader:'file-loader',直接生成图片
				loader:'url-loader',//生成base64位的字符串打包在js文件中
				options:{
					// placeholder 占位符
					name:'[name]_[hash].[ext]',
					outputPath:'images/',//规定生成的路径
					limit:1024//超小于此大小打包在js中，超过打包在规定生成的路径中

				}
			}
		},{
			test:/\.(woff|svg|eot|ttf)$/,
			use:{
				// loader:'file-loader',直接生成图片
				loader:'file-loader',//生成base64位的字符串打包在js文件中
			}
		},]
	},
	plugins:[
		
		new HtmlWebpackPlugin({
			template:'src/index.html'
		}),
		new CleanWebpackPlugin(),
		
	 ],	
	 optimization: {
	 	usedExports:true,
	    splitChunks: {
	      // chunks: 'async',
	      chunks: 'all',
	      minSize: 20000,
	      // minRemainingSize: 0,
	      maxSize: 0,
	      minChunks: 1,//至少使用loadsh几次的时候代码分割
	      maxAsyncRequests: 6,//分割几个类库，超过几个就不分割了
	      maxInitialRequests: 4,//入口文件加载的时候，最多分割4个
	      automaticNameDelimiter: '~',//文件生成的时候连接符
	      // enforceSizeThreshold: 50000,
	      name:true,
	      cacheGroups: {//缓存组
	      	// priority:优先级那个大，先打包到哪里。-10>-20,会优先打包到vendors文件里面
	        vendors: {
	          test: /[\\/]node_modules[\\/]/,
	          priority: -10,
	          // filename:'vendors.js' //所有都打包在一起
	        },
	        default: {
	          // minChunks: 2,
	          priority: -20,
	          //引入a和b,会打包生成a和b,加入a里面引入了b,reuseExistingChunk开启：
	          // a含有的b会打包到复用的的b里面，否则a含有的b会打包的a里面
	          reuseExistingChunk: true,//
	          filename:'common.js'
	        }
	      }
	    }
	  },	

	 output:{
		// publicPath:'./',//可以把生成的js放在路径
		filename:'[name].js',

		chunkFilename:'[name].chunk.js',
		path:path.resolve(__dirname, '../dist')
	}
}