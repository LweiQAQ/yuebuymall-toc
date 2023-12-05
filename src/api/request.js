import axios from 'axios'
import nprogress from 'nprogress';
import "nprogress/nprogress.css"
import store from '@/store/index'
//创建一个axios实例
const request = axios.create({
    //基础路径，每次调用封装请求都会自动设置路径为/api
    baseURL:'/api',
    //请求超时时间
    timeout:5000
})

//请求拦截
request.interceptors.request.use((config)=>{
    nprogress.start();
    config.headers.userTempId = store.state.detail.nanoid
    if(store.state.login.token){
        config.headers.token = store.state.login.token
    }
    return config;
})
//响应拦截器
request.interceptors.response.use((res) => {
    nprogress.done();
    return res.data
},(error) => {
    return Promise.reject(new Error('faile'));
})



export  default request;