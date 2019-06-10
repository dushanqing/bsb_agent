// pages/loginShowInfo/loginShowInfo.js
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
    that.getInfoData();
    // that.getCountData();
  },
   //获取用户信息
  getInfoData: function(){
    var that = this;
    const info = http.request({
      url: 'getAgentInfo.do',
      data: {
        body: {}
      },
      method: 'POST'
    });
    info.then(res => {
      console.log(res);
      if (res.resCode != 'S') {
        util.showToast('获取用户信息失败')
        return;
      }
      that.setData({
        agname: res.agname,
        userNm: res.userNm,
        phoneNo: res.phoneNo,
      })
      that.getCountData();
    })
  },
  //获取首页统计
  getCountData: function(){
    var that = this;
    const resBody = http.request({
      url: 'wxAppLoginShowInfo.do',
      data: {
        body: {}
      },
      method: 'POST'
    });
    resBody.then(res => {
      console.log(res);
      if (res.resCode != 'S') {
        util.showToast('获取统计信息失败')
        return;
      }
      that.setData({
        totalCount: res.totalCount,
        dayCount: res.dayCount,
        inReviewCount: res.inReviewCount,
        passCount: res.passCount,
        refuseCount: res.refuseCount,
        weekCount: res.weekCount,
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