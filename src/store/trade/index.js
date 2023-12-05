import { reqUserAddress,reqOrder } from "@/api";

const actions = {
    async getUserAddress(context){
        let result = await reqUserAddress()
        if(result.code == 200){
            context.commit('GETUSERADDRESS',result.data)
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async getOrder(context){
        let result = await reqOrder()
        if(result.code == 200){
            context.commit('GETORDER',result.data)
        }else{  
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETUSERADDRESS(state,userAddress){
        state.userAddress = userAddress
    },
    GETORDER(state,order){
        state.order = order
    }
}
const state = {
    userAddress:[],
    order:{}
}
const getters = {
    orderList(state){
        return state.order.detailArrayList || []
    }
}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}