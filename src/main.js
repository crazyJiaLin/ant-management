// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//全局工具方法引入
import '@/assets/js/tool.js'
//axios引入
import './server/server'
// Message按需引入
import {Message} from 'ant-design-vue'
//路由钩子函数
router.beforeEach((to, from, next) =>{
  if(to.meta.requireAuth) {
    //登录验证
    let username = Vue.prototype.$getLocalStorage('username')
    // console.log(username)
    if(!username) {
      // console.log('跳转到login')
      Message.warn('登陆超时,请重新登录！')
      next({
        path: '/login',
        query : {
          redirect: to.fullPath
        }
      })
    }else {
      next();
    }
  }else {
    next();
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
