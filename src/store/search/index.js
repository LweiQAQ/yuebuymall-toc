import { reqProductList } from "@/api";
const actions = {
    async getProduct(context,params={}){
        let result = await reqProductList(params)
        if(result.code == 200){
            context.commit('GETPRODUCT',result.data)
        }
    }
};
const mutations = {
    GETPRODUCT(state,products){
        state.products = products
    }
};
const state = {
    products:{}
};
const getters = {
    attrsList(state){
        return state.products.attrsList || []
    },
    goodsList(state){
        return state.products.goodsList || []
    },
    trademarkList(state){
        return state.products.trademarkList || []
    }
    
};

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}