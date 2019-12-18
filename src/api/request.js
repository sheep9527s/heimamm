//  导入axios
import axios from 'axios'
// import store from '../store/store.js'
import { getToken } from '../utils/token.js'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
});

// // window.console.log(store.state);
// // window.console.log(store.state.userInfo);
// // 1.设置请求的拦截器
// axios.interceptors.request.use(config => {

// window.console.log(store.state);
//     //如果有用户信息，就设置请求头token
//     if (store.state.userInfo) {
//         config.headers.hhtoken = getToken();
//         // config.headers.token = getToken();
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// // 2.设置响应的拦截器
// axios.interceptors.response.use(response => {
//     return response;
// }, error => {
//     return Promise.reject(error);
// });

// // 3.暴露 创建的axios对象
// export default instance;

// / 拦截器
// Add a request interceptor

axios.interceptors.request.use(
  function(config) {
    config.headers.token = getToken();
    // // 设置token
    // if (store.state.userInfo) {
    //     // 如果有用户信息 就携带token 
        
    // }
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// 返回 创建的axios对象
export default instance;


