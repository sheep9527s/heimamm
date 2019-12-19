import instance from '../utils/request.js'

//  导入axios
// 1.获取学科列表信息接口
export function subjectList(params) {
    return instance({
        url: '/subject/list',
        method: 'get',
        params
    });
}

// 2.学科编辑接口
export function subjectEdit(data) {
    return instance({
        url: '/subject/edit',
        method: 'post',
        data
    });
}

// 3.修改学科状态。启用或者禁用账号
export function subjectEditStatus(data) {
    return instance({
        url: '/subject/status',
        method: 'post',
        data
    });
}

// 4.学科删除接口
export function subjectDel(data) {
    return instance({
        url: '/subject/remove',
        method: 'post',
        data
    });
}
// 4.学科新增接口
export function subjectAdd(data) {
    return instance({
        url: '/subject/add',
        method: 'post',
        data
    });
}
