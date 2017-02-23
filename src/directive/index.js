import Router from 'vue-router'
let router = new Router();


export default {
  //页面返回(后退)指令
  //<div v-back>next page</div>//直接返回
  //<div v-back="function">next page</div>//如果传入一个函数,会在返回前执行此函数,且此函数返回true时,才进行返回操作

  back: {
    inserted(el, binding) {
      el.addEventListener('click', function () {
        let func = binding.value;
        if (func && func.length == 1 && typeof func == 'function') {
          func((data) => {
            if (data === true) {
              window.history.back();
            }
          });
        } else {
          window.history.back();
        }
      });
    }
  },
  //页面跳转指令 参数与 router-link 组件一样
  //参考：http://router.vuejs.org/zh-cn/api/router-link.html
  //<div v-link="'home'">next page</div>
  //<div v-link="{name: 'home', params: { userId: 123 }}">next page</div>
  //<div v-link="{path: 'register', query: { plan: 'private' }}">next page</div>
  link: {
    inserted(el, binding) {
      el.addEventListener('click', function () {
        router.push(binding.value);
      });
    }
  }
};