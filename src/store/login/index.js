import { reqLogin,reqUserInfo,reqUserOut } from "@/api";
import { setToken,getToken } from "../token/token";

const actions = {
    async getToken(context,user){
        let result = await reqLogin(user)
        if(result.code == 200){
            context.commit('GETTOKEN',result.data.token)
            setToken(result.data.token)
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async getUserInfo(context){
        let result = await reqUserInfo()
        if(result.code == 200){
            context.commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async reqUserOut(context){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        await reqUserOut()
        context.commit('CLEAR')
    }
}
const mutations = {
    GETTOKEN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem('token')
    }
}
const state = {
    token:getToken(),
    userInfo:{}
}
const getters = {}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}