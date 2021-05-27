import service from '@/config/service'

const baseUrl = '/iblog-user/manage/role'

const adminApi = {}

adminApi.listUser = (pageInfo,postParams) =>{
    return new service({
        url: `${baseUrl}/getListUsers`,
        method: 'get',
        params:{
            pageSize: pageInfo.pageSize,
            pageNum: pageInfo.pageNum,
            keyword: postParams.keyword,
            status: postParams.status
        }
    })
}

adminApi.updateRoles = (userId,roles) =>{
    return new service({
        url: `${baseUrl}/updateRoles`,
        method: 'put',
        data:{
            userId: userId,
            roles:roles
        }
    })
}


export default adminApi