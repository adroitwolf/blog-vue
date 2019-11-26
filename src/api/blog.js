import service from '@/util/service'

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

export default blogApi