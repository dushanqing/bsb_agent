const App = getApp();
var util = require("../../../../utils/util.js");
var mchtInfo;
Page({
  data: {
    threeToOne: ["是", "否"],
    threeToOneIndex: 0,
    modalHidden: true,
  },

  onLoad() {
    this.ctx = wx.createCameraContext();
  },

  modalCancel: function () {
    this.setData({
      modalHidden: true
    });
  },
  modalConfirm: function (e) {
    console.log("URL:" + this.data.tempFilePaths);
    var imgFlag = this.data.imgFlag;
    //保存到服务器
    this.upload_file(imgFlag);
    this.setData({
      modalHidden: false
    });
  },

  upload_file: function (imgFlag) {
    var that = this;
    wx.uploadFile({
      // url: 'http://ydsd.bsb.com.cn/ifsp-gateway/agent/imgUpLoadFile.do',
      url:'http://localhost:8080/demo-ocr/imgUpload.do',
      filePath: that.data.tempFilePaths,
      name: "file",
      formData: {
        sessionId: "WX_SESSIONID_otSvI5UvuYFT2D_tvev-Zf4eCB4A20190527150947388"
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        var result = JSON.parse(res.data)
        console.log(result);
        if ('yyzz' == imgFlag) {
          if ('0000' == result.respCode) {
            console.log(" result.infoCardNumber:" + result.infoCardNumber);
            // that.setData({
            //   setlAcctNo: result.infoCardNumber,
            //   modalHidden: true
            // });
            mchtInfo.yyzz = result.yyzz;
            // wx.setStorageSync("mchtInfo", mchtInfo);
          } else {
            that.setData({
              modalHidden: true
            });
            util.showToast(result.resMessage);
          }
        }
        // if ('01' == imgType) {
        //   if ('0000' == result.respCode) {
        //     console.log(" result.infoNumber:" + result.infoNumber);
        //     that.setData({
        //       setlCertNo: result.infoNumber,
        //       legalPersonName: result.infoName,
        //       modalHidden: true
        //     });
        //     mchtInfo.setlCertNo = result.infoNumber;
        //     mchtInfo.legalPersonName = result.infoName;
        //     wx.setStorageSync("mchtInfo", mchtInfo);
        //   } else {
        //     that.setData({
        //       modalHidden: true
        //     });
        //     util.showToast(result.resMessage);
        //   }
        // }
      },
      fail: function (res) {

      },
    })
  },

  chooseImage: function (imgFlag) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        let itemList;
        if (res.platform == 'android') {
          itemList = ['从相册中选择', '拍照', '取消']
        } else {
          itemList = ['从相册中选择', '拍照']
        }
        wx.showActionSheet({
          itemList: itemList,
          success: function (res) {
            if (res.tapIndex == 0) {
              that.chooseWxImage('album', imgFlag)
            } else if (res.tapIndex == 1) {
              that.chooseWxImage('camera', imgFlag)
            } else if (res.tapIndex == 2) {
              //取消操作
            }
          },
        })
      },
    })
  },

  chooseWxImage: function (type, imgFlag) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 1,
      success: function (res) {
        console.log(res);
        var tempFilesSize = res.tempFiles[0].size;  //获取图片的大小，单位B
        if (tempFilesSize <= 2000000) {//图片小于或者等于2M(2000000B)时 可以执行获取图片
          that.setData({
            modalHidden: false,
            imgFlag: imgFlag,
            tempFilePaths: res.tempFilePaths[0],
          })
        } else {    
          util.showToast('上传图片不能大于2M！');
        }
      }
    })
  },

  bindYyzzImg: function(){
    this.chooseImage("yyzz");
  },

  /**
   * 是否三证合一
   * 系统码值：0-否，1-是
   */
  bindThreeToOneChange: function (e) {
    this.setData({
      threeToOneIndex: e.detail.value
    })
  },
  bindReturnStep(e) {
    var dataset = e.target.dataset
    var pageNum = dataset.text
    if (pageNum === "1") {
      wx.navigateTo({
        url: "../mchtBaseInfo/mchtBaseInfo"
      });
    } if (pageNum === "2") {
      wx.navigateTo({
        url: "../mchtAcctInfo/mchtAcctInfo"
      });
    } else {
      return;
    }
  },

  // 电子信息页面 下一步
  mchtPicNextStep(e) {
    // if (this.checkFiled(e)) {
    wx.navigateTo({
      url: "../mchtProdInfo/mchtProdInfo"
    });
    // }
  }



});