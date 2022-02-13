import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { PageNames } from '../constant'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: PageNames.Home,
    component: Home,
  },
  {
    path: '/login',
    name: PageNames.Login,
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: PageNames.Register,
    component: () => import('../views/Register.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
