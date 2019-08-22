const fs = require("fs");
const path = require("path");

const pageDirs = fs.readdirSync(path.join(__dirname, "../src/pages"));
const pages = {};

module.exports = function(entryJs) {
	pageDirs.forEach(page => {
		pages[page] = `./src/pages/${page}/${entryJs}`;
	});
	return pages;
};
