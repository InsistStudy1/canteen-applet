import {get} from "./http";
const app = getApp();

const { $Message } = require('../static/iview/base/index')
// 时间转换
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 正则
const myReg = {
    tel: /^[1][3,4,5,7,8]\d{9}$/
};

// 判断手机号
const checkPhoneNumber = phone => {
    return myReg.tel.test(phone)
};

// 去前后空格
const trim = str => {
    return str.replace(/(^\s*)|(\s*$)/g, '');
};

// 判断是否为空
const isEmpty = str => {
    if (typeof str == 'undefined' || str == null || trim(str) == '') {
        return true;
    }
    return false;
};

// 失败全局提示
const errMsg = errMsg => {
    $Message({
        content: errMsg,
        type: 'error'
    })
};
// 失败全局提示
const sucMsg = sucMsg => {
    $Message({
        content: sucMsg,
        type: 'success'
    })
};

// 扫码
const scanCodeFun = (successCallBack = function () {} ) => {
    const app = getApp();
    wx.scanCode({
        scanType: 'qrCode', //只允许二维码
        success: res => {
            let tableNum = res.result; // 获取点餐地点编号
            get(app.api.qrCodeList, { 'code_id': tableNum }).then(res => {
                if (res.length === 0) { //如果查不到值的话，说明二维码不正确
                    wx.showModal({
                        showCancel: false,
                        title: '警告',
                        content: '您扫的二维码不正确，请重试',
                        confirmColor: '#ffcb57'
                    });
                } else {
                    let tableContent = res[0].content;
                    wx.showModal({
                        title: '提示',
                        content: `您现在在${tableContent}点餐，点击确定继续点餐（如需换位请在下单前重新扫码）`,
                        confirmColor: '#ffcb57',
                        showCancel: false,
                        success: res => {
                            app.globalData.qsCodeRes = tableContent;
                            successCallBack(tableContent);
                        }
                    });
                }
            })
        }
    })
}

// 更新用户信息
const updateUserInfo = function (userInfo) {
    const app = getApp();
    app.globalData.userInfo = userInfo;
    // 获取购物车总数量
    app.getShopCarCount();
    // 获取用户其他信息
    app.getUserDetailInfo();
};

export { formatTime, checkPhoneNumber, trim, isEmpty, errMsg, sucMsg, scanCodeFun, updateUserInfo }
