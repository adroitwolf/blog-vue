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
    imgList: [
        require("@/assets/img/0.jpg"),
        require("@/assets/img/1.jpg"),
        require("@/assets/img/2.jpg"),
        require("@/assets/img/3.jpg"),
        require("@/assets/img/4.jpg"),
        require("@/assets/img/5.png"),
        require("@/assets/img/6.jpg"),
        require("@/assets/img/7.jpg"),
        require("@/assets/img/8.jpg"),
        require("@/assets/img/9.jpg")
    ],
    baseAvatar: require("@/assets/img/avatar.png")

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