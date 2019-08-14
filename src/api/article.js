import service from '@/util/service'

const baseUrl = '/api/blog'
const articleApi = {}

articleApi.submit = (title, tag, summary, htmlContent, content) => {
    return service({
        url: `${baseUrl}/submit`,
        method: 'post',
        data: {
            title: title,
            tag: tag,
            summary: summary,
            htmlContent: htmlContent,
            content: content
        }
    })
}


articleApi.updateArticleStatus = (id, status) => {
    return service({
        url: `${baseUrl}/${id}/status/${status}`,
        method: 'put'
    })
}

articleApi.getList = (pageNum, pageSize) => {
    return service({
        url: `${baseUrl}/list`,
        params: {
            pageSize: pageSize,
            pageNum: pageNum
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
            tag: postParams.tag,
            summary: postParams.summary,
            htmlContent: postParams.htmlContent,
            content: postParams.content
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