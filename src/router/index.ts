import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "@/views/Login.vue";
import SignUpPage from "@/views/SignUp.vue";
import ChatDashboard from "@/views/ChatDashboard.vue";

import { auth } from "../plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";

// 認証されていないユーザーが、チャット画面にアクセスできないようにする
const requireAuth = (to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      next({ name: "login" });
    } else {
      next();
    }
  });
};

// 認証されているユーザーが、ログイン画面にアクセスできないようにする
const requireNoAuth = (to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      next({ name: "chat" });
    } else {
      next();
    }
  });
};

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginPage,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpPage,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/chat",
    name: "chat",
    component: ChatDashboard,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
