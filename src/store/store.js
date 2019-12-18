import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 实例
const store = new Vuex.Store({
    // Vue实例中的data
    state: {
        // 1.用户信息
        userInfo: {}
    }
})

// 暴露出去
export default store;
