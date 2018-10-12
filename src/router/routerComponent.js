import login from "@/views/login/index";
import regist from "@/views/regist/index";
import NotFound from "@/views/404page/404";
import app from "../App.vue";
import dashboard from "../views/dashboard/index";

const routerComponent = require('./_import_' + process.env.NODE_ENV)
// Routes
// const routerComponent = _import('/layout/index')

export default routerComponent

