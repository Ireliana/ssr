<template>
	<div id="app">
		<Home />
		<k-toast />
		<k-mask v-if="state.isShowMask" />
	</div>
</template>
<script>
	import Home from "src/views/Index";
	import KToast from "src/components/Base/Toast";
	import KMask from "src/components/Base/Mask";

	export default {
		data() {
			return {};
		},
		computed: {
			state() {
				return this.$store.state;
			}
		},
		mounted() {},
		methods: {},
		components: {
			Home,
			KToast,
			KMask
		}
	};
</script>
<style lang="less">
	@import url("~src/css/common.less");
	#app {
	}
</style>
