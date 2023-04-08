import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuetify from './plugins/vuetify'
//main.js
import {Service} from '@/utils/http/service.js'
import Chat from 'vue-beautiful-chat'


Vue.prototype.$axios=Service


Vue.config.productionTip = false


Vue.use(ElementUI);
Vue.use(Chat)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')





