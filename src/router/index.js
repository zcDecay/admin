import Vue from 'vue'
import Router from 'vue-router'
import routeMap from "./routes";
import store from "@/store"

Vue.use(Router)
export default new Router({
  routes: store.state.permission.routers
});
