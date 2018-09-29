import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from "./routes";
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

 const routes = new Router({
  // scrollBehavior: () => ({ y: 0 }),
  routes: routeConfig
});

export default routes
