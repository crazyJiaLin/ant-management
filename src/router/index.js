import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Index from '@/pages/index/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        requireAuth: true  // 是否需要登录拦截
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
