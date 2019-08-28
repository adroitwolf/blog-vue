import articleApi from '@/api/article'


const state = {
    tag: '',
    summary: '',
    htmlContent: '',
    content: '',
    managerColumns: [{
            title: '标题',
            key: 'title',

        },
        {
            title: '状态',
            slot: 'status'
        },
        {
            title: '标签',
            slot: 'tagsTitle'
        },
        {
            title: '更新时间',
            key: 'nearestModifyDate',
        },
        {
            title: "操作",
            slot: 'action'
        }

    ],
    articleData: [

    ],
    total: 0
}


const getters = {
    getTag: state => state.tag,
    getSummary: state => state.summary,
    getHtmlContent: state => state.htmlContent,
    getContent: state => state.content,
    getManagerColumns: state => state.managerColumns,
    getArticleData: state => state.articleData,
    getTotal: state => state.total

}


const mutations = {
    setArticleData(state, data) {
        state.articleData = data;
    },
    setTotal(state, data) {
        state.total = data;
    },
    setArticleStatus(state, updateStatus) {
        state.articleData[updateStatus.index].status = updateStatus.status
    }
}


const actions = {
    postArticle({ commit }, { title, tag, summary, htmlContent, content }) {
        return new Promise((resolve, reject) => {
            articleApi.submit(title, tag, summary, htmlContent, content).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    getArticleList({ commit }, { pageNum, pageSize, postParams }) {
        return new Promise((resolve, reject) => {
            articleApi.getList(pageNum, pageSize, postParams).then(response => {
                commit("setArticleData", response.data.rows)
                commit("setTotal", response.data.total)
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    updateArticleStatus({ commit }, { index, id, status }) {
        return new Promise((resolve, reject) => {
            articleApi.updateArticleStatus(id, status).then(response => {


                const status = response.data.data.status;

                commit("setArticleStatus", { index: index, status: status })
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    }
}




export default { state, getters, mutations, actions };