const FS = require("fs");
const PATH = require("path");
const mainfest = {};

read(PATH.join(__dirname, "../src/assets"), "../../assets");

FS.writeFile(
	PATH.join(__dirname, "../src/js/common/dirlist.js"),
	createdJsSource(mainfest),
	{
		encoding: "utf-8"
	},
	() => {}
);

const LOADING_PATH = PATH.join(__dirname, "../static/js/loading.js");
FS.readFile(
	LOADING_PATH,
	{
		flag: "r+",
		encoding: "utf8"
	},
	(err, data) => {
		if (err) {
			console.log(err);
			return;
		}
		FS.writeFile(
			LOADING_PATH,
			data.replace(
				/(var mainfest ?= ?)[^;]*;/,
				"$1" +
					JSON.stringify(
						Object.assign(
							...Object.keys(mainfest).map(name => ({
								[name]: mainfest[name].length
							}))
						)
					) +
					";"
			),
			{
				encoding: "utf-8"
			},
			() => {}
		);
	}
);

function read(path, root, layer) {
	let list = FS.readdirSync(path);
	list.forEach((item, i) => {
		let result = `${root}/${item}`;
		let realPath = PATH.join(path, item);
		let stats = FS.statSync(realPath);
		if (stats.isDirectory()) {
			return read(realPath, result, layer || item);
		}
		if (/\.(png|jpg|jpeg|svg)$/.test(result)) {
			// FS.writeFile(
			// 	PATH.join(__dirname,'dirlist.txt'),
			// 	`createImageItem(require("${result}")),\n`
			// );
			if (stats.size > 5000) {
				const name = layer || "root";
				if (!mainfest[name]) mainfest[name] = [];
				mainfest[name].push(`require("${result}")`);
			}
		}
	});
}

function createdJsSource(m) {
	return `export default {
		${Object.keys(m)
			.map(n => `${n}:[${m[n]}]`)
			.join(",")}
	}`;
}
