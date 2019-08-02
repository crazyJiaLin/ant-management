import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
// 定义一个状态管理容器
let store = new Vuex.Store({
  state: {
    routes: [],   // 当前路由的matched数组，用于根据路由显示面包屑使用
    menuList: [], // 导航菜单list
    isLogin: false,
    userInfo: {}
  },
  // state 中定义的所有状态，都必需也只能通过 mutations 中的方法来进行修改，在其它组件中通过调用此方法来间接地修改 state 中的状态
  mutations: {
    setLogin (state, isLogin) {
      state.isLogin = isLogin;
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo;
    },
    //设置当前路由到store
    setRoutes (state, routes) {
      // console.log('vuex get routes',this.state)
      state.routes = routes;
    },
    setMenuList (state, menuList) {
      state.menuList = menuList;
    },
    setMenuToLocalStorage (state, menuList) {
      // console.log(JSON.stringify(menuList))
      state.menuList = menuList;
      localStorage.setItem('menuList', JSON.stringify(menuList))
    }
  }
});
export default store
