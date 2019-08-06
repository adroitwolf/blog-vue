import service from '@/util/service'
// md5加密
import md5 from 'js-md5'
import qs from 'qs'

const baseUrl = '/api/user'
const userApi = {}


// 登陆函数
userApi.login = (username, password) => {
    return service({
        url: `${baseUrl}/login`,
        data: {
            username: username,
            password: md5(password)
        },
        method: 'post'
    })
}


userApi.getProfile = () => {
    return service({
        url: `${baseUrl}/getUserDetail`,
        method: 'get'
    })
}


userApi.changePassword = (opassword, password) => {
    return service({
        url: `${baseUrl}/changePassword`,
        data: {
            oldPassword: md5(opassword),
            newPassword: md5(password)

        },
        method: 'put'
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

userApi.logout = () => {
    return service({
        url: `${baseUrl}/logout`,
        method: 'post'
    })
}

export default userApi