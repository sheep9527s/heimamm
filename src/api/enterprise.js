import instance from '../utils/request.js';


// 1.获取企业列表信息接口
export function getEnterpriseList(params) {
    return instance({
        url: '/enterprise/list',
        params
    });
}

// 2.企业添加接口
export function enterpriseAdd(data) {
    return instance({
        url: '/enterprise/add',
        method: 'post',
        data
    });
}

// 3.修改企业状态。启用或者禁用账号
export function enterpriseStatus(data) {
    return instance({
        url: '/enterprise/status',
        method: 'post',
        data
    });
}

// 4.企业删除接口
export function enterpriseRemove(data) {
    return instance({
        url: '/enterprise/remove',
        method: 'post',
        data
    });
}

// 5.企业编辑接口
export function enterpriseEdit(data) {
    return instance({
        url: '/enterprise/edit',
        method: 'post',
        data
    });
}