const App = getApp();
var util = require("../../../../utils/util.js");
import { config } from '../../../../config.js';
var mchtInfo = wx.getStorageSync("mchtInfo"), yyzz, zzjg, swdj, sfzj, shxy;
Page({
  data: {
    threeToOne: [{
      threeToOneId: "1",
      threeToOneName: "是"
    }, {
        threeToOneId: "0",
        threeToOneName: "否"
    }],
    threeToOneIndex: 0,
    modalHidden: true,
    imgSubFlag: false,//控制重复提交,图片确定按钮
    btnDisabled: false,
  },
 
  onLoad() {
    mchtInfo = wx.getStorageSync("mchtInfo");
    this.showData();
  },
  showData:function(){
    var that = this;
    if (util.strIsNotEmpty(mchtInfo)) {
      if (util.strIsNotEmpty(mchtInfo.threeToOneIndex)) {
        this.setData({
          threeToOneIndex: mchtInfo.threeToOneIndex
        });
      }
      if (util.strIsNotEmpty(mchtInfo.yyzz)){
        that.setData({
          yyzz: mchtInfo.yyzz,
        })
      }else{
        that.setData({
          yyzz: "/images/tupian.png",
        })
      }

      if (util.strIsNotEmpty(mchtInfo.zzjg)) {
        that.setData({
          zzjg: mchtInfo.zzjg,
        })
      } else {
        that.setData({
          zzjg: "/images/tupian.png",
        })
      }
      
      if (util.strIsNotEmpty(mchtInfo.swdj)) {
        that.setData({
          swdj: mchtInfo.swdj,
        })
      } else {
        that.setData({
          swdj: "/images/tupian.png",
        })
      }

      if (util.strIsNotEmpty(mchtInfo.sfzj)) {
        that.setData({
          sfzj: mchtInfo.sfzj,
        })
      } else {
        that.setData({
          sfzj: "/images/tupian.png",
        })
      }

      if (util.strIsNotEmpty(mchtInfo.shxy)) {
        that.setData({
          shxy: mchtInfo.shxy,
        })
      } else {
        that.setData({
          shxy: "/images/tupian.png",
        })
      }
    }
  },

  modalCancel: function () {
    this.setData({
      modalHidden: true
    });
  },
  modalConfirm: function (e) {
    var that = this;
    //避免重复提交
    if (that.data.imgSubFlag) {
      return;
    }
    that.setData({
      imgSubFlag: true,
    });
    var imgFlag = that.data.imgFlag;
    //保存到服务器
    that.upload_file(imgFlag);
    that.setData({
      modalHidden: false
    });
  },

  upload_file: function (imgFlag) {
    console.log("---pic-img-----");
    var that = this;
    let sessionId = wx.getStorageSync('sessionId');
    var filePath = that.data.tempFilePaths;
    var url = config.baseRestUrl + 'imgUpLoadFile.do';
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: "fileData",
      formData: {
        sessionId: sessionId
      },
      header: {
        "content-type": "multipart/form-data",
      },
      success: function (res) {
       var result =  JSON.parse(res.data);
        var fileList = result.fileDataList;
        if ('yyzz' == imgFlag) {
          if ('0000' == result.respCode) {
            that.setData({
              yyzz: filePath,
              modalHidden: true
            });
            mchtInfo.yyzzMchtPicId = fileList[0].downloadUrlCode;
            mchtInfo.yyzz = filePath;
            wx.setStorageSync("mchtInfo", mchtInfo);
            wx.setStorageSync("yyzz", yyzz);
          } 
          else {
            util.showToast(result.respMsg);
            that.setData({
              modalHidden: true
            });
          }
        } 
        if ('zzjg' == imgFlag) {
          if ('0000' == result.respCode) {
            that.setData({
              zzjg: filePath,
              modalHidden: true
            });
            mchtInfo.zzjgMchtPicId = fileList[0].downloadUrlCode;
            mchtInfo.zzjg = filePath;
            wx.setStorageSync("mchtInfo", mchtInfo);
          }
          else {
            util.showToast(result.respMsg);
            that.setData({
              modalHidden: true
            });
          }
        }  
        if ('swdj' == imgFlag) {
          if ('0000' == result.respCode) {
            that.setData({
              swdj: filePath,
              modalHidden: true
            });
            mchtInfo.swdjMchtPicId = fileList[0].downloadUrlCode;
            mchtInfo.swdj = filePath;
            wx.setStorageSync("mchtInfo", mchtInfo);
          }
          else {
            util.showToast(result.respMsg);
            that.setData({
              modalHidden: true
            });
          }
        } 
        if ('sfzj' == imgFlag) {
          if ('0000' == result.respCode) {
            that.setData({
              sfzj: filePath,
              modalHidden: true
            });
            mchtInfo.sfzjMchtPicId = fileList[0].downloadUrlCode;
            mchtInfo.sfzj = filePath;
            wx.setStorageSync("mchtInfo", mchtInfo);
          }
          else {
            util.showToast(result.respMsg);
            that.setData({
              modalHidden: true
            });
          }
        } 
        if ('shxy' == imgFlag) {
          if ('0000' == result.respCode) {
            that.setData({
              shxy: filePath,
              modalHidden: true
            });
            mchtInfo.shxyMchtPicId = fileList[0].downloadUrlCode;
            mchtInfo.shxy = filePath;
            wx.setStorageSync("mchtInfo", mchtInfo);
          }
          else {
            util.showToast(result.respMsg);
            that.setData({
              modalHidden: true
            });
          }
        }
        that.setData({
          imgSubFlag: false,
        });
      },
      fail: function (res) {
        util.showToast('图片上传失败！');
        that.setData({
          imgSubFlag: false,
          modalHidden: true
        });
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
  bindZzjgImg: function () {
    this.chooseImage("zzjg");
  },
  bindSwdjImg: function () {
    this.chooseImage("swdj");
  },
  bindSfzjImg: function () {
    this.chooseImage("sfzj");
  },
  bindShxyImg: function () {
    this.chooseImage("shxy");
  },

  /**
   * 是否三证合一
   * 系统码值：0-否，1-是
   */
  bindThreeToOneChange: function (e) {
    mchtInfo.threeToOneIndex = e.detail.value;
    this.setData({
      threeToOneIndex: e.detail.value
    })
    wx.setStorageSync("mchtInfo", mchtInfo);
  },
  bindReturnStep(e) {
    var dataset = e.target.dataset
    var pageNum = dataset.text
    if (pageNum === "1") {
      wx.redirectTo({
        url: "../mchtBaseInfo/mchtBaseInfo"
      });
    } if (pageNum === "2") {
      wx.redirectTo({
        url: "../mchtAcctInfo/mchtAcctInfo"
      });
    } else {
      return;
    }
  },
  checkFiled: function(e){
    var threeToOne = this.data.threeToOne[e.detail.value.threeToOne].threeToOneId;
    console.log("threeToOne=" + threeToOne);
    if (util.strIsNotEmpty(mchtInfo)) {
      if ("00" === mchtInfo.isXiaowei ){
        if (util.strIsEmpty(mchtInfo.yyzzMchtPicId)){
          util.showToast('请上传营业执照！');
          return false;
        }
        if (util.strIsEmpty(mchtInfo.sfzjMchtPicId)) {
          util.showToast('请上传身份证件！');
          return false;
        }
        if (util.strIsEmpty(mchtInfo.shxyMchtPicId)) {
          util.showToast('请上传商户协议！');
          return false;
        }
      }
    
      if ("0" === threeToOne){
        if (util.strIsEmpty(mchtInfo.zzjgMchtPicId)) {
          util.showToast('请上传组织结构代码证！');
          return false;
        }
        if (util.strIsEmpty(mchtInfo.swdjMchtPicId)) {
          util.showToast('请上传税务登记证！');
          return false;
        }
      }
    }
    if ("01" === mchtInfo.isXiaowei) {
      if (util.strIsEmpty(mchtInfo.sfzjMchtPicId)) {
        util.showToast('请上传身份证件！');
        return false;
      }
    }
    mchtInfo.threeToOne = threeToOne;
    wx.setStorageSync("mchtInfo", mchtInfo);
    return true;
  },

  // 电子信息页面 下一步
  picFormSubmit(e) {
    var that = this;
    that.setData({ btnDisabled: true })
      if (that.checkFiled(e)) {
        console.log("---pic--");
        wx.redirectTo({
          url: '../mchtProdInfo/mchtProdInfo',
          success: function (res) {
            that.setData({
              btnDisabled: false
            });
          }
        })
      } else {
        that.setData({
          btnDisabled: false
        })
      }
    }
});