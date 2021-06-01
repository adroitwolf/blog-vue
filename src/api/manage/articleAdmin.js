import service from '@/config/service'

const baseUrl = '/iblog-blog/manager/blog'

const articleAdminApi = {}

articleAdminApi.getList = (pageInfo, postParams) => {
    return new service({
        url: `${baseUrl}/query`,
        method: 'get',
        params: {
            pageSize: pageInfo.pageSize,
            pageNum: pageInfo.pageNum,
            keyword: postParams.keyword,
            status: postParams.status
        }
    })
}


articleAdminApi.getDetail = (id) => {
    return new service({
        url: `${baseUrl}/detail/${id}`,
        method: 'get'
    })
}

articleAdminApi.updateDetail = (id, status) => {
    return new service({
        url: `${baseUrl}/check/${id}/result/${status}`,
        method: 'put'
    })
}

export default articleAdminApi