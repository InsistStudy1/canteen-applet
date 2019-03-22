import {orderData} from '../../utils/data'

Page({
    data: {
        orderList: orderData.orderList
    },
    // 评论
    comment () {
        wx.navigateTo({
            url: '/pages/comment/comment'
        })
    }
})
