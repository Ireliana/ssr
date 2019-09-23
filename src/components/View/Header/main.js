import $ from "jquery";
$(function() {
	console.log("jquery work");
	$(".btn-atv.btn-dl").click(function() {
		console.log("btn click");
		return false;
	});
});
