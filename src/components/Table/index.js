import MyTable from './index.vue'

const AppTable = {
  install: function(Vue) {
    Vue.component('AppTable', MyTable)
  }
}

// 导出组件
export default AppTable
