import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index'

const Routes = [
  {
    path: '/',
    redirect: '/user',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
  },
  {
    path: '/user',
    redirect: '/user/manage',
    component: layout,
    meta: {
      title: 'user',
      icon: 'avatar',
    },
    props: {
      default: false,
    },
    children: [
      {
        path: '/user/manage',
        name: 'userManage',
        component: () => import('@/views/user-manage'),
        meta: {
          title: 'userManage',
          icon: 'coordinate',
        },
        children: [],
      },
      {
        path: '/user/role',
        name: 'userRole',
        component: () => import('@/views/role-list'),
        meta: {
          title: 'roleList',
          icon: 'operation',
        },
        children: [],
      },
      {
        path: '/user/permission',
        name: 'userPermission',
        meta: {
          title: 'permissionList',
          icon: 'setting',
        },
        children: [],
      },
    ],
  },
  {
    path: '/article',
    redirect: '/article/ranking',
    component: layout,
    meta: {
      title: 'article',
      icon: 'tickets',
    },
    props: {
      default: false,
    },
    children: [
      {
        path: '/article/ranking',
        name: 'articleRanking',
        meta: {
          title: 'articleRanking',
          icon: 'trophy',
        },
        children: [],
      },
      {
        path: '/article/create',
        name: 'articleCreate',
        meta: {
          title: 'articleCreate',
          icon: 'document',
        },
        children: [],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: Routes,
})

export default router
