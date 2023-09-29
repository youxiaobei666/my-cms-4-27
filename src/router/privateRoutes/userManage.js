import layout from '@/layout/index.vue'

/**
 * meta 是必须的属性
 * children: [] 是必须写的
 */

export const userManageRoutes = {
  path: '/user',
  redirect: '/user/manage',
  name: 'userManage',
  component: layout,
  meta: {
    title: "user",
    icon: "user",
  },
  props: {
    default: false,
  },
  children: [
    {
      path: '/user/manage',
      component: () => import('@/views/user-manage'),
      meta: {
        title: 'userManage',
        icon: 'userManage'
      },
      children: []
    }]
}