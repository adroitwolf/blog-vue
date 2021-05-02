import Vue from 'vue'
import Vuex from 'vuex'


import getters from './getters'


import user from './moudles/user'
import config from './moudles/config'
import article from './moudles/article'
import permission from './moudles/permission'
import attachment from './moudles/attachment'
import topPosts from './moudles/topPosts'
// import createPersiste from 'vue-savedata'

Vue.use(Vuex)

// const persiste = createPersiste({
//   ciphertext: true, // 加密存本地, 默认为false
//   LS: {
//     module: user,
//     storePath: 'user' // __storePath:(和Vuex中的option.modules:{key：value}的key,一,一对应)__
//   },
// })

export default new Vuex.Store({
  modules: {
    user,
    config,
    article,
    permission,
    attachment,
    topPosts
  },
  getters,
  // plugins: [persiste]
});