import login from "@/views/login/index";
import regist from "@/views/regist/index";
import NotFound from "@/views/error/404";
import app from "../App.vue";
import dashboard from "../views/dashboard/index";

const _import = require('./_import_' + process.env.NODE_ENV)
// Routes
const routes = [
  {
    path: '/index',
    component: _import('/dashboard/index'),
  },
  {
    path: '/',
    redirect: "/index",
  },
  {
    path: '/login',
    component: _import('/login/index'),
    hidden: true,
    name: 'login',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/regist',
    component: _import('/regist/index'),
    hidden: true,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '404',
    component: _import('/error/404'),
    hidden: true,
    meta: {
      keepAlive: true
    }
  },
  { path: '*', component: NotFound }
]

export default routes

