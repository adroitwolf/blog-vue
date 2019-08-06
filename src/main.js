// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { Button, Input, Icon, Card, Message, Row, Col, LoadingBar } from 'iview'
import 'iview/dist/styles/iview.css';
Vue.component('Button', Button)
Vue.component("Input", Input)
Vue.component('Icon', Icon)
Vue.component('Card', Card)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('LoadingBar', LoadingBar)


import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)





import store from './store/'



Vue.config.productionTip = false

// md在线预览组件 npm install mavon-editor --save
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// // use
// Vue.use(mavonEditor)


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})


// 进度条展示

router.beforeEach((to, from, next) => {
    LoadingBar.start();
    next();
});

router.afterEach(route => {
    LoadingBar.finish();
});