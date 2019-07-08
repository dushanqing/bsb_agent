const app = getApp();
import { HTTP } from '../../../../../utils/http.js';
const http = new HTTP();
var util = require("../../../../../utils/util.js");
Page({
  data: {
    mchtMngNo: [],
  },
  onLoad: function () {
    //获取所属商户
    this.queryMomMerchantName();
  },

  queryMomMerchantName: function () {
    var that = this;
    const resBody = http.request({
      url: 'queryMomMerchantName.do',
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
      let mchtMngNoList = res.empList;
      //如果所属商户为null,所属商户不可选
      that.setData({
        mchtMngNo: mchtMngNoList
      });
    })
  },

  bindMchtMngNo: function (e) {
    let mchtMngNoArr = new Array();
    let mchtMngNo = new Object();
    let mchtMngId = e.currentTarget.id;
    mchtMngNo.mchtId = e.currentTarget.id;
    mchtMngNo.mchtName = e.currentTarget.dataset.text;
    mchtMngNoArr.push(mchtMngNo);
    wx.setStorageSync('mchtMngNo', mchtMngNoArr);
    const resBody = http.request({
      url: 'queryAgencyInfo.do',
      data: {
        body: {
          mchtId: mchtMngId
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
      let arr = new Array();
      arr.push(res.cgList[0]);
      wx.setStorageSync('mchtBigType', arr);
      wx.navigateTo({
        url: '../../mchtBaseInfo/mchtBaseInfo'
      })
    })
   
  }
})




