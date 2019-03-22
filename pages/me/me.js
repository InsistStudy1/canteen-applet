//获取应用实例
const app = getApp();

Page({
    data: {
        userInfo: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        default_address: "",
        telNumber: ""
    },
    onLoad () {
        let {default_address, telNumber} = app.globalData.userDetailInfo;
        this.setData({
            userInfo: app.globalData.userInfo,
            default_address: default_address ? default_address : '',
            telNumber: telNumber ? telNumber : ''
        });
    },
});
