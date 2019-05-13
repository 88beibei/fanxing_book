import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/api/auth'
import { Toast } from "mint-ui";

NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
    NProgress.start();
    console.log(to.meta && to.meta.loginChecked)
    if (to.meta && to.meta.loginChecked && !getToken()) {
        Toast('请登录！');
        next(`/login/login?redirect=${to.path}`);
        // NProgress.done();
    } else {
        next();
        // NProgress.done();
    }
})

router.afterEach(() => {
    NProgress.done()
})