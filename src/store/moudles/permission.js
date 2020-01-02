import { asyncUserRouterMap, asyncAdminRouterMap, constantRouterMap } from "@/config/router.config"
const state = {
    menu: [],
    addRouters: [],
    router: [],
}


const mutations = {
    SET_ROUTES(state, addRouters) {
        state.addRouters = addRouters;
        state.router = constantRouterMap.concat(addRouters);
    },
    SET_MENUS(state, menu) {
        state.menu = menu;
    }
}


const actions = {
    generateRoutes({ commit }, roles) {
        let accessRouters = [];
        // 动态添加路由表
        if (roles.indexOf('ADMIN') >= 0) {
            accessRouters = asyncAdminRouterMap;
        }
        if (roles.indexOf('USER') >= 0) {
            accessRouters = asyncUserRouterMap;
        }
        commit('SET_ROUTES', accessRouters)

    },
    generateMenu({ commit }, asynRouter) {
        //  动态选择后台菜单
        let menu = [];
        let head = [];
        asynRouter.forEach(element => {
            if (!element.meta.hideInMenu) {
                head = element;
            }
        });
        head.children.forEach(router => {
            let item = router;
            item.path = head.path + '/' + router.path;
            menu.push(item);
        });
        commit('SET_MENUS', menu);
    }

}
export default {
    state,
    mutations,
    actions
}