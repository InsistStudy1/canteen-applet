const host = 'http://192.168.199.196';
const localhostStatic = `${host}:53000`; // 静态模拟数据
const localhostDynamic = `${host}:53001`; // 动态模拟数据

const api = {
    //首页
    bannerData: `${localhostStatic}/bannerData`, // banner
    qrCodeList: `${localhostStatic}/qrCodeList`, // 二维码真伪查询
    foodRecommendList: `${localhostStatic}/foodRecommendList`, // 今日推荐
    healthRecommendList: `${localhostStatic}/healthRecommendList`, // 养生推荐
    foodList: `${localhostStatic}/foodList`, // 菜品列表

    // 订单
    getOrderInfo: `${localhostStatic}/getOrderInfo`,
    orderList: `${localhostStatic}/orderList`,

    // 购物车
    shopCarList: `${localhostStatic}/shopCarList`, // 购物车列表
    editFoodCheck: `${localhostStatic}/editFoodCheck`,// 修改菜品选择
    deleteFood: `${localhostStatic}/editFoodCheck`, // 删除菜
    editFoodNum: `${localhostStatic}/editFoodNum`,

    // 菜品详情页
    commentList: `${localhostDynamic}/commentList`, // 评论列表

    // 用户信息
    userDetailInfo: `${localhostStatic}/userDetailInfo`, // 用户详细信息
    updateTelNumber: `${localhostStatic}/updateTelNumber`, // 修改手机号

    // 评论
    commentImg: `${localhostStatic}/commentImg`, // 上传图片
    postComment: `${localhostStatic}/postComment`, // 提交评论


    // 地址
    addressList: `${localhostStatic}/addressList`, //获取地址列表
    setDefaultAddress: `${localhostStatic}/setDefaultAddress` // 设置默认地址
}

export default api
