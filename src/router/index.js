import { createRouter, createWebHashHistory } from 'vue-router'
import { userManageRoutes } from './privateRoutes/userManage'

export const publicRoutes = [{
  path: '/',
  redirect: '/user'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index')
  }
]
// 所有和权限相关的路由都称为私有路由，后期通过后端返回的有关权限的数组，过滤需要的的路由，用过滤好的路由，添加到公共路由表中。
export const privateRoutes = [userManageRoutes]

const router = createRouter({
  history: createWebHashHistory(),
  // 在 publicRoutes 基础上，在用户登录完毕后，使用 addRoutes 添加路由
  routes: publicRoutes
})

export default router