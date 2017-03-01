import Vue from 'vue'
import Vuex from 'vuex'
import service from 'service'
// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
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
        return {};
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
    },
    getCartList: (state, data) => {
      state._cartList = data;
    }
  },
  actions: {
    login: context => {
      context.commit('login');
    },
    logout: context => {
      context.commit('logout');
    },
    cartList: context => {
      if (context.state._loginStatus === true) {
        service.cart_list.get().then(data => {
          let resulte = data.body.data;
          console.log(resulte);
          context.commit('getCartList', resulte);
        });
      }

    }
  }
});
