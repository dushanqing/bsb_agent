// pages/forgetPassWord/forgetPassWord.js
var app =getApp();
const App = getApp()
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
  onStep1: function(e){
    console.log("this is forgetStep1");
    var userName = e.detail.value.userName;
    var mchtLicnNo = e.detail.value.mchtLicnNo;
    var telPone = e.detail.value.telPone;
    if (!userName){
      util.showToast("请输入账号")
      return;
    }
    /** 数据放入本地缓存 */
    wx.setStorageSync('telPone', '15153746764')
    wx.redirectTo({
      url: '/pages/forgetPassWordStep2/forgetPassWordStep2',
    })
  },

})