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


// // 渐进式加载图片

// import progressive from 'progressive-image/dist/vue';

// Vue.use(progressive, {
//     removePreview: true,
//     scale: true
// })


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});