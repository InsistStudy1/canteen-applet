const app = getApp();
import { scanCodeFun } from '../../../utils/utils';
import { get, post } from '../../../utils/http';

Page({
    data: {
        currentOrderType: 'take-out',
        qsCodeRes: '',
        canteenId: 0,
        orderInfo: {},
        addressInfo: {},
        defaultAddressFlag: false
    },
    onLoad (options) {
        console.log('你现在在提交饭堂类型编号为' + options.canteenId + '的订单');
        // 绑定订单编号
        this.setData({
            canteenId: options.canteenId
        });
        this.checkIsSceneOrder(); // 判断用户是否扫码获取桌号
        this.getOrderInfo(); // 获取订单信息
    },
    onShow () {
        this.getDefault(); // 判断用户是否有默认地址
    },
    // 获取订单信息
    getOrderInfo () {
        // 传递饭堂楼层类型 ID 返回 此用户购物车内此饭堂所有勾选的商品形成的订单
        get(app.api.getOrderInfo, { canteenId: this.data.canteenId }).then(res => {
            this.setData({
                orderInfo: res
            })
        })
    },
    // 判断用户是否扫码获取桌号
    checkIsSceneOrder () {
        let qsCodeRes = app.globalData.qsCodeRes;
        if (qsCodeRes) {
            this.setData({
                qsCodeRes,
                currentOrderType: 'scene-order'
            })
        }
    },
    // 获取用户默认地址
    getDefault () {
        let default_address = app.globalData.userDetailInfo.default_address;
        if (default_address) {
            this.setData({
                addressInfo: default_address,
                defaultAddressFlag: true
            });
        } else {
            this.setData({
                defaultAddressFlag: false
            })
        }
    },
    // 扫码选
    scanCode () {
        scanCodeFun((qsCodeRes) => {
            this.setData({
                qsCodeRes
            })
        });
    },
    // 切换点餐方式
    switchOrderType ({ detail }) {
        this.setData({
            currentOrderType: detail.key
        });
    },
    // 提交订单
    postOrder () {
        if (Object.keys(this.data.addressInfo).length == 0){
            return wx.showToast({
                title: '请确认收货地址',
                icon: 'none'
            })
        }
        let {order_type, canteenId} = this.data;
        let params = {
            order_type,
            canteenId
        };
        if (this.data.currentOrderType == 'scene-order') { // 现场点餐
            params.qsCodeRes = this.data.qsCodeRes;
        }
        console.log('您要提交的数据为' +  params + 'take-out 代表外卖点餐，scene-order 代表现场点餐');
        console.log('如果是外卖点餐的话，发送点餐类型为外卖点餐和饭堂楼层ID，如果是现场点餐需要加多餐桌地点');
        console.log('后端根据这两个值查找用户购物车对应饭堂楼层的所有选中的菜品，放到订单表中');
        // post(app.api.postOrder, params).then(res => {
        //
        // })
    }
});
