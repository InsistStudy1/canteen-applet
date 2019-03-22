import {get, post, put} from './utils/http';
import {updateUserInfo} from './utils/utils'
import api from './utils/api';

App({
    globalData: {
        qsCodeRes: '', //是否扫码点餐
        shopCarCount: 0, // 购物车总数量
        userInfo: {}, // 用户信息
        userDetailInfo: {}, // 用户其他信息
        subjectColor: '#ffcb57'
    },
    api,
    // 小程序初始化
    onLaunch() {
        this.checkAuthorize();
    },
    // 判断是否授权
    checkAuthorize () {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 更新用户信息
                            updateUserInfo(res.userInfo);
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        }
                    })
                } else {
                    wx.reLaunch({
                        url: '/pages/authorize/authorize',
                    })
                }
            }
        })
    },
    // 获取购物车数据
    getShopCarCount() {
        get(this.api.userDetailInfo).then(res => {
            this.globalData.shopCarCount = res.shopCarCount;
            this.setShopNavCount(res.shopCarCount);
        })
    },
    // 获取用户其他信息
    getUserDetailInfo () {
      get(this.api.userDetailInfo).then(res => {
          this.globalData.userDetailInfo = res;
      });
    },
    // 修改购物车数量
    updateShopCarCount (count = 1, sucCallBack = function () {}) {
        if (this.globalData.shopCarCount <= 0) return;
        let nowCount = this.globalData.shopCarCount += count;
        get(this.api.userDetailInfo).then(res => {
            this.globalData.shopCarCount = res.shopCarCount
        });
        put(this.api.userDetailInfo, {
            shopCarCount: nowCount
        }).then(res => {
            this.globalData.shopCarCount = res.shopCarCount;
            this.setShopNavCount(res.shopCarCount);
            sucCallBack();
        })
    },
    // 设置 tabBar 购物车圆点数量
    setShopNavCount (index) {
        if (index <= 0)  return;
        wx.setTabBarBadge({
            index: 2,
            text: index.toString()
        });
    }
});
