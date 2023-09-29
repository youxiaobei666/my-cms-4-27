import layout from '@/layout/index.vue'

/**
 * meta 是必须的属性
 * children: [] 是必须写的
 */

export const authManageRoutes = {
  path: '/auth',
  redirect: '/auth/assign', // 默认第一个
  name: 'authManage',
  component: layout,
  meta: {
    title: "auth",
    icon: "permissionList",
  },
  props: {
    default: false,
  },
  children: [
    {
      path: '/auth/assign',
      component: () => import('@/views/auth-assign'),
      meta: {
        title: 'authAssign',
        icon: 'authAssign'
      },
      children: []
    }]
}