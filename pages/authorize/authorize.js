const app = getApp()
import { login } from '../../utils/http'

Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    // 点击授权登录操作
    bindGetUserInfo (e) {
        console.log(e);
        if (e.detail.userInfo) {
            // 用户点了允许按钮
            login().then(res => {
                wx.switchTab({
                    url: '/pages/index/index'
                });
            });


            // 插入登录信息到数据库
            // wx.request({
            //     url: app.globalData.api.addUser,
            //     data: {
            //         openid: app.globalData.openid,
            //         nickName: e.detail.userInfo.nickName,
            //         avatarUrl: e.detail.userInfo.avatarUrl,
            //         province: e.detail.userInfo.province,
            //         city: e.detail.userInfo.city
            //     },
            //     header: {
            //         'content-type': 'application/json'
            //     },
            //     success: function (res) {
            //         //从数据库获取用户信息
            //         // that.queryUsreInfo();
            //         console.log("插入小程序登录用户信息成功！");
            //     }
            // })
        } else if (e.detail.errMsg === 'getUserInfo:fail Error: getaddrinfo ENOENT servicewechat.com:443') {
            wx.showModal({
                title: '警告',
                content: '网络异常',
                confirmText: '确认',
                confirmColor: '#179B16',
                showCancel: false
            })
        } else {
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                confirmText: '返回授权',
                confirmColor: '#179B16',
                showCancel: false
            })
        }
    }
});
