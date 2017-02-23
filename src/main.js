// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import directives from'./directive'


//注册全局指令
for(let key in directives){
    Vue.directive(key,directives[key]);
}
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  created(){

  }
});
