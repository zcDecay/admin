import * as USER_API from '@/api/user'
import routeMap from '@/router/routes'
import router from '@/router/index'
import routerComponent from '@/router/routerComponent'

const permission = {
  state: {
    menus: [],
    routers: routeMap,
    addRouters: []
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routeMap.concat(routers)
    }
  },
  actions: {
    GetUserMenus({ commit, state }) {
      return new Promise((resolve, reject) => {
        USER_API.queryMenus(state.token)
          .then(res => {
            const menus = res.data
            commit('SET_MENUS', menus)
            resolve()
          }).catch(error => {
            reject(error)
          })
      });
    },
    GenerateRoutes({ commit, state }) {
      return new Promise((resolve, reject) => {
        USER_API.queryRouter(state.token)
          .then(res => {
            const router = res.data
            router.forEach(element => {
              // if (element.component != '/') {
                element.component = routerComponent(element.component)
              // }
            });
            commit('SET_ROUTERS', router)
            resolve(res)
          }).catch(error => {
            reject(error)
          })
      });
    }
  }
}
export default permission