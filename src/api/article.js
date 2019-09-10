import service from '@/util/service'

const baseUrl = '/api/blog'
const articleApi = {}

articleApi.submit = (title, tagList, picture, summary, htmlContent, content) => {
    return service({
        url: `${baseUrl}/submit`,
        method: 'post',
        data: {
            title: title,
            tagList: tagList,
            summary: summary,
            htmlContent: htmlContent,
            content: content,
            picture: picture
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
            htmlContent: postParams.htmlContent,
            content: postParams.content,
            picture: postParams.picture
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