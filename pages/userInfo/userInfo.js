// pages/userInfo/userInfo.js
import { HTTP } from '../../utils/http.js'
const http = new HTTP();
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
    var that = this;
    let userId = wx.getStorageInfoSync('userId');
    const resBody = http.request({
      url: 'getAgentInfo.do',
      data: {
        body: {}
      },
      method: 'POST'
    });
    resBody.then(res=>{
      console.log(res);
      //session 过期处理 按照首次登录处理
      if (res.resCode == 'REQ1015') {
        app.onLaunch();
        wx.redirectTo({
          url: "/pages/forgetPassWordStep1/forgetPassWordStep1",
        })
        return;
      }
      if (res.resCode !='S'){
        util.showLoading('获取用户信息失败')
        return;
      }
      that.setData({
        agname: res.agname,
        userNm: res.userNm,
        phoneNo: res.phoneNo,
      })
    })
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

  }
})