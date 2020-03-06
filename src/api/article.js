import service from '@/config/service'

const baseUrl = '/api/blog'
const articleApi = {}

articleApi.submit = (title, tagList, pictureId, summary, content, contentMd) => {
    return service({
        url: `${baseUrl}/submit`,
        method: 'post',
        data: {
            title: title,
            tagList: tagList,
            summary: summary,
            content: content,
            contentMd: contentMd,
            pictureId: pictureId
        }
    })
}


articleApi.updateArticleStatus = (id, status) => {
    return service({
        url: `${baseUrl}/${id}/status/${status}`,
        method: 'put'
    })
}

articleApi.getList = (pageNum, pageSize, postParams) => {
    return service({
        url: `${baseUrl}/query`,
        params: {
            pageSize: pageSize,
            pageNum: pageNum,
            keyword: postParams.keyword,
            status: postParams.status
        },
        method: 'get'
    })
}


articleApi.updateArticle = (id, postParams) => {
    return service({
        url: `${baseUrl}/${id}`,
        method: 'put',
        data: {
            title: postParams.title,
            tagList: postParams.tagList,
            summary: postParams.summary,
            content: postParams.content,
            contentMd: postParams.contentMd,
            pictureId: postParams.pictureId
        }
    })
}


articleApi.deleteArticle = (id) => {
    return new service({
        url: `${baseUrl}/${id}`,
        method: 'delete'
    })
}


articleApi.getDetail = (id) => {
    return new service({
        url: `${baseUrl}/detail/${id}`,
        method: 'get'
    })
}

articleApi.countArticle = () => {
    return new service({
        url: `${baseUrl}/count`,
        method: "get"
    })
}



export default articleApi