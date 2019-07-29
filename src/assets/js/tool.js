import Vue from 'vue'

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
