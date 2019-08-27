import Vue from 'vue'
import axios from 'axios'

import {Message} from 'ant-design-vue'

//配置最大通知数，超过覆盖最早消息
Message.config({
  maxCount: 1,
});

//配置请求根路径
axios.defaults.baseURL = 'http://47.244.197.84:10088/api/v1';

Vue.prototype.$axios = axios;
//请求拦截器
axios.interceptors.request.use(config=> {
  let hash = location.hash.split('?')[0]
  if(hash != '#/login'){
    let accessToken = Vue.prototype.$getLocalStorage('access_token');
    let tokenType = Vue.prototype.$getLocalStorage('token_type');
    // console.log(accessToken, tokenType)
    if(accessToken && tokenType) {
      // console.log('access_token', tokenType + ' ' + accessToken)
      config.headers['Authorization'] = tokenType + ' ' + accessToken // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
  }
  return config;
}, err=> {
  Message.error('请求超时!');
  return Promise.reject(err);
})
//响应拦截器
axios.interceptors.response.use(data=> {
  // if (data.status && data.status == 200) {
  //   // Message.error(data.data.message);
  //   return data;
  // }
  // console.log('响应拦截',data)
  return data;
}, err=> {
  // console.error('响应拦截器', err.response.status)
  if(err.response.status == 401 || err.response.status == 400){
    Message.error(err.response.data.error.message);
    let hash = location.hash.split('?')[0];
    let path = hash.slice(1, hash.length);
    console.log(path)
    if(path != '/login'){
      location.hash = '#/login?redirect='+path
    }
  }else if(err.response.status == 403) {
    Message.error('您还没有访问权限，请联系管理员！');
  }else if (err.response.status == 504) {
    Message.error('服务器被吃了⊙﹏⊙∥');
  }else if(err.response.status == 404){
    //这里进行404页面跳转
    // Message.error('资源不存在')
    Message.error(err.response.data.error.message);
  } else {
    console.log(err.response)
    Message.error(err.response.data.error.message);
  }
  return Promise.reject(err);
})

// let base = '';

// export const postRequest = (url, params) => {
//   return axios({
//     method: 'post',
//     url: `${base}${url}`,
//     data: params,
//     transformRequest: [function (data) {
//       let ret = ''
//       for (let it in data) {
//         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//       }
//       return ret
//     }],
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   });
// }
// export const uploadFileRequest = (url, params) => {
//   return axios({
//     method: 'post',
//     url: `${base}${url}`,
//     data: params,
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   });
// }
// export const putRequest = (url, params) => {
//   return axios({
//     method: 'put',
//     url: `${base}${url}`,
//     data: params,
//     transformRequest: [function (data) {
//       let ret = ''
//       for (let it in data) {
//         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//       }
//       return ret
//     }],
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   });
// }
// export const deleteRequest = (url) => {
//   return axios({
//     method: 'delete',
//     url: `${base}${url}`
//   });
// }
// Vue.prototype.$getRequest = (url) => {
//   return axios({
//     method: 'get',
//     url: `${base}${url}`
//   });
// }

// import Vue from 'vue'
// import axios from 'axios'
// import store from '@/store'
// import {
//   VueAxios
// } from './axios'
// import notification from 'ant-design-vue/es/notification'
// import {
//   ACCESS_TOKEN
// } from '@/store/mutation-types'
//
// // 创建 axios 实例
// const service = axios.create({
//   baseURL: 'http://192.168.31.150:10088/api/v1', // api base_url  "/api",
//   timeout: 6000 // 请求超时时间 6秒
// })

// const err = (error) => {
//   if (error.response) {
//     const data = error.response.data
//     const token = Vue.ls.get(ACCESS_TOKEN)
//     if(error.response.status === 401 && !(data.result && data.result.isLogin)) {
//       notification.error({
//         message: '未经授权',
//         description: data.error.message//'授权验证失败'
//       })
//       if (token) {
//         store.dispatch('Logout').then(() => {
//           setTimeout(() => {
//             window.location.reload()
//           }, 1500)
//         })
//       }
//     }else{
//       notification.error({
//         message: '提示',
//         description: data.error.message//'授权验证失败'
//       })
//     }
//   }
//   return Promise.reject(error)
// }
//
// // request interceptor
// service.interceptors.request.use(config => {
//   const token = Vue.ls.get(ACCESS_TOKEN)
//   if (token) {
//     config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
//   }
//   return config
// }, err)
//
// // response interceptor
// service.interceptors.response.use((response) => {
//   return response.data
// }, err)
//
// const installer = {
//   vm: {},
//   install (Vue) {
//     Vue.use(VueAxios, service)
//   }
// }
//
// export {
//   installer as VueAxios,
//   service as axios
// }
