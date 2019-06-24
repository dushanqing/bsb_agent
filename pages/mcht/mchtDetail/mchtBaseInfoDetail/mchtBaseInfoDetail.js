const app = getApp();
var util = require("../../../../utils/util.js");
import { HTTP } from '../../../../utils/http.js';
const http = new HTTP();
var mchtDeatil = new Object();
var mchtBigType = "";
Page({
  data: {
  },
  onLoad(options) {
    this.showData(options);
  },

  showData: function (options) {
    var that = this;
    if (JSON.stringify(options) == "{}"){
      var mchtDeatilData = wx.getStorageSync('mchtDeatil');
      that.packData(mchtDeatilData);
      return;
    }
    const resBody = http.request({
      url: 'editMerchant.do',
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
      if (resCode != 'S') {
        util.showToast(resMessage);
        return;
      }
      //成功
      wx.setStorageSync("mchtDeatil", res);
      that.packData(res);
      that.queryAgencyInfo(res.mcht.mchtBigType);
    })
  },
packData:function(res){
  var that =this;
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
    mchtContAddr = "",
    mchtPersonName = "",
    mchtPhone = "",
    mchtEmail = "",
    longitude = "",
    latitude = "",
    province = "",
    city = "",
    quyu = "",
    mchtAreaNo = "";

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
  console.log("mchtAreaNo:" + mchtAreaNo);
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
    mchtAreaNo: mchtAreaNo,
    mchtContAddr: mchtContAddr,
    mchtPersonName: mchtPersonName,
    mchtPhone: mchtPhone,
    mchtEmail: mchtEmail,
    longitude: longitude,
    latitude: latitude,
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
            mchtBigType = item.custName;
            that.setData({
              mchtBigType: item.custName
            })
          }
        })
      }
    })
  },

  /**
   * 步骤标签跳转
   */
  bindReturnStep(e) {
    var dataset = e.target.dataset;
    var pageNum = dataset.text;
    if (pageNum === '1') {
      wx.redirectTo({
        url: '../mchtBaseInfoDetail/mchtBaseInfoDetail',
      });
    } else if (pageNum === '2') {
      wx.redirectTo({
        url: '../mchtAcctInfoDetail/mchtAcctInfoDetail',
      });
    } else if (pageNum === '3') {
      wx.redirectTo({
        url: '../mchtPicInfoDetail/mchtPicInfoDetail',
      });
    } else if (pageNum === '4') {
      wx.redirectTo({
        url: '../mchtProdListDetail/mchtProdListDetail',
      });
    } else {
      return;
    }
  }

});