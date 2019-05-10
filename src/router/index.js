import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Home from "@/page/home/index";
import Login from "@/page/login/index";
import Test from '@/page/home/test';
var router = new Router({
    routes: [{
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/bookDetail',
            name: 'bookDetail',
            component: () =>
                import ('@/page/home/bookDetail')
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: () =>
                import ('@/page/home/catalog')
        },
        {
            path: '/chapter',
            name: 'chapter',
            component: () =>
                import ('@/page/home/chapter')
        },
        {
            path: '/bookRack',
            name: 'bookRack',
            component: () =>
                import ('@/page/bookRack/index')

        },
        {
            path: '/mine',
            name: 'mine',
            component: () =>
                import ('@/page/mine/index')
        },
        {
            path: '/member',
            name: 'member',
            component: () =>
                import ('@/page/mine/member')
        },
        {
            path: '/paySuccess',
            name: 'paySuccess',
            component: () =>
                import ('@/page/mine/paySuccess')
        },
        {
            path: '/payFail',
            name: 'payFail',
            component: () =>
                import ('@/page/mine/payFail')
        },
        {
            path: '/login',
            name: 'login',
            redirect: '/login/index',
            component: Login,
            children: [{
                path: 'index',
                component: () =>
                    import ('@/page/login/register'),
                meta: {
                    title: '登录'
                }
            }, {
                path: 'register',
                component: () =>
                    import ('@/page/login/registerTwo'),
                meta: {
                    title: '登录'
                }
            }, {
                path: 'login',
                component: () =>
                    import ('@/page/login/login'),
                meta: {
                    title: '登录'
                }
            }]
        },
        {
            path: '/test',
            name: 'test',
            component: Test,
            meta: {
                loginChecked: true // 需要验证用户是否登录
            }
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
});
export default router;