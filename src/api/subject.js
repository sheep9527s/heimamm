// import instance from './request.js'

import axios from 'axios'
import { getToken } from '../utils/token.js'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
});


// 1.获取学科列表信息接口
export function subjectList(){
    return instance({
        url:'/subject/list',
        method:'get',
        headers:{'token':getToken()}
    });
}