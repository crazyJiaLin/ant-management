import Vue from 'vue'
import store from '@/store'

//localStorage封装
Vue.prototype.$setLocalStorage = (key, value, expires) => {
  expires = expires || 0;
  let curTime = new Date().getTime();
  let expiresTime = expires === 0 ? null : curTime + expires;
  localStorage.setItem(key,JSON.stringify({data:value,expiresTime:expiresTime}));
}
Vue.prototype.$getLocalStorage = (key) => {
  let strData = localStorage.getItem(key);
  if(!strData) {
    return  null;
  }
  let curTime = new Date().getTime();
  try {
    let data = JSON.parse(strData);
    // console.log(data, curTime)
    if(data.expiresTime && data.expiresTime  > curTime) {
      return data.data
    }
    return null;
  }catch (e) {
    console.error(e)
    return null;
  }
}

//路由面包屑vuex设置
Vue.prototype.$setRouteToStore = (to) => {
  let routes = [];
  //通过对当前路由的所匹配的matched数组来渲染面包屑
  for (let i=0; i<to.matched.length; i++){
    let title = to.matched[i].meta.title;
    if(title && title != '') {
      routes.push({
        title: title,
        path: to.matched[i].path
      });
    }
  }
  store.commit('setRoutes',routes);
}
