const getters = {
    token: state => state.admin.token,
    account: state => state.admin.account,
    username: state => state.user.username,
    roles: state => state.user.roles,
    avatarId: state => state.user.avatarId,
    phone: state => state.user.phone,
    email: state => state.user.email,
    aboutMe: state => state.user.aboutMe,
    column: state => state.config.column,
    status: state => state.config.status,
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