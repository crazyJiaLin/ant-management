import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
// 定义一个状态管理容器
let store = new Vuex.Store({
  state: {
    routes: []
  },
  // state 中定义的所有状态，都必需也只能通过 mutations 中的方法来进行修改，在其它组件中通过调用此方法来间接地修改 state 中的状态
  mutations: {
    //设置当前路由到store
    setRoutes (state, routes) {
      // console.log('vuex get routes',this.state)
      state.routes = routes;
    }
  }
});
export default store
