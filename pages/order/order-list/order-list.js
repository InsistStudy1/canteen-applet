const app = getApp();
import {get} from '../../../utils/http';

Page({
    data: {
        orderList: []
    },
    onLoad () {
        this.getOrderList();
    },
    getOrderList () {
        get(app.api.orderList).then(res => {
            this.setData({
                orderList: res
            });
        });
    },
    // 跳转评论页面
    comment () {
        wx.navigateTo({
            url: '/pages/comment/comment'
        });
    },
    skipOrderInfo () {
        wx.navigateTo({
            url: '/pages/order/select-order-info/select-order-info'
        });
    }
});
