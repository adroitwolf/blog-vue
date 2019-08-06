import service from '@/util/service'

const baseUrl = "/post"

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


export default blogApi