import request from "./request";
import mockRequest from "./ajaxMock"
export const reqCategoryList = () => request({url:'/product/getBaseCategoryList',method:'get'})

export const reqProductList = (params) => request({url:'/list',method:'post',data:params})

export const reqBanners = () => mockRequest({url:'/banners',method:'get'})

export const reqFloors = () => mockRequest({url:'/floors',method:'get'})

export const reqDetail = (skuId) => request({url:`/item/${ skuId }`,method:'get'})

export const reqAddCart = (skuId,skuNum) => request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

export const reqCartList = () => request({url:'/cart/cartList',method:'get'})

export const reqDelete = (skuId) => request({url:`/cart/deleteCart/${skuId}`,method:'delete'})

export const reqSetCheck = (skuId,isChecked) => request({url:`cart/checkCart/${skuId}/${isChecked}`,method:'get'})

export const reqCode = (phone) => request({url:`/user/passport/sendCode/${phone}`,method:'get'})

export const reqRegister = (data) => request({url:'/user/passport/register',data,method:'post'})

export const reqLogin = (data) => request({url:'/user/passport/login',data,method:'post'})

export const reqUserInfo = () => request({url:'/user/passport/auth/getUserInfo',method:'get'})

export const reqUserOut = () => request({url:'/user/passport/logout',method:'get'})

export const reqUserAddress = () => request({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

export const reqOrder = () => request({url:'/order/auth/trade',method:'get'})

export const submitOrder = (tradeNo,data) => request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

export const reqOrderPay = (orderId) => request({url:`/payment/weixin/createNative/${orderId}`,method:'get'}) 

export const reqPayStatus = (orderId) => request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

export const reqMyOrder = (page,limit) => request({url:`/order/auth/${page}/${limit}`,method:'get'})