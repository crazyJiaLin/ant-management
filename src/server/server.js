import Vue from 'vue'
import axios from 'axios'

import {Message} from 'ant-design-vue'

//配置请求根路径
axios.defaults.baseURL = 'http://47.244.197.84:10088/api/v1';

Vue.prototype.$axios = axios;

//请求拦截器
axios.interceptors.request.use(config=> {
    // console.log(config)
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
  // console.error('响应拦截器', err)
  if (err.response.status == 504) {
    Message.error('服务器被吃了⊙﹏⊙∥');
  }else if(err.response.status == 404){
    //这里进行404页面跳转
    Message.error('页面找不到了')
  } else if (err.response.status == 403) {
    Message.error('权限不足,请联系管理员!');
  }else {
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