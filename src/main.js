// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//全局工具方法引入
import '@/assets/js/JsonObj.js'
import '@/assets/js/tool.js'
import '@/assets/js/global.js'
//axios引入
import './server/server'
import '@/assets/css/reset.css'
import 'animate.css'
// antd of vue
import {Message} from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";

//路由钩子函数
router.beforeEach((to, from, next) =>{
  // console.log(to)
  Vue.prototype.$setRouteToStore(to);
  if(to.meta.requireAuth) {
    //登录验证

    let username = Vue.prototype.$getLocalStorage('username')
    // console.log(username)
    if(!username) {
      // console.log('跳转到login')
      Message.warn('您还没有登陆，请登录！')
      return next({
        path: '/login',
        query : {
          redirect: to.fullPath
        }
      })
    }else {
      if(!store.state.isLogin){
        // 如果vuex为未登录状态，请求用户信息数据，然后让axios处理
        Vue.prototype.$axios.get('/current/user').then(res => {
          // console.log(res)
          if(res.data.user_name){
            store.commit('setLogin', true)
            store.commit('setUserInfo', res.data)
          }else {
            Message.warn('登陆超时,请重新登录！')
            return next({
              path: '/login',
              query : {
                redirect: to.fullPath
              }
            })
          }
        }).catch(err => {
          // console.log('router钩子处理')
          console.log(err)
        })
      }
    }
  }
  next();
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
