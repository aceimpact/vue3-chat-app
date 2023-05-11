import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/Login.vue";
import SignUpPage from "@/views/SignUp.vue";
import ChatDashboard from "@/views/ChatDashboard.vue";

import { auth } from "../plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";

// @/pages/admin/SignIn/ChangePassword.vue

// src/views/Login.vue

const routes = [
  {
    path: "/",
    name: "login-page",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpPage,
  },
  {
    path: "/chat",
    name: "chat",
    component: ChatDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const isLogin = await new Promise((resoleve) => {
    onAuthStateChanged(auth, (user) => {
      resoleve(!!user);
    });
  });

  const isRequiresAuth = to.name === "chat";
  if (isRequiresAuth && !isLogin) {
    // ログインしていない場合、/loginページに遷移させる
    return { name: "login-page" };
  }
});

export default router;
