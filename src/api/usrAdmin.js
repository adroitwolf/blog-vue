import service from '@/config/service'


const baseUrl = '/manage/usr'
const userApi = {}

userApi.listUser = (queryParams, pageInfo) => {
    return service({
        method: 'get',
        url: `${baseUrl}/query`,
        params: {
            pageSize: pageInfo.pageSize,
            pageNum: pageInfo.pageNum,
            keyword: queryParams.keyword,
            status: queryParams.status
        }
    })
}


userApi.deleteUser = id => {
    return service({
        method: 'delete',
        url: `${baseUrl}/delete/${id}`
    })
}

userApi.updateUserStatus = (id, status) => {
    return service({
        method: 'put',
        url: `${baseUrl}/userUpdate/${id}/${status}`
    })
}

export default userApi