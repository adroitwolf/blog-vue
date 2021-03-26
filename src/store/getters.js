const getters = {
    token: state => state.user.token,
    nickname: state => state.user.nickname,
    roles: state => state.user.roles,
    avatar: state => state.user.avatar,
    aboutMe: state => state.user.aboutMe,
    column: state => state.config.column,
    status: state => state.config.status,
    baseAvatar: state => state.config.baseAvatar,
    imgList: state => state.config.imgList,
    summary: state => state.article.summary,
    managerColumns: state => state.article.managerColumns,
    articleData: state => state.article.articleData,
    total: state => state.article.total,
    addRouters: state => state.permission.addRouters,
    routers: state => state.permission.router,
    menus: state => state.permission.menu,
    mediaTypes: state => state.attachment.mediaTypes,
    topPosts: state => state.topPosts.posts
}


export default getters