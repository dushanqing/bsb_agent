// pages/login/login.js
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
 
  /** 
   * 登录
   */
  onLogin: function(e){
    console.log("this is onLogin");
    // util.showLoading("登录中")
    var userName = e.detail.value.userName;
    var userPassword =e.detail.value.userName;
    if (!userName){

    }
    if (!userPassword){

    }
    console.log(e.detail.value);
    // wx.request({
    //   url: '',
    // })
    wx.redirectTo({
      url: '/pages/mcht/mchtBaseInfo/index',
    })
  },
  onForget:function(){
    console.log("this is onForget");
    wx.redirectTo({
      url: '/pages/forgetPassWordStep1/forgetPassWordStep1',
    })
  },



    //函数命名
    getInfo: function () {
      //定义常量
      const a = 1;

      //定义变量
      let imageContent = res.data
      return '';
    },

    //私有函数
    _getInfo: function () {
      return '';
    }
  

})