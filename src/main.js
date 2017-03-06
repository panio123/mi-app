// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import directives from'./directive'
import  { LoadingPlugin,ToastPlugin } from 'vux'

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

//注册全局指令
for(let key in directives){
    Vue.directive(key,directives[key]);
}
window.App = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  created(){
    let status = window.localStorage.getItem('mi_app_loginstatus');
    if(status&&status === '1'){
      this.$store.commit('login');
      this.$store.dispatch('cartList');
    }
  }
});
