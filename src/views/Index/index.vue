<template>
	<div>
		<Header />
		<scroll-view id="Home" :is-lock="isLockPage"></scroll-view>
	</div>
</template>

<script>
	import ScrollView from "src/components/Base/Scrollview";
	import Header from "src/components/View/Header";

	export default {
		computed: {
			state() {
				return this.$store.state;
			},
			isLockPage() {
				return this.state.isLockPage;
			}
		},
		mounted() {},
		methods: {},
		components: {
			ScrollView,
			Header
		}
	};
</script>
<style lang="less">
	#Home {
		background: #f5f6f9;
	}
</style>
