const app = getApp();
var util = require("../../../../utils/util.js");
var reg = require("../../../../utils/reg.js");
import {
  HTTP
} from '../../../../utils/http.js';
const http = new HTTP();
//引用腾讯地图API
var QQMapWX = require("../../../../utils/qqmap-wx-jssdk.min.js");
let keys = "SGXBZ-6X3K6-NYLSF-MALZD-QC6PK-BABOS";
var qqmapsdk;
var mchtMngNoList;
var mchtInfo;

Page({
  data: {
    mchtName: "",
    mchtNameFocus: false,
    mchtSimpleName: "",
    mchtSimpleNameFocus: false,
    mchtContAddr: "",
    showView: true,
    //小微
    xiaowei: [{
      xwId: "01",
      xwName: "是"
    }, {
      xwId: "00",
      xwName: "否"
    }],
    xiaoweiIndex: 1,

    // 商户类型
    mchtLev: [{
      mchtLevId: "02",
      mchtLevName: "普通商户"
    }, {
      mchtLevId: "01",
      mchtLevName: "连锁商户"
    }],
    mchtLevIndex: 0,

    // 是否门店
    stores: [{
      storesId: "02",
      storesName: "否"
    }, {
      storesId: "01",
      storesName: "是"
    }],
    storesHidden: true,

    //所属地区
    area: [{
      proCode: "",
      proName: "",
      ctCode: "",
      ctName: "",
      quCode: "",
      quName: ""
    }],

    //行业类别
    mchtBigType: [{
      custName: "",
      custNo: ""
    }],

    //所属商户
    mchtMngNoHidden: true,

    mchtType: [{
      mchtTypeId: "01",
      mchtTypeName: "实体"
    }, {
      mchtTypeId: "02",
      mchtTypeName: "虚体"
    }],
    mchtTypeIndex: 0,
    submitFlag: undefined,
  },

  onShow: function() {
    this.setData({
      submitFlag: true
    })
    //获取行业类别
    this.queryAgencyInfo();
  },

  onLoad: function(options) {
    mchtInfo = wx.getStorageSync("mchtInfo");
    if (util.strIsNotEmpty(mchtInfo)) {
      this.showData();
    } else {
      mchtInfo = new Object();
    }
    this.autoLocation(options); //自动获取地理位置
    //获取所属商户
    this.queryMomMerchantName();

    // 获取所属地区（省市区）
    this.queryCity();
  },

  // 回显数据
  showData: function() {
    this.mchtInfo = wx.getStorageSync("mchtInfo");
    if (util.strIsNotEmpty(mchtInfo)) {
      if (util.strIsNotEmpty(mchtInfo.mchtName)) {
        this.setData({
          mchtName: mchtInfo.mchtName
        });
      }
      if (util.strIsNotEmpty(mchtInfo.mchtSimpleName)) {
        this.setData({
          mchtSimpleName: mchtInfo.mchtSimpleName
        });
      }
      if (util.strIsNotEmpty(mchtInfo.mchtLicnNo)) {
        this.setData({
          mchtLicnNo: mchtInfo.mchtLicnNo
        });
      }
      if (util.strIsNotEmpty(mchtInfo.xiaoweiIndex)) {
        this.setData({
          xiaoweiIndex: mchtInfo.xiaoweiIndex
        });
      }
      if (util.strIsNotEmpty(mchtInfo.mchtLevIndex)) {
        //如果是普通商户 隐藏是否门店、所属商户
        // 连锁非门店  隐藏 所属商户
        let mchtLevId = this.data.mchtLev[mchtInfo.mchtLevIndex].mchtLevId;
        if ("02" === mchtLevId) {
          this.setData({
            mchtLevIndex: mchtInfo.mchtLevIndex,
            storesHidden: true,
            mchtMngNoHidden: true
          });
        } else {
          this.setData({
            mchtLevIndex: mchtInfo.mchtLevIndex,
            storesHidden: false,
            mchtMngNoHidden: false
          });

          if (util.strIsNotEmpty(mchtInfo.storesIndex)) {
            let storesId = this.data.stores[mchtInfo.storesIndex].storesId;
            if ("02" === storesId) {
              this.setData({
                storesIndex: mchtInfo.storesIndex,
                mchtMngNoHidden: true
              });
            } else {
              this.setData({
                storesIndex: mchtInfo.storesIndex,
                mchtMngNoHidden: false
              });
            }
          } else {
            this.setData({
              storesIndex: 0,
              mchtMngNoHidden: true
            });
          }
        }
      }

      if (util.strIsNotEmpty(mchtInfo.mchtMngNoIndex)) {
        this.setData({
          mchtMngNoIndex: mchtInfo.mchtMngNoIndex
        });
      }
      if (util.strIsNotEmpty(mchtInfo.mchtTypeIndex)) {
        this.setData({
          mchtTypeIndex: mchtInfo.mchtTypeIndex
        });
      }
      if (util.strIsNotEmpty(mchtInfo.mchtContAddr)) {
        this.setData({
          mchtContAddr: mchtInfo.mchtContAddr
        });
      }

      if (util.strIsNotEmpty(mchtInfo.mchtPersonName)) {
        this.setData({
          mchtPersonName: mchtInfo.mchtPersonName
        });
      }
      if (util.strIsNotEmpty(mchtInfo.mchtPhone)) {
        this.setData({
          mchtPhone: mchtInfo.mchtPhone
        });
      }
      if (util.strIsNotEmpty(mchtInfo.mchtEmail)) {
        this.setData({
          mchtEmail: mchtInfo.mchtEmail
        });
      }
      if (util.strIsNotEmpty(mchtInfo.longitude)) {
        this.setData({
          longitude: mchtInfo.longitude
        });
      }
      if (util.strIsNotEmpty(mchtInfo.latitude)) {
        this.setData({
          latitude: mchtInfo.latitude
        });
      }
    }
  },



  blurMchtName: function(e) {
    mchtInfo.mchtName = util.trim(e.detail.value);
    wx.setStorageSync("mchtInfo", mchtInfo);
  },

  blurMchtSimpleName: function(e) {
    mchtInfo.mchtSimpleName = util.trim(e.detail.value);
    wx.setStorageSync("mchtInfo", mchtInfo);
  },

  blurMchtLicnNo: function(e) {
    mchtInfo.mchtLicnNo = util.trim(e.detail.value);
    wx.setStorageSync("mchtInfo", mchtInfo);
  },

  //联系人
  blurMchtPersonName: function(e) {
    mchtInfo.mchtPersonName = util.trim(e.detail.value);
    wx.setStorageSync("mchtInfo", mchtInfo);
  },

  //联系电话
  blurMchtPhone: function(e) {
    mchtInfo.mchtPhone = util.trim(e.detail.value);
    wx.setStorageSync("mchtInfo", mchtInfo);
  },
  blurMchtContAddr: function(e) {
    mchtInfo.mchtContAddr = util.trim(e.detail.value);
    wx.setStorageSync("mchtInfo", mchtInfo);
  },

  //邮箱
  blurMchtEmail: function(e) {
    mchtInfo.mchtEmail = util.trim(e.detail.value);
    wx.setStorageSync("mchtInfo", mchtInfo);
  },

  //经度
  blurLongitude: function(e) {
    mchtInfo.longitude = util.trim(e.detail.value);
    wx.setStorageSync("mchtInfo", mchtInfo);
    // if (util.strIsNotEmpty(longitude)) {
    //   if (!reg.isLongitude.test(longitude)) {
    //     util.showToast('经度坐标输入有误！(经度范围-180.000000 ~ 180.000000)');
    //     return;
    //   }
    //   longitude = util.toKeepSixDecimals(longitude);
    //   this.setData({
    //     longitude: longitude
    //   });
    // } else{
    //   this.setData({
    //     longitude: ""
    //   });
    // }
  },

  //维度
  blurLatitude: function(e) {
    mchtInfo.latitude = util.trim(e.detail.value);
    wx.setStorageSync("mchtInfo", mchtInfo);
    // if (util.strIsNotEmpty(latitude)) {
    //   if (!reg.isLatitude.test(latitude)) {
    //     util.showToast('纬度坐标输入有误！(纬度范围-90.000000 ~ 90.000000)');
    //     return;
    //   }
    //   latitude = util.toKeepSixDecimals(latitude);
    //   this.setData({
    //     latitude: latitude
    //   });
    // }else{
    //   this.setData({
    //     latitude: ""
    //   });
    // }
  },

  bindArea(e) {
    wx.redirectTo({
      url: '../detail/mchtArea/province/province'
    });
  },

  bindMchtBigType(e) {
    var mchtLevId, storeId;
    if (util.strIsNotEmpty(mchtInfo) && util.strIsNotEmpty(mchtInfo.mchtLevIndex)) {
      mchtLevId = this.data.mchtLev[mchtInfo.mchtLevIndex].mchtLevId;
    }
    if ("01" === mchtLevId) {
      if (util.strIsNotEmpty(mchtInfo.storesIndex)) {
        storeId = this.data.stores[mchtInfo.storesIndex].storesId;
      }
      if ("01" === storeId) {
        return;
      }
    }
    wx.redirectTo({
      url: '../detail/mchtBigType/mchtBigType'
    });
  },

  //是否小微商户  yangjx  20190510
  bindXiaoweiChange: function(e) {
    mchtInfo.xiaoweiIndex = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      xiaoweiIndex: e.detail.value
    });
  },

  //显示所属地区
  queryCity: function() {
    var ctArr = wx.getStorageSync("ctArr");
    if (util.strIsNotEmpty(ctArr)) {
      this.setData({
        area: ctArr,
      });
    }
  },

  //显示行业类别
  queryAgencyInfo: function() {
    //获取行业类别
    var mchtBigType = wx.getStorageSync("mchtBigType");
    if (util.strIsNotEmpty(mchtBigType)) {
      this.setData({
        mchtBigType: mchtBigType,
      });
    }
  },

  //获取所属商户
  queryMomMerchantName: function() {
    var that = this;
    const resBody = http.request({
      url: 'queryMomMerchantName.do',
      data: {
        body: {}
      },
      method: 'POST'
    });
    resBody.then(res => {
      const resCode = res.resCode;
      const resMessage = res.resMessage;
      //session 过期处理 按照首次登录处理
      //失败
      if (resCode != 'S') {
        util.showToast(resMessage);
        return;
      }
      //成功
      mchtMngNoList = res.empList;
      //如果所属商户为null,所属商户不可选
      that.setData({
        mchtMngNo: mchtMngNoList
      });
    })
  },

  /**
   *  所属商户
   */
  bindMchtMngNoChange: function(e) {
    var value = e.detail.value;
    mchtInfo.mchtMngNoIndex = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      mchtMngNoIndex: e.detail.value,
    });
    var mchtMngNo = this.data.mchtMngNo[e.detail.value].mchtId;
    console.log();
    const resBody = http.request({
      url: 'queryAgencyInfo.do',
      data: {
        body: {
          mchtId: mchtMngNo
        }
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
      var arr = new Array();
      arr.push(res.cgList[0]);
      wx.setStorageSync('mchtBigType', arr);
      this.onShow();
    })
  },

  /**
   * 自动获取位置 yangjx 20190506
   */
  autoLocation: function(options) {
    if (util.strIsNotEmpty(options.mchtContAddr)) { // 手动地图选点
      mchtInfo.mchtContAddr = options.mchtContAddr;
      var lng = util.toKeepSixDecimals(options.lng);
      var lat = util.toKeepSixDecimals(options.lat);
      mchtInfo.longitude = lng;
      mchtInfo.latitude = lat;
      wx.setStorageSync("mchtInfo", mchtInfo);
      this.setData({
        mchtContAddr: options.mchtContAddr,
        longitude: lng,
        latitude: lat,
      });
    } else { //自动获取
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        //腾讯位置服务申请key
        key: "CLJBZ-HHDCQ-RGZ5G-GZGPZ-U5GBE-NDBKA"
      });
      var that = this;
      // 调用接口
      qqmapsdk.reverseGeocoder({
        success: function(res) {
          var mchtContAddr, longitude, latitude;
          if (util.strIsNotEmpty(mchtInfo)) {
            if (util.strIsNotEmpty(mchtInfo.mchtContAddr)) {
              mchtContAddr = mchtInfo.mchtContAddr;
            } else {
              mchtContAddr = res.result.address;
            }
            if (util.strIsNotEmpty(mchtInfo.longitude)) {
              longitude = mchtInfo.longitude;
            } else {
              longitude = res.result.location.lng;
              longitude = util.toKeepSixDecimals(longitude);
            }
            if (util.strIsNotEmpty(mchtInfo.latitude)) {
              latitude = mchtInfo.latitude;
            } else {
              latitude = res.result.location.lat;
              latitude = util.toKeepSixDecimals(latitude);
            }
          } else {
            mchtContAddr = res.result.address;
            longitude = res.result.location.lng;
            longitude = util.toKeepSixDecimals(longitude);
            latitude = res.result.location.lat;
            latitude = util.toKeepSixDecimals(latitude);
          }
          that.setData({
            mchtContAddr: mchtContAddr,
            longitude: longitude,
            latitude: latitude,
          });

        },
        fail: function(res) {},
        complete: function(res) {}
      });
    }

  },

  // 地图手动定位  yangjx 20190506
  openLocation: function(e) {
    const path = "/map/position/position";
    wx.redirectTo({
      url: path
    });
  },

  /**
   *  经营类型  yangjx 20190506
   *  系统码值：01-实体， 02-虚体
   */
  bindMchtTypeChange: function(e) {
    mchtInfo.mchtTypeIndex = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      mchtTypeIndex: e.detail.value
    });
  },


  //根据是否门店显示所属商户
  stores_onSelect: function(e) {

    if ("01" === this.data.stores[e.detail.value].storesId) {
      this.setData({
        mchtMngNoHidden: false,
        mchtMngNo: mchtMngNoList,
        mchtMngNoIndex: "",
      })
    }
    if ("02" === this.data.stores[e.detail.value].storesId) {
      this.setData({
        mchtMngNoHidden: true,
        mchtMngNo: "",
        mchtMngNoIndex: "",
        mchtBigType: [{
          custName: "",
          custNo: ""
        }],
      })
      wx.setStorageSync("mchtBigType", this.data.mchtBigType)
    }
    mchtInfo.storesIndex = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
  },

  /**
   *  是否门店 
   */
  bindStoresChange: function(e) {
    this.setData({
      storesIndex: e.detail.value
    });
    this.stores_onSelect(e);
  },

  //根据商户类型显示是否门店
  mchtLev_onSelect: function(e) {
    if ("02" === this.data.mchtLev[e.detail.value].mchtLevId) {
      this.setData({
        storesHidden: true,
        stores: "",
        storesIndex: "",
        mchtMngNoHidden: true,
        mchtMngNo: "",
        mchtMngNoIndex: "",
        mchtBigType: [{
          custName: "",
          custNo: ""
        }],
      })
    }
    if ("01" === this.data.mchtLev[e.detail.value].mchtLevId) {
      var arr = [{
        storesId: "02",
        storesName: "否"
      }, {
        storesId: "01",
        storesName: "是"
      }];
      this.setData({
        stores: arr,
        storesHidden: false,
        storesIndex: 0,
        mchtMngNoHidden: true,
        mchtMngNo: "",
        mchtMngNoIndex: "",
        mchtBigType: [{
          custName: "",
          custNo: ""
        }],
      })
    }
    wx.setStorageSync("mchtBigType", this.data.mchtBigType)
    mchtInfo.mchtLevIndex = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
  },

  /**
   *  商户类型 
   *  系统码值：01-连锁商户， 02-普通商户
   */
  bindMchtLevChange: function(e) {

    this.setData({
      mchtLevIndex: e.detail.value
    })
    this.mchtLev_onSelect(e);
  },

  bindReturnStep(e) {
    return;
  },

  checkFiled: function(e) {
    var mchtName = util.trim(e.detail.value.mchtName);
    if (util.strIsEmpty(mchtName)) {
      util.showToast('请输入商户名称！');
      this.setData({
        mchtNameFocus: true
      })
      return false;
    }
    if (util.strIsEmpty(mchtName)) {
      if (util.getLength(mchtName) > 200) {
        util.showToast('商户名称最大长度为66个汉字！');
        this.setData({
          mchtNameFocus: true
        })
        return false;
      }
    }

    var mchtSimpleName = util.trim(e.detail.value.mchtSimpleName);
    if (util.strIsEmpty(mchtSimpleName)) {
      util.showToast('请输入商户简称！');
      this.setData({
        mchtSimpleNameFocus: true
      })
      return false;
    }

    var isXiaowei = this.data.xiaowei[e.detail.value.xiaowei].xwId;
    var mchtLicnNo = util.trim(e.detail.value.mchtLicnNo);
    if ("00" === isXiaowei && util.strIsEmpty(mchtLicnNo)) {
      util.showToast('请输入营业执照号！');
      this.setData({
        mchtLicnNoFocus: true
      })
      return false;
    }
    if (util.strIsNotEmpty(mchtLicnNo) && !reg.isLicnNo.test(mchtLicnNo)) {
      util.showToast('营业执照号格式不正确!');
      this.setData({
        mchtLicnNoFocus: true
      })
      return false;
    }

    var mchtLev = this.data.mchtLev[e.detail.value.mchtLev].mchtLevId;
    if ("01" === mchtLev) {
      var isStore = this.data.stores[e.detail.value.stores].storesId;
      mchtInfo.isStore = isStore;
      if ("01" === isStore) {
        var mchtMngNoValue = e.detail.value.mchtMngNo;
        if (util.strIsEmpty(this.data.mchtMngNo) || util.strIsEmpty(mchtMngNoValue)) {
          util.showToast('请选择所属商户！');
          return false;
        } else {
          var mchtMngNo = this.data.mchtMngNo[e.detail.value.mchtMngNo].mchtId;
          mchtInfo.mchtMngNo = mchtMngNo;
        }
      }
    }
    // if (util.strIsEmpty(wx.getStorageSync("mchtBigType")) || util.strIsEmpty(wx.getStorageSync("mchtBigType")[0].custNo)) {
    //   util.showToast('请选择行业类别！');
    //   return false;
    // }

    if (util.strIsEmpty(this.data.mchtBigType) || util.strIsEmpty(this.data.mchtBigType[0].custNo)) {
      util.showToast('请选择行业类别！');
      return false;
    }
    var custNo = this.data.mchtBigType[0].custNo;
    var mchtType = this.data.mchtType[e.detail.value.mchtType].mchtTypeId;
    var quyuArr = wx.getStorageSync("ctArr");
    if (util.strIsEmpty(quyuArr) || util.strIsEmpty(quyuArr[0]) || util.strIsEmpty(quyuArr[0].quCode)) {
      util.showToast('请选择地区！');
      return false;
    }
    var quyu = quyuArr[0].quCode;
    var mchtContAddr = util.trim(e.detail.value.mchtContAddr);
    if (util.strIsEmpty(mchtContAddr)) {
      util.showToast('请填输入详细地址！');
      this.setData({
        mchtContAddrFocus: true
      })
      return false;
    }
    if (util.strIsNotEmpty(mchtContAddr) && util.getLength(mchtContAddr) > 128) {
      util.showToast('详细地址最大长度为42个汉字！');
      this.setData({
        mchtContAddrFocus: true
      })
      return false;
    }

    var mchtPersonName = util.trim(e.detail.value.mchtPersonName);
    if (util.strIsEmpty(mchtPersonName)) {
      util.showToast('请填输入联系人！');
      this.setData({
        mchtPersonNameFocus: true
      })
      return false;
    }
    if (util.strIsNotEmpty(mchtPersonName)) {
      if (util.getLength(mchtPersonName) > 32) {
        util.showToast('联系人最大长度为10个汉字！');
        this.setData({
          mchtPersonNameFocus: true
        })
        return false;
      }
    }

    var mchtPhone = util.trim(e.detail.value.mchtPhone);
    if (util.strIsEmpty(mchtPhone)) {
      util.showToast('请输入联系电话！');
      this.setData({
        mchtPhoneFocus: true
      })
      return false;
    }
    if (util.strIsNotEmpty(mchtPhone)) {
      if (!reg.pattern.test(mchtPhone) && !reg.isPhone.test(mchtPhone)) {
        util.showToast('联系电话格式不正确！');
        this.setData({
          mchtPhoneFocus: true
        })
        return false;
      }
    }

    var mchtEmail = util.trim(e.detail.value.mchtEmail);
    if (util.strIsEmpty(mchtEmail)) {
      util.showToast('请填输入邮箱！');
      this.setData({
        mchtEmailFocus: true
      })
      return false;
    }
    if (util.strIsNotEmpty(mchtEmail)) {
      if (!reg.isEmail.test(mchtEmail)) {
        util.showToast('邮箱格式不正确！');
        this.setData({
          mchtEmailFocus: true
        })
        return false;
      }
    }
    var longitude = util.trim(e.detail.value.longitude);
    if (util.strIsEmpty(longitude)) {
      util.showToast('请填输入经度！');
      this.setData({
        longitudeFocus: true
      })
      return false;
    }
    if (util.strIsNotEmpty(longitude)) {
      if (!reg.isLongitude.test(longitude)) {
        util.showToast('经度坐标输入有误！(经度范围-180.000000 ~ 180.000000)');
        this.setData({
          longitudeFocus: true
        })
        return false;
      }
      longitude = util.toKeepSixDecimals(longitude)
    }
    var latitude = util.trim(e.detail.value.latitude);
    if (util.strIsEmpty(latitude)) {
      util.showToast('请填输入纬度！');
      this.setData({
        latitudeFocus: true
      })
      return false;
    }

    if (util.strIsNotEmpty(latitude)) {
      if (!reg.isLatitude.test(latitude)) {
        util.showToast('纬度坐标输入有误！(纬度范围-90.000000 ~ 90.000000)');
        this.setData({
          latitudeFocus: true
        })
        return false;
      }
      latitude = util.toKeepSixDecimals(latitude)
    }
    mchtInfo.mchtName = mchtName;
    mchtInfo.mchtSimpleName = mchtSimpleName;
    mchtInfo.isXiaowei = isXiaowei;
    mchtInfo.mchtLicnNo = mchtLicnNo;
    mchtInfo.mchtLev = mchtLev;
    mchtInfo.mchtBigType = custNo;
    mchtInfo.mchtType = mchtType;
    mchtInfo.quyu = quyu;
    mchtInfo.mchtContAddr = mchtContAddr;
    mchtInfo.mchtPersonName = mchtPersonName;
    mchtInfo.mchtPhone = mchtPhone;
    mchtInfo.mchtEmail = mchtEmail;
    mchtInfo.longitude = longitude;
    mchtInfo.latitude = latitude;
    wx.setStorageSync("mchtInfo", mchtInfo);
    return true;
  },


  // 基本信息页面 下一步
  baseFormSubmit(e) {
    var that = this;
    if (that.data.submitFlag) {
      if (that.checkFiled(e)) {
        wx.redirectTo({
          url: '../mchtAcctInfo/mchtAcctInfo',
          success: function(res) {
            that.setData({
              submitFlag: false
            });
          }
        })
      } else {
        that.setData({
          submitFlag: true
        })
      }
    }
  }

});