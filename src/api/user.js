import instance from '../utils/request.js'

// 1.获取用户信息
export function userInfo() {
    return instance({
        url: '/info'
    });
}

// 2.用户退出登录
export function logout() {
    return instance({
        url: '/logout'
    });
}

// 3.获取用户信息列表
export function getUserList(params) {
    return instance({
        url: '/user/list',
        params
    });
}

// 4.后台创建用户
export function userAdd(data) {
    return instance({
        url: '/user/add',
        method: 'post',
        data
    });
}

// 5.修改用户状态。启用或者禁用账号
export function userstatus(data) {
    return instance({
        url: '/user/status',
        method: 'post',
        data
    });
}

// 6.用户删除接口
export function userRemove(data) {
    return instance({
        url: '/user/remove',
        method: 'post',
        data
    });
}

// 7.用户信息编辑接口
export function userEdit(data) {
    return instance({
        url: '/user/edit',
        method: 'post',
        data
    });
}
