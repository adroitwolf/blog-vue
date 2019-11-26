// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 修改动态路由
import router from './router'
import store from './store/'



import './permission'

import 'view-design/dist/styles/iview.css';

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)


Vue.config.productionTip = false


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

// 全局变量
import Global from '@/util/Global'

Vue.prototype.Global = Global