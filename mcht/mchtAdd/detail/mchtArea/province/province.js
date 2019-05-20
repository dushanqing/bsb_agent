var App = getApp()
Page({
  data: {
    provinceList: [],
  },
  onLoad: function (options) {
    //获取省
    this.selectByFlagAndPid();
  },
  selectByFlagAndPid: function () {
    var that = this;
    wx.request({
      url: 'https://ydsd.bsb.com.cn/ifsp-gateway/agent/selectByFlagAndPid.do',
      data: {
        ctFlg: '1',
        sessionId: '111111111111111111111111111111111111'
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var empList = res.data.empList;
        that.setData({
          provinceList: empList
        });
      },
      fail: function (res) {
      }
    })
  },

  bindProvince: function (e) {
    var ctArr = new Array();
    var province = new Object();
    var ctCode = e.currentTarget.id; 
    province.proCode = e.currentTarget.id;
    province.proName = e.currentTarget.dataset.text;
    ctArr.push(province);
    wx.setStorageSync('ctArr', ctArr);
    wx.navigateTo({
      url: "../city/city?ctCode=" + ctCode
    })
  }
})





