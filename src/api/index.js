//  导入axios
import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
});

// 1.获取用户信息
export function userInfo(token){
    return instance({
        url:'/info',
        headers:{token}
    });
}