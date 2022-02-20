import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home/main.vue'
import { PageNames } from '../constant'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: PageNames.Home,
    component: Home,
    meta: {
      showBg: true,
    },
  },
  {
    path: '/login',
    name: PageNames.Login,
    component: () => import('../views/Login.vue'),
    meta: {
      showBg: true,
    },
  },
  {
    path: '/register',
    name: PageNames.Register,
    component: () => import('../views/Register/main.vue'),
    meta: {
      showBg: true,
    },
  },
  {
    path: '/article/create',
    name: PageNames.Article.Create,
    component: () => import('@/views/article/create/main.vue'),
  },
  {
    path: '/article/detail',
    name: PageNames.Article.Detail,
    component: () => import('@/views/article/detail/main.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
