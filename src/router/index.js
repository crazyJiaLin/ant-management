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
        requireAuth: true,  // 是否需要登录拦截
        title: '权限管理脚手架'
      },
      children: [
        {path: '/', redirect:Dashboard},
        {
          path: '/dashboard',
          name:'dashboard',
          component:Dashboard,
          meta: {
            requireAuth: true,  // 是否需要登录拦截
            title: '首页'
          }
        },
        {
          path: '/system',
          name: 'system',
          component: System,
          meta: {
            requireAuth: true,  // 是否需要登录拦截
            title: '系统管理'
          },
          children: [
            // {path: '/system', redirect:Menu},
            {
              path: '/system/menu',
              name:'sys-menu',
              component: SysMenu,
              meta: {
                requireAuth: true,  // 是否需要登录拦截
                title: '菜单管理'
              }
            },
            {
              path: '/system/role',
              name:'sys-role',
              component: SysRole,
              meta: {
                requireAuth: true,  // 是否需要登录拦截
                title: '角色管理'
              }
            },
            {
              path: '/system/user',
              name:'sys-user',
              component: SysUser,
              meta: {
                requireAuth: true,  // 是否需要登录拦截
                title: '用户管理'
              }
            }
          ]
        },
        {
          path: '*',
          name: 'view-template',
          component: ViewTemplate,
          meta: {
            requireAuth: true,  // 是否需要登录拦截
          }
        }
      ]
    }
  ]
})
