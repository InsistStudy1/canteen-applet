const app = getApp();
import {get, post, put, $delete} from '../../../utils/http'

Page({
    data: {
        addressList: []
    },
    onShow () {
        this.getAddressList();
    },
    // 获取地址列表
    getAddressList () {
        get(app.api.addressList).then(res => {
            this.setData({
                addressList: res
            });
        })
    },
    // 添加地址
    addAddress () {
        wx.showModal({
            title: '提示',
            confirmColor: app.globalData.subjectColor,
            content: '是否导入微信地址',
            success: res => {
                if (res.confirm) {
                    wx.chooseAddress({
                        success: res => {
                            let addressInfo = {
                                realname: res.userName,
                                gender: 0,
                                telNumber: res.telNumber,
                                address: res.cityName + res.countyName,
                                detail_address: res.detailInfo,
                                is_default: true
                            };
                            console.log('您要导入的地址为：', addressInfo);
                        }
                    })
                } else if (res.cancel) {
                    wx.navigateTo({
                        url: '/pages/userinfo/add-address-list/add-address-list'
                    })
                }
            },
            fail: err => {
                console.log(err);
            }
        });
    },
    // 修改地址
    editAddress(e) {
        const addressId = e.target.dataset.addressId;
        // 带参跳转到 add-address-list
        wx.navigateTo({
            url: '/pages/userinfo/add-address-list/add-address-list?addressId=' + addressId,
        });
    },
    // 删除地址
    deleteAddress(e) {
        const addressId = e.target.dataset.addressId;

        wx.showModal({
            title: '提示',
            content: '你确定删除这条地址吗',
            confirmColor: '#f00',
            success: res => {
                if (res.confirm) {
                    // 删除
                    // $delete(app.api.addressList, {address_id: addressId}).then(res => {
                    console.log('要删除的地址 ID 为 ' + addressId);
                        wx.showToast({
                            title: '删除成功'
                        });
                    // })
                }
            }
        })
    },
    // 设置为默认地址
    setDefaultAddress (e) {
        let addressId = e.currentTarget.dataset.addressId;
        // put(app.api.setDefaultAddress, { address_id: addressId }).then(res => {
            console.log('要设置默认地址 ID 为' + addressId);
            wx.showToast({
                title: '设置成功',
                icon: 'none'
            });
            // 获取用户其他信息，更新默认地址和手机号码
            app.getUserDetailInfo();
            // 更新地址列表
            this.getAddressList();
        // })
    }
});
