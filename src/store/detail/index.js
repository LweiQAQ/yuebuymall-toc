import {reqDetail,reqAddCart} from '@/api/index'
import {getNanoId} from '@/store/nanoid'
const actions = {
    async getDetail(context,skuId){
        let result = await reqDetail(skuId)
        if(result.code == 200){
            context.commit('GETDETAIL',result.data)
        }
    },
    async getAddCart(context,{skuId,skuNum}){
        let result = await reqAddCart(skuId,skuNum)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error("faile"))
        }
    }
}

const mutations = {
    GETDETAIL(state,details){
        state.details = details
    }
}

const state = {
    details:{}, 
    nanoid:getNanoId()
}

const getters = {
    categoryView(state){
        return state.details.categoryView || {}
    },
    skuInfo(state){
        return state.details.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.details.spuSaleAttrList || {}
    }   
}

    
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}