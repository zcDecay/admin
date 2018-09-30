import router from './router'
import NProgress from 'nprogress' //progress进度条
import 'nprogress/nprogress.css' //进度条样式
import { getToken } from '@/utils/auth' //验权

const whiteList = ['/auth', '/404', '/login', '/regist']  //不重定向白名单
router.beforeEach((to,from,next) => {
  NProgress.start()
  
  if(getToken()){
    if(to.path === '/login'){
      next({ path: '/'})
      NProgress.done()
    }else{
      next()
    }
  }else{
    if(whiteList.indexOf(to.path) !== -1){
      next()
    }else{
      next('/404')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() //结束progress
})