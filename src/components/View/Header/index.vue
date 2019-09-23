<template>
	<header id="header" class="k-flex k-flex-justify">
		<div class="k-flex">
			<img
				class="icon-logo"
				:src="require('src/assets/header/icon-logo.png')"
			/>
			<div class="game-info">
				<h2>xxxx</h2>
				<p>次元集结回合手游</p>
			</div>
		</div>
		<a href="javascript:;" class="btn-atv btn-dl" />
	</header>
</template>
<script src="./main.js"></script>
<script>
	export default {};
</script>

<style lang="less">
	#header {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.25rem;
		height: 1.2rem;
		background: rgba(25, 116, 207, 0.8);
		.icon-logo {
			display: block;
			width: 1.02rem;
			height: 1.02rem;
		}
		.game-info {
			margin-left: 0.14rem;
		}
		h2 {
			font-size: 0.26rem;
			color: #fff;
			font-weight: bold;
		}
		p {
			margin-top: 0.14rem;
			font-size: 0.18rem;
			color: #fffefe;
		}
		.btn-dl {
			width: 2.13rem;
			height: 0.64rem;
			background: url("~src/assets/header/btn-dl.png") no-repeat center/100%
				100%;
		}
	}
</style>