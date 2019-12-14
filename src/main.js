import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import axios from 'axios'

// 1.ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 2.导入全局样式
import './style/base.css'

// 3.导入axios，设置全局axios
Vue.prototype.$axios = axios;

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
