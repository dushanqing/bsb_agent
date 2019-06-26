const App = getApp();
var util = require("../../../../utils/util.js");
import { config } from '../../../../config.js';
Page({
    /**
   * 页面的初始数据
   */
  data: {
    
    modalHidden: true,
  },

   onShow() {
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
            that.downloadFile(item.mchtPicId,"yyzz");
          }
          if ('02' === item.mchtPicType) {
            that.downloadFile(item.mchtPicId, "swdj");
          }
          if ('03' === item.mchtPicType) {
            that.downloadFile(item.mchtPicId, "zzjg");
          }
          if ('04' === item.mchtPicType) {
            that.downloadFile(item.mchtPicId, "sfzj");
          }
          if ('05' === item.mchtPicType) {
            that.downloadFile(item.mchtPicId, "shxy");
          }
        })
      }
      that.setData({
        isThreeInOne: isThreeInOne
      })
    }
  },
  downloadFile: function (img, type) {
    var url = config.baseRestUrl
    var that = this;
    wx.downloadFile({
      url: url+'downloadFile/' + img,
      header: {
        "content-type": "multipart/form-data",
      },
      success(res) {
        if ("yyzz" === type){
          if (res.statusCode === 200) {
            that.setData({
              show_yyzz: res.tempFilePath
            })
          }
        }
        if ("swdj" === type) {
          if (res.statusCode === 200) {
            that.setData({
              show_swdj: res.tempFilePath
            })
          }
        }
        if ("zzjg" === type) {
          if (res.statusCode === 200) {
            that.setData({
              show_zzjg: res.tempFilePath
            })
          }
        }
        if ("sfzj" === type) {
          if (res.statusCode === 200) {
            that.setData({
              show_sfzj: res.tempFilePath
            })
          }
        }
         if ("shxy" === type) {
          if (res.statusCode === 200) {
            that.setData({
              show_shxy: res.tempFilePath
            })
          }
        }
       
      }
    })
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
  },

  modalCancel: function () {
    var that = this;
    that.setData({
      modalHidden: true,
      modelTitle: "",
    });
  },
  modalConfirm: function (e) {
    var that = this;
    var src = null;
    that.setData({
      modalHidden: true,
      modelTitle: "",
    });
  },

  bindYyzzImg:function(e){
   var src = e.target.dataset.src;
    this.showImg(src,'营业执照');
  },
  bindZzjgImg: function (e) {
    var src = e.target.dataset.src;
    this.showImg(src, '组织结构代码证');
  },
  bindSwdjImg: function (e) {
    var src = e.target.dataset.src;
    this.showImg(src, '税务登记证');
  },
  bindSfzjImg: function (e) {
    var src = e.target.dataset.src;
    this.showImg(src, '身份证正/反面');
  },
  bindShxyImg: function (e) {
   var src = e.target.dataset.src;
    this.showImg(src, '商户协议');
  },


  //模态框图片回显
  showImg: function (src,title){
    var that = this;
    if (util.strIsEmpty(src)) {
      return;
    }
    that.setData({
      modalHidden: false,
      modelTitle: title,
      tempFilePaths: src
    })
  }
});