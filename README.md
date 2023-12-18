# 悦购商城 - 网上购物商城

**项目上线地址**:http://www.lweiqaq.top/mall/index.html#/home

## 项目描述

> 此项目是一个电商项目，分别完成了商品首页，商品详情页，购物车，结算模块，商品清单，登录和注册页面，用户可以注册账号并登录，选择商品进行结算支付。 

## 技术栈

#### 主要技术：

- Vue2
- webpack
- Element-UI 组件库
- Vuex 状态管理

#### 依赖库:

- axios 网络请求
- lodash 工具库
- mock 模拟响应数据
- nanoid 和 uuid 生成token

## 技术描述

- 根据设计图完成各页面的构建和布局。 使用 vue-cli  脚手架进行分模块，组件化开发。
- 封装通用组件三级联动对商品进行分类搜索。
- 使用 vue-router  进行路由的跳转及页面间数据通讯，使用路由守卫来拦截非法路由。 使用 axios进行二次封装，完成各接口请求，配合vuex进行状态管理，不同组件之间通信，将数据渲染到页面。
- 使用token进行身份验证，本地存储用户专属token，实现登录持久化，会话存储游客token，游客可以暂时把商品加入购物车。
- 利用webpack的Proxy配置代理，解决跨域问题，项目部署上线。


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
