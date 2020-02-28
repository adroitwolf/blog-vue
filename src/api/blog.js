import service from '@/config/service'

const baseUrl = "/api/post"

const blogApi = {}


blogApi.getAllList = (pageSize, pageNum) => {
    return new service({
        url: `${baseUrl}/list`,
        method: 'get',
        params: {
            pageSize: pageSize,
            pageNum: pageNum
        }
    })
}



blogApi.getDetail = (id) => {
    return new service({
        url: `${baseUrl}/detail/${id}`,
        method: 'get'
    })
}


blogApi.queryListByExample = (pageSize, pageNum, keyword) => {
    return new service({
        url: `${baseUrl}/query`,
        method: 'get',
        params: {
            pageNum: pageNum,
            pageSize: pageSize,
            keyword: keyword
        }
    })
}


blogApi.searchTag = (pageSize, pageNum, tag) => {
    return new service({
        url: `${baseUrl}/tag`,
        method: 'get',
        params: {
            pageNum: pageNum,
            pageSize: pageSize,
            tag: tag
        }
    })
}


blogApi.getTopPosts = () => {
    return new service({
        url: `${baseUrl}/top`,
        method: 'get',
    })
}

blogApi.pushComment = (comment) => {
    return service({
        url: `${baseUrl}/comments`,
        method: 'post',
        data: comment
    })
}

blogApi.getCommentsList = (id, params) => {
    return service({
        url: `${baseUrl}/${id}/comments`,
        method: 'get',
        params: params
    })
}

export default blogApi