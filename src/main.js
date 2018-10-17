// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import * as UTILS_API from '@/api/utils'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import '@/icons'
import '@/assets/icon/iconfont.css'
import '@/permission'
import * as utils from '@/utils'
//引用动画js
import Velocity from 'velocity-animate'
import 'vue2-animate/dist/vue2-animate.min.css'
import 'animate.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

Object.defineProperty(Vue.prototype, 'utils', { value: utils })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
