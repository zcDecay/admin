import login from "@/views/login/index";
import regist from "@/views/regist/index";
import NotFound from "@/views/404page/404";
import app from "../App.vue";
import dashboard from "../views/dashboard/index";

const _import = require('./_import_' + process.env.NODE_ENV)
// Routes
const routes = [
  {
    path: '/login',
    component: _import('/login/index'),
    hidden: true,
    name: 'login'
  },
  {
    path: '/regist',
    component: _import('/regist/index'),
    hidden: true
  },
  {
    path: '404',
    component: _import('/404page/404'),
    hidden: true
  },
  {
    path: '/',
    component: _import('/layout/index'),
    redirect: '/index',
    name: '首页',
    children: [
      {
        path: '/index',
        component: _import('/dashboard/index'),
        name: '代办事宜'
      }
    ]
  },
  { path: '*', component: NotFound }
]

export default routes

