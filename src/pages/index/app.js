import Vue from "vue";
import Page from "./index.vue";
import { createStore } from "src/store/main";

Vue.config.productionTip = false;
Vue.mixin({
	methods: {
		toast(...message) {
			this.$store.commit("Toast/toast", message);
		}
	}
});

export function createApp() {
	const app = new Vue({
		// 根实例简单的渲染应用程序组件。
		render: h => h(Page),
		store: createStore()
	});
	return { app };
}
