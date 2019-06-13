const App = getApp();
var util = require("../../../../utils/util.js");
var yyzz="/images/no-pic.png",
zzjg= "/images/no-pic.png",
swdj="/images/no-pic.png",
sfzj= "/images/no-pic.png",
shxy= "/images/no-pic.png";
Page({
    /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
  },

  onLoad() {
    this.showData();
  },
  showData: function () {
    var that = this;
    var data = wx.getStorageSync("mchtDeatil"),  isThreeInOne;
    
    if (util.strIsNotEmpty(data)) {
      var contr = data.contr;
      var picList = data.picList;
      if ("1" == contr.isThreeInOne){
        isThreeInOne = "是";
      } else if ("0" == contr.isThreeInOne) {
        isThreeInOne = "否";
      }
        
      if (picList.length > 0) {
        picList.forEach(function (item, index) {
          if ('01' === item.mchtPicType){
            yyzz = item.mchtPicId
          }
          if ('02' === item.mchtPicType) {
            swdj = item.mchtPicId
          }
          if ('03' === item.mchtPicType) {
            zzjg = item.mchtPicId
          }
          if ('04' === item.mchtPicType) {
            sfzj = item.mchtPicId
          }
          if ('05' === item.mchtPicType) {
            shxy = item.mchtPicId
          }
        })
      }
      
      
      that.setData({
        isThreeInOne: isThreeInOne,
        yyzz: yyzz,
        zzjg: zzjg,
        swdj: swdj,
        sfzj: sfzj,
        shxy: shxy,
      })
    }
  },


  bindReturnStep(e) {
    var dataset = e.target.dataset;
    var pageNum = dataset.text;
    var  path = "";
    if (pageNum === "1") {
      path = "../mchtBaseInfoDetail/mchtBaseInfoDetail"
    } else if (pageNum === "2") {
      path = "../mchtAcctInfoDetail/mchtAcctInfoDetail"
    } else if (pageNum === "3") {
      // path = "../mchtPicInfoDetail/mchtPicInfoDetail"
      return
    } else if (pageNum === "4") {
      path = "../mchtProdListDetail/mchtProdListDetail"
    } else {
      console.log("页面步骤异常");
      return
    }
    wx.navigateTo({
      url: path
    });
  },

  modalCancel: function () {
    this.setData({
      modalHidden: true
    });
  },
  modalConfirm: function (e) {
    this.setData({
      modalHidden: true
    });
  }
});