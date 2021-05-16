import service from '@/config/service'
const baseUrl = "/iblog-blog/api/blog"

const postApi = {}


postApi.getAllList = (pageSize, pageNum) => {
    return new service({
        url: `${baseUrl}/list`,
        method: 'get',
        params: {
            pageSize: pageSize,
            pageNum: pageNum
        }
    })
}


postApi.getDetail = (id) => {
    return new service({
        url: `${baseUrl}/detail/${id}`,
        method: 'get'
    })
}

postApi.getTopPosts = () => {
    return new service({
        url: `${baseUrl}/top`,
        method: 'get',
    })
}


postApi.queryListByExample = (pageSize, pageNum, keyword) => {
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


postApi.searchTag = (pageSize, pageNum, tag) => {
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


export  default postApi