//  导入axios
import axios from 'axios'
import store from '../store/store.js'
import { getToken } from '../utils/token.js'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
});

// 1.设置请求的拦截器
axios.interceptors.request.use(config => {
    //如果有用户信息，就设置请求头token
    if (store.state.userInfo) {
        config.headers.token = getToken();
    }
    return config;
},error=>{
    return Promise.reject(error);
});
// 2.设置响应的拦截器
axios.interceptors.response.use(response=>{
  return response;
},error=>{
    return Promise.reject(error);
});

// 3.暴露 创建的axios对象
export default instance;


