import { createApp } from "vue";
// import BootstrapVue from 'bootstrap'
// import VueChatScroll from 'vue-chat-scroll'

import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import './assets/css/loading.css'
// import './assets/css/loading-btn.css'

const app = createApp(App).use(store).use(router);
// app.use(BootstrapVue)
// app.use(VueChatScroll)

app.mount("#app");
