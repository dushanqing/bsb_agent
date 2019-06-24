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
    if (pageNum === '1') {
      wx.redirectTo({
        url: '../../mchtBaseInfoDetail/mchtBaseInfoDetail',
      });
    } else if (pageNum === '2') {
      wx.redirectTo({
        url: '../../mchtAcctInfoDetail/mchtAcctInfoDetail',
      });
    } else if (pageNum === '3') {
      wx.redirectTo({
        url: '../../mchtPicInfoDetail/mchtPicInfoDetail',
      });
    } else if (pageNum === '4') {
      wx.redirectTo({
        url: '../../mchtProdListDetail/mchtProdListDetail',
      });
    } else {
      return;
    }
  }
});