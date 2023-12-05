import { reqCategoryList,reqBanners,reqFloors } from "@/api";


const actions = {
    async categoryList(context){
        let result = await reqCategoryList()
        if(result.code == 200){
            context.commit('CATEGORYLIST',result.data)
        }
    },
    async getBannersList(context){
        let result = await reqBanners()
        if(result.code == 200){
            context.commit('GETBANNERSLIST',result.data)
        }
    },
    async getFloorsList(context){
        let result = await reqFloors()
        if(result.code == 200){
            context.commit('GETFLOORSLIST',result.data)
        }
    }
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERSLIST(state,banners){
        state.banners = banners
    },
    GETFLOORSLIST(state,floors){
        state.floors = floors
    }
};
const state = {categoryList:[],banners:[],floors:[]};
const getters = {};



export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}