const app = getApp();
import {get, post} from '../../utils/http';
Page({
    data: {
        shopCarCount: 0,
        foodId: 1, // 菜品ID
        food_name: '',
        price: 0,
        sml_image: '',
        sold_num: 0,
        showMaskFlag: false, // 是否显示放大图片遮罩
        currentImgIndex: 0, // swiper 当前所在滑块 index
        MaskImgArr: [],

        commentList: [], // 评论列表
        _page: 1, // 菜品列表页码
        _limit: 5, // 一次显示数量
        load: true, // 下拉 flag，避免连续多次下拉
        loading: false, // 底部loading
        bottomFLag: false // 到底提示 Flag
    },
    onLoad (options) {
        this.setData({
            foodId: options.foodId,
            shopCarCount: app.globalData.shopCarCount
        });
        this.init();
    },
    // 初始化数据
    init () {
        this.initFoodContent();
        this.initCommentList();
    },
    // 初始化菜品内容
    initFoodContent () {
        let self = this;
        get(app.api.foodList, {
            food_id: self.data.foodId
        }).then(res => {
            let { food_name, price, sml_image, sold_num } = res[0];
            this.setData({ food_name, price, sml_image, sold_num });
        })
    },
    // 初始化评论信息
    initCommentList () {
        let self = this,
            oldCommentList = this.data.commentList,
            _page = this.data._page;

        if (self.data.load) {
            self.setData({
                load: false,
                bottomFLag: false,
                loading: true
            })
        }
        let params = {
            _page: _page,
            _limit: self.data._limit,
            food_id: this.data.foodId
        };
        get(app.api.commentList, params).then(res => {
            if (res.length === 0) { // 如果没有返回数据说明到底部了
                self.setData({
                    bottomFLag: true
                });
            }
            let commentList = oldCommentList.concat(res); // 把新数据和旧数据拼接起来
            self.setData({
                commentList,
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
    },
    // 上拉更新评论信息
    onReachBottom () {
        this.initCommentList();
    },
    // 放大图片
    showImageMask (e) {
        let { imageIndex, index } = e.currentTarget.dataset;
        let MaskImgArr = this.data.commentList[index]['comment_images'];
        this.setData({
            currentImgIndex: imageIndex,
            showMaskFlag: true,
            MaskImgArr
        });
    },
    // 隐藏遮罩
    hideImageMask () {
        this.setData({
            showMaskFlag: false
        });
    },
    // 加入购物车
    addShopCar () {
        let self = this;
        app.updateShopCarCount(1, () => {
            self.setData({
                shopCarCount: this.data.shopCarCount + 1
            })
        });
    }
});
