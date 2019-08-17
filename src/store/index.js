import Vue from 'vue'
import Vuex from 'vuex'

import admin from './moudles/admin'
import user from './moudles/user'
import menus from './moudles/menu'
import article from './moudles/article'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        menus,
        article,
        admin
    }
});