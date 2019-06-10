var App = getApp()
Page({
  data: {
    cityList: [],
  },
  onLoad: function (options) {
    //获取省
    this.selectByFlagAndPid(options);
  },
  selectByFlagAndPid: function (options) {
    if (options.ctCode == null || options.ctCode == "" || options.ctCode == undefined ){
      //弹框提示选择省
    }
    var that = this;
    wx.request({
      url: 'https://ydsd.bsb.com.cn/ifsp-gateway/agent/selectByFlagAndPid.do',
      data: {
        upCtCode: options.ctCode,
        ctFlg: '2',
        sessionId: '111111111111111111111111111111111111'
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var empList = res.data.empList;
        that.setData({
          cityList: empList
        });
      },
      fail: function (res) {
      }
    })
  },

  bindCity: function (e) {
    var ctArr = wx.getStorageSync('ctArr');
    var ctCode = e.currentTarget.id;
    ctArr[0].ctCode = e.currentTarget.id;
    ctArr[0].ctName = e.currentTarget.dataset.text;
    wx.setStorageSync('ctArr', ctArr);
    wx.navigateTo({
      url: "../area/area?ctCode=" + ctCode
    })
  }
})





