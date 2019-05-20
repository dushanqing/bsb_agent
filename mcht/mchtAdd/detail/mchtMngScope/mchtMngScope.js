var App = getApp()
var cgList;
Page({
  data: {
    cgList: [],
  },
  onLoad: function () {
    //获取行业类别
    this.queryAgencyInfo();
  },
  queryAgencyInfo: function () {
    var that = this;
    wx.request({
      url: 'https://ydsd.bsb.com.cn/ifsp-gateway/agent/queryAgencyInfo.do', 
      data: {
        sessionId: '111111111111111111111111111111111111',
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
      cgList = res.data.cgList;
        that.setData({
          cgList: cgList
        });
      },
      fail: function (res) {
      }
    })
  },

  bindMchtMngScope: function(e){
    var arr = new Array();
    var mchtMngScope= new  Object();
    mchtMngScope.custNo = e.currentTarget.id;
    mchtMngScope.custName = e.currentTarget.dataset.text;
    arr.push(mchtMngScope);
    wx.setStorageSync('mchtMngScope', arr);
    wx.navigateTo({
      url: '../../mchtBaseInfo/mchtBaseInfo'
    })
  }
})





