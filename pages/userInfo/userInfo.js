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
    var that = this;
    let userId = wx.getStorageInfoSync('userId');
    let isOrgLoginFlag = wx.getStorageSync("isOrgLoginFlag");
    const resBody = http.request({
      url: 'getAgentInfo.do',
      data: {
        body: {
          isOrgLoginFlag: isOrgLoginFlag
        }
      },
      method: 'POST'
    });
    resBody.then(res => {
      if (res.resCode != 'S') {
        util.showLoading('获取用户信息失败')
        return;
      }
      that.setData({
        agname: res.agname,
        userNm: res.userNm,
        phoneNo: res.phoneNo,
        isOrgLoginFlag: isOrgLoginFlag,
      })
    })
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