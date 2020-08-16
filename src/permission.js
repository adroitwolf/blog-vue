import router from './router'
import store from './store'
import Vue from 'vue'
// const whiteList = ['/register.html', '/index.html', '/admin/login.html', ];
import { getToken } from '@/util/auth'
import { LoadingBar } from 'view-design'
Vue.component('LoadingBar', LoadingBar)




router.beforeEach((to, from, next) => {
    LoadingBar.start();
    document.title = to.meta.title;
    // let token = store.getters.token ? store.getters.token : getToken();
    let token = store.getters.token;
    if (token) { //判断是否已经登陆
        if (to.path === '/admin/login.html') {
            next({ path: '/admin' });
            return;
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;
            const hasMenu = store.getters.menus.length;
            if (hasRoles && hasMenu) {
                next();
                return;
            } else {
                //尝试获取当前用户信息
                // try {
                store.dispatch('getProfile').then(data => {
                    //生成路由信息
                    store.dispatch('generateRoutes', data.roles);
                    const addRouters = store.getters.addRouters;
                    router.addRoutes(addRouters);
                    // 生成后台菜单
                    store.dispatch('generateMenu', addRouters);
                    //渲染页面
                    next({...to, replace: true });
                }).catch(error => { //可能登陆凭证失效
                    // store.dispatch("clear_info");
                    store.dispatch('logout');
                    console.log(error)
                    return;
                })
                return;
            }
        }

    } else { //如果没有token状态
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