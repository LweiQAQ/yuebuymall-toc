import {reqCode,reqRegister} from '@/api/index'

const actions ={
    async getCode(context,phone){
        let result = await reqCode(phone)
        if(result.code == 200){
            context.commit('GETCODE',result.data)
            return result.data
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async setUser(context,user){
        let result = await reqRegister(user)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(result.message)
        }
    }
}
const mutations = {
    GETCODE(state,code){ 
        state.code = code
    }
}
const state = {
    code:''
}
const getters = {}


export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}