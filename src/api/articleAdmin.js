import service from '@/config/service'

const baseUrl = '/manage/post';


const aritcleAdmin = {}




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