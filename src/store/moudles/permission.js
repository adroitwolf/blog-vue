import { asyncUserRouterMap, asyncAdminRouterMap, constantRouterMap } from "@/config/router.config"

const state = {
    addRouters: [],
    router: []
}


const mutations = {
    SET_ROUTES(state, addRouters) {
        state.addRouters = addRouters;
        state.router = constantRouterMap.concat(addRouters);
    }
}


const actions = {
    generateRoutes({ commit }, roles) {
        let accessRouters = [];
        // // 动态添加路由表
        if (roles.indexOf('USER') >= 0) {
            accessRouters = asyncUserRouterMap;
            console.log(accessRouters);
        } else if (roles.indexOf('ADMIN') >= 0) {
            accessRouters = asyncAdminRouterMap;
            console.log(accessRouters);
        }
        commit('SET_ROUTES', accessRouters)

    }
}
export default {
    state,
    mutations,
    actions
}