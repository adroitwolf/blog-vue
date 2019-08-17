import service from '@/util/service'
// md5加密
import md5 from 'js-md5'
import qs from 'qs'

const baseUrl = '/api/user'
const userApi = {}




userApi.getProfile = () => {
    return service({
        url: `${baseUrl}/getUserDetail`,
        method: 'get'
    })
}



userApi.updateProfile = (username, phone, email, aboutMe) => {
    return service({
        url: `${baseUrl}/profile`,
        data: {
            username: username,
            phone: phone,
            email: email,
            aboutMe: aboutMe,
        },
        method: 'put'
    })
}



export default userApi