import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

const service = {
  getProduct:function(id){
    return Vue.resource('static/json/product_'+id+'.json');
  },
  homeList: Vue.resource('static/json/home.json'),
  homeList2: Vue.resource('static/json/home2.json'),
  search_default: Vue.resource('static/json/search_default.json'),
  word_list: Vue.resource('static/json/word_list.json'),
  category:Vue.resource('static/json/category.json'),
  category_list:Vue.resource('static/json/category_list.json')
};

export default service
