import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

const service = {
  homeList: Vue.resource('static/json/home.json')
};

export default service
