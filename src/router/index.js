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
                    import ('@/components/status')
            }, {
                path: 'status',
                name: '状态面板',
                meta: ["主页", "状态面板"],
                component: () =>
                    import ('@/components/status')
            }, {
                path: 'articleManager',
                meta: ["主页", "文章", "文章管理"],
                name: '文章管理',
                component: () =>
                    import ('@/components/article-manager')
            }, {
                path: 'userProfile',
                meta: ["主页", "用户", "个人资料"],
                name: '个人资料',
                component: () =>
                    import ('@/components/UserProfile')
            }, {
                path: 'writeArticle',
                meta: ["主页", "文章", "写文章"],
                name: '写文章',
                component: () =>
                    import ("@/components/article-write")
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
                import ('@/ivews/blog')
        }, {
            path: '/',
            redirect: '/index.html'
        },
        {
            path: '/blogDetail',
            name: '博客内容',
            component: () =>
                import ("@/ivews/blog-detail")
        }
    ]
})