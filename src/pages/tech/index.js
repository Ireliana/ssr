import { createApp } from "./app";
import "src/js/lib/initRem";
// import "src/css/common.less";

document.title = "";

const { app } = createApp();

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount("#app");
