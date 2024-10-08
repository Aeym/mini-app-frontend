import { createApp } from "vue";
import { createPinia } from "pinia";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import App from "./App.vue";
import "./index.css";
import router from "./router";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Vue3Toastify, {
	autoClose: 3000,
} as ToastContainerOptions);

app.mount("#app");
