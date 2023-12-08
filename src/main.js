import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import TypeNav from '@/pages/Home/TypeNav';
import store from './store';
import '@/mock/mockServer';
import 'swiper/css/swiper.css';
import SearchPage from '@/pages/Search/SearchPage';
import * as API from '@/api';
import {Button, Alert,Message,Input,Form,FormItem,Checkbox} from 'element-ui';
import xly from '@/assets/xly.gif';
import lazyLoad from 'vue-lazyload';




Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(SearchPage.name,SearchPage)
Vue.component(Button.name,Button)
Vue.component(Alert.name,Alert)
Vue.component(Input.name,Input)
Vue.component(Form.name,Form)
Vue.component(FormItem.name,FormItem)
Vue.component(Checkbox.name,Checkbox)
Vue.use(lazyLoad,{
  loading:xly
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


