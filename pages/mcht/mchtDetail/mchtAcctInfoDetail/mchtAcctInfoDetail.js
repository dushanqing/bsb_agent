const app = getApp()
var util = require("../../../../utils/util.js");
import { HTTP } from '../../../../utils/http.js';
const http = new HTTP();
Page({
  data: {
    setlType: "",
  },
  onLoad() {
    this.showData();
  },
  showData: function() {
    var that = this;
    var data = wx.getStorageSync("mchtDeatil");
    if (util.strIsNotEmpty(data)) {
      var contr = data.contr,
        mcht = data.mcht,
        setlType,
        setlCycle,
        setlAcctType,
        setlAcctInstitute = "",
        setlAcctInstituteHidden,
        lianhangwangdian="",
        setlAcctNo = "",
        setlAcctName = "",
        setlCertNo = "",
        legalPersonName = "",
        userType,
        setlCertType,
        setlMobile = "", 
        startDate,
        conTerm;
      if (util.strIsNotEmpty(contr)) {
        if ("01" == contr.setlType) {
          setlType = "独立清算";
        }
        if ("03" == contr.setlType) {
          setlType = "归集清算";
        }
        if ("1" == contr.setlAcctType) {
          setlAcctType = "否";
          setlAcctInstituteHidden = false;
        }
        if ("0" == contr.setlAcctType) {
          setlAcctType = "是";
          setlAcctInstituteHidden = true;
        }
        if (util.strIsNotEmpty(contr.setlAcctInstitute)){
          setlAcctInstitute = contr.setlAcctInstitute;
        }
        if (util.strIsNotEmpty(contr.lianhangwangdian)) {
          lianhangwangdian = contr.lianhangwangdian;
        }
        if ("1" == contr.userType) {
          userType = "对私";
        }
        if ("0" == contr.userType) {
          userType = "对公";
        }

       if (util.strIsNotEmpty(contr.setlAcctNo)) {
         setlAcctNo = contr.setlAcctNo;
       }
        if (util.strIsNotEmpty(contr.setlAcctName)) {
          setlAcctName = contr.setlAcctName;
        }
        if (util.strIsNotEmpty(contr.setlCertNo)) {
          setlCertNo = contr.setlCertNo;
        }
  
        if ("01" == contr.setlCertType) {
          setlCertType = "身份证";
        }
        if (util.strIsNotEmpty(mcht.mchtPersonName)) {
          legalPersonName = mcht.mchtPersonName;
        }
        if (util.strIsNotEmpty(contr.setlMobile)) {
          setlMobile = contr.setlMobile;
        }
        if (util.strIsNotEmpty(contr.startDate)) {
          startDate = contr.startDate;
        }
        
        if ("01" == contr.conTerm) {
          conTerm = "一年";
        }
        if ("02" == contr.conTerm) {
          conTerm = "二年";
        }
        if ("03" == contr.conTerm) {
          conTerm = "三年";
        }
        if ("04" == contr.conTerm) {
          conTerm = "长期";
        }

        startDate = util.formatStringyyyyMMddToyyyy_MM_dd(contr.startDate)
        that.setData({
          setlType: setlType,
          setlAcctType: setlAcctType,
          setlAcctInstitute: setlAcctInstitute,
          setlAcctInstituteHidden: setlAcctInstituteHidden,
          userType: userType,
          lianhangwangdian: lianhangwangdian,
          setlAcctNo: setlAcctNo,
          setlAcctName: setlAcctName,
          setlCertType: setlCertType,
          setlCertNo: setlCertNo,
          legalPersonName: legalPersonName,
          setlMobile: setlMobile,
          startDate: startDate,
          conTerm: conTerm
        })
        that.querySetlCycle(contr.setlCycle);
      }

    }
  },


  querySetlCycle: function(setlCycle) {
    var that = this;
    const resBody = http.request({
      url: 'queryIfsDataDic.do',
      data: {
        body: {
          dataTypeNo: "1811",
        }
      },
      method: 'POST'
    });
    resBody.then(res => {
      const resCode = res.resCode;
      const resMessage = res.resMessage;
      //session 过期处理 按照首次登录处理
      if (resCode == 'REQ1015') {
        app.onLaunch();
        wx.redirectTo({
          url: "/pages/forgetPassWordStep1/forgetPassWordStep1",
        })
        return;

      }
      //失败
      if (resCode != 'S') {
        util.showToast(resMessage);
        return;
      }
      //成功
      var setlCycleList = res.list;
      if (setlCycleList.length > 0) {
        setlCycleList.forEach(function (item, index) {
          if (setlCycle == item.dataNo) {
            that.setData({
              setlCycle: item.dataName
            })
          }
        })
      }
    })
  },


  /**
   * 步骤标签跳转
   */
  bindReturnStep(e) {
    var dataset = e.target.dataset;
    var pageNum = dataset.text;
    var  path = "";
    if (pageNum === "1") {
      path = "../mchtBaseInfoDetail/mchtBaseInfoDetail"
    } else if (pageNum === "2") {
      // path = "../mchtAcctInfoDetail/mchtAcctInfoDetail"
      return
    } else if (pageNum === "3") {
      path = "../mchtPicInfoDetail/mchtPicInfoDetail"
    } else if (pageNum === "4") {
      path = "../mchtProdListDetail/mchtProdListDetail"
    } else {
      console.log("页面步骤异常");
      return
    }
    wx.navigateTo({
      url: path
    });
  }
});