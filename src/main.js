import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
// 将echarts挂载到Vue原型对象上
Vue.prototype.$echarts = window.echarts
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App),
  store,
}).$mount('#app')
