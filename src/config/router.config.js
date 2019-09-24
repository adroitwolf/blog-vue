
/* 动态路由 */

export const asyncRouterMap = [
    
    {
        path: '/admin/index.html',
        name: 'index',
        meta: { title: '后台管理' },
        component: () =>
            import('@/ivews/index'),
        children: [{
            path: '/',
            name: '状态面板',
            meta: { Bread: ["主页", "状态面板"], title: "后台管理" },
            component: () =>
                import('@/components/manager-status')
        }, {
            path: 'status',
            name: '状态面板',
            meta: { Bread: ["主页", "状态面板"], title: "后台管理" },
            component: () =>
                import('@/components/manager-status')
        }, {
            path: 'articleManager',
            meta: { Bread: ["主页", "文章", "文章管理"], title: "后台管理" },
            name: '文章管理',
            component: () =>
                import('@/components/manager-article')
        }, {
            path: 'userProfile',
            meta: { Bread: ["主页", "用户", "个人资料"], title: "后台管理" },
            name: '个人资料',
            component: () =>
                import('@/components/manager-user-profile')
        }, {
            path: 'writeArticle',
            meta: { Bread: ["主页", "文章", "写文章"], title: "后台管理" },
            name: '写文章',
            component: () =>
                import("@/components/manager-article-write")
        }, {
            path: 'photo',
            meta: { Bread: ["主页", "附件", "图片"], title: "后台管理" },
            component: () =>
                import("@/components/manager-photo")
        }],
    }
]


/*基础路由 */
export const constantRouterMap = [
    {
        path: '/admin/login.html',
        meta: { title: '登陆' },
        name: 'Login',
        component: () =>
            import('@/ivews/login')
    },
    {
        path: '/admin',
        redirect: '/admin/index.html'
    }, {
        path: '/index.html',
        name: '博客',
        meta: { title: "逝痕枫舞-博客小站" },
        component: () =>
            import('@/ivews/blog'),
        children: [{
            path: 'blogIndex',
            name: "博客主页",
            meta: { title: "逝痕枫舞-博客小站" },
            component: () =>
                import('@/components/blog-index')
        }, {
            path: '/',
            name: '博客主页',
            meta: { title: "逝痕枫舞-博客小站" },
            component: () =>
                import('@/components/blog-index')
        }, {
            path: 'blogDetail',
            name: '博客内容',
            meta: { title: "逝痕枫舞-博客小站" },
            component: () =>
                import("@/components/blog-detail")
        }, {
            path: 'blogSearch',
            name: '博客搜索',
            meta: { title: "逝痕枫舞-博客小站" },
            component: () =>
                import("@/components/blog-search")
        }]
    }, {
        path: '/',
        redirect: '/index.html'
    },
    {
        path: '/register.html',
        name: '注册',
        meta: { title: "注册" },
        component: () =>
            import("@/ivews/register")
    }
]