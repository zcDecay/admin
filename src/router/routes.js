import login from "@/views/login/index";
import regist from "@/views/regist/index";
import NotFound from "@/views/404page/404";
// Routes
const routes = [
  // {path: '/login', component: login},
  // {
  //   path: '/test', component: app, children: [
  //   {path: '*', component: login}
  // ]
  // },
  { path: '/login', component: login, name: 'login' },
  { path: '/', redirect: { name: 'login'}},
  { path: '/regist', component: regist, name: 'regist'},
  {
    path: '', component: app, children: [
    // {path: '/resetPwd', component: resetPwd},
    {path: '/index', component: dashboard},
    // {path: '/sys/menuList', component: menuList},
    // {path: '/sys/roleList', component: role},
    // {path: '/sys/userList', component: sysUser},
    // {path: '/sys/userAdd', component: userAdd},
    // {path: '/sys/resource', component: resource}
  ]
  },
  { path: '*', component: NotFound}
]


export default routes

