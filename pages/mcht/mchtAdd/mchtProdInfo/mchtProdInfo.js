const App = getApp();
var util = require("../../../../utils/util.js");
import {
  HTTP
} from '../../../../utils/http.js'
let http = new HTTP();
var mchtInfo;
Page({
  data: {
    checkboxItems: [],
    prodName: "",
    jiejifee:"0.00",
    jiejitop:"0.00",
    daijifee: "0.00",
    daijitop: "0.00",
    limitMin: "0.00",
    limitOne: "0.00",
    limitDay: "0.00",
    limitMonth: "0.00",
    limitYear: "0.00",
    modalHidden: true
  },

  onLoad() {
    mchtInfo = wx.getStorageSync("mchtInfo");
    this.queryProductNameByUserId();
    this.showData();
  },

  showData: function () {
    if (util.strIsNotEmpty(mchtInfo)){
      if (util.strIsNotEmpty(mchtInfo.prodName)) {
        this.setData({
          prodName: mchtInfo.prodName,
        })
      }
      if (util.strIsNotEmpty(mchtInfo.jiejifee)){
        this.setData({
          jiejifee: mchtInfo.jiejifee,
        })
      }
      if (util.strIsNotEmpty(mchtInfo.jiejitop)) {
        this.setData({
          jiejitop: mchtInfo.jiejitop,
        })
      }
      if (util.strIsNotEmpty(mchtInfo.daijifee)) {
        this.setData({
          daijifee: mchtInfo.daijifee,
        })
      }
      if (util.strIsNotEmpty(mchtInfo.daijitop)) {
        this.setData({
          daijitop: mchtInfo.daijitop,
        })
      }
      if (util.strIsNotEmpty(mchtInfo.limitMin)) {
        this.setData({
          limitMin: mchtInfo.limitMin,
        })
      }
      if (util.strIsNotEmpty(mchtInfo.limitOne)) {
        this.setData({
          limitOne: mchtInfo.limitOne,
        })
      }
      if (util.strIsNotEmpty(mchtInfo.limitDay)) {
        this.setData({
          limitDay: mchtInfo.limitDay,
        })
      }
      if (util.strIsNotEmpty(mchtInfo.limitMonth)) {
        this.setData({
          limitMonth: mchtInfo.limitMonth,
        })
      }
      if (util.strIsNotEmpty(mchtInfo.limitYear)) {
        this.setData({
          limitYear: mchtInfo.limitYear,
        })
      }
    }
  },


/**
 * 借记卡手续费保留两位小数
 */
  jiejifeekeepTwoDecimals: function(e) {
    var value = util.toKeepTwoDecimals(e.detail.value);
    mchtInfo.jiejifee = value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      jiejifee: value,
    })
  },
  /**
 * 借记卡费率封顶保留两位小数
 */
  jiejitopkeepTwoDecimals: function (e) {
    var value = util.toKeepTwoDecimals(e.detail.value);
    mchtInfo.jiejitop = value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      jiejitop: value,
    })
  },
  /**
 * 贷记卡手续费保留两位小数
 */
  daijifeekeepTwoDecimals: function (e) {
    var value = util.toKeepTwoDecimals(e.detail.value);
    mchtInfo.daijifee = value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      daijifee: value,
    })
  },
  /**
 * 贷记卡费率封顶保留两位小数
 */
  daijitopkeepTwoDecimals: function (e) {
    var value = util.toKeepTwoDecimals(e.detail.value);
    mchtInfo.daijitop = value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      daijitop: value,
    })
  },
  /**
* 单笔最小限额保留两位小数
*/
  limitMinkeepTwoDecimals: function (e) {
    var value = util.toKeepTwoDecimals(e.detail.value);
    mchtInfo.limitMin = value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      limitMin: value,
    })
  },
  /**
* 单笔最大限额保留两位小数
*/
  limitOnekeepTwoDecimals: function (e) {
    var value = util.toKeepTwoDecimals(e.detail.value);
    mchtInfo.limitOne = value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      limitOne: value,
    })
  },
  /**
* 单日累计限额保留两位小数
*/
  limitDaykeepTwoDecimals: function (e) {
    var value = util.toKeepTwoDecimals(e.detail.value);
    mchtInfo.limitDay = value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      limitDay: value,
    })
  },
  /**
* 月累计限额保留两位小数
*/
  limitMonthkeepTwoDecimals: function (e) {
    var value = util.toKeepTwoDecimals(e.detail.value);
    mchtInfo.limitMonth = value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      limitMonth: value,
    })
  },
  /**
* 年累计限额保留两位小数
*/
  limitYearkeepTwoDecimals: function (e) {
    var value = util.toKeepTwoDecimals(e.detail.value);
    mchtInfo.limitYear = value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      limitYear: value,
    })
  },


  //根据用户获取代理商的产品名称
  queryProductNameByUserId: function () {
    var that = this;
    const resBody = http.request({
      url: 'selectProductNameByUserId.do',
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
      mchtInfo.checkboxItems = res.empList;
      wx.setStorageSync("mchtInfo", mchtInfo);
      that.setData({
        checkboxItems: res.empList,
      });
    })
  },

//产品弹框
  bindCheckProd: function(){
    mchtInfo = wx.getStorageSync("mchtInfo");
    var checkProdId = mchtInfo.checkProdId;
    var checkboxItems = mchtInfo.checkboxItems;
    if (util.strIsNotEmpty(checkProdId)){
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].prodChecked = false;
        for (var j = 0, lenJ = checkProdId.length; j < lenJ; ++j) {
          if (checkboxItems[i].prodId == checkProdId[j]) {
            checkboxItems[i].prodChecked = true;
            break;
          }
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems,
      modalHidden: false
    });
  },

//选择产品
  checkboxChange: function (e) {
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    var prodName = "";
    // var  = "";
    console.log("checkProdId:" + values);
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].prodChecked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].prodId == values[j]) {
          checkboxItems[i].prodChecked = true;
          prodName += checkboxItems[i].productName;
          break;
        }
      }
    }
    if (util.strIsNotEmpty(prodName)){
      this.setData({
        prodName: prodName,
        checkProdId: values
      });
      mchtInfo.checkProdId = values;
      mchtInfo.prodName = prodName;
      wx.setStorageSync("mchtInfo", mchtInfo);
    }
    this.setData({
      checkboxItems: checkboxItems
    });
  },

//取消
  modalCancel: function () {
    this.setData({
      modalHidden: true
    });
  },
  // 确认
  modalConfirm: function (e) {
    mchtInfo.checkboxItems = this.data.checkboxItems;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      modalHidden: true
    });
  },

//步骤回点
  bindReturnStep(e) {
    var dataset = e.target.dataset
    var pageNum = dataset.text
    if (pageNum === "1") {
      const path = '../mchtBaseInfo/mchtBaseInfo'
      wx.navigateTo({
        url: path
      });
    } if (pageNum === "2") {
      const path = '../mchtAcctInfo/mchtAcctInfo'
      wx.navigateTo({
        url: path
      });
    } if (pageNum === "3") {
      const path = '../mchtPicInfo/mchtPicInfo'
      wx.navigateTo({
        url: path
      });
    } else {
      return
    }
  },
  // 提交前校验
  checkFiled: function (e){
    var checkboxItems = this.data.checkboxItems;
    var prodIds="";
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i].prodChecked = true) {
        prodIds += checkboxItems[i] + "|";
        break;
      }
    }
    if (util.strIsEmpty(prodIds)){
      util.showToast('请至少选择一个支付产品！');
      return false;
    }
    var jiejifee = e.detail.value.jiejifee; 
    if (util.strIsEmpty(jiejifee)) {
      util.showToast('请填写借记卡手续费(%)！');
      return false;
    }
    var jiejitop = e.detail.value.jiejitop;
    if (util.strIsEmpty(jiejitop)) {
      util.showToast('请填写借记卡费率封顶(元)！');
      return false;
    }
    var daijifee = e.detail.value.daijifee;
    if (util.strIsEmpty(daijifee)) {
      util.showToast('请填写贷记卡手续费(%)！');
      return false;
    }
    var daijitop = e.detail.value.daijitop;
    if (util.strIsEmpty(daijitop)) {
      util.showToast('请填写贷记卡费率封顶(元)！');
      return false;
    }

    var limitMin = e.detail.value.limitMin,
        limitOne = e.detail.value.limitOne,
        limitDay = e.detail.value.limitDay,
        limitMonth = e.detail.value.limitMonth,
        limitYear = e.detail.value.limitYear;
    //限额校验
    var limitArray = new Array();
    if ((limitMin - 0) > 0) {
      var limitMinDesc = new Array();
      limitMinDesc.push(limitMin, "单笔最小限额");
      limitArray.push(limitMinDesc);
    }
    if ((limitOne - 0) > 0) {
      var limitOneDesc = new Array();
      limitOneDesc.push(limitOne, "单笔最大限额");
      limitArray.push(limitOneDesc);
    }
    if ((limitDay - 0) > 0) {
      var limitDayDesc = new Array();
      limitDayDesc.push(limitDay, "单日累计限额");
      limitArray.push(limitDayDesc);
    }
    if ((limitMonth - 0) > 0) {
      var limitMonthDesc = new Array();
      limitMonthDesc.push(limitMonth, "月累计限额");
      limitArray.push(limitMonthDesc);
    }
    if ((limitYear - 0) > 0) {
      var limitYearDesc = new Array();
      limitYearDesc.push(limitYear, "年累计限额");
      limitArray.push(limitYearDesc);
    }
    for (var i = 0; i < limitArray.length - 1; i++) {
      if ((limitArray[i][0] - limitArray[i + 1][0]) > 0) {
        util.showToast(limitArray[i + 1][1] + "必须大于或等于" + limitArray[i][1]);
        return false;
      }
    }
    mchtInfo.prodIds = prodIds;
    mchtInfo.jiejifee = jiejifee;
    mchtInfo.jiejitop = jiejitop;
    mchtInfo.daijifee = daijifee;
    mchtInfo.daijitop = daijitop;
    mchtInfo.limitMin = limitMin;
    mchtInfo.limitOne = limitOne;
    mchtInfo.limitDay = limitDay;
    mchtInfo.limitMonth = limitMonth;
    mchtInfo.limitYear = limitYear;
    mchtInfo.btnFlag = "add";
    return true;
  },
  saveMerchant: function(){
    const resBody = http.request({
      url: 'saveMerchant.do',
      data: {
        body: {
          mchtInfo: JSON.stringify(mchtInfo)
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
     //成功
      if ('0000' == resCode) {
        return true;
      } else {//失败
        util.showToast(resMessage);
        return false;
      }
     
    })
  },
  // 提交审核
  baseFormSubmit(e) {
     if (this.checkFiled(e) && this.saveMerchant()){
     const path = "../detail/mchtAddResult/mchtAddResult"
     wx.navigateTo({
       url: path
     });
    }
  }

});