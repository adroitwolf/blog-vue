import articleApi from '@/api/article'

const state = {
    menu: [{
            id: 1,
            to: '/admin/index.html/status',
            name: '状态面板',
            icon: 'md-desktop'
        },
        {
            id: 2,
            to: '/admin/index.html/articleManager',
            name: '文章管理',
            icon: 'ios-chatboxes'
        }, {
            id: 3,
            to: '/admin/index.html/writeArticle',
            name: '写文章',
            icon: 'md-clipboard'
        }, {
            id: 4,
            to: '/admin/index.html/userProfile',
            name: '个人资料',
            icon: 'ios-person-outline'
        }
    ],
    status: [],
    column: [{
        title: '文章名字',
        key: 'title'
    }, {
        title: '时间',
        key: 'releaseDate'
    }],

}

const getters = {
    menus: state => state.menu,
    column: state => state.column,
    status: state => state.status
}

const mutations = {
    setArticleCount(state, data) {
        state.status.title = '文章总数';
        state.status.link = "/admin/index.html/articleManager";
        state.status.value = data;
    }
}

const actions = {
    getArticleCount({ commit }) {
        return new Promise((resolve, reject) => {
            articleApi.countArticle().then(response => {

                const value = response.data.data
                commit("setArticleCount", value);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}


export default { state, getters, mutations, actions }