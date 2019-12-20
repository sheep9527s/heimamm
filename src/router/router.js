import Vue from 'vue';
// 导包
import vueRouter from 'vue-router';
// 1. 组件
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
import chart from '../views/index/chart/chart.vue'
import user from '../views/index/user/user.vue'
import question from '../views/index/question/question.vue'
import enterprise from '../views/index/enterprise/enterprise.vue'
import subject from '../views/index/subject/subject.vue'

// 2. api(请求)
import { userInfo } from '../api/user.js'

// 3. 工具文件
import { getToken, removeToken } from '../utils/token.js'
import store from '../store/store.js'

// 4.element-ui
import { Message } from 'element-ui'

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
                path: 'chart',
                component: chart
            },
            {
                path: 'user',
                component: user
            },
            {
                path: 'question',
                component: question
            },
            {
                path: 'enterprise',
                component: enterprise
            },
            {
                path: 'subject',
                component: subject
            },
        ]
    }
];

// 实例化
let router = new vueRouter({
    routes
});

// 路由白名单
const whilePaths = ['/login'];
// 新➕--> 导航守卫
router.beforeEach((to, from, next) => {
    // 除了登录页面，其他页面都要登录后才能访问
    // 1.排除不用登录的页面
    if (whilePaths.includes(to.path.toLocaleLowerCase()) === false) {

        // 2.判断token是否为空
        if (!getToken()) {//空
            Message.error('请先登录，在访问！！！！');
            next('/login');
        } else {
            //3. 判断用户信息是否匹配(token是否正确)
            userInfo().then(res => {
                if (res.code === 200) {
                    // 赋值用户信息
                    store.state.userInfo = res.data;
                    // 用户头像
                    store.state.userInfo.avatar = process.env.VUE_APP_BASEURL + '/' + store.state.userInfo.avatar;
                    next();
                } else if (res.code === 206) {
                    Message.error('小样，就知道会伪造token，滚犊子');
                    removeToken();
                    next('/login');
                }
            });
        }
    } else {
        next();
    }
});

// 注入到vue实例
// 暴露出去
export default router;
