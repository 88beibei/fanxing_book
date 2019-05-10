import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/api/auth'

NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta && to.meta.loginChecked && getToken()) {
    next(`/login?redirect=${to.path}`);
    // NProgress.done();
  } else {
    next();
    // NProgress.done();
  }
})

router.afterEach(() => {
  NProgress.done()
})