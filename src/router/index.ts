import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/Login.vue'

// @/pages/admin/SignIn/ChangePassword.vue

// src/views/Login.vue
import ChatDashboard from '@/views/ChatDashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login-page',
      component: LoginPage
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatDashboard
    }
  ]
})

export default router
