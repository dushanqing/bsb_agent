// pages/mcht/mchtDetail/mchtAuditRejectDetail/mchtAuditRejectDetail.js
var mchtJs = require("../../common/mchtJs.js");
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

      onLoad(){
        this.selectRejectInfo();
      },
      selectRejectInfo: function(){
        var that = this;
        wx.request({
          url: "http://ydsd.bsb.com.cn/ifsp-gateway/agent/selectMchtAuditRejectInfo.do",
          data: {
            // JSON.stringify(mchtInfo),
            mchtId: "8201904230000002",
            sessionId: "111111111111111111111111111111111111",
          },
          method: "post",
          header: {
            "content-type": "application/x-www-form-urlencoded",
          },
          success: function (res) {
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
          },
          fail: function (res) {  }
        })
      },

  selectByFlagAndCtCode: function (ctCode) {
    var that= this;
      wx.request({
        url: "http://ydsd.bsb.com.cn/ifsp-gateway/agent/selectByFlagAndCtCode.do",
        method: 'post',
        header: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: {
          ctFlag: '3',
          ctCode: ctCode,
          sessionId: "111111111111111111111111111111111111",
        },
        success(res) {
          var ct = res.data.empList[0];
            areaArr.unshift(ct.ctName);
            console.log("ctCode333:" + areaArr); 
            var upCtCode = ct.upCtCode;
            if (util.strIsNotEmpty(upCtCode)){
              that.selectByFlagAndCtCode(upCtCode);
            }
            that.setData({
              mchtAreaNo: areaArr.join("")
            })
        },
        fail(err) {
         
        }
      })
  }
 
})




