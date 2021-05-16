import postApi from '@/api/protal/article'


const state = {
    posts: [],
}

const mutations = {
    SET_POSTS(state, posts) {
        state.posts = posts;
    }
}

const actions = {
    getTopPosts({ commit }) {
        return new Promise((resolve, reject) => {
            postApi.getTopPosts().then(response => {
                console.log(response);
                commit("SET_POSTS", response.data);
                resolve(response);
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}