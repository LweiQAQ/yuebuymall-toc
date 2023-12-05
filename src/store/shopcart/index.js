import {reqCartList,reqDelete,reqSetCheck} from '@/api/index'
const actions = {
    async getCartList(context){
        let result = await reqCartList()
        if(result.code == 200){
            context.commit('GETCARTLIST',result.data)
        }
    },
    async delSku(context,skuId){
        let result = await reqDelete(skuId)
        if(result.code == 200){
           return '删除成功'
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    async setCheck(context,{skuId,isChecked}){
        let result = await reqSetCheck(skuId,isChecked)
        if(result.code == 200){
           return '删除成功'
        }else{
            return Promise.reject(new Error("faile"))
        }
    }
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const state = {
    cartList:[]
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
}


export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}