
import routerComponent from './routerComponent'
// Routes
const routes = [
  {
    path: '/',
    redirect: "/index",
  },
  {
    path: '/index',
    component: routerComponent('/dashboard/index'),
    name: "仪表盘"
  },
  {
    path: '/login',
    component: routerComponent('/login/index'),
    name: 'login',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/regist',
    component: routerComponent('/regist/index'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '404',
    component: routerComponent('/error/404'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '401',
    component: routerComponent('/error/404'),
    meta: {
      keepAlive: true
    }
  }
]

export default routes

