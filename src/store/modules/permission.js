import { privateRoutes, publicRoutes } from '@/router'
import  router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    routs: []
  }),
  mutations: {
    setRoutes: (state, newRoutes) => {
      state.routs = [...publicRoutes, ...newRoutes]
      // 添加对应权限的路由规则
      newRoutes.forEach((route) => {
        router.addRoute(route)
      })
      console.log(state.routs)
    }
  },
  actions: {
    filterRoutes: (context, permissionNameList) => {
      const routes = []
      // 路由权限匹配
      permissionNameList.forEach(key => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter(item => {
          return  item.name === key || item.name === 'AFS' || item.name === 'profile'
        }))
      })
      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      // 设置最新的路由
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
