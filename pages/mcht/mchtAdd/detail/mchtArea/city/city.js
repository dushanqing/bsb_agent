const app = getApp();
import { HTTP } from '../../../../../../utils/http.js'
const http = new HTTP();
var util = require("../../../../../../utils/util.js");
Page({
  data: {
    cityList: [],
  },
  onLoad: function (options) {
    //获取省
    this.selectByFlagAndPid(options);
  },
  selectByFlagAndPid: function (options) {
    if (options.ctCode == null || options.ctCode == "" || options.ctCode == undefined ){
      //弹框提示选择省
    }
    var that = this;
    const resBody = http.request({
      url: 'selectByFlagAndPid.do',
      data: {
        body: {
          upCtCode: options.ctCode,
          ctFlg: '2'
        }
      },
      method: 'POST'
    });
    resBody.then(res => {
      const resCode = res.resCode;
      const resMessage = res.resMessage;
      //session 过期处理 按照首次登录处理
      if (resCode == 'REQ1015') {
        app.onLaunch();
      }
      //失败
      if (resCode != 'S') {
        util.showToast(resMessage);
        return;
      }
      //成功
      var empList = res.empList;
      that.setData({
        cityList: empList
      });
    })
  },

  bindCity: function (e) {
    var ctArr = wx.getStorageSync('ctArr');
    var ctCode = e.currentTarget.id;
    ctArr[0].ctCode = e.currentTarget.id;
    ctArr[0].ctName = e.currentTarget.dataset.text;
    wx.setStorageSync('ctArr', ctArr);
    wx.navigateTo({
      url: "../area/area?ctCode=" + ctCode
    })
  }
})





