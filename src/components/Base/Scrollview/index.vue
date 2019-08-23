<template>
	<div
		:class="classes"
		@scroll="onScroll"
		@touchcancel="onTouchEnd"
		@touchend="onTouchEnd"
		@touchstart="onTouchStart"
		class="k-scrollable"
		ref="root"
	>
		<div class="k-scrollable-ct">
			<div :style="loadingHeight" v-if="padding"></div>
			<p style="color:#fff"></p>
			<slot></slot>
			<div :style="loadingHeight" v-if="padding"></div>
		</div>
	</div>
</template>
<script>
	import scroll2Target from "src/js/common/scroll2Target.js";
	export default {
		props: {
			isLock: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			isLock(bool) {
				if (bool) {
					this.lock();
				} else {
					this.unlock();
				}
			}
		},

		data() {
			return {
				scrollTop: 1,
				top: 0,
				padding: this.isAndroid ? 0 : 1
			};
		},
		computed: {
			loadingHeight() {
				return {
					height: this.padding + "px"
				};
			},
			classes() {
				return {
					"k-os-android": this.isAndroid
				};
			},
			isAndroid() {
				return typeof window != "undefined"
					? /android/i.test(userAgent)
					: false;
			}
		},
		methods: {
			/**@param {TouchEvent} e */
			onTouchStart(e) {
				this.isTouch = true;
				this.top = this.root.scrollTop;
				this.scrollTop = "begin";
			},
			onTouchEnd() {
				this.isTouch = false;
				clearTimeout(this.timeer);
				this.timeer = setTimeout(() => {
					clearTimeout(this.timeer);
					this.onScrollEnd();
				}, 16);
			},
			onScroll() {
				if (this.isTouch) {
					return;
				}
				clearTimeout(this.timeer);
				this.timeer = setTimeout(() => {
					clearTimeout(this.timeer);
					this.onScrollEnd();
				}, 120);
			},

			onScrollEnd() {
				this.scrollTop = "end";
				if (this.root.scrollTop <= this.padding) {
					this.root.scrollTop = this.padding;
				}
				if (
					this.root.scrollTop + this.root.offsetHeight >=
					this.root.scrollHeight - this.padding
				) {
					this.root.scrollTop =
						this.root.scrollHeight -
						this.root.offsetHeight -
						this.padding;
				}
			}
		},
		created() {
			this.timeer = null;
		},
		mounted() {
			this.root = this.$refs.root;
			this.root.scrollTop = 1;
			this.scrollTopRecord = 0;
			this.anmtScrollTo = async (target, type) => {
				await scroll2Target(target, this.root, type);
				this.scrollTopRecord = this.root.scrollTop;
			};
			this.lock = () => {
				const app = this.root;
				// this.scrollTopRecord = app.scrollTop;
				// this.root.style.overflow='hidden';
				// this.root.style.webkitOverflowScrolling='auto';
				// app.scrollTop = this.scrollTopRecord;
			};
			this.unlock = () => {
				const app = this.root;
				if (!app) {
					return;
				}
				// app.scrollTop = this.scrollTopRecord;
			};

			this.isAllowTouch = true;
			this.onBodyTouchMove = e => {
				if (!this.isAllowTouch) {
					e.preventDefault();
				}
			};
			document.body.addEventListener("touchmove", this.onBodyTouchMove);
		},
		destroyed() {
			document.body.removeEventListener("touchmove", this.onBodyTouchMove);
		}
	};
</script>
<style lang="less">
	.k-scrollable {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: scroll;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		* {
			perspective: 1000;
		}
		.k-scrollable-ct {
			height: 100%;
			transform: translate3d(0, 0, 0);
			// will-change: contents;
		}
		&.k-scrollable-disable {
			-webkit-overflow-scrolling: auto;
			overflow: hidden;
		}
	}
</style>
