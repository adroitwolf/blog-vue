/* 动态路由 */

// export const asyncAdminRouterMap = [{
//     path: '/admin/index.html',
//     name: 'index',
//     meta: { title: '后台管理', hideInMenu: false },
//     redirect: '/admin/index.html/usrManager',
//     component: () =>
//         import ('@/views/manage/index'),
//     children: []
// }, {
//     path: '*',
//     meta: { title: '404-战术小队', requiresAuth: false, hideInMenu: true },
//     name: '404',
//     component: () =>
//         import ('@/views/exception/404')
// }]

const component = {
    template: `
    <div class="component">
      <router-view></router-view>
    </div>
  `
}

export const asyncRouterMap = [{
    path: '/admin/index.html',
    name: 'index',
    meta: { title: '后台管理', hideInMenu: false },
    component: () =>
        import ('@/views/manage/index'),
    redirect: '/admin/index.html/status',
    children: [{
            path: 'status',
            name: '状态面板',
            meta: { Bread: ["主页", "状态面板"], icon: 'ios-speedometer', title: "后台管理", role: 'USER' },
            component: () =>
                import ('@/views/manage/components/manager-status')
        }, { //管理员菜单
            path: 'check',
            name: '审核',
            meta: { Bread: ["主页", "审核"], title: '后台管理', role: 'ADMIN', icon: 'md-people' },
            component: component,
            children: [{
                path: 'user',
                meta: { Bread: ["主页", "审核", '用户管理'], title: '后台管理' },
                name: '用户管理',
                component: () =>
                    import ('@/views/manage/components/manager-user')
            }, {
                path: 'post',
                meta: { Bread: ["主页", "审核", '文章审核'], title: '后台管理' },
                name: '文章审核',
                component: () =>
                    import ('@/views/manage/components/manager-check-article')
            }],

        }, {
            path: 'sys',
            name: '系统设置',
            meta: { Bread: ['主页', '系统设置'], title: '后台管理', role: 'ADMIN', icon: 'md-settings' },
            component: () =>
                import ('@/views/manage/components/manager-system')
        }, {
            path: 'article',
            meta: { Bread: ["主页", "文章"], icon: 'ios-chatboxes', title: "后台管理", role: 'USER' },
            name: '文章',
            component: component,
            children: [{
                path: 'manager',
                name: '所有文章',
                meta: { Bread: ["主页", "文章", '所有文章'], title: "后台管理" },
                component: () =>
                    import ('@/views/manage/components/manager-article')
            }, {
                path: 'write',
                meta: { Bread: ["主页", "文章", "写文章"], title: "后台管理" },
                name: '写文章',
                component: () =>
                    import ("@/views/manage/components/manager-article-write")
            }],
        },
        {
            path: 'comment',
            meta: { Bread: ["主页", "评论管理"], icon: 'ios-photos', title: '评论管理', role: 'USER' },
            name: '评论管理',
            component: () =>
                import ("@/views/manage/components/manager-comment")

        }, {
            path: 'photo',
            name: '附件',
            meta: { Bread: ["主页", "附件"], title: "后台管理", icon: 'ios-albums-outline', role: 'USER' },
            component: () =>
                import ("@/views/manage/components/manager-photo")
        }, {
            path: 'userProfile',
            name: '个性管理',
            meta: { Bread: ["主页", "用户", "个人资料"], title: "后台管理", icon: 'ios-person-outline', role: 'USER' },
            component: () =>
                import ('@/views/manage/components/manager-user-profile')
        }
    ],
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