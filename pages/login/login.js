// pages/login/login.js
var app = getApp()
var util = require("../../utils/util.js");
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
 
  /** 
   * 登录
   */
  onLogin: function(e){

    /** 验证参数登录 */
    let userName = e.detail.value.userName;
    let userPassWord = e.detail.value.userPassWord;
    if (!userName){
      util.showToast('请输入账号')
      return;
    };
    if (!userPassWord){
      util.showToast('请输入密码');
      return;
    };

    /** 获取用户openId,放入本地缓存 */
    util.getOpenId();
   
   
    // wx.redirectTo({
    //   url: '/pages/mcht/mchtBaseInfo/index',
    // })
  },

  onForget:function(){
    console.log("this is onForget");
    wx.redirectTo({
      url: '/pages/forgetPassWordStep1/forgetPassWordStep1',
    })
  },

  getCenterLocation() {
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.getCenterLocation({
      success(res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },

})