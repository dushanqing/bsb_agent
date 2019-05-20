const App = getApp();
var util = require("../../../../utils/util.js");
var reg = require("../../../../utils/reg.js");
var mchtInfo;
Page({
  data: {

    setlType: [{
      setlTypeId: "01",
      setlTypeName: "独立清算"
    }, {
      setlTypeId: "03",
      setlTypeName: "归集清算"
    }],
    setlTypeSwitch: true,
    setlTypeIndex: 0,

    setlAcctInstituteHidden: false,
    setlAcctType: [{
      setlAcctTypeId: "1",
      setlAcctTypeName: "否"
    }, {
      setlAcctTypeId: "0",
      setlAcctTypeName: "是"
    }],
    setlCycleSwitch: true,
    setlAcctTypeIndex: 0,

    userType: [{
      userTypeId: "0",
      userTypeName: "对公"
    }, {
      userTypeId: "1",
      userTypeName: "对私"
    }],
    userTypeIndex:0,


    setlCertType: [{
      setlCertTypeId: "01",
      setlCertTypeName: "身份证"
    }],
    setlCertTypeIndex: 0,

    conTerm: [{
      conTermId: "01",
      conTermName: "一年"
    }, {
      conTermId: "02",
      conTermName: "二年"
    }, {
      conTermId: "03",
      conTermName: "三年"
    }, {
      conTermId: "04",
      conTermName: "长期"
    }],
    conTermIndex: 3,
  },

  onLoad() {
    this.querySetlType();
    this.showAcctdata();
  },

  showAcctdata: function() {
    mchtInfo = wx.getStorageSync("mchtInfo");
    if (util.strIsNotEmpty(mchtInfo)) {
      if (util.strIsNotEmpty(mchtInfo.mchtLev) && "01" == mchtInfo.mchtLev &&
        util.strIsNotEmpty(mchtInfo.isStore) && "01" == mchtInfo.isStore) {
        this.setData({
          setlTypeSwitch: false
        });
      }
      if (util.strIsNotEmpty(mchtInfo.setlTypeIndex)) {
        this.setData({
          setlTypeIndex: mchtInfo.setlTypeIndex
        });
      }
      if (util.strIsNotEmpty(mchtInfo.setlCycleIndex)) {
        this.setData({
          setlTypeIndex: mchtInfo.setlCycleIndex
        });
      }
      if (util.strIsNotEmpty(mchtInfo.setlAcctTypeIndex)) {
        this.setData({
          setlTypeIndex: mchtInfo.setlAcctTypeIndex
        });
      }
      if (util.strIsNotEmpty(mchtInfo.setlAcctInstitute)) {
        this.setData({
          setlAcctInstitute: mchtInfo.setlAcctInstitute
        });
      }
      if (util.strIsNotEmpty(mchtInfo.lianhangwangdian)) {
        this.setData({
          lianhangwangdian: mchtInfo.lianhangwangdian
        });
      }
      if (util.strIsNotEmpty(mchtInfo.userTypeIndex)) {
        this.setData({
          userTypeIndex: mchtInfo.userTypeIndex
        });
      }
      if (util.strIsNotEmpty(mchtInfo.setlAcctNo)) {
        this.setData({
          setlAcctNo: mchtInfo.setlAcctNo
        });
      }
      if (util.strIsNotEmpty(mchtInfo.setlAcctName)) {
        this.setData({
          setlAcctName: mchtInfo.setlAcctName
        });
      }
      if (util.strIsNotEmpty(mchtInfo.setlCertTypeIndex)) {
        this.setData({
          setlCertTypeIndex: mchtInfo.setlCertTypeIndex
        });
      }
      if (util.strIsNotEmpty(mchtInfo.setlCertNo)) {
        this.setData({
          setlCertNo: mchtInfo.setlCertNo
        });
      }
      if (util.strIsNotEmpty(mchtInfo.legalPersonName)) {
        this.setData({
          legalPersonName: mchtInfo.legalPersonName
        });
      }
      if (util.strIsNotEmpty(mchtInfo.setlPhone)) {
        this.setData({
          setlPhone: mchtInfo.setlPhone
        });
      }

      if (util.strIsNotEmpty(mchtInfo.startDate)) {
        this.setData({
          startDate: mchtInfo.startDate
        });
      }

      if (util.strIsNotEmpty(mchtInfo.conTermIndex)) {
        this.setData({
          conTermIndex: mchtInfo.conTermIndex
        });
      }
    }
  },

  //获取结算周期
  //
  querySetlType: function() {
    var that = this;
    wx.request({
      url: "https://ydsd.bsb.com.cn/ifsp-gateway/agent/queryIfsDataDic.do", //本地服务器地址
      data: {
        dataTypeNo: "1811",
        sessionId: "111111111111111111111111111111111111",
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success: function(res) {
        var setlCycleList = res.data.list;
        that.setData({
          setlCycle: setlCycleList,
          setlCycleIndex: 0
        });
      },
      fail: function(res) {}
    })
  },

  //获取开户网点
  blurSetlAcctInstitute: function(e) {
    var that = this;
    mchtInfo.setlAcctInstitute = e.detail.value;
    wx.request({
      url: "https://ydsd.bsb.com.cn/ifsp-gateway/agent/selectNamesByPrimaryKey.do", //本地服务器地址
      data: {
        setlAcctInstitute: e.detail.value,
        sessionId: "111111111111111111111111111111111111",
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success: function(res) {
        var respCode = res.data.respCode;
        if ("0000" == respCode) {
          mchtInfo.lianhangwangdian = res.data.acctInstName;
          that.setData({
            lianhangwangdian: res.data.acctInstName
          });
        }

      },
      fail: function(res) {}
    })
    wx.setStorageSync("mchtInfo", mchtInfo);

  },

  /**
   * 步骤标签跳转
   */
  bindReturnStep(e) {
    var dataset = e.target.dataset
    var pageNum = dataset.text
    if (pageNum === "1") {
      const path = '../mchtBaseInfo/mchtBaseInfo'
      App.WxService.navigateTo(path)
    } else {
      return
    }
  },



  /**
   *  合同期限
   *  系统码值：01-一年，02-二年，03-三年，04-长期，
   */
  bindConTermChange: function(e) {
    mchtInfo.conTermIndex = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      conTermIndex: e.detail.value
    });
  },

  /**
   * 合同生效日期
   */
  bindDateChange: function(e) {
    mchtInfo.startDate = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      startDate: e.detail.value
    });
  },

  /**
   * 银行账号
   */
  blurSetlAcctNo: function(e) {
    mchtInfo.userTypeIndex = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
  },
  /**
   *  账户证件类型
   *  系统码值：01-身份证
   */
  // bindSetlCertTypeChange: function (e) {
  //   this.setData({
  //     setlCertTypeIndex: e.detail.value
  //   });
  // },

  /**
   *  账号类型
   *  系统码值：0-对公，1-对私
   */
  bindUserTypeChange: function(e) {
    mchtInfo.userTypeIndex = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      userTypeIndex: e.detail.value
    });

  },

  setlAcctType_onSelect: function(e) {
    var setlAcctTypeId = this.data.setlAcctType[e.detail.value].setlAcctTypeId
    if ("1" == setlAcctTypeId) {
      this.setData({
        setlAcctInstituteHidden: false
      });
    }
    if ("0" == setlAcctTypeId) {
      mchtInfo.setlAcctInstitute = "";
      mchtInfo.lianhangwangdian = "";
      this.setData({
        setlAcctInstituteHidden: true,
        setlAcctInstitute: "",
        lianhangwangdian: ""
      });
    }

  },

  /**
   *  是否行内账号
   *  系统码值：0-是，1-否
   */
  bindSetlAcctTypeChange: function(e) {
    mchtInfo.setlAcctTypeIndex = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setlAcctType_onSelect(e);
    this.setData({
      setlAcctTypeIndex: e.detail.value,
    });
  },


  /**
   *  结算周期
   *  系统码值：取自数据字典表
   */
  bindSetlCycleChange: function(e) {
    mchtInfo.setlCycleIndex = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      setlCycleIndex: e.detail.value
    });
  },


  /**
   *  结算方式
   *  系统码值：01-独立清算， 03-归集清算
   */
  bindSetlTypeChange: function(e) {
    mchtInfo.setlTypeIndex = e.detail.value;
    wx.setStorageSync("mchtInfo", mchtInfo);
    this.setData({
      setlTypeIndex: e.detail.value
    });

  },

  bindocrTap(e) {

    const path = '../detail/ocr/ocr'
    App.WxService.navigateTo(path)
  },

  checkFiled: function(e) {
    var setlType = this.data.setlType[e.detail.value.setlType].setlTypeId;
    if (util.strIsNotEmpty(mchtInfo.mchtLev) && "01" == mchtInfo.mchtLev &&
      util.strIsNotEmpty(mchtInfo.isStore) && "01" == mchtInfo.isStore) {} else {
      if ("01" != setlType) {
        util.showToast('结算方式请选择独立清算！');
        return false;
      }
    }
    var setlCycle = this.data.setlCycle[e.detail.value.setlCycle].setlCycleId;
    var setlAcctType = this.data.setlAcctType[e.detail.value.setlAcctType].setlAcctTypeId;
    if ("1" == setlAcctType && "02" == setlCycle) {
      util.showToast('行外账户暂不支持D+1结算模式！');
      return false;
    }
    var setlAcctInstitute = util.trim(e.detail.value.setlAcctInstitute);
    if ("1" == setlAcctType && util.strIsEmpty(setlAcctInstitute)) {
      util.showToast('请输入联行号！');
      this.setData({
        setlAcctInstituteFocus: true,
        lianhangwangdian: ""
      })
      return false;
    }
    var lianhangwangdian = util.trim(e.detail.value.lianhangwangdian);
    if ("1" == setlAcctType && util.strIsEmpty(lianhangwangdian)) {
      util.showToast('请输入正确的联行号！');
      this.setData({
        setlAcctInstituteFocus: true
      })
      return false;
    }

    var setlAcctNo = util.trim(e.detail.value.setlAcctNo);
    if (util.strIsEmpty(setlAcctNo)) {
      util.showToast('请输入银行账号！');
      return false;
    } else {
      if (!reg.isNumber.test(setlAcctNo)) {
        util.showToast('银行账号格式不正确！');
        return false;
      }
    }

    var setlAcctName = util.trim(e.detail.value.setlAcctName);
    if (util.strIsEmpty(setlAcctName)) {
      util.showToast('请输入开户名称！');
      this.setData({
        setlAcctNameFocus: true
      })
      return false;
    } else {
      if (util.getLength(setlAcctName) > 128) {
        util.showToast('开户名称最大长度为42个汉字！');
        this.setData({
          setlAcctNameFocus: true
        })
        return false;
      }
    }

    var setlCertNo = util.trim(e.detail.value.setlCertNo);
    if (util.strIsEmpty(setlCertNo)) {
      util.showToast('请输入证件号码！');
      this.setData({
        setlCertNoFocus: true
      })
      return false;
    } else {
      if (!reg.isSetlCertNo.test(setlCertNo)) {
        util.showToast('证件号码格式不正确！');
        this.setData({
          setlCertNoFocus: true
        })
        return false;
      }
    } 

    var setlPhone = util.trim(e.detail.value.setlPhone);
    if (util.strIsNotEmpty(setlPhone)) {
      if (!reg.pattern.test(setlPhone)) {
        util.showToast('手机号格式不正确！');
        this.setData({
          setlPhoneFocus: true
        })
        return false;
      }
    }

    // var startDate = util.trim(this.data.startDate[e.detail.value.startDate]);
    var startDate = util.trim(e.detail.value.startDate);
    var conTerm = util.trim(this.data.conTerm[e.detail.value.conTerm].conTermId);
    mchtInfo.setlType = setlType;
    mchtInfo.setlCycle  = setlCycle ;
    mchtInfo.setlAcctType = setlAcctType;
    mchtInfo.setlAcctInstitute = setlAcctInstitute;
    mchtInfo.lianhangwangdian = lianhangwangdian;
    mchtInfo.setlAcctNo = setlAcctNo;
    mchtInfo.setlAcctName = setlAcctName;
    mchtInfo.setlCertType = setlCertType;
    mchtInfo.legalPersonName = legalPersonName;
    mchtInfo.setlPhone = setlPhone;
    mchtInfo.startDate = startDate;
    mchtInfo.conTerm = conTerm;
    wx.setStorageSync("mchtInfo", mchtInfo);
    return true;
  },


  // 结算信息页面 下一步
  //注意控制重复点击
  acctFormSubmit(e) {
    if (this.checkFiled(e)) {
      wx.navigateTo({
        url: "../mchtPicInfo/mchtPicInfo"
      });
    }
  }




});