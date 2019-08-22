// (function() {
// 	//加search
// 	var search = location.search;
// 	var nowTime = new Date().getTime();
// 	if (!search) {
// 		location.replace(
// 			location.origin +
// 				location.pathname +
// 				"?v=" +
// 				nowTime +
// 				location.hash || ""
// 		);
// 		return;
// 	}
// 	if (!/v=\d+/.test(search)) {
// 		location.replace(
// 			location.origin +
// 				location.pathname +
// 				search +
// 				"&v=" +
// 				nowTime +
// 				location.hash || ""
// 		);
// 		return;
// 	}
// 	var time = parseInt(search.match(/v=(\d+)/)[1]);
// 	if (nowTime - time > 50000) {
// 		search = search.replace(/v=(\d+)/, "v=" + nowTime);
// 		location.replace(
// 			location.origin + location.pathname + search + location.hash || ""
// 		);
// 	}
// })();

(function() {
	if (/cache=clear/.test(location.search)) {
		localStorage.clear();
	}
})();

(function() {
	window.ENV = "";
	if (location.port) ENV = "local";
	window.domain = "";
})();

(function() {
	function setFontSize(k) {
		document.documentElement.style.fontSize =
			(((k / 750) * 100) / 16) * 100 + "%";
	}

	function initRem() {
		var W = document.documentElement.clientWidth;
		var H = document.documentElement.clientHeight;
		if (W < H) {
			setFontSize(W);
		} else {
			setFontSize(H);
		}
	}
	initRem();
	var time = null;
	window.addEventListener(
		"onorientationchange" in window ? "orientationchange" : "resize",
		function() {
			if (Math.abs(window.orientation) !== 90) {
				clearTimeout(time);
				time = setTimeout(function() {
					clearTimeout(time);
					initRem();
				}, 200);
			}
		},
		false
	);
})();
