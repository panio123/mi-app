import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const Home = r => require.ensure([], () => r(require('../page/home/Home.vue')), 'home');
const Search = r => require.ensure([], () => r(require('../page/home/Search.vue')), 'home');
const Category = r => require.ensure([], () => r(require('../page/category/Category.vue')), 'home');

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      meta: '',
      component: Home
    },{
      path: '/home',
      name: 'home',
      meta: '',
      component: Home
    },{
      path: '/search',
      name: 'search',
      meta: '小米商城-搜索',
      component: Search
    },{
      path: '/category',
      name: 'category',
      meta: '小米商城-搜索',
      component: Category
    }
  ]
})
