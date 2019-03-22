import {checkPhoneNumber, isEmpty, errMsg} from '../../../utils/utils';
const app = getApp();
import {get, post, put} from '../../../utils/http';
Page({
    data: {
        addressId: undefined,
        addressList: {
        },
        gender: 0
    },
    onLoad (options) {
        // 获取 addressId 查看是否存在，存在代表修改，获取数据改变addressList
        let addressId = options.addressId;
        if (addressId) {
            wx.setNavigationBarTitle({
                title: '修改地址'
            });
            console.log('要修改的地址 ID 为：' + addressId);
            this.data.addressId = addressId;
            this.selectAddress(addressId);
        }
        this.authorizeLocation();
    },
    // 请求地址授权
    authorizeLocation () {
        wx.getSetting({
            success: res => {
                if (!res.authSetting['scope.userLocation']) { // 如果用户未授权获取地址，弹框
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success: res => {

                        },
                        fail: err => {
                        }
                    })
                }
            }
        });
    },
    // 根据地址ID查询地址
    selectAddress (address_id) {
        get(app.api.addressList, {address_id}).then(res => {
            this.setData({
                addressList: res[0]
            });
        })
    },
    // 修改性别
    changeGender (e) {
        let gender = e.target.dataset.gender;
        this.setData({
            gender
        });
    },
    // 提交添加地址
    postAddAddress (e) {
        const formData = e.detail.value;
        const gender = this.data.addressList.gender;
        if (isEmpty(formData.realName)) { return errMsg('联系人不能为空'); }
        else if (isEmpty(formData.phone)) { return errMsg('手机号码不能为空'); }
        else if (isEmpty(formData.address)) { return errMsg('收获地址不能为空'); }
        else if (isEmpty(formData.detailAddress)) { return errMsg('详细地址不能为空'); }
        formData.gender = gender;
        formData.is_default = true;

        let addressId = this.data.addressId;
        console.log('您提交的地址数据为：', formData);
        if (addressId) { // 判断 addressId 是否存在，存在即修改，不存在添加
            // put(app.api.addressList + '?address_id=' + addressId, formData).then(res => {
            //
            // });
            wx.navigateBack({
                url: '/pages/userinfo/address-list/address-list'
            });
            wx.showToast({
                title: '修改成功'
            });
        } else {
            // post(app.api.addressList, formData).then(res => {
            wx.navigateBack({
                url: '/pages/userinfo/address-list/address-list'
            });
            wx.showToast({
                title: '添加成功'
            });
            // });
        }
        // 添加或修改成功后重新调用 获取用户其他信息，更新默认地址和手机号码
        app.getUserDetailInfo();

    },
    // 获取当前位置
    getLocation () {
        let self = this;
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userLocation']) {
                    wx.getLocation({
                        type: 'gcj02',
                        success: res => {
                            const latitude = res.latitude;
                            const longitude = res.longitude;
                            wx.chooseLocation({
                                success: res => {
                                    console.log(res);
                                    this.data.addressList.address = res.address;
                                    this.setData({
                                        addressList: this.data.addressList
                                    })
                                }
                            })
                        }
                    });
                } else {
                    wx.openSetting({});
                }
            }
        });
    }
});
