import service from '@/config/service'

import md5 from 'js-md5'

import axios from 'axios'

import { BASE_URL } from '@/config/global.var'

const adminUrl = 'iblog-user/api/user'

const userApi = {}


// 登陆函数
userApi.login = (username, password) => {
    return service({
        url: `${adminUrl}/login`,
        data: {
            p: username,
            password: md5(password)
        },
        method: 'post'
    })
}


userApi.refresh = (refreshToken) => { //这里应该重新创建实例
    //修改日期 2020-8-16
    //修改目的：axios不应该用service对象，可能会构成死循环
    //修改人：ADROITWOLF
    return axios({
        method: 'get',
        url: `${BASE_URL}/${adminUrl}/refresh/${refreshToken}`
    })

    // return service({
    //     url: `${adminUrl}/refresh/${refreshToken}`,
    //     method: 'get'
    // })
}

userApi.changePassword = (opassword, password) => {
    return service({
        url: `${adminUrl}/changePassword`,
        data: {
            oldPassword: md5(opassword),
            newPassword: md5(password)

        },
        method: 'put'
    })
}


userApi.logout = (autoToken) => {
    return service({
        url: `${adminUrl}/logout`,
        method: 'post'
        // data: autoToken
    })
}

userApi.register = (userInfo) => {
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


userApi.verCode = (email) => {
    return service({
        url: `${adminUrl}/getMailCode/${email}`,
        method: 'get'
    })
}

userApi.getProfile = () => {
    return service({
        url: `${adminUrl}/getUserDetail`,
        method: 'get'
    })
}





export default userApi