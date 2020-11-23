import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import VueMq from 'vue-mq'


Vue.use(VueMq, {
  breakpoints: {
    mobile: 600,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  }
})

Vue.filter('year', function (value) {
  return value? value.split('-').filter(value => value.length == 4)[0]: [];
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
