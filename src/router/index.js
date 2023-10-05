import { createRouter, createWebHashHistory } from 'vue-router'
import { userManageRoutes } from './privateRoutes/userManage'
import { authManageRoutes } from './privateRoutes/authManage'
import layout from '@/layout'

export const publicRoutes = [{
  path: '/',
  redirect: '/user'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/register_forgotPass',
    component: () => import('@/views/changePassword/index')
  },
  // 个人主页
  {
    path: '/profile',
    redirect: '/profile/home',
    component: layout,
    name: 'profile',
    meta: {
      title: 'profile',
      icon: 'profile'
    },
    props: {
      default: false
    },
    children: [
      {
        path: '/AFS/aboutUs',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile_home',
          icon: 'profile_home'
        },
        children: []
      }
    ]
  },
  {
    path: '/AFS',
    component: layout,
    redirect: '/AFS/aboutUs',
    name: 'AFS',
    meta: {
      title: 'AFS',
      icon: 'AFS',
    },
    props: {
      default: false,
    },
    children: [
      {
        path: '/AFS/aboutUs',
        component: () => import('@/views/AFS/index.vue'),
        meta: {
          title: 'AFS_about',
          icon: 'AFS',
        },
        children: []
      }
    ]
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue')
  }
]
// 所有和权限相关的路由都称为私有路由，后期通过后端返回的有关权限的数组，过滤需要的的路由，用过滤好的路由，添加到公共路由表中。
export const privateRoutes = [userManageRoutes,authManageRoutes]

const router = createRouter({
  history: createWebHashHistory(),
  // 在 publicRoutes 基础上，在用户登录完毕后，使用 addRoutes 添加路由
  routes: publicRoutes
})

export default router