import router from './router'
import store from './store'
import Vue from 'vue'
// const whiteList = ['/register.html', '/index.html', '/admin/login.html', ];

import { LoadingBar } from 'view-design'
Vue.component('LoadingBar', LoadingBar)


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

router.afterEach(() => {
    LoadingBar.finish();
});