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
    // var prodId = e.target.dataset.id;
    // var prodId = e.dataset.id;
    var prodId = e.currentTarget.dataset.id;
    wx.navigateTo({
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
      wx.navigateTo({
        url: '../mchtBaseInfoDetail/mchtBaseInfoDetail',
      });
    } else if (pageNum === '2') {
      wx.navigateTo({
        url: '../mchtAcctInfoDetail/mchtAcctInfoDetail',
      });
    } else if (pageNum === '3') {
      wx.navigateTo({
        url: '../mchtPicInfoDetail/mchtPicInfoDetail',
      });
    } else if (pageNum === '4') {
      wx.navigateTo({
        url: '../mchtProdListDetail/mchtProdListDetail',
      });
    } else {
      return;
    }
  }
}) 





