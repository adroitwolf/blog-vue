const getters = {
    token: state => state.admin.token,
    account: state => state.admin.account,
    username: state => state.user.username,
    roles: state => state.user.roles,
    avatarId: state => state.user.avatarId,
    phone: state => state.user.phone,
    email: state => state.user.email,
    aboutMe: state => state.user.aboutMe,
    menus: state => state.menus.menu,
    column: state => state.menus.column,
    status: state => state.menus.status,
    summary: state => state.article.summary,
    managerColumns: state => state.article.managerColumns,
    articleData: state => state.article.articleData,
    total: state => state.article.total,
    addRouters: state => state.permission.addRouters,

}


export default getters