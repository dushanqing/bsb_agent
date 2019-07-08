const app = getApp();
var util = require("../../../../utils/util.js");
import { HTTP } from '../../../../utils/http.js';
const http = new HTTP();
Page({
  bindCallMchtPhone: function(e) {
    const path = e.currentTarget.dataset.path
    wx.makePhoneCall({
      phoneNumber: path
    })
  },

  onLoad(options) {
    this.selectRejectInfo(options);
  },

  selectRejectInfo: function(options) {
    var that = this;
    const resBody = http.request({
      url: 'selectMchtAuditRejectInfo.do',
      data: {
        body: {
          mchtId: options.mchtId,
        }
      },
      method: 'POST'
    });
    resBody.then(res => {
      const resCode = res.resCode;
      const resMessage = res.resMessage;
      //失败
      if ('S' != resCode) {
        util.showToast(resMessage);
        return;
      }
      //成功
      var mcht = res.mcht, 
        province = "", city = "", quyu = "", mchtAreaNo="";
      if (util.strIsNotEmpty(res.province.ctName)) {
        province = res.province.ctName;
      }
      if (util.strIsNotEmpty(res.city.ctName)) {
        city = res.city.ctName;
      }
      if (util.strIsNotEmpty(res.quyu.ctName)) {
        quyu = res.quyu.ctName;
      }
      mchtAreaNo = province + city + quyu;
      that.setData({
        mchtName: mcht.mchtName,
        mchtSimpleName: mcht.mchtSimpleName,
        mchtContAddr: mcht.mchtContAddr,
        mchtPersonName: mcht.mchtPersonName,
        mchtPhone: mcht.mchtPhone,
        auditView: mcht.auditView,
        mchtAreaNo: mchtAreaNo
        
      })
    })
  }
})