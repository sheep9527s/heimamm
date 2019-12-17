import Vue from 'vue';
// 导包
import vueRouter from 'vue-router';
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
import subject from '../views/index/children/subject.vue'
import user from '../views/index/children/user.vue'
// 用包
Vue.use(vueRouter);
// 路由规则
const routes = [
    {
        path: '/login',
        component: login
    },
    {
        path: '/index',
        component: index,
        children: [
            {
                path: 'subject',
                component: subject
            },
            {
                path: 'user',
                component: user
            }
        ]
    }
];
// 实例化
let router = new vueRouter({
    routes
});
// 注入到vue实例
// 暴露出去
export default router;
