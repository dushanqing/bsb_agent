var app = getApp();
var util = require("../../../../utils/util.js");
Page({
  data: {
    prodList: [],
  },
  onShow() {
    this.showData();
  },
  showData: function () {
    var that = this;
    var data = wx.getStorageSync("mchtDeatil"),
      isThreeInOne;
    if (util.strIsNotEmpty(data)) {
      var prodList = data.productDetail;
          that.setData({
            prodList: prodList
          })
      }
  },
  bindProductDetail(e){
    var prodId = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: "../detail/prodDetail/prodDetail?prodId=" + prodId
    });
  },


  /**
   * 步骤标签跳转
   */
  bindReturnStep(e) {
    var dataset = e.target.dataset;
    var pageNum = dataset.text;
    if (pageNum === '1') {
      wx.redirectTo ({
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
}) 





