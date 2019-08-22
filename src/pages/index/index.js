import { createApp } from "./app";
import "src/js/lib/initRem";

document.title = "";
const { app } = createApp();
app.$mount("#app");
