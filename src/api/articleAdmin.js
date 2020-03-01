import service from '@/config/service'

const baseUrl = '/manage/post';


const aritcleAdmin = {}


aritcleAdmin.getList = (pageInfo, postParams) => {
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

aritcleAdmin.getDetail = id => {
    return new service({
        url: `${baseUrl}/detail/${id}`,
        method: 'get'
    })
}


aritcleAdmin.updateDetail = (id, status) => {
    return new service({
        url: `${baseUrl}/check/${id}/result/${status}`,
        method: 'put'
    })
}

export default aritcleAdmin;