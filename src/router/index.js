//导入
import Vue from 'vue';
import VueRouter from "vue-router";
import store from '@/store'
import {Message,MessageBox,Loading} from 'element-ui'

//使用
Vue.use(VueRouter);
Vue.use(Loading.directive);
const routerRePush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return routerRePush.call(this, location).catch(error => error)
}
VueRouter.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$loading = Loading.service;
//引入路由组件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Search from '@/pages/Search';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import addCartSuccess from '@/pages/AddCartSuccess';
import shopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

//配置路由
const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            name: 'home',
            path: "/home",
            meta: { title: '购物主页', show: true },
            component: Home
        },
        {
            name: 'search',
            path: "/search/:keyword?",
            meta: { title: '搜索', show: true },
            component: Search
        },
        {
            name: 'login',
            path: "/login",
            meta: { title: '登陆', show: false },
            component: Login
        },
        {
            name: 'register',
            path: "/register",
            meta: { title: '注册', show: false },
            component: Register
        },
        {
            name: 'detail',
            path: '/detail/:id',
            meta: { title: '商品详情', show: true },
            component: Detail
        },
        {
            name: 'addcart',
            path: '/addcart',
            component: addCartSuccess,
            meta: { title: '添加购物车', show: true }
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: shopCart,
            meta: { title: '购物车', show: true }
        },
        {
            name:"trade",
            path:'/trade',
            component:Trade,
            meta: {title:'订单页面',show:true}
        },
        {
            name: 'pay',
            path: "/pay",
            meta: { title: '订单支付', show: true },
            component: Pay,
        },
        {
            name:'paySuccess',
            path:'/paySuccess',
            component: PaySuccess,
            meta:{title:'支付成功',show:true}
        },
        {
            name:'center',
            path:'/center',
            component:Center,
            meta:{show:true},
            children:[
                {
                    name:'myOrder',
                    path:'myOrder',
                    component:myOrder,
                    meta:{title:'我的订单'}
                },
                {
                    name:'groupOrder',
                    path:'groupOrder',
                    component:groupOrder,
                    meta:{title:'团购订单'}
                },
                {
                    path:'/center',
                    redirect:'/center/myOrder'
                }
            ]
        },
        {
            path: '*',
            redirect: 'home'
        }
    ],
    scrollBehavior() {
        return { y: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title
    let name = store.state.login.userInfo.name
    let token = store.state.login.token
    if (token) {
        if (to.name == 'login') {
            alert('您已登录！')
            next(from)
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('login/getUserInfo')
                    next()
                } catch (error) {
                    store.dispatch('login/reqUserOut')
                    router.$message({message:'身份验证已过期，请重新登陆',type:'warning'})
                    next({name:'home'})
                }
            }
        }
    } else {
        if(to.name == 'shopcart' || to.name == 'pay' || to.name == 'myOrder'){
            next(from)
            router.$message({message:'您还没有登陆！',type:'warning'})
        }
        next()
    }
})



export default router