import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import mutations from "./mutations";
import actions from "./actions";

const debug = import.meta.env.MODE !== "production";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {
    loading: false,
    sending: false,
    error: null,
    user: [],
    reconnect: false,
    activeRoom: null,
    rooms: [],
    users: [],
    messages: [],
    userTyping: null,
  },
  mutations,
  actions,
  getters: {
    hasError: (state) => (state.error ? true : false),
  },
  plugins: [vuexLocal.plugin],
  strict: debug,
});
