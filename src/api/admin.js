import service from '@/util/service'

import md5 from 'js-md5'

const adminUrl = '/api/admin'

const adminApi = {}


// 登陆函数
adminApi.login = (username, password) => {
    return service({
        url: `${adminUrl}/login`,
        data: {
            username: username,
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

adminApi.register = (account, username, password) => {
    return service({
        url: `${adminUrl}/register`,
        method: 'post',
        data: {
            account: account,
            username: username,
            password: md5(password)
        }
    })
}

export default adminApi