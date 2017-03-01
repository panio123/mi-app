import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
const productCode = [3525, 4082, 4484, 4520, 4694, 4696, 4697];
const service = {
  getProduct: function (id) {
    let ok,
      _id;
    productCode.forEach(code => {
      if (id == code) {
        ok = true;
      }
    });
    if (ok === true) {
      _id = id;
    } else {
      _id = productCode[Math.round(Math.random() * 6)];
    }
    return Vue.resource('static/json/product_' + _id + '.json');
  },
  homeList: Vue.resource('static/json/home.json'),
  homeList2: Vue.resource('static/json/home2.json'),
  search_default: Vue.resource('static/json/search_default.json'),
  word_list: Vue.resource('static/json/word_list.json'),
  category: Vue.resource('static/json/category.json'),
  category_list: Vue.resource('static/json/category_list.json'),
  recommend: Vue.resource('static/json/recommendBlank.json'),
  cart_list: Vue.resource('static/json/cart.json')
};

export default service
