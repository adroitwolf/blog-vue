import service from '@/config/service'

const baseUrl = "/api/comments"


const commentApi = {}

commentApi.manage = (pageInfo) => {
    return new service({
        method: 'get',
        params: {
            pageSize: pageInfo.pageSize,
            pageNum: pageInfo.pageNum
        },
        url: `${baseUrl}/list`
    })
}

commentApi.delete = (id) => {
    return new service({
        method: 'delete',
        url: `${baseUrl}/${id}/del`
    })
}

export default commentApi;