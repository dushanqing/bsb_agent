const App = getApp();
var util = require("../../../../../utils/util.js");

Page({
  data: {},
  onLoad(options) {
    this.showData(options);
  },

  showData(options) {
    var that = this;
    var data = wx.getStorageSync("mchtDeatil");
    if (util.strIsNotEmpty(data)) {
      var prodList = data.productDetail;
        if (prodList.length > 0) {
          prodList.forEach(function(item, index) {
            if (options.prodId == item.productId) {
              that.setData({
                productName: item.productName,
                jiejiFee: item.jiejiFee,
                jiejiTop: item.jiejiTop,
                daijiFee: item.daijiFee,
                daijiTop: item.daijiTop,
                limitMin: item.limitMin,
                limitOne: item.limitOne,
                limitDay: item.limitDay,
                limitMonth: item.limitMonth,
                limitYear: item.limitYear,

              })
            }
          })
        }
    }
  },



  /**
   * 步骤标签跳转
   */
  bindReturnStep(e) {
    var dataset = e.target.dataset;
    var pageNum = dataset.text;
    var path = "";
    if (pageNum === "1") {
      path = '../../mchtBaseInfoDetail/mchtBaseInfoDetail'
    } else if (pageNum === "2") {
      path = '../../mchtAcctInfoDetail/mchtAcctInfoDetail'
    } else if (pageNum === "3") {
      path = '../../mchtPicInfoDetail/mchtPicInfoDetail'
    } else if (pageNum === "4") {
      path = '../../mchtProdListDetail/mchtProdListDetail'
    } else {
      console.log("页面步骤异常");
      return
    }
    wx.navigateTo({
      url: path
    });
  }
});