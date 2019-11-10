import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import {
    constantRouterMap
} from "@/config/router.config"

export default new Router({
    mode: 'history',
    routes: constantRouterMap
})