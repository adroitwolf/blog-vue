import service from '@/config/service'

const userManageApi = {};

const baseUrl = 'iblog-user/manage/user'

userManageApi.updateProfile = (nickname, aboutMe) => {
    return service({
        url: `${baseUrl}/profile`,
        method: 'put',
        data: {
            nickname: nickname,
            aboutMe: aboutMe,
        }
    })
}


userManageApi.uploadAvatar = (file) => {
    let data = new FormData();
    data.append("avatar", file, "avatar.jpg");
    return service({
        url: `${baseUrl}/updateAvatar`,
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'post'

    })
}



userManageApi.listUser = (queryParams, pageInfo) => {
    return service({
        method: 'get',
        url: `${baseUrl}/query`,
        params: {
            pageSize: pageInfo.pageSize,
            pageNum: pageInfo.pageNum,
            keyword: queryParams.keyword,
            status: queryParams.status
        }
    })
}


userManageApi.deleteUser = id => {
    return service({
        method: 'delete',
        url: `${baseUrl}/delete/${id}`
    })
}

userManageApi.updateUserStatus = (id, status) => {
    return service({
        method: 'put',
        url: `${baseUrl}/userUpdate/${id}/${status}`
    })
}

export default userManageApi
