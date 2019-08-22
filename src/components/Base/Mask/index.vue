<template>
	<transition name="mask-fade" appear>
		<section
			ref="mask"
			id="mask"
			:class="{ 'can-touch': canTouch }"
			@touchstart="click"
		></section>
	</transition>
</template>
<script>
	export default {
		props: {
			isShow: Boolean,
			canTouch: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return { isP: false };
		},
		methods: {
			click(e) {
				e.stopPropagation();
				e.preventDefault();
				this.$emit("click");
			}
		},
		watch: {
			isShow() {
				if (!this.$refs.mask) {
					return;
				}
				const M = this.$refs.mask;
				M.style.height = window.innerHeight + "px";
			}
		},
		mounted() {
			this.resize = () => {
				if (!this.$refs.mask) {
					return;
				}
				if (!window.isLock) {
					return;
				}
				const M = this.$refs.mask;
				this.time = setTimeout(() => {
					M.style.height = window.innerHeight + "px";
					clearTimeout(this.time);
				}, 200);
			};
			if (FN.isLowIOS) {
				window.addEventListener(
					"onorientationchange" in window
						? "orientationchange"
						: "resize",
					this.resize,
					false
				);
			}
		},
		beforeDestroy() {
			if (FN.isLowIOS) {
				clearTimeout(this.time);
				window.removeEventListener(
					"onorientationchange" in window
						? "orientationchange"
						: "resize",
					this.resize
				);
			}
		}
	};
</script>
<style lang="less">
	#mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		z-index: 500;

		&.can-touch {
			pointer-events: none;
		}
	}
</style>

