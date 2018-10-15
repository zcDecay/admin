import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'       //progress进度条
import 'nprogress/nprogress.css'        //进度条样式

import { getToken } from '@/utils/auth' //验权
import { Message } from 'element-ui'

const whiteList = ['/auth', '/404', '/login', '/regist']  //不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.onlyId.length === 0 && store.getters.name.length === 0) {
        //判断当前用户是否已经拉去完用户信息
        store.dispatch('GetUserInfo').then(res => {
          //获取用户信息
          const rolesId = res.data.rolesId
          if (rolesId === 0) {
            Message.error('当前登录用户没有任何角色')
            return
          }
          store.dispatch("GetUserMenus").then(res => {
            if (!store.getters.menus || store.getters.menus.length === 0) {
              Message.error('当前登录用户没有分配任何菜单')

            } else {
              next()
            }
            store.dispatch("GenerateRoutes").then(res => {
              // 生成可访问的路由表
              // router.options.routes.forEach(element => {
              //   if(element.path === '/'){
              //     element.children = res.data.concat(element.children)

              //   }
              // });
              router.addRoutes(res.data)//动态新增可访问路由表
              next({
                ...to,
                replace: true
              })//hack方法，确保addRouters已完成
              next()
            }).catch((resp) => {
              console.log(resp)
              Message.error('系统异常！请联系管理员')
              NProgress.done()
            })
          })
        }).catch(() => {
          store.dispatch("FedLogOut").then(res => {
            Message.error('验证失败，请重新登录')
            next({
              path: '/login'
            })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/404')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() //结束progress
})