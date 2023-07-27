import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import './plugins/element.js'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})
