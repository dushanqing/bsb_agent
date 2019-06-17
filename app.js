import Util from '/utils/util'
import {
  HTTP
} from '/utils/http.js'
var util = require("/utils/util.js");
let http = new HTTP();
//app.js
App({

  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;


    //小程序登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code;
        wx.request({
          header: {
            "Content-Type": "application/json"
          },
          method: "POST",
          url: 'https://ydsd.bsb.com.cn/ifsp-gateway/agent/exchangeOpenIdBycode.do',
          data:{
            head:{
            },
            body:{
              jscode: code
            }
          },
          success:function(res){
   
            const resCode = res.data.body.resCode;
            const resMessage = res.data.body.resMessage;
            let loginFlag = res.data.body.loginFlag;
            if (resCode != 'S') {
              loginFlag = false;
              util.showToast(resMessage)
            }
            //验证sessionId,RSA公钥,登录标识
            let sessionId = res.data.head.sessionId;
            if (util.strIsEmpty(sessionId)) {
              loginFlag = false;
              util.showToast("系统异常");
            } else {
              wx.setStorageSync('sessionId', sessionId)
            }
            let rsaPubKey = res.data.head.rsaPubKey;
            if (util.strIsEmpty(rsaPubKey)) {
              loginFlag = false;
              util.showToast("系统异常");
            } else {
              wx.setStorageSync('rsaPubKey', rsaPubKey);
            }

            //用户已经登录获取用户信息
            if (loginFlag){
              let userId = res.data.body.userId;
              let userNo = res.data.body.userNo;
              let phoneNo = res.data.body.phoneNo;
              let mchtLicnNo = res.data.body.mchtLicnNo
              if (util.strIsEmpty(userId) || util.strIsEmpty(userNo) || util.strIsEmpty(phoneNo) || util.strIsEmpty(mchtLicnNo)) {
                loginFlag = false;
                util.showToast("系统异常");
                return;
              } else {
                wx.setStorageSync('userId', userId);
                wx.setStorageSync('userNo', userNo);
                wx.setStorageSync('phoneNo', phoneNo);
                wx.setStorageSync('mchtLicnNo', mchtLicnNo);
              }
            }
            
            //回调传参,onLoad使用
            if(that.loginCallback){
              that.loginCallback(loginFlag);
            }

          }
        })
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },



  onShow() {
    console.log('onShow')
  },
  onHide() {
    console.log('onHide')
  },
  getUserInfo() {
    return this.WxService.login()
      .then(data => {
        console.log(data)
        return this.WxService.getUserInfo()
      })
      .then(data => {
        console.log(data)
        this.globalData.userInfo = data.userInfo
        return this.globalData.userInfo
      })
  },



  globalData: {
    userInfo: null
  },
  renderImage(path) {
      if (!path) return ''
      if (path.indexOf('http') !== -1) return path
      return `${this.__config.domain}${path}`
    },
    Util,
})

