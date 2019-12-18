//  导入axios
// import axios from 'axios'
import instance from './request.js'

// const instance = axios.create({
//     baseURL: process.env.VUE_APP_BASEURL,
//     // 跨域携带cookie
//     withCredentials: true
// });

import { getToken } from '../utils/token.js'
// 1.获取用户信息
export function userInfo() {
    return instance({
        url: '/info',
        headers: { token: getToken() }
    });
}

// 2.用户退出登录
export function logout() {
    return instance({
        url: '/logout',
        headers: { token: getToken() }
    });
}
