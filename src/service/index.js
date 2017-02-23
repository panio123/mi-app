import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

const service = {
  homeList: Vue.resource('static/json/home.json'),
  homeList2: Vue.resource('static/json/home2.json'),
  search_default: Vue.resource('static/json/search_default.json')
};

export default service
