/* 动态路由 */

export const asyncAdminRouterMap = []

export const asyncUserRouterMap = [{
    path: '/admin/index.html',
    name: 'index',
    meta: { title: '后台管理', hideInMenu: false },
    component: () =>
        import ('@/views/manage/index'),
    redirect: '/admin/index.html/status',
    children: [{
        path: 'status',
        name: '状态面板',
        meta: { Bread: ["主页", "状态面板"], icon: 'md-desktop', title: "后台管理" },
        component: () =>
            import ('@/views/manage/components/manager-status')
    }, {
        path: 'articleManager',
        meta: { Bread: ["主页", "文章", "文章管理"], icon: 'ios-chatboxes', title: "后台管理" },
        name: '文章管理',
        component: () =>
            import ('@/views/manage/components/manager-article')
    }, {
        path: 'writeArticle',
        meta: { Bread: ["主页", "文章", "写文章"], icon: 'md-clipboard', title: "后台管理" },
        name: '写文章',
        component: () =>
            import ("@/views/manage/components/manager-article-write")
    }, {
        path: 'photo',
        name: '图片',
        meta: { Bread: ["主页", "附件", "图片"], title: "后台管理", icon: 'ios-albums-outline' },
        component: () =>
            import ("@/views/manage/components/manager-photo")
    }, {
        path: 'userProfile',
        meta: { Bread: ["主页", "用户", "个人资料"], title: "后台管理", icon: 'ios-person-outline' },
        name: '个人资料',
        component: () =>
            import ('@/views/manage/components/manager-user-profile')
    }],
}, {
    path: '*',
    meta: { title: '404-战术小队', requiresAuth: false, hideInMenu: true },
    name: '404',
    component: () =>
        import ('@/views/exception/404')
}]


/*基础路由 */
export const constantRouterMap = [{
        path: '/',
        redirect: '/index.html'
    }, {
        path: '/admin/login.html',
        meta: { title: '登陆', requiresAuth: false },
        name: 'Login',
        component: () =>
            import ('@/views/usr/login')
    },
    {
        path: '/admin',
        meta: { hideInMenu: true },
        redirect: '/admin/index.html'
    }, {
        path: '/index.html',
        name: '博客',
        meta: { title: "逝痕枫舞-博客小站", requiresAuth: false },
        redirect: '/index.html/',
        component: () =>
            import ('@/views/Reception/blog'),
        children: [{
            path: '/',
            name: '博客主页',
            meta: { title: "逝痕枫舞-博客小站", requiresAuth: false },
            component: () =>
                import ('@/views/Reception/blog-index')
        }, {
            path: 'blogDetail',
            name: '博客内容',
            meta: { title: "逝痕枫舞-博客小站", requiresAuth: false },
            component: () =>
                import ("@/views/Reception/blog-detail")
        }, {
            path: 'blogSearch',
            name: '博客搜索',
            meta: { title: "逝痕枫舞-博客小站", requiresAuth: false },
            component: () =>
                import ("@/views/Reception/blog-search")
        }]
    },
    {
        path: '/register.html',
        name: '注册',
        meta: { title: "注册", requiresAuth: false },
        component: () =>
            import ("@/views/usr/register")
    }
]