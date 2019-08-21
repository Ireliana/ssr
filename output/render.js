const { createBundleRenderer } = require("vue-server-renderer");
const fs = require("fs");
const path = require("path");

const template = fs.readFileSync(
	path.join(__dirname, "./template.html"),
	"utf-8"
);

createBundleRenderer(require("../dist/server/error/vue-ssr-server-bundle"), {
	template,
    runInNewContext: false,
    inject: false,
	clientManifest: require("../dist/server/error/vue-ssr-client-manifest.json")
}).renderToString((err, html) => {
	fs.writeFileSync("../dist/error.html", html, "utf-8");
});

// createBundleRenderer(require("../dist/server/tech/vue-ssr-server-bundle"), {
//     template,
//     inject: false,
// 	runInNewContext: false,
// 	clientManifest: require("../dist/server/tech/vue-ssr-client-manifest.json")
// }).renderToString((err, html) => {
// 	fs.writeFileSync("../dist/tech.html", html, "utf-8");
// });
