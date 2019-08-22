process.env.NODE_ENV = "production";
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf.js");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const utils = require("./utils");
const path = require("path");
const env = require("../config/prod.env");
const config = require("../config");
const fs = require("fs");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const entrys = fs.readdirSync(path.join(__dirname, "../src/pages"));

module.exports = [
	...entrys.map(page => {
		return merge(baseConfig, {
			entry: { [page]: `./src/pages/${page}/index.js` },
			output: {
				path: config.build.assetsRoot,
				filename: utils.assetsPath("js/[name].[chunkhash].js"),
				chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
			},
			plugins: [
				new webpack.DefinePlugin({
					"process.env": env
				}),
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							warnings: false
						},
						output: {
							comments: false
						}
					},
					sourceMap: false,
					parallel: true
				}),
				new webpack.optimize.CommonsChunkPlugin({
					name: "vendor",
					minChunks(module) {
						// any required modules inside node_modules are extracted to vendor
						return (
							module.resource &&
							/\.js$/.test(module.resource) &&
							module.resource.indexOf(
								path.join(__dirname, "../node_modules")
							) === 0
						);
					}
				}),
				// 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
				// 以便可以在之后正确注入异步 chunk。
				// 这也为你的 应用程序/vendor 代码提供了更好的缓存。
				new webpack.optimize.CommonsChunkPlugin({
					name: "manifest",
					minChunks: Infinity
				}),
				new CopyWebpackPlugin([
					{
						from: path.resolve(__dirname, "../static"),
						to: "static",
						ignore: [".*"]
					}
				]),
				new ExtractTextPlugin({
					filename: utils.assetsPath(
						"css/[name].[contenthash:7].css"
					),
					// Setting the following option to `false` will not extract CSS from codesplit chunks.
					// Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
					// It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
					// increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
					allChunks: true
				}),
				// 此插件在输出目录中
				// 生成 `vue-ssr-client-manifest.json`。
				new VueSSRClientPlugin({
					filename: `../ssr/server/${page}/vue-ssr-client-manifest.json`
				})
			]
		});
	})
];
