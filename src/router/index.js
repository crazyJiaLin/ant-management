import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Index from '@/pages/index/index'
import Dashboard from '@/pages/dashboard/dashboard'
import System from '@/pages/system/system'
import SysMenu from '@/pages/system/sys-menu/sys-menu'
import SysRole from '@/pages/system/sys-role/sys-role'
import SysUser from '@/pages/system/sys-user/sys-user'
import ViewTemplate from '@/pages/view-template/view-template'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        requireAuth: true  // 是否需要登录拦截
      },
      children: [
        {path: '/', redirect:Dashboard},
        {path: '/dashboard', name:'dashboard', component:Dashboard},
        {
          path: '/system',
          name: 'system',
          component: System,
          children: [
            // {path: '/system', redirect:Menu},
            {path: '/system/menu', name:'sys-menu', component: SysMenu},
            {path: '/system/role', name:'sys-role', component: SysRole},
            {path: '/system/user', name:'sys-user', component: SysUser}
          ]
        },
        {
          path: '*',
          name: 'view-template',
          component: ViewTemplate
        }
      ]
    }
  ]
})
