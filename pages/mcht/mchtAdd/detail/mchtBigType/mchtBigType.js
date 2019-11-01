const app = getApp();
import { HTTP } from '../../../../../utils/http.js';
const http = new HTTP();
var util = require("../../../../../utils/util.js");
Page({
  data: {
    cgList: [],
  },
  onLoad: function () {
    this.showData();
  },

  showData: function(){
    var that = this;
    //获取行业类别
    this.queryAgencyInfo();
  },
  queryAgencyInfo: function () {
    var that = this;
    const resBody = http.request({
      url: 'queryAgencyInfo.do',
      data: {
        body: {
          isOrgLoginFlag:wx.getStorageSync("isOrgLoginFlag")
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
      if ('0000' != respCode ) {
        util.showToast(respMsg);
        return;
      }
      //成功
       let cgList = res.cgList;
      that.setData({
        cgList: cgList
      });
    })
  },

  bindMchtBigType: function(e){
    var arr = new Array();
    var mchtBigType= new  Object();
    mchtBigType.custNo = e.currentTarget.id;
    mchtBigType.custName = e.currentTarget.dataset.text;
    arr.push(mchtBigType);
    wx.setStorageSync('mchtBigType', arr);
    wx.navigateBack({
      delta: 1
    })
  }
})





