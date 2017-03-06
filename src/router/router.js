
const Home = r => require.ensure([], () => r(require('../page/home/Home.vue')), 'home');
const Search = r => require.ensure([], () => r(require('../page/home/Search.vue')), 'home');
const Product = r => require.ensure([], () => r(require('../page/home/Product.vue')), 'home');

const Category = r => require.ensure([], () => r(require('../page/category/Category.vue')), 'category');
const CategoryList = r => require.ensure([], () => r(require('../page/category/List.vue')), 'category');

const My = r => require.ensure([], () => r(require('../page/my/My.vue')), 'my');

const Cart = r => require.ensure([], () => r(require('../page/Cart.vue')), 'cart');

const Login = r => require.ensure([], () => r(require('../page/Login.vue')), 'login');

const list = {
  routes: [{
    path: '/',
    name: 'home',
    meta: '',
    component: Home
  }, {
    path: '/home',
    name: 'home',
    meta: '',
    component: Home
  }, {
    path: '/search',
    name: 'search',
    meta: '小米商城-搜索',
    component: Search
  }, {
    path: '/category',
    name: 'category',
    meta: '小米商城-商品分类',
    component: Category
  }, {
    path: '/category/list',
    name: 'category_list',
    component: CategoryList
  },{
    path:'/product',
    name:'product',
    meta:'小米商城-商品详情',
    component:Product
  },{
    path:'/cart',
    name:'cart',
    meta:'小米商城-购物车',
    component:Cart
  },{
    path:'/login',
    name:'login',
    meta:'小米商城-登录',
    component:Login
  },{
    path:'/my',
    name:'my',
    meta:'小米商城-个人中心',
    component:My
  }]
};
export default list;