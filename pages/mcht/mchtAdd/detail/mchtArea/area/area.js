const app = getApp();
import { HTTP } from '../../../../../../utils/http.js';
const http = new HTTP();
var util = require("../../../../../../utils/util.js");
Page({
  data: {
    areaList: [],
  },
  onLoad: function (options) {
    //获取省
    this.selectByFlagAndPid(options);
  },
  selectByFlagAndPid: function (options) {
    if (options.ctCode == null || options.ctCode == "" || options.ctCode == undefined) {
      //弹框提示选择市
    }
    var that = this;
    const resBody = http.request({
      url: 'selectByFlagAndPid.do',
      data: {
        body: {
          upCtCode: options.ctCode,
          ctFlg: '3'
        }
      },
      method: 'POST'
    });
    resBody.then(res => {
      const respCode = res.respCode;
      const respMsg = res.respMsg;
      //session 过期处理 按照首次登录处理
      //失败
      if ("E" === res.resCode) {
        util.showToast(res.resMessage);
        return;
      }
      if ('0000' != respCode) {
        util.showToast(respMsg);
        return;
      }
      //成功
      var empList = res.empList;
      that.setData({
        areaList: empList
      });
    })
  },

  bindArea: function (e) {
    var ctArr = wx.getStorageSync('ctArr');
    ctArr[0].quCode = e.currentTarget.id;
    ctArr[0].quName = e.currentTarget.dataset.text;
    wx.setStorageSync('ctArr', ctArr);
    // wx.navigateTo({
    //   url: "../../../mchtBaseInfo/mchtBaseInfo"
    // })
    wx.navigateBack({
      delta: 3
    })
  }
})





