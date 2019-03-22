/**
 * Created by Jack.Huang on 2019/3/4.
 * @author Jack.Huang
 * */
const app = getApp();
import {errMsg, updateUserInfo} from "./utils";
import api from './api';

// 实现登录功能
function login () {
    return new Promise((resolve, reject) => {
        wx.login({
            success: e => {
                let code = e.code; // 获取临时凭证 code
                wx.getUserInfo({
                    success: res => {

                        // let {encryptedData, iv} = res; // encryptedData 包括敏感数据在内的完整用户信息的加密数据，vi 加密算法的初始向量
                        // thirdLogin(code, encryptedData, iv) // 访问服务器解密并拿到 session_id

                        // 更新用户信息
                        updateUserInfo(res.userInfo);
                        resolve(res);
                    }
                })
            },
            fail: err => {
                reject(err);
            }
        })
    })

}

// 给 code 让后端向服务器换取 3rd_session
// 给 encryptedData 和 vi 让后端解密 openId 并拿到 session_id
function thirdLogin (code, encryptedData, iv) {
    let data = { code, encryptedData, iv };
    post({ data, url: api.login })
        .then(res => {
            app.globalData.session_id = res.session_id; // 把 session 存储在全局变量中
            wx.setStorageSync('session_id', res.session_id);
        }).catch(err => {
            console.log(err);
        });
}

/*
* request 请求方法
* @param { String } url 请求的 url
* @param { String } method 请求的方式
* @param { Object } data 请求发送的数据
* @param { Object } header 请求的头部
* */
function request (url, method, data = {}, header = {}) {
    let thirdSession = wx.getStorageSync('thirdSession'); // 获取session

    if (thirdSession) { // 如果 session 存在的话
        if (!header || !header['SESSIONID']) { // 如果请求的时候头部没带 session
            header['SESSION'] = thirdSession; // 带上session
        }
    }
    wx.showNavigationBarLoading(); // 显示loading 状态
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            method,
            data,
            header,
            success: res => {
                resolve(res.data)
                // if (res.statusCode === 200) {
                //     resolve(res.data)
                // }
            },
            fail: err => {
                console.log(err);
                // errMsg('网络异常，请检查网络或退出重试');
                wx.showToast({
                    title: '网络异常，请检查网络或退出重试',
                    icon: 'none'
                })
            },
            complete () {
                wx.hideNavigationBarLoading(); // 隐藏 loading
            }
        });
    });
}

/*
* get 请求
* @param { options } 参数对象，内部可包含 url、data、header
* */
function get (url, data = {}, header = {}) {
    return request(url, 'GET', data, header);
}

/*
* get 请求
* @param { options } 参数对象，内部可包含 url、data、header
* */
function post (url, data = {}, header = {}) {
    return request(url, 'POST', data, header);
}
/*
* put 请求
* @param { options } 参数对象，内部可包含 url、data、header
* */
function put (url, data = {}, header = {}) {
    return request(url, 'PUT', data, header);
}
/*
* delete 请求
* @param { options } 参数对象，内部可包含 url、data、header
* */
function $delete (url, data = {}, header = {}) {
    return request(url, 'DELETE', data, header);
}

/*
* 上传图片
* @param { options } 参数对象，内部可包含 url、name、filePath、loadingText
* */
function upload (options) {
    let {url, name, filePath, loadingText} = options;
    let header = {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json'
    };
    let thirdSession = wx.getStorageSync('thirdSession'); // 获取session

    if (thirdSession) { // 如果 session 存在的话
        if (!header || !header['SESSIONID']) { // 如果请求的时候头部没带 session
            header['SESSION'] = thirdSession; // 带上session
        }
    }
    wx.showLoading({
        title: loadingText
    });

    return new Promise(function(resolve, reject) {
        wx.uploadFile({
            url,
            filePath,
            name,
            header,
            success: function(res) {
                resolve(res);
            },
            fail: reject,
            complete: function() {
                wx.hideLoading();
            }
        });
    });
}


export { login, request, get, post, put, $delete, upload };
