<template>
	<transition appear :name="transitionName" @before-leave="onAfter">
		<section
			:class="isIOS"
			@touchstart="onclick"
			class="dialog"
			ref="dialog"
		>
			<slot></slot>
		</section>
	</transition>
</template>
<script>
	export default {
		props: {
			isFixed: Boolean,
			isShow: Boolean,
			transitionName: {
				type: String,
				default: "dialog-fade"
			},
			isDisableSetTop: Boolean
		},
		watch: {
			isShow(value) {}
		},
		computed: {
			isIOS() {
				if (!this.isFixed && FN.isIOS) {
					return "ios-fix";
				} else {
					return "";
				}
			}
		},
		methods: {
			onclick(e) {
				if (e.target === e.currentTarget) {
					e.preventDefault();
					this.$emit("click");
				}
			},
			scrollTop() {
				return Math.max(
					window.pageYOffset,
					document.documentElement.scrollTop,
					document.body.scrollTop
				);
			},
			onAfter() {
				if (!this.$store) {
					return;
				}
				this.$store.commit("TOGGLE_PAGE_LOCKED", false);
			},
			setTop() {
				if (this.isDisableSetTop) {
					return;
				}
				if (this.isIOS) {
					this.$refs.dialog.style.top = this.scrollTop() + "px";
				}
			}
		},
		created() {
			if (!this.$store) {
				return;
			}

			this.$store.commit("TOGGLE_PAGE_LOCKED", true);
		},
		mounted() {
			if (this.isDisableSetTop) {
				return;
			}
			this.setTop();
			window.lockPage();
		},
		beforeDestroy() {
			if (this.isDisableSetTop) {
				return;
			}
			window.unlockPage();
		},
		destroyed() {}
	};
</script>
<style lang="less">
	.dialog {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		z-index: 600;
	}
	.ios-fix {
		position: absolute !important;
	}
</style>
