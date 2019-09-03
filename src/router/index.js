import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/admin/index.html',
            name: 'index',
            meta: { title: '主页' },
            component: () =>
                import ('@/ivews/index'),
            children: [{
                path: '/',
                name: '状态面板',
                meta: ["主页", "状态面板"],
                component: () =>
                    import ('@/components/manager-status')
            }, {
                path: 'status',
                name: '状态面板',
                meta: ["主页", "状态面板"],
                component: () =>
                    import ('@/components/manager-status')
            }, {
                path: 'articleManager',
                meta: ["主页", "文章", "文章管理"],
                name: '文章管理',
                component: () =>
                    import ('@/components/manager-article')
            }, {
                path: 'userProfile',
                meta: ["主页", "用户", "个人资料"],
                name: '个人资料',
                component: () =>
                    import ('@/components/manager-user-profile')
            }, {
                path: 'writeArticle',
                meta: ["主页", "文章", "写文章"],
                name: '写文章',
                component: () =>
                    import ("@/components/manager-article-write")
            }, {
                path: 'photo',
                meta: ["主页", "附件", "图片"],
                component: () =>
                    import ("@/components/manager-photo")
            }],
        },
        {
            path: '/admin/login.html',
            meta: { title: '登陆' },
            name: 'Login',
            component: () =>
                import ('@/ivews/login')
        },
        {
            path: '/admin',
            redirect: '/admin/index.html'
        }, {
            path: '/index.html',
            name: '博客',
            component: () =>
                import ('@/ivews/blog'),
            children: [{
                path: 'blogIndex',
                name: "博客主页",
                component: () =>
                    import ('@/components/blog-index')
            }, {
                path: '/',
                name: '博客主页',
                component: () =>
                    import ('@/components/blog-index')
            }, {
                path: 'blogDetail',
                name: '博客内容',
                component: () =>
                    import ("@/components/blog-detail")
            }, {
                path: 'blogSearch',
                name: '博客搜索',
                component: () =>
                    import ("@/components/blog-search")
            }]
        }, {
            path: '/',
            redirect: '/index.html'
        },
        {
            path: '/register.html',
            name: '注册',
            component: () =>
                import ("@/ivews/register")
        }
    ]
})