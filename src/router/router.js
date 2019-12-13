import Vue from 'vue';
// 导包
import vueRouter from 'vue-router';
import login from '../views/login/login.vue'
// 用包
Vue.use(vueRouter);
// 路由规则
const routes = [
    {path:'/login',
    component:login}
];
// 实例化
let router = new vueRouter({
    routes
});
// 注入到vue实例
// 暴露出去
export default router;
