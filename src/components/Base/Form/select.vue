<template>
	<k-rect :label="label">
		<div class="k-select">
			<div
				@click="isShowOptions = !isShowOptions"
				class="k-select-val k-flex"
				:class="{ expand: isShowOptions }"
			>
				<span class="k-flex k-flex-left k-flex-item val">
					{{ val || placeholder }}
				</span>
				<a :class="arrowClass" class="icon-arrow-d"></a>
			</div>
			<transition name="select-fade">
				<div
					class="list-view"
					:style="{ zIndex: zIndex }"
					v-show="isShowOptions"
				>
					<ul>
						<li
							:key="index"
							@click="click(item, index)"
							v-for="(item, index) in options"
							class="k-flex k-flex-left"
						>
							<slot :index="index" :item="item"></slot>
						</li>
					</ul>
				</div>
			</transition>
		</div>
	</k-rect>
</template>
<script>
	import KRect from "./rect.vue";
	export default {
		props: {
			label: {
				type: String,
				default: ""
			},
			options: {
				type: Array,
				default: () => []
			},
			placeholder: {
				type: String,
				default: ""
			},

			zIndex: {
				type: Number,
				default: 99
			},
			viewKey: {
				type: String,
				default: ""
			},
			selectIndex: {
				type: Number,
				default: NaN
			}
		},
		data() {
			return {
				isShowOptions: false
			};
		},
		computed: {
			arrowClass() {
				return {
					"icon-arrwo-d_atv": this.isShowOptions
				};
			},
			val() {
				if (this.options[this.selectIndex]) {
					return this.options[this.selectIndex][this.viewKey] || "";
				}
				return "";
			}
		},
		components: {
			KRect
		},
		methods: {
			click(item, index) {
				this.isShowOptions = false;
				this.$emit("change", { ...item, index });
			}
		},
		mounted() {}
	};
</script>
<style lang="less">
	.k-select {
        position: relative;
		width: 3.68rem;
		.k-select-val {
			height: 0.52rem;
			background: url("~src/assets/dialogRoleSelect/bg-input.png") no-repeat
				center/100% 100%;
			&.expand {
				background: #ebd9a8;
				border: 1px solid #dbc396;
				border-top-left-radius: 0.1rem;
				border-top-right-radius: 0.1rem;
			}
		}
		.icon-arrow-d {
			position: absolute;
			top: 0.18rem;
			right: 0.2rem;
			width: 0.24rem;
			height: 0.17rem;
			transition: all 0.5s;
			background: url("~src/assets/dialogRoleSelect/icon-arrow.png") no-repeat
				center/100% 100%;
		}
		.icon-arrwo-d_atv {
			transform: rotate(180deg);
		}
		.k-flex-item.val {
			font-size: 0.2rem;
			color: #8f5c3a;
		}
		ul {
			border-top: 1px solid rgba(172, 106, 106, 0.2);
			max-height: 1.56rem;
			box-sizing: border-box;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
		}
		.list-view {
			position: absolute;
			top: 94%;
			left: 0;
			width: 3.68rem;
			background: #ebd9a8;
			box-sizing: border-box;
			padding: 0 0.18rem;
			border: 1px solid #dbc396;
			border-top-color: transparent;
			border-bottom-left-radius: 0.1rem;
			border-bottom-right-radius: 0.1rem;
			z-index: 1;
		}

		li {
			height: 0.5rem;
			padding-left: 0.19rem;
			text-align: left;
			font-size: 0.2rem;
			color: #ac6a3d;
			& ~ li {
				border-top: 1px solid rgba(172, 106, 106, 0.2);
			}
			p {
				font-size: 0.2rem;
			}
		}
		.select-fade-enter-active {
			transition: all 0.3s ease;
		}
		.select-fade-leave-active {
			transition: all 0.3s ease;
		}
		.select-fade-enter,
		.select-fade-leave-to {
			height: 0;
			opacity: 0;
		}
	}
</style>

