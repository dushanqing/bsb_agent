//引用腾讯地图API
var QQMapWX = require('../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mchtContAddr: "",
    src: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*判断是第一次加载还是从position页面返回
    如果从position页面返回，会传递用户选择的地点*/
    if (options.mchtContAddr != null && options.mchtContAddr != '') {
      //设置变量 address 的值
      this.setData({
        mchtContAddr: options.mchtContAddr
      });
    } else {
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        //腾讯位置服务申请key
        key: 'CLJBZ-HHDCQ-RGZ5G-GZGPZ-U5GBE-NDBKA'
      });
      var that = this;
      // 调用接口
      qqmapsdk.reverseGeocoder({
        success: function (res) {
          console.log(res);
          that.setData({
            mchtContAddr: res.result.address
          });
        },
        fail: function (res) {
          //console.log(res);
        },
        complete: function (res) {
          //console.log(res);
        }
      });
    }
  },
  onChangeAddress: function (e) {
    wx.navigateTo({
      url: "/map/position/position"
    });
  }

})