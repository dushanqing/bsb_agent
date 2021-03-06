const app = getApp();
import { HTTP } from '../../../../../../utils/http.js';
const http = new HTTP();
var util = require("../../../../../../utils/util.js");
Page({
  data: {
    provinceList: [],
  },
  onLoad: function (options) {
    //获取省
    this.selectByFlagAndPid();
  },
  selectByFlagAndPid: function () {
    var that = this;
    const resBody = http.request({
      url: 'selectByFlagAndPid.do',
      data: {
        body: {
          ctFlg: '1'
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
      if ('0000' != respCode ) {
        util.showToast(respMsg);
        return;
      }
      //成功
      var empList = res.empList;
      that.setData({
        provinceList: empList
      });
    })
  },

  bindProvince: function (e) {
    var ctArr = new Array();
    var province = new Object();
    var ctCode = e.currentTarget.id; 
    province.proCode = e.currentTarget.id;
    province.proName = e.currentTarget.dataset.text;
    ctArr.push(province);
    wx.setStorageSync('ctArr', ctArr);
    wx.navigateTo({
      url: "../city/city?ctCode=" + ctCode
    })
  }
})





