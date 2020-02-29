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


// const getters = {
//     getTag: state => state.tag,
//     getSummary: state => state.summary,
//     getHtmlContent: state => state.htmlContent,
//     getContent: state => state.content,
//     getManagerColumns: state => state.managerColumns,
//     getArticleData: state => state.articleData,
//     getTotal: state => state.total
// }


const mutations = {
    SET_DATA(state, data) {
        state.articleData = data;
    },
    SET_TOTAL(state, data) {
        state.total = data;
    },
    SET_STATUS(state, updateStatus) {
        state.articleData[updateStatus.index].status = updateStatus.status
    }
}


const actions = {
    postArticle({ commit }, { title, tagList, picture, summary, content, contentMd }) {
        return new Promise((resolve, reject) => {
            articleApi.submit(title, tagList, picture, summary, content, contentMd).then(response => {
                const msg = response.message;
                resolve(msg);
            }).catch(error => {
                reject(error);
            })
        })
    },
    getArticleList({ commit }, { pageNum, pageSize, postParams }) {
        return new Promise((resolve, reject) => {
            articleApi.getList(pageNum, pageSize, postParams).then(response => {
                console.log(response);
                const data = response.data;
                commit("SET_DATA", data.rows)
                commit("SET_TOTAL", data.total)
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    },
    updateArticleStatus({ commit }, { index, id, status }) {
        return new Promise((resolve, reject) => {
            articleApi.updateArticleStatus(id, status).then(response => {

                const data = response.data;
                const status = data.status;

                commit("SET_STATUS", { index: index, status: status })
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    }
}




export default { state, mutations, actions };