const app = getApp();
var util = require("../../../../utils/util.js");
var reg = require("../../../../utils/reg.js");
import {
  config
} from '../../../../config.js';
import {
  HTTP
} from '../../../../utils/http.js';
let http = new HTTP();
var mchtInfo;
Page({
  data: {
    modalHidden: true,
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
    userTypeIndex: 0,


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
    tempFilePaths: '',
    ocrSubFlag: false,
    btnDisabled: false,
  },
  

  onLoad() {
    mchtInfo = wx.getStorageSync("mchtInfo");
    this.ctx = wx.createCameraContext();
    this.querySetlCycle();
    this.showData();
  },


  showData: function() {
    if (util.strIsNotEmpty(mchtInfo)) {
      if (util.strIsNotEmpty(mchtInfo.mchtLev) && "01" === mchtInfo.mchtLev &&
        util.strIsNotEmpty(mchtInfo.isStore) && "01" === mchtInfo.isStore) {
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
          setlCycleIndex: mchtInfo.setlCycleIndex
        });
      }
      if (util.strIsNotEmpty(mchtInfo.setlAcctTypeIndex)) {
        this.setData({
          setlAcctTypeIndex: mchtInfo.setlAcctTypeIndex
        });
        if ("0" === this.data.setlAcctType[mchtInfo.setlAcctTypeIndex].setlAcctTypeId) {
          this.setData({
            setlAcctInstituteHidden: true
          });

        }
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
      } else {
        var startDate = util.formatTimeyyy_MM_dd(new Date());
        console.log("startDate:" + startDate);
        this.setData({
          startDate: startDate
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
  querySetlCycle: function() {
    var that = this;
    const resBody = http.request({
      url: 'queryIfsDataDic.do',
      data: {
        body: {
          dataTypeNo: "1811"
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
      var setlCycleList = res.list
      that.setData({
        setlCycle: setlCycleList,
        setlCycleIndex: 0
      });
    })
  },


  //获取开户网点
  blurSetlAcctInstitute: function(e) {
    var that = this;
    var setlAcctInstitute = e.detail.value;
    if (util.strIsEmpty(setlAcctInstitute)) {
      return;
    } else {
      mchtInfo.setlAcctInstitute = e.detail.value;
      mchtInfo.lianhangwangdian = "";
      that.setData({
        lianhangwangdian: ""
      });
      const resBody = http.request({
        url: 'selectNamesByPrimaryKey.do',
        data: {
          body: {
            setlAcctInstitute: e.detail.value
          }
        },
        method: 'POST'
      });
      resBody.then(res => {
        const resCode = res.resCode;
        const resMessage = res.resMessage;
        //session 过期处理 按照首次登录处理
        //失败
        if ('S' != resCode) {
          util.showToast(resMessage);
          return;
        }
        //成功
        var respCode = res.respCode;
        if ("0000" === respCode) {
          mchtInfo.lianhangwangdian = res.acctInstName;
          that.setData({
            lianhangwangdian: res.acctInstName
          });
        }
      })
      wx.setStorageSync("mchtInfo", mchtInfo);
    }
  },
  focusSetlAcctInstitute: function() {
    this.setData({
      lianhangwangdian: ""
    });
  },


  /**
   * 步骤标签跳转
   */
  bindReturnStep(e) {
    var dataset = e.target.dataset;
    var pageNum = dataset.text;
    if (pageNum === "1") {
      wx.redirectTo({
        url: '../mchtBaseInfo/mchtBaseInfo'
      });
    } else {
      return;
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
    mchtInfo.setlAcctNo = util.trim(e.detail.value);
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
   * 账户证件号码
   */
  blurSetlCertNo: function(e) {
    mchtInfo.setlCertNo = util.trim(e.detail.value);
    wx.setStorageSync("mchtInfo", mchtInfo);
  },

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
    if ("1" === setlAcctTypeId) {
      this.setData({
        setlAcctInstituteHidden: false
      });
    }
    if ("0" === setlAcctTypeId) {
      mchtInfo.setlAcctInstitute = "";
      mchtInfo.lianhangwangdian = "";
      wx.setStorageSync("mchtInfo", mchtInfo);
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

  // 开户名称
  blurSetlAcctName: function(e) {
    var setlAcctName = util.trim(e.detail.value);
    if (util.strIsNotEmpty(setlAcctName)) {
      mchtInfo.setlAcctName = setlAcctName;
      wx.setStorageSync("mchtInfo", mchtInfo);
    }
  },
  //手机号
  blurSetlPhone: function(e) {
    var setlPhone = util.trim(e.detail.value);
    if (util.strIsNotEmpty(setlPhone)) {
      mchtInfo.setlPhone = setlPhone;
      wx.setStorageSync("mchtInfo", mchtInfo);
    }
  },

  bindSetlAcctNoOcr: function(e) {
    this.chooseImage('ocrSetlAcctNo.do');
  },

  bindsetlCertNoOcr: function(e) {
    this.chooseImage('ocrSetlCertNo.do');
  },

  chooseImage: function(url) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        //选项集合
        let itemList;
        if (res.platform === 'android') {
          itemList = ['从相册中选择', '拍照', '取消']
        } else {
          itemList = ['从相册中选择', '拍照']
        }
        wx.showActionSheet({
          itemList: itemList,
          success: function(res) {
            if (res.tapIndex === 0) {
              //选项1操作
              that.chooseWxImage('album', url)
            } else if (res.tapIndex === 1) {
              that.chooseWxImage('camera', url)
            } else if (res.tapIndex === 2) {
              //取消操作
            }
          },
        })
      },
    })
  },

  chooseWxImage: function(type, url) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 1,
      success: function(res) {
        var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B
        if (tempFilesSize <= 2000000) { //图片小于或者等于2M(2000000B)时 可以执行获取图片
          that.setData({
            modalHidden: false,
            url: url,
            tempFilePaths: res.tempFilePaths[0],
          })
        } else {
          util.showToast('上传图片不能大于2M！');
        }
      }
    })
  },

  modalCancel: function() {
    this.setData({
      modalHidden: true
    });
  },
  modalConfirm: function(e) {
    var that = this;
    //避免重复提交
    if (that.data.ocrSubFlag) {
      return;
    }
    this.setData({
      ocrSubFlag: true,
    });
    var ocrUrl = that.data.url;
    that.upload_file(ocrUrl);
    that.setData({
      modalHidden: false
    });
  },

  upload_file: function(ocrUrl) {
    var that = this;
    let sessionId = wx.getStorageSync('sessionId');
    var url = config.baseRestUrl + ocrUrl;
    wx.uploadFile({
      url: url,
      filePath: that.data.tempFilePaths,
      name: "file",
      header: {
        "content-type": "multipart/form-data",
      },
      formData: {
        sessionId: sessionId
      },
      success: function(res) {

        var result = JSON.parse(res.data);
        if ('ocrSetlAcctNo.do' === ocrUrl) {
          if ('0000' === result.respCode) {
            that.setData({
              setlAcctNo: result.infoCardNumber,
              modalHidden: true
            });
            mchtInfo.setlAcctNo = result.infoCardNumber;
            wx.setStorageSync("mchtInfo", mchtInfo);
          } else {
            that.setData({
              setlAcctNo: "",
              modalHidden: true
            });
            util.showToast(result.respMsg);
          }
        }
        if ('ocrSetlCertNo.do' === ocrUrl) {
          if ('0000' === result.respCode) {
            that.setData({
              setlCertNo: result.infoNumber,
              legalPersonName: result.infoName,
              modalHidden: true
            });
            mchtInfo.setlCertNo = result.infoNumber;
            mchtInfo.legalPersonName = result.infoName;
            wx.setStorageSync("mchtInfo", mchtInfo);
          } else {
            that.setData({
              setlCertNo: "",
              legalPersonName: "",
              modalHidden: true
            });
            util.showToast(result.respMsg);
          }
        }
        that.setData({
          ocrSubFlag: false,
        });

      },
      fail: function(res) {
        that.setData({
          ocrSubFlag: false,
          modalHidden: true
        });
        util.showToast(res.errMsg);
      },
    })

  },

  checkFiled: function(e) {
    var setlType = this.data.setlType[e.detail.value.setlType].setlTypeId;
    if (util.strIsNotEmpty(mchtInfo.mchtLev) && "01" === mchtInfo.mchtLev &&
      util.strIsNotEmpty(mchtInfo.isStore) && "01" === mchtInfo.isStore) {} else {
      if ("01" != setlType) {
        util.showToast('结算方式请选择独立清算！');
        return false;
      }
    }
    var setlCycle = this.data.setlCycle[e.detail.value.setlCycle].dataNo;
    var setlAcctType = this.data.setlAcctType[e.detail.value.setlAcctType].setlAcctTypeId;
    if ("1" === setlAcctType && "02" === setlCycle) {
      util.showToast('行外账户暂不支持D+1结算模式！');
      return false;
    }
    var setlAcctInstitute = util.trim(e.detail.value.setlAcctInstitute);
    if ("1" === setlAcctType && util.strIsEmpty(setlAcctInstitute)) {
      util.showToast('请输入联行号！');
      this.setData({
        setlAcctInstituteFocus: true,
        lianhangwangdian: ""
      })
      return false;
    }
    var lianhangwangdian = util.trim(this.data.lianhangwangdian);
    if ("1" === setlAcctType && util.strIsEmpty(lianhangwangdian)) {
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
    } 
    if (util.strIsNotEmpty(setlAcctNo)) {
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
    }

    if (!reg.isChEngNum.test(setlAcctName)) {
      util.showToast('开户名称格式不正确！');
      return false;
    }

    if (util.strIsNotEmpty(setlAcctName)) {
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
    }

    if (util.strIsNotEmpty(setlCertNo)) {
      if (!reg.isSetlCertNo.test(setlCertNo)) {
        util.showToast('证件号码格式不正确！');
        this.setData({
          setlCertNoFocus: true
        })
        return false;
      }
    }
    var legalPersonName = util.trim(e.detail.value.legalPersonName);
    var userType = this.data.userType[e.detail.value.userType].userTypeId;
    var setlPhone = util.trim(e.detail.value.setlPhone);

    if ("1" === userType) {
      if (util.strIsEmpty(setlPhone)) {
        util.showToast('请输入手机号！');
        this.setData({
          setlPhoneFocus: true
        })
        return false;
      }
    }
    if (util.strIsNotEmpty(setlPhone)) {
      if (!reg.pattern.test(setlPhone)) {
        util.showToast('手机号格式不正确！');
        this.setData({
          setlPhoneFocus: true
        })
        return false;
      }
    }
    var startDate = util.trim(e.detail.value.startDate);
    var conTerm = util.trim(this.data.conTerm[e.detail.value.conTerm].conTermId);
    var setlCertType = this.data.setlCertType[e.detail.value.setlCertType].setlCertTypeId;
    mchtInfo.setlType = setlType;
    mchtInfo.setlCycle = setlCycle;
    mchtInfo.setlAcctType = setlAcctType;
    mchtInfo.setlAcctInstitute = setlAcctInstitute;
    mchtInfo.lianhangwangdian = lianhangwangdian;
    mchtInfo.setlAcctNo = setlAcctNo;
    mchtInfo.userType = userType;
    mchtInfo.setlAcctName = setlAcctName;
    mchtInfo.setlCertType = setlCertType;
    mchtInfo.setlCertNo = setlCertNo;
    mchtInfo.legalPersonName = legalPersonName;
    mchtInfo.setlPhone = setlPhone;
    mchtInfo.startDate = startDate;
    mchtInfo.conTerm = conTerm;
    wx.setStorageSync("mchtInfo", mchtInfo);
    return true;
  },

  // 结算信息页面 下一步
  acctFormSubmit(e) {
    var that = this;
    that.setData({
      btnDisabled: true
    })
    if (that.checkFiled(e)) {
        const resBody = http.request({
          url: 'checkBankAccount.do',
          data: {
            body: {
              setlAcctType: mchtInfo.setlAcctType,
              userType: mchtInfo.userType,
              setlAcctName: mchtInfo.setlAcctName,
              setlAcctNo: mchtInfo.setlAcctNo,
              setlCertNo: mchtInfo.setlCertNo,
              setlPhone: mchtInfo.setlPhone,
              setlCertType: mchtInfo.setlCertType
            }
          },
          method: 'POST'
        });
        resBody.then(res => {
          const respCode = res.respCode;
          const respMsg = res.respMsg;
            //成功
            if ("0000" === respCode) {
              wx.redirectTo({
                url: '../mchtPicInfo/mchtPicInfo',
                success: function (res) {
                  that.setData({
                    btnDisabled: false
                  })
                }
              })
            } else {
              util.showToast(res.resMessage);
              that.setData({
                btnDisabled: false
              })
            }
        })
    } else {
      that.setData({
        btnDisabled: false
      })
    }
  }
});