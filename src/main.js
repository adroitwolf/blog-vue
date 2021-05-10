import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import './permission'

import 'view-design/dist/styles/iview.css';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
