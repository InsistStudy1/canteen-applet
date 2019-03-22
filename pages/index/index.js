const app = getApp();
import { index } from '../../utils/data';
import { scanCodeFun } from '../../utils/utils';
import { get } from '../../utils/http';
Page({
    data: {
        bannerData: [], // banner 数据
        foodRecommendList: [], // 菜品推荐
        healthRecommendList: [], // 养生推荐
        canteenType: index.canteenType, // 饭堂类别（数组）
        canteenFloorType: index.canteenFloorType, // 饭堂楼层类别（对象）
        canteenTypeArray: [], // 饭堂选择器数组
        canteenVal: '选择饭堂', // 选中饭堂

        foodList: [], // 菜品列表
        _page: 1, // 菜品列表页码
        _limit: 5, // 一次显示数量
        load: true, // 下拉 flag，避免连续多次下拉
        loading: false, // 底部loading
        bottomFLag: false, // 到底提示 Flag
        sort: false,

        qrCodeList: index.qrCodeList // 二维码编号对应饭堂
    },
    onLoad () {
      this.init();
    },
    // 初始化所有数据
    init () {
        this.initBannerData(); // 初始化 banner 数据
        this.initCanteenTypeArray(); //初始化选择饭堂数据
        this.initFoodRecommendList(); //初始化今日推荐数据
        this.initHealthRecommendList(); //初始化养生推荐数据
        this.getFoodList(); //获取菜品列表数据
    },
    // 初始化 banner 数据
    initBannerData () {
        let self = this,
            bannerData = wx.getStorageSync('bannerData');

        if (bannerData) { // 如果本地有缓存，优先调用缓存，提前渲染
            self.setData({ bannerData });
        }
        get(app.api.bannerData).then(res => {
            bannerData = res;
            self.setData({
                bannerData: res
            });
            wx.setStorageSync('bannerData', bannerData);
        });
    },
    // 初始化今日推荐数据
    initFoodRecommendList () {
        let self = this,
            foodRecommendList = wx.getStorageSync('foodRecommendList');

        if (foodRecommendList) { // 如果本地有缓存，优先调用缓存，提前渲染
            self.setData({ foodRecommendList });
        }
        get(app.api.foodRecommendList).then(res => {
            foodRecommendList = res;
            wx.setStorageSync('foodRecommendList', foodRecommendList);
            self.setData({
                foodRecommendList: res
            });
        });
    },
    // 初始化养生推荐数据
    initHealthRecommendList () {
        let self = this,
            healthRecommendList = wx.getStorageSync('healthRecommendList');

        if (healthRecommendList) { // 如果本地有缓存，优先调用缓存，提前渲染
            self.setData({ healthRecommendList });
        }
        get(app.api.healthRecommendList).then(res => {
            healthRecommendList = res;
            wx.setStorageSync('healthRecommendList', healthRecommendList);
            self.setData({
                healthRecommendList: res
            });
        });
    },
    // 获取菜品列表数据
    getFoodList (canteenVal, sort) {
        let self = this,
            oldFoodList = self.data.foodList,
            _page = self.data._page;
        if (self.data.load) { // 防止重复拉拽
            self.setData({
                load: false,
                bottomFLag: false,
                loading: true
            });
            let params = {
                _page: _page,
                _limit: self.data._limit
            };
            if (canteenVal) { // 如果传入饭堂类别，发送饭堂楼层
                params.canteenVal = canteenVal;
            }
            if (sort) {
                params._sort = 'sold_num';
                params._order = 'desc';
            }

            get(app.api.foodList, params).then(res => {
                if (res.length === 0) { // 如果没有返回数据说明到底部了
                    return self.setData({
                        bottomFLag: true
                    });
                }
                let foodList = oldFoodList.concat(res); // 把新数据和旧数据拼接起来
                self.setData({
                    foodList,
                    _page: _page + 1,
                    load: true,
                    loading: false
                });
            }).catch(err => {
                wx.showModal({
                    title: '提示',
                    content: '数据异常',
                    icon: 'none'
                });
            });
        }
    },
    // 按销量排序
    sortSold () {
        let sort = !this.data.sort;
        let canteenVal = this.data.canteenVal;
        let newCanteenVal = (canteenVal == '选择饭堂' || canteenVal == '全部') ? null : canteenVal;
        this.setData({
            sort,
            "_page": 1,
            foodList: []
        });
        this.getFoodList(newCanteenVal, sort);
    },
    // 上拉添加菜品列表
    onReachBottom () {
        let canteenVal = this.data.canteenVal;
        let newCanteenVal = (canteenVal == '选择饭堂' || canteenVal == '全部') ? null : canteenVal;
        this.getFoodList(newCanteenVal, this.data.sort);
    },
    // 下拉刷新
    onPullDownRefresh () {
        this.init();
        wx.stopPullDownRefresh();//关闭下拉刷新
    },
    // 扫码
    scanCode () {
        scanCodeFun()
    },
    // 初始化选择饭堂数据
    initCanteenTypeArray () {
        // 单击版
        this.setData({
            canteenTypeArray: [this.data.canteenType, this.data.canteenFloorType[this.data.canteenType[0]]]
        });
    },
    // 修改饭堂楼层
    changCanteenType (e) {
        if (e.detail.column === 0) {
            const canteenType = this.data.canteenType;
            const floorType = this.data.canteenFloorType[this.data.canteenType[e.detail.value]];
            this.setData({
                canteenTypeArray: [canteenType, floorType]
            });
        }

    },
    // 修改饭堂选择器
    changCanteenVal (e) {
        const canteenType = this.data.canteenTypeArray[0][e.detail.value[0]]; // 饭堂
        const floorType = this.data.canteenTypeArray[1][e.detail.value[1]]; //楼层
        let canteenVal = canteenType == '全部' ? null : canteenType.substring(1, 3) + floorType; // 如果 canteenVal 为全部的话，不用发送筛选楼层值
        if (canteenVal == null) {
            this.setData({
                canteenVal: '全部'
            });
        } else {
            this.setData({ canteenVal });
        }


        // 重新获取数据，把页码和列表初始化
        this.setData({
            "_page": 1,
            foodList: []
        });
        this.getFoodList(canteenVal, this.data.sort);
    },
    // 跳转菜品详情页
    skipFoodDetails (e) {
        let foodId = e.currentTarget.dataset.foodId; // 获取商品 ID
        wx.navigateTo({
            url: '/pages/food-details/food-details?foodId='+foodId,
        });
    }
});
