// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 修改动态路由
import router from './router'
import store from './store/'


import { Button, Input, Icon, Card, Message, Row, Col, LoadingBar } from 'view-design'
import 'view-design/dist/styles/iview.css';
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


// const whiteList = ['/register.html', '/index.html', '/admin/login.html', ];

import {
    constantRouterMap
} from "@/config/router.config"

router.beforeEach((to, from, next) => {
    LoadingBar.start();
    document.title = to.meta.title;
    if (store.getters.token) { //判断是否已经登陆
        if (to.path === '/admin/login.html') {
            next({ path: '/admin' });
            return;
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;
            if (hasRoles) {
                next();
                return;
            } else {
                //尝试获取当前用户信息
                // try {
                store.dispatch('getProfile').then(data => {
                    console.log(data);
                    store.dispatch('generateRoutes', data.roles);
                    const addRouters = store.getters.addRouters;
                    console.log(addRouters);
                    router.addRoutes(addRouters);
                    next({...to, replace: true });
                }).catch(error => {
                    console.log(error)
                    return;
                })
                return;
            }
        }

    } else {
        // 判断当前是否属于白名单
        if (to.matched.some(record => !record.meta.requiresAuth)) {
            next();
            return;
        } else {
            next({ path: '/admin/login.html' });
            return;
        }
    }
});

router.afterEach(route => {
    LoadingBar.finish();
});



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