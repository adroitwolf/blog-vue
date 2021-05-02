import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import {
  constantRouterMap
} from "@/config/router.config"



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

export default router
