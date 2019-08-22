import { createApp } from "./app";
import "src/js/lib/initRem";
// import "src/css/common.less";

document.title = "";

/**vue配置 */
Vue.config.productionTip = false;
Vue.mixin({
	methods: {
		toast(...message) {
			this.$store.commit("Toast/toast", message);
		}
	}
});

const { app } = createApp();

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount("#app");
