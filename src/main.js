import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import TypeNav from '@/pages/Home/TypeNav';
import store from './store';
import '@/mock/mockServer';
import 'swiper/css/swiper.css';
import SearchPage from '@/pages/Search/SearchPage';
import * as API from '@/api';
import {Button, Alert,Message} from 'element-ui';
import xly from '@/assets/xly.gif';
import lazyLoad from 'vue-lazyload'
import test from '@/test/test'
Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(SearchPage.name,SearchPage)
Vue.component(Button.name,Button)
Vue.component(Alert.name,Alert)
Vue.use(lazyLoad,{
  loading:xly
})

Vue.use(test,{
  name:'tests'
})
new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    Vue.prototype.$message = Message
  }
})


