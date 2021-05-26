import { asyncRouterMap, constantRouterMap } from "@/config/router.config"
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
        //roles = ['管理员','用户','超级管理员']
        let accessRouters = [];
        for (let i = 0; i < asyncRouterMap.length; i++) {
            if (asyncRouterMap[i].hasOwnProperty('children')) {
                //判断是否有children
                //判断用户角色属性
                let asyncRouter = asyncRouterMap[i];
                let origin = asyncRouterMap[i].children;
                let children = [];

                origin.forEach(router => {
                    if (roles.indexOf(router.meta.role) >= 0) {
                        children.push(router);
                    }
                });

                asyncRouter.children = children;
                accessRouters.push(asyncRouter);
            } else {
                accessRouters.push(asyncRouterMap[i]);
            }
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
            if (router.children) {
                let childrenMenu = [];
                router.children.forEach(subRouter => {
                    let childRouter = subRouter;
                    childRouter.path = item.path + '/' + subRouter.path;
                    childrenMenu.push(childRouter);
                })
                item.children = childrenMenu;
            }
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