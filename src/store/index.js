import Vue from 'vue'
import Vuex from 'vuex'
import service from 'service'
import {
  createdNewGoods,
  addGoods,
  updateList,
  saveCartList
} from './common'
import {
  LoadingPlugin,
  ToastPlugin
} from 'vux'

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    _loginStatus: false,
    _cartList: ''
  },
  getters: {
    getLoginStatus: state => {
      return state._loginStatus;
    },
    getCartList: state => {
      if (state._loginStatus !== true) {
        return '';
      }
      return state._cartList;
    }
  },
  mutations: {
    login: state => {
      state._loginStatus = true;
      window.localStorage.setItem('mi_app_loginstatus', 1);
    },
    logout: state => {
      state._loginStatus = false;
      window.localStorage.removeItem('mi_app_loginstatus');
    },
    getCartList: (state, data) => {
      state._cartList = data;
    },
    checkGoods: (state, item) => {
      // if (item.is_available === true) {
      //   state._cartList.totalSelGoods -= item.num;
      //   state._cartList.productMoneySelGoods -= item.subtotal;
      // } else {
      //   state._cartList.totalSelGoods += item.num;
      //   state._cartList.productMoneySelGoods += item.subtotal;
      // }
      item.is_available = !item.is_available;
      updateList(state._cartList);
      // state._cartList.productMoneySelGoods = new Number(state._cartList.productMoneySelGoods.toFixed(2)).valueOf();
    },
    changeGoodsNum: (state, payload) => {
      let price = new Number(payload.item.price),
        n = payload.num - payload.item.num,
        p = n * price;
      payload.item.num = payload.num;
      payload.item.subtotal += p;
      if (payload.item.is_available) {
        state._cartList.totalSelGoods += n;
        state._cartList.productMoneySelGoods += p;
      }
      saveCartList(state._cartList);
    },
    createdNewGoods: (state, newGoods) => {
      state._cartList.items.push(newGoods);
      updateList(state._cartList);
      Vue.$vux.toast.show({
        text: '添加成功',
        position: 'bottom'
      });
    },
    addGoods: (state, payload) => {
      addGoods(state._cartList, payload.item, payload.num);
      saveCartList(state._cartList);
    },
    delGoods: (state, index) => {
      state._cartList.items.splice(index, 1);
      updateList(state._cartList);
    }
  },
  actions: {
    login: context => {
      Vue.$vux.loading.show({
        text: '登录中...'
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('login');
          Vue.$vux.loading.hide();
          resolve();
        }, 500);
      });

    },
    cartList: context => {
      if (context.state._loginStatus === true && !context.state._cartList) {
        let list = window.localStorage.getItem('mi_app_cart_list');
        if (list) {
          context.commit('getCartList', JSON.parse(list));
          return;
        }
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            service.cart_list.get().then(data => {
              let resulte = data.body.data;
              context.commit('getCartList', resulte);
              resolve();
            });
          }, 800);
        });
      }
    },
    appendNewGoods: (context, payload) => {
      return new Promise((resolve, reject) => {
        if (context.state._loginStatus === false) {
          context.dispatch('login').then(() => {
            context.dispatch('cartList').then(() => {
              context.dispatch('startAppendNewGoods', payload);
              resolve();
            });
          });
        } else {
          context.dispatch('startAppendNewGoods', payload);
          setTimeout(() => {
            resolve();
          }, 200);
        }
      });
    },
    startAppendNewGoods: (context, payload) => {
      let ok = false,
        newGoods;
      Vue.$vux.loading.show({
        text: '添加至购物车'
      });
      context.state._cartList.items.forEach((item) => { //如果购物车已经有了，直接增加一个
        if (item.commodity_id === payload.commodityId) {
          console.log(item.commodity_id, payload.commodityId);
          context.commit('addGoods', {
            item
          });
          ok = true;
        }
      });
      if (ok === false) { //如果没有，则获取数据，新增一下，注：未收录的产品，会随机返回一条数据
        service.getProduct(payload.id).get().then(data => {
          let result = data.body.data;
          result.commodity_list.forEach(item => {
            if (item.commodity_id === payload.commodityId) {
              item.product_id = payload.id;
              newGoods = createdNewGoods(item);
            }
          });
          context.commit('createdNewGoods', newGoods);
        });
      }
      Vue.$vux.loading.hide();
    }
  }
});
