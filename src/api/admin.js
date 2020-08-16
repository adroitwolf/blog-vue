import service from '@/config/service'

import md5 from 'js-md5'

import axios from 'axios'

import { BASE_URL } from '@/config/global.var'

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


adminApi.refresh = (refreshToken) => { //这里应该重新创建实例
    //修改日期 2020-8-16 
    //修改目的：axios不应该用service对象，可能会构成死循环
    //修改人：张巨根
    return axios({
        method: 'get',
        url: `${BASE_URL}/${adminUrl}/refresh/${refreshToken}`
    })

    // return service({
    //     url: `${adminUrl}/refresh/${refreshToken}`,
    //     method: 'get'
    // })
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


adminApi.logout = (autoToken) => {
    return service({
        url: `${adminUrl}/logout`,
        method: 'post'
            // data: autoToken
    })
}

adminApi.register = (userInfo) => {
    return service({
        url: `${adminUrl}/register`,
        method: 'post',
        data: {
            username: userInfo.nickname,
            email: userInfo.email,
            code: userInfo.code,
            password: md5(userInfo.password)
        }
    })
}


adminApi.verCode = (email) => {
    return service({
        url: `${adminUrl}/getMailCode/${email}`,
        method: 'get'
    })
}
export default adminApi