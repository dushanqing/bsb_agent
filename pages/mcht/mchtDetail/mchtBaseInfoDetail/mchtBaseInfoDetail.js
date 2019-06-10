const App = getApp();
var mchtJs = require("../detail/mcht.js");
var mchtDeatil = new Object();
Page({
  data: {
  },
  onLoad(){
    this.showData();
  
  },


  showData: function(){
    var that = this;
    wx.request({
      url: "http://ydsd.bsb.com.cn/ifsp-gateway/agent/editMerchant.do",
      data: {
        // JSON.stringify(mchtInfo),
        mchtId: "8201904240000004",
        sessionId: "111111111111111111111111111111111111",
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        console.log("success:" + res.data);
        mchtDeatil.data = res.data; 
        wx.setStorageSync("mchtDeatil", mchtDeatil);
        console.log("success:" + res.data.agname);
        var mcht = res.data.mcht;
        var   mchtLev = mcht.mchtLev,
            isStore, 
            mchtMngNo,
            storeHidden,
            mchtMngNoHidden,
            mchtBigType = mcht.mchtBigType;
        if ("01" == mchtLev){
          mchtLev = "连锁商户";
          storeHidden = false;
        } else if("02" == mchtLev){
          mchtLev = "普通商户";
          isStore ="";
          mchtMngNo= "";
          storeHidden = true;
          mchtMngNoHidden = true;
        }
        console.log("mchtBigType:"+mchtBigType);
        mchtBigType = mchtJs.queryAgencyInfo(mchtBigType);
      console.log("mchtBigType:"+mchtBigType);
        that.setData({
          mchtName: mcht.mchtName,
          mchtSimpleName: mcht.mchtSimpleName,
          mchtLicnNo: mcht.mchtLicnNo,
          mchtLev: mchtLev,
          isStore: isStore,
          mchtMngNo: mchtMngNo,
          storeHidden: storeHidden,
          mchtMngNoHidden: mchtMngNoHidden,
          mchtBigType: mchtBigType,


        })
      },
      fail: function (res) { return false; }
    })
  },



  queryAgencyInfo: function (mchtBigType) {
    var that = this;
    wx.request({
      url: 'http://ydsd.bsb.com.cn/ifsp-gateway/agent/queryAgencyInfo.do',
      data: {
        sessionId: '111111111111111111111111111111111111',
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        cgList = res.data.cgList;
        if (cgList.length > 0) {
          cgList.forEach(function (item, index) {
            if (mchtBigType == cgList.custNo) {
              mchtBigType = cgList.custName;
            }
          })
        }
      },
      fail: function (res) {
      }
    })
    return mchtBigType;
  },

  bindReturnStep(e) {
    var dataset = e.target.dataset
    var pageNum = dataset.text
    if (pageNum === "1") {
      const path = '../mchtBaseInfoDetail/mchtBaseInfoDetail'
      App.WxService.navigateTo(path)
    } else if (pageNum === "2") {
      const path = '../mchtAcctInfoDetail/mchtAcctInfoDetail'
      App.WxService.navigateTo(path)
    } else if (pageNum === "3") {
      const path = '../mchtPicInfoDetail/mchtPicInfoDetail'
      App.WxService.navigateTo(path)
    } else if  (pageNum === "4") {
      const path = '../mchtProdListDetail/mchtProdListDetail'
      App.WxService.navigateTo(path)
    } else {
      console.log("页面步骤异常");
      return 
    }
  }
});