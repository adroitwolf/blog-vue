import Vue from 'vue'
import Vuex from 'vuex'


import getters from './getters'


import admin from './moudles/admin'
import user from './moudles/user'
import config from './moudles/config'
import article from './moudles/article'
import permission from './moudles/permission'
import attachment from './moudles/attachment'
import topPosts from './moudles/topPosts'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        config,
        article,
        admin,
        permission,
        attachment,
        topPosts
    },
    getters
});