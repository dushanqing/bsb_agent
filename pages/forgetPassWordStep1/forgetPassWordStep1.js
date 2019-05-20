// pages/forgetPassWord/forgetPassWord.js
var util = require("../../utils/util.js");
import { HTTP } from '../../utils/http.js'
let http = new HTTP();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /** 获取商户openId,登录商户信息验证, */
  onStep1: function(e){
    // util.getOpenId('');
    console.log("this is forgetStep1");
    var userNo = e.detail.value.userName;
    var mchtLicnNo = e.detail.value.mchtLicnNo;
    var phoneNo = e.detail.value.telPhone;
    if (!userNo){
      util.showToast("请输入账号")
      return;
    }

    const info = http.request({
      url: 'checkLoginInfo.do',
      data: {
        head: {
          rsakey: 456789
        },
        body: {
          userNo: userNo,
          mchtLicnNo: mchtLicnNo,
          phoneNo: phoneNo
        }

      },
      method: 'POST'
    }
    );

    /** 数据放入本地缓存 */
   
    wx.setStorageSync('telPhone', phoneNo)
    console.log(wx.getStorageSync('telPhone'))
    wx.redirectTo({
      url: '/pages/forgetPassWordStep2/forgetPassWordStep2',
    })
  },

})