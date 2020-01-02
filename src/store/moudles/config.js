import articleApi from '@/api/article'

const state = {
    status: [],
    column: [{
        title: '文章名字',
        key: 'title'
    }, {
        title: '时间',
        key: 'releaseDate'
    }],

}
const mutations = {
    SET_COUNT(state, data) {
        state.status.title = '文章总数';
        state.status.link = "/admin/index.html/articleManager";
        state.status.value = data;
    }
}
const actions = {
    getArticleCount({ commit }) {
        return new Promise((resolve, reject) => {
            articleApi.countArticle().then(response => {
                const value = response.data;
                commit("SET_COUNT", value);
                resolve(value)
            }).catch(error => {
                reject(error)
            })
        })
    },

}


export default { state, mutations, actions }