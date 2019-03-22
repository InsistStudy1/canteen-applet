const app = getApp();
import {get, post, put, $delete} from '../../utils/http';

Page({
    data: {
        deleteFlag: false,
        action: [ // 右滑按钮组
            {
                name: '删除',
                color: '#fff',
                background: '#ed3f14',
                width: '75',
                fontsize : '34',
                loading: true
            }
        ],
        shopCarList: [], //购物车列表
    },
    onLoad () {
        this.getShopCarList();
    },
    getShopCarList () {
        get(app.api.shopCarList).then(res => {
            let shopCarList = res;
            this.setData({
                shopCarList: shopCarList
            });
            shopCarList.forEach((item, index) => {
                this.checkCanteenType(index);
            });
        })
    },
    parseShopCarList (cartList) {
        // let shopCarList = []; // 饭堂列表
        // cartList.filter(item => {
        //     let canteenVal = item.canteenVal;
        //     if (!shopCarList[canteenVal]) {
        //         shopCarList[canteenVal] = [item];
        //     } else {
        //         shopCarList[canteenVal].push(item)
        //     }
        // });
        // console.log(shopCarList);
    },
    // 修改菜品选中状态
    editFoodCheck (e) {
        let foodId = parseInt(e.detail.value);
        let {foodIndex, canteenIndex} = e.currentTarget.dataset; // 菜品编号，饭堂编号
        let shopCarList = this.data.shopCarList;
        let checkFlag = !e.currentTarget.dataset.checked; // 是否选中
        // put(app.api.editFoodCheck, {foodId, checkFlag}).then(res => {
            console.log(`你把菜品编号为 ${foodId} 的选中状态更改为 ${checkFlag}`);
            // 请求接口成功后执行
            shopCarList[canteenIndex]['food_list'][foodIndex]['is_check'] = checkFlag;
            this.setData({
                shopCarList
            });
            this.checkCanteenType(canteenIndex);

        // });
    },
    // 全选/全不选一个类别
    editCanteenTypeCheck (e) {
        let shopCarList = this.data.shopCarList;
        let {canteenIndex, canteenId, checked} = e.currentTarget.dataset;
        checked = !checked;
        let foodList = shopCarList[canteenIndex]['food_list'];
        shopCarList[canteenIndex]['is_checked'] = checked; // 改变类别 check

        foodList.forEach(item => { // 当前类别的所有菜都改成一样的check
            item.is_check = checked;
        });
        console.log(`你把饭堂类型编号为 ${canteenId} 的所有菜品选中状态更改为 ${checked}`);
        this.setData({
            shopCarList
        });
    },
    // 选中/不选中 饭堂类型
    checkCanteenType (canteenIndex) {
        let shopCarList = this.data.shopCarList;
        let foodList = shopCarList[canteenIndex]['food_list'];
        let checkIsTrueLength = foodList.filter(v => v.is_check).length; // 当前类别选中数量
        shopCarList[canteenIndex]['is_checked'] = checkIsTrueLength === foodList.length;
        this.setData({
            shopCarList
        });
    },
    // 删除商品
    deleteFoodItem(e) {
        let foodId = e.currentTarget.dataset.foodId;
        console.log('要删除的菜品ID为：' +  foodId);
        app.updateShopCarCount(-1); // 修改购物车数量
        // $delete(app.api.deleteFood, {foodId}).then(res => {})
    },
    // 修改商品数量
    editFoodNum (e) {
        let shopCarList = this.data.shopCarList;
        let {canteenIndex, foodIndex, foodId} = e.currentTarget.dataset;
        let food = shopCarList[canteenIndex]['food_list'][foodIndex]; // 获取商品
        let number = e.detail.value;
        food.number = number; // 修改商品数量
        console.log(`你把商品编号为 ${foodId} 的数量修改为 ${ number }`);
        this.setData({
            shopCarList
        })
        // let food_id = this.data.food_id;
        // put(app.api.editFoodNum, {foodId})
    },
    // 跳转到结算页面
    postOrder (e) {
        let {canteenId, canteenIndex} = e.currentTarget.dataset; // 饭堂类型编号，饭堂类型索引
        let isCheckLength = this.data.shopCarList[canteenIndex]['food_list'].filter(v => v.is_check).length; // 该类型选中数量
        if (isCheckLength === 0) {
            return wx.showModal({
                title: '提示',
                content: '您在该饭堂没有选中商品哦！',
                showCancel: false,
                confirmColor: app.globalData.subjectColor
            });
        }
        wx.navigateTo({
            url: '/pages/order/post-order/post-order?canteenId=' + canteenId
        });
    },
    // 跳转菜品详情页
    skipFoodDetails (e) {
        let foodId = e.currentTarget.dataset.foodId; // 获取商品 ID
        wx.navigateTo({
            url: '/pages/food-details/food-details?foodId=' + foodId,
        });
    }
});
