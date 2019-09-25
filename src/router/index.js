import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import {
    constantRouterMap,
    asyncRouterMap
} from "@/config/router.config"

export default new Router({
    mode: 'history',
    routes: constantRouterMap.concat(asyncRouterMap)
})