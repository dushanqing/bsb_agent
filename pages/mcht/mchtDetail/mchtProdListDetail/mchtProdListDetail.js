var app = getApp();
var util = require("../../../../utils/util.js");
Page({
  data: {
    prodList: [],
  },
  onLoad() {
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
    var prodId = e.target.dataset.id;
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
    var path ="";
    if (pageNum === "1") {
      path = '../mchtBaseInfoDetail/mchtBaseInfoDetail'
    } else if (pageNum === "2") {
      path = '../mchtAcctInfoDetail/mchtAcctInfoDetail'
    } else if (pageNum === "3") {
      path = '../mchtPicInfoDetail/mchtPicInfoDetail'
    } else if (pageNum === "4") {
    //  path = '../mchtProdListDetail/mchtProdListDetail'
      return
    } else {
      console.log("页面步骤异常");
      return
    }
    wx.navigateTo({
      url: path
    });
  }
}) 





