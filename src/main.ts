import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import vuetify from "./plugins/vuetify";

const app = createApp(App).use(store).use(router).use(vuetify).mount("#app");
