import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'

const Home = r => require.ensure([], () => r(require('../page/home/Home.vue')), 'home');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
