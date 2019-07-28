import Vue from 'vue'

//localStorage封装
Vue.prototype.$setLocalStorage = (key, value, expires) => {
  expires = expires || 0;
  let curTime = new Date().getTime();
  let expiresTime = expires === 0 ? null : curTime + expires;
  localStorage.setItem(key,JSON.stringify({data:value,expiresTime:expiresTime}));
}
Vue.prototype.$getLocalStorage = (key) => {
  let curTime = new Date().getTime();
  let data = JSON.parse(localStorage.getItem(key));
  // console.log(data, curTime)
  if(data.expiresTime && data.expiresTime  > curTime) {
    return data.data
  }
  return null;
}