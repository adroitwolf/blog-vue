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


userApi.uploadAvatar = (file) => {
    let data = new FormData();
    data.append("avatar", file)
    return service({
        url: `${baseUrl}/updateAvatar`,
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'post'

    })
}


export default userApi