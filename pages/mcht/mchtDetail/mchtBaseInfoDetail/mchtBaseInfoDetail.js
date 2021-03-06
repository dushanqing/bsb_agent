const app = getApp();
var util = require("../../../../utils/util.js");
import { HTTP } from '../../../../utils/http.js';
const http = new HTTP();
var mchtDeatil;
Page({
  data: {
  },
  onLoad(options) {
    mchtDeatil = new Object();
    this.showData(options);
    
    //判断手机机型是否是iPhone8P
    if (util.checkIsIphone8plus()){
      this.setData({
        isHide: false
      })
    }else{
      this.setData({
        isHide: true
      })
    }

  },

  showData: function (options) {
    var that = this;
    if (JSON.stringify(options) === "{}"){
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
      const respCode = res.respCode;
      const respMsg = res.respMsg;
      //失败
      if ("E" === res.resCode) {
        util.showToast(res.resMessage);
        return;
      }
      if (respCode != '0000') {
        util.showToast(respMsg);
        return;
      }
      //成功
      wx.setStorageSync("mchtDeatil", res);
      that.packData(res);
     
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
    isStore = mcht.isStore,
    mchtMngNo="",
    storeHidden=true,
    mchtMngNoHidden =true,
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
    mchtAreaNo = "",
    mchtLicnExpDate ="",
    mchtArtifName="",
    mchtArtifType="",
    mchtArtifId="",
    mchtArtifExpDate="",
    mchtArtifPhone="",
    mchtRegAmt="",
    busAmrNo = "",
    busAmrName = "";
  if (util.strIsNotEmpty(mchtBigType)) {
    that.queryAgencyInfo(mchtBigType);
  }
  if (util.strIsNotEmpty(mcht.mchtName)) {
    mchtName = mcht.mchtName;
  }
  if (util.strIsNotEmpty(mcht.mchtSimpleName)) {
    mchtSimpleName = mcht.mchtSimpleName;
  }
  if ("01" === mcht.isXiaoWei) {
    isXiaoWei = "是";
  } else if ("00" === mcht.isXiaoWei) {
    isXiaoWei = "否";
  }
  if (util.strIsNotEmpty(mcht.mchtLicnNo)) {
    mchtLicnNo = mcht.mchtLicnNo;
  }
  if ("01" === mchtLev) {
    mchtLev = "连锁商户";
    if ("02" === isStore){
      isStore = "否";
      storeHidden = false;
      mchtMngNoHidden = true;
    } else if ("01" === isStore) {
      isStore = "是";
      mchtMngNo = mcht.mchtMngName,
      storeHidden = false;
      mchtMngNoHidden = false;
    }
  } else if ("02" === mchtLev) {
    mchtLev = "普通商户";
    isStore = "";
    mchtMngNo = "";
    storeHidden = true;
    mchtMngNoHidden = true;
  }
  if ("01" === mcht.mchtType) {
    mchtType = "实体";
  } else if ("02" === mcht.mchtType) {
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
  if (util.strIsNotEmpty(mcht.mchtLicnExpDate)){
    mchtLicnExpDate = mcht.mchtLicnExpDate;
  }
  if (util.strIsNotEmpty(mcht.mchtArtifName)) {
    mchtArtifName = mcht.mchtArtifName;
  }
  if (util.strIsNotEmpty(mcht.mchtArtifType)) {
    if ("10" === mcht.mchtArtifType){
      mchtArtifType = "居民身份证"
    }
    if ("11" === mcht.mchtArtifType) {
      mchtArtifType = "临时身份证"
    }
    if ("12" === mcht.mchtArtifType) {
      mchtArtifType = "户口簿"
    }
    if ("13" === mcht.mchtArtifType) {
      mchtArtifType = "军人或武警身份证"
    }
    if ("14" === mcht.mchtArtifType) {
      mchtArtifType = "港澳台通行证"
    }
    if ("15" === mcht.mchtArtifType) {
      mchtArtifType = "外国公民护照"
    }
    if ("16" === mcht.mchtArtifType) {
      mchtArtifType = "外国人永久居住证"
    }
    if ("17" === mcht.mchtArtifType) {
      mchtArtifType = "港澳台居民居住证"
    }
    if ("18" === mcht.mchtArtifType) {
      mchtArtifType = "中国护照"
    }
    if ("19" === mcht.mchtArtifType) {
      mchtArtifType = "边民出入境通行证"
    }
    if ("20" === mcht.mchtArtifType) {
      mchtArtifType = "其他类个人身份有效证件"
    }
  }
  if (util.strIsNotEmpty(mcht.mchtArtifId)) {
    mchtArtifId = mcht.mchtArtifId;
  }
  if (util.strIsNotEmpty(mcht.mchtArtifExpDate)) {
    mchtArtifExpDate = mcht.mchtArtifExpDate;
  }
  if (util.strIsNotEmpty(mcht.mchtArtifPhone)) {
    mchtArtifPhone = mcht.mchtArtifPhone;
  }
  if (util.strIsNotEmpty(mcht.mchtRegAmt)) {
    mchtRegAmt = mcht.mchtRegAmt;
  }
    if (util.strIsNotEmpty(mcht.busAmrNo)){
    busAmrNo = mcht.busAmrNo;
  }
  if (util.strIsNotEmpty(mcht.busAmrName)) {
    busAmrName = mcht.busAmrName;
  }
  mchtAreaNo = province + city + quyu;
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
    mchtLicnExpDate: mchtLicnExpDate,
    mchtArtifName: mchtArtifName,
    mchtArtifType: mchtArtifType,
    mchtArtifId: mchtArtifId,
    mchtArtifExpDate: mchtArtifExpDate,
    mchtArtifPhone: mchtArtifPhone,
    mchtRegAmt: mchtRegAmt,
    busAmrNo: busAmrNo,
    busAmrName: busAmrName,
    isOrgLoginFlag: wx.getStorageSync("isOrgLoginFlag"),
  })
},

  // 行业类别
  queryAgencyInfo: function(mchtBigType) {
    var that = this;
    const resBody = http.request({
      url: 'queryAgencyInfo.do',
      data: {
        body: {
          isOrgLoginFlag: wx.getStorageSync("isOrgLoginFlag")
        }
      },
      method: 'POST'
    });
    resBody.then(res => {
      const respCode = res.respCode;
      const respMsg = res.respMsg;
      //失败
      if ("E" === res.resCode) {
        util.showToast(res.resMessage);
        return;
      }
      if (respCode != '0000') {
        util.showToast(respMsg);
        return;
      }
      //成功
      //如果所属商户为null,所属商户不可选
      var cgList = res.cgList;
      if (cgList.length > 0) {
        cgList.forEach(function (item, index) {
          if (mchtBigType === item.custNo) {
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