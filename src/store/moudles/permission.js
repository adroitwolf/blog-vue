import { asyncUserRouterMap, asyncAdminRouterMap } from "@/config/router.config"
const state = {
    addRouters: []
}


const mutations = {
    SET_ROUTES(state, addRouters) {
        state.addRouters = addRouters;
    }
}


const actions = {
    generateRoutes({ commit }, roles) {
        let accessRouters = [];
        // // 动态添加路由表
        if (roles.indexOf('USER') >= 0) {
            accessRouters = asyncUserRouterMap;
            console.log("user");
        } else if (roles.indexOf('ADMIN') >= 0) {
            accessRouters = asyncAdminRouterMap;
            console.log("admin");
        }
        commit('SET_ROUTES', accessRouters)

    }
}
export default {
    state,
    mutations,
    actions
}