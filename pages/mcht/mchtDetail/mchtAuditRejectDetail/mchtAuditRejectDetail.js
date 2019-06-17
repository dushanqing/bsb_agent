const app = getApp();
var util = require("../../../../utils/util.js");
import { HTTP } from '../../../../utils/http.js';
const http = new HTTP();
var areaArr = new Array();

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
      //session 过期处理 按照首次登录处理
      // if (resCode == 'REQ1015') {
      //   app.onLaunch();
      //   wx.redirectTo({
      //     url: "/pages/forgetPassWordStep1/forgetPassWordStep1",
      //   })
      //   return;
      // }
      //失败
      if ('S' != resCode) {
        util.showToast(resMessage);
        return;
      }
      //成功
      var mcht = res.mcht;
      var mchtAreaNo = mcht.mchtAreaNo;
      that.setData({
        mchtName: mcht.mchtName,
        mchtSimpleName: mcht.mchtSimpleName,
        mchtContAddr: mcht.mchtContAddr,
        mchtPersonName: mcht.mchtPersonName,
        mchtPhone: mcht.mchtPhone,
        auditView: mcht.auditView
        
      })
      that.selectByFlagAndCtCode(mchtAreaNo);
    })
  },

  selectByFlagAndCtCode: function(ctCode) {
    var that = this;
    const resBody = http.request({
      url: 'selectByFlagAndCtCode.do',
      data: {
        body: {
          ctFlag: '3',
          ctCode: ctCode
        }
      },
      method: 'POST'
    });
    resBody.then(res => {
      const resCode = res.resCode;
      const resMessage = res.resMessage;
      //session 过期处理 按照首次登录处理
      // if (resCode == 'REQ1015') {
      //   app.onLaunch();
      //   wx.redirectTo({
      //     url: "/pages/forgetPassWordStep1/forgetPassWordStep1",
      //   })
      //   return;
      // }

      //失败
      if ('S' != resCode) {
        util.showToast(resMessage);
        return;
      }
      //成功
      //如果所属商户为null,所属商户不可选
      var ct = res.empList[0];
      areaArr.unshift(ct.ctName);
      var upCtCode = ct.upCtCode;
      if (util.strIsNotEmpty(upCtCode)) {
        that.selectByFlagAndCtCode(upCtCode);
      }
      that.setData({
        mchtAreaNo: areaArr.join("")
      })
    })
  }

})