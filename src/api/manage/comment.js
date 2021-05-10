import service from '@/config/service'


const baseUrl = "/iblog-blog/manage/comment"


const commentManageApi = {}

commentManageApi.manage = (pageInfo) => {
    return new service({
        method: 'get',
        params: {
            pageSize: pageInfo.pageSize,
            pageNum: pageInfo.pageNum
        },
        url: `${baseUrl}/list`
    })
}

commentManageApi.delete = (id) => {
    return new service({
        method: 'delete',
        url: `${baseUrl}/${id}/del`
    })
}

export default commentManageApi;