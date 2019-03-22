const app = getApp();
import {checkPhoneNumber, trim} from '../../../utils/utils';
const { $Message } = require('../../../static/iview/base/index');
import {post} from "../../../utils/http";

Page({
    data: {
        telNumber: '',
        loading: false
    },
    onLoad () {
        this.getTelNumber();
    },
    changePhoneNumber (e) {
        this.setData({
            telNumber: parseInt(trim(e.detail.detail.value))
        })
    },
    // 判断是否有设置过手机号
    getTelNumber () {
        let telNumber = app.globalData.userDetailInfo.telNumber;
        if (telNumber) {
            this.setData({
                telNumber
            })
        }
    },
    // 提交修改手机号
    postPhoneNumber () {
        const telNumber = this.data.telNumber;
        if (telNumber === '' || telNumber === null || telNumber === undefined) {
            $Message({
                content: '手机号码不能为空',
                type: 'error'
            });
        } else if (!checkPhoneNumber(telNumber)) {
            $Message({
                content: '手机号码格式错误',
                type: 'error'
            });
        } else {
            console.log('提交的手机号是' + telNumber);
            // post(app.api.updateTelNumber, {telNumber}).then(res => {
                wx.showToast({
                    title: '修改成功'
                });
                wx.switchTab({
                    url: '/pages/me/me'
                });
            // });
        }
    },
})
