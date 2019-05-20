var App = getApp()
Page({
  data: {
    areaList: [],
  },
  onLoad: function (options) {
    //获取省
    this.selectByFlagAndPid(options);
  },
  selectByFlagAndPid: function (options) {
    if (options.ctCode == null || options.ctCode == "" || options.ctCode == undefined) {
      //弹框提示选择市
    }
    var that = this;
    wx.request({
      url: 'https://ydsd.bsb.com.cn/ifsp-gateway/agent/selectByFlagAndPid.do',
      data: {
        upCtCode: options.ctCode,
        ctFlg: '3',
        sessionId: '111111111111111111111111111111111111'
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var empList = res.data.empList;
        that.setData({
          areaList: empList
        });
      },
      fail: function (res) {
      }
    })
  },

  bindArea: function (e) {
    var ctArr = wx.getStorageSync('ctArr');
    ctArr[0].quCode = e.currentTarget.id;
    ctArr[0].quName = e.currentTarget.dataset.text;
    wx.setStorageSync('ctArr', ctArr);
    wx.navigateTo({
      url: "../../../mchtBaseInfo/mchtBaseInfo"
    })
  }
})





