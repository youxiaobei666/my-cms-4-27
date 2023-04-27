import { createRouter, createWebHashHistory } from 'vue-router'

const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
  },
  {
    path: '/', // 往主页跳，
    component: () => import('@/layout/index'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
})

export default router
