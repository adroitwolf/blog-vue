import service from '@/config/service'

import md5 from 'js-md5'

const adminUrl = '/api/admin'

const adminApi = {}


// 登陆函数
adminApi.login = (username, password) => {
    return service({
        url: `${adminUrl}/login`,
        data: {
            p: username,
            password: md5(password)
        },
        method: 'post'
    })
}


adminApi.changePassword = (opassword, password) => {
    return service({
        url: `${adminUrl}/changePassword`,
        data: {
            oldPassword: md5(opassword),
            newPassword: md5(password)

        },
        method: 'put'
    })
}


adminApi.logout = () => {
    return service({
        url: `${adminUrl}/logout`,
        method: 'post'
    })
}

adminApi.register = (userInfo) => {
    return service({
        url: `${adminUrl}/register`,
        method: 'post',
        data: {
            account: userInfo.account,
            phone: userInfo.phone,
            email: userInfo.email,
            password: md5(userInfo.password)
        }
    })
}

export default adminApi