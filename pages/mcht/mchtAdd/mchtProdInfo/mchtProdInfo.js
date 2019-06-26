const App = getApp();
var util = require("../../../../utils/util.js");
import {
  HTTP
} from '../../../../utils/http.js';
let http = new HTTP();
var mchtInfo;
var saveFlag = true;
Page({
  data: {
    checkboxItems: [],
    prodName: "",
    jiejifee: "0.00",
    jiejitop: "0.00",
    daijifee: "0.00",
    daijitop: "0.00",
    limitMin: "0.00",
    limitOne: "0.00",
    limitDay: "0.00",
    limitMonth: "0.00",
    limitYear: "0.00",
    modalHidden: true,
    btnDisabled:false,
  },

  onShow() {
    mchtInfo = wx.getStorageSync("mchtInfo");
    this.queryProductNameByUserId();
    this.showData();
  },

  showData: function() {
    if (util.strIsNotEmpty(mchtInfo)) {
      if (util.strIsNotEmpty(mchtInfo.prodName)) {
        this.setData({
          prodName: mchtInfo.prodName,
        })
      }else{
        this.setData({
          prodName: "",
        })
      }
      if (util.strIsNotEmpty(mchtInfo.jiejifee)) {
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
  jiejitopkeepTwoDecimals: function(e) {
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
  daijifeekeepTwoDecimals: function(e) {
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
  daijitopkeepTwoDecimals: function(e) {
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
  limitMinkeepTwoDecimals: function(e) {
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
  limitOnekeepTwoDecimals: function(e) {
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
  limitDaykeepTwoDecimals: function(e) {
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
  limitMonthkeepTwoDecimals: function(e) {
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
  limitYearkeepTwoDecimals: function(e) {
    var value = util.toKeepTwoDecimals(e.detail.value);
    mchtInfo.limitYear = value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      limitYear: value,
    })
  },


  //根据用户获取代理商的产品名称
  queryProductNameByUserId: function() {
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
      //失败
      if ('S' != resCode) {
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
  bindCheckProd: function() {
    mchtInfo = wx.getStorageSync("mchtInfo");
    var checkProd = mchtInfo.checkProd;
    var checkboxItems = mchtInfo.checkboxItems;
    if (util.strIsNotEmpty(checkProd)) {
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].prodChecked = false;
        for (var j = 0, lenJ = checkProd.length; j < lenJ; ++j) {
          if (checkboxItems[i].prodId === checkProd[j].prodId) {
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
  checkboxChange: function(e) {
    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].prodChecked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].prodId === values[j]) {
          checkboxItems[i].prodChecked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems
    });
  },

  //取消
  modalCancel: function() {
    this.setData({
      modalHidden: true
    });
  },
  // 确认
  modalConfirm: function(e) {
    var  checkboxItems = this.data.checkboxItems;
    var prodName = "";
    var checkProd = new Array();
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i].prodChecked === true) {
        checkProd.push(checkboxItems[i]);
        prodName += checkboxItems[i].productName;
      }
    }
  if (util.strIsNotEmpty(prodName)) {
      this.setData({
        prodName: prodName
      });
    mchtInfo.checkProd = checkProd;
    mchtInfo.prodName = prodName;
    wx.setStorageSync("mchtInfo", mchtInfo);
  }else{
    this.setData({
      prodName: ""
    });
    mchtInfo.checkProd = null;
    mchtInfo.prodName = "";
    wx.setStorageSync("mchtInfo", mchtInfo);
  }
  this.setData({
      modalHidden: true
  });
  },

  //步骤回点
  bindReturnStep(e) {
    var dataset = e.target.dataset
    var pageNum = dataset.text
    if (pageNum === "1") {
      wx.redirectTo({
        url: '../mchtBaseInfo/mchtBaseInfo'
      });
    }
    if (pageNum === "2") {
      wx.redirectTo({
        url: '../mchtAcctInfo/mchtAcctInfo'
      });
    }
    if (pageNum === "3") {
      wx.redirectTo({
          url: '../mchtPicInfo/mchtPicInfo'
      });
    } else {
      return
    }
  },
  // 提交前校验
  checkFiled: function(e) {
    mchtInfo = wx.getStorageSync("mchtInfo");
    var checkProd = mchtInfo.checkProd;
    var prodIds = "";
    if (util.strIsEmpty(checkProd)) {
      util.showToast('请至少选择一个支付产品！');
      return false;
    }
    for (var i = 0, lenI = checkProd.length; i < lenI; ++i){
      prodIds += checkProd[i].prodId + "|";
    }
    if (util.strIsEmpty(prodIds)) {
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
  saveMerchant: function() {

  },
  // 提交审核
  baseFormSubmit(e) {
    this.setData({ btnDisabled: true })
      if (this.checkFiled(e)) {
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
          //成功
          if ('S' === resCode) {
            wx.removeStorageSync('mchtInfo');
            wx.removeStorageSync('ctArr');
            wx.removeStorageSync('mchtBigType');
            wx.reLaunch({
              url: "../detail/mchtAddResult/mchtAddResult",
            });
          } else { //失败
            util.showToast(resMessage);
            this.setData({ btnDisabled: false })
          }
        })
      } else {
        that.setData({
          btnDisabled: false
        })
      }
    }
});