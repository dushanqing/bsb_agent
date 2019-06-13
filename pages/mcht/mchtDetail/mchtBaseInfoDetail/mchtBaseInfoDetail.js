const App = getApp();
var util = require("../../../../utils/util.js");
import { HTTP } from '../../../../utils/http.js';
const http = new HTTP();
var mchtDeatil = new Object();
var areaArr = new Array();
Page({
  data: {},
 
  onLoad(options) {
    this.showData(options);
  },

  showData: function (options) {

    var that = this;
    const resBody = http.request({
      url: 'editMerchant.do',
      data: {
        body: {
          // mchtId: options.mchtId,
          mchtId: "8201904240000004",
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
      wx.setStorageSync("mchtDeatil", res);
      var mcht = res.mcht;
      var mchtLev = mcht.mchtLev,
        mchtName = "",
        mchtSimpleName = "",
        isXiaoWei,
        mchtLicnNo = "",
        isStore,
        mchtMngNo,
        storeHidden,
        mchtMngNoHidden,
        mchtType,
        mchtBigType = mcht.mchtBigType,
        mchtAreaNo = mcht.mchtAreaNo,
        mchtContAddr = "",
        mchtPersonName = "",
        mchtPhone = "",
        mchtEmail = "",
        longitude = "",
        latitude = "";

      if (util.strIsNotEmpty(mcht.mchtName)) {
        mchtName = mcht.mchtName;
      }
      if (util.strIsNotEmpty(mcht.mchtSimpleName)) {
        mchtSimpleName = mcht.mchtSimpleName;
      }
      if ("01" == mcht.isXiaoWei) {
        isXiaoWei = "是";
      } else if ("00" == mcht.isXiaoWei) {
        isXiaoWei = "否";
      }
      if (util.strIsNotEmpty(mcht.mchtLicnNo)) {
        mchtLicnNo = mcht.mchtLicnNo;
      }
      if ("01" == mchtLev) {
        mchtLev = "连锁商户";
        storeHidden = false;
      } else if ("02" == mchtLev) {
        mchtLev = "普通商户";
        isStore = "";
        mchtMngNo = "";
        storeHidden = true;
        mchtMngNoHidden = true;
      }
      if ("01" == mcht.mchtType) {
        mchtType = "实体";
      } else if ("02" == mcht.mchtType) {
        mchtType = "虚体";
      }
      if (util.strIsNotEmpty(mcht.mchtContAddr)) {
        mchtContAddr = mcht.mchtContAddr;
      }
      if (util.strIsNotEmpty(mcht.mchtPersonName)) {
        mchtPersonName = mcht.mchtPersonName;
      }
      if (util.strIsNotEmpty(mcht.mchtPhone)) {
        mchtPhone = mcht.mchtPhone;
      }
      if (util.strIsNotEmpty(mcht.mchtEmail)) {
        mchtEmail = mcht.mchtEmail;
      }
      if (util.strIsNotEmpty(mcht.longitude)) {
        longitude = mcht.longitude;
      }
      if (util.strIsNotEmpty(mcht.latitude)) {
        latitude = mcht.latitude;
      }
      that.setData({
        mchtName: mchtName,
        mchtSimpleName: mchtSimpleName,
        mchtLicnNo: mchtLicnNo,
        isXiaoWei: isXiaoWei,
        mchtLev: mchtLev,
        isStore: isStore,
        mchtMngNo: mchtMngNo,
        storeHidden: storeHidden,
        mchtMngNoHidden: mchtMngNoHidden,
        mchtType: mchtType,
        mchtContAddr: mchtContAddr,
        mchtPersonName: mchtPersonName,
        mchtPhone: mchtPhone,
        mchtEmail: mchtEmail,
        longitude: longitude,
        latitude: latitude,
      })
      that.queryAgencyInfo(mchtBigType);
      that.selectByFlagAndCtCode(mchtAreaNo);
    })
  },


  // 行业类别
  queryAgencyInfo: function(mchtBigType) {
    var that = this;
    const resBody = http.request({
      url: 'queryAgencyInfo.do',
      data: {
        body: {}
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
      var cgList = res.cgList;
      if (cgList.length > 0) {
        cgList.forEach(function (item, index) {
          if (mchtBigType == item.custNo) {
            that.setData({
              mchtBigType: item.custName
            })
          }
        })
      }
    })
    return mchtBigType;
  },
  // 所属地区
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
  },

  bindReturnStep(e) {
      var dataset = e.target.dataset;
      var pageNum = dataset.text;
      var  path = "" ;
      if (pageNum === "1") {
        // path = "../mchtBaseInfoDetail/mchtBaseInfoDetail"
      } else if (pageNum === "2") {
        path = "../mchtAcctInfoDetail/mchtAcctInfoDetail"
      } else if (pageNum === "3") {
        path = "../mchtPicInfoDetail/mchtPicInfoDetail"
      } else if (pageNum === "4") {
        path = "../mchtProdListDetail/mchtProdListDetail"
      } else {
        console.log("页面步骤异常");
        return
      }
      wx.navigateTo({
        url: path
      });
    }

});