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
            path: '/recomment',
            name: 'recomment',
            component: () =>
                import ('@/page/home/recomment')
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
                import ('@/page/bookRack/index'),
            meta: {
                loginChecked: true // 需要验证用户是否登录
            }
        },
        {
            path: '/mine',
            name: 'mine',
            component: () =>
                import ('@/page/mine/index'),
            meta: {
                loginChecked: true // 需要验证用户是否登录
            }
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
                import ('@/page/mine/paySuccess'),
            meta: {
                loginChecked: true // 需要验证用户是否登录
            }
        },
        {
            path: '/payFail',
            name: 'payFail',
            component: () =>
                import ('@/page/mine/payFail'),
            meta: {
                loginChecked: true // 需要验证用户是否登录
            }
        },
        {
            path: '/login',
            name: 'login',
            redirect: '/login/index',
            component: Login,
            children: [{
                path: 'index',
                component: () =>
                    import ('@/page/login/registerOne'),
                meta: {
                    title: '注册1'
                }
            }, {
                path: 'registerTwo',
                component: () =>
                    import ('@/page/login/registerTwo'),
                meta: {
                    title: '注册2'
                }
            }, {
                path: 'login',
                component: () =>
                    import ('@/page/login/login'),
                meta: {
                    title: '登录'
                }
            },{
                path: 'forgetpwd',
                component: () =>
                    import ('@/page/login/forgetPwd'),
                meta: {
                    title: '登录'
                }
            },{
                path: 'setpwd',
                component: () =>
                    import ('@/page/login/setPwd'),
                meta: {
                    title: '登录'
                }
            }]
        },
        {
            path: '/regSuccess',
            name: 'regSuccess',
            component: () =>
                import ('@/page/login/registerSuccess')
        },
        {
            path: '/resetSuccess',
            name: 'resetSuccess',
            component: () =>
                import ('@/page/login/resetSuccess')
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