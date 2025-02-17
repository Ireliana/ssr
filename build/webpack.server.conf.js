process.env.NODE_ENV = "production";
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const baseConfig = require("./webpack.base.conf.js");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const utils = require("./utils");
const path = require("path");
const env = require("../config/prod.env");
const fs = require("fs");
const entrys = fs.readdirSync(path.join(__dirname, "../src/pages"));

module.exports = [
	...entrys.map(page => {
		return merge(baseConfig, {
			// 将 entry 指向应用程序的 server entry 文件
			entry: { [page]: `./src/pages/${page}/server.js` },
			// 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
			// 并且还会在编译 Vue 组件时，
			// 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
			target: "node",

			// 对 bundle renderer 提供 source map 支持
			// devtool: "none",

			// 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
			output: {
				libraryTarget: "commonjs2"
			},

			// https://webpack.js.org/configuration/externals/#function
			// https://github.com/liady/webpack-node-externals
			// 外置化应用程序依赖模块。可以使服务器构建速度更快，
			// 并生成较小的 bundle 文件。
			externals: nodeExternals({
				// 不要外置化 webpack 需要处理的依赖模块。
				// 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
				// 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
				whitelist: /\.(css|less)$/
			}),

			plugins: [
				new webpack.DefinePlugin({
					"process.env": env
				}),
				// 这是将服务器的整个输出
				// 构建为单个 JSON 文件的插件。
				// 默认文件名为 `vue-ssr-server-bundle.json`
				new VueSSRServerPlugin({
					filename: `../ssr/server/${page}/vue-ssr-server-bundle.json`
				}),
				new ExtractTextPlugin({
					filename: utils.assetsPath("css/[name].[contenthash].css"),
					// Setting the following option to `false` will not extract CSS from codesplit chunks.
					// Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
					// It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
					// increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
					allChunks: true
				})
			]
		});
	})
];
