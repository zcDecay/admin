import * as USER_API from '@/api/user'
import * as MENU_API from '@/api/menu'
import routeMap from '@/router/routes'
import router from '@/router/index'
import routerComponent from '@/router/routerComponent'
import * as UTILS from '@/api/utils'

const permission = {
  state: {
    menus: [{
      childs: Array(0),
      "entity": {
        "desc": "代办事宜",
        "icon": "icon-fenzuguanli",
        "id": 1,
        "name": "代办事宜",
        "path": "/dashboard",
        "pid": 0
      }
    }],
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = state.menus.concat(menus)
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = state.routers.concat(routers)
    }
  },
  actions: {
    GetUserMenus({ commit, state }) {
      return new Promise((resolve, reject) => {
        MENU_API.queryMenus(state.token)
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
            let router = res.data
            router = UTILS.circleRouterFilter(router, routerComponent)
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