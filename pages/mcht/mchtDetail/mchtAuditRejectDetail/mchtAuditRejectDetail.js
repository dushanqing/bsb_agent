// pages/mcht/mchtDetail/mchtAuditRejectDetail/mchtAuditRejectDetail.js
var util = require("../../../../utils/util.js");
var areaArr = new Array();

Page({
  bindCallMchtPhone: function(e) {
    const path = e.currentTarget.dataset.path
    console.log("path=" + path);
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
          // mchtId: options.mchtId,
          mchtId: "8201904230000002",
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
      var mcht = res.data.mcht;
      var mchtAreaNo = mcht.mchtAreaNo;
      that.setData({
        mchtName: mcht.mchtName,
        mchtSimpleName: mcht.mchtSimpleName,
        mchtContAddr: mcht.mchtContAddr,
        mchtPersonName: mcht.mchtPersonName,
        mchtPhone: mcht.mchtPhone,
        auditView: mcht.auditView,
        mchtAreaNo: mcht.mchtAreaNo
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
      if (resCode == 'REQ1015') {
        app.onLaunch();
      }
      //失败
      if (resCode != 'S') {
        util.showToast(resMessage);
        return;
      }
      //成功
      //如果所属商户为null,所属商户不可选
      var ct = res.data.empList[0];
      areaArr.unshift(ct.ctName);
      console.log("ctCode333:" + areaArr);
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