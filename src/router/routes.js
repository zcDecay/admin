
import routerComponent from './routerComponent'
import Layout from '@/views/layout/index'
// Routes
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: "/dashboard",
    name: '首页',
    children: [
      {
        name: '代办事宜',
        path: '/dashboard',
        component: routerComponent('/dashboard/index'),
      }
    ]
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

