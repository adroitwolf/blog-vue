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


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import 'view-design/dist/styles/iview.css';
// 注册ivew 的switch组件
import { Switch} from 'view-design';
Vue.component('i-switch',Switch);