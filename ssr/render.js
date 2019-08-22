const { createBundleRenderer } = require("vue-server-renderer");
const fs = require("fs");
const path = require("path");

const template = fs.readFileSync(
	path.join(__dirname, "./template.html"),
	"utf-8"
);

const pages = fs.readdirSync(path.join(__dirname, "../src/pages"));

pages.forEach(page => {
	createBundleRenderer(require(`./server/${page}/vue-ssr-server-bundle`), {
		template,
		runInNewContext: false,
		inject: false,
		clientManifest: require(`./server/${page}/vue-ssr-client-manifest.json`)
	}).renderToString((err, html) => {
		if (err) {
			throw err;
		}
		html = html.replace(/[\s]+?data-server-rendered="true"/, "");
		fs.writeFile(
			path.join(__dirname, `../dist/${page}.html`),
			html,
			function(err) {
				if (err) {
					throw err;
				}
			}
		);
	});
});
