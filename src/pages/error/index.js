import { createApp } from "./app";
import "src/js/lib/initRem";
// import "src/css/common.less";

document.title = "页面出错啦";

const { app } = createApp();

app.$mount('#app')
