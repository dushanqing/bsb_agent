// pages/map.js
let keys = 'SGXBZ-6X3K6-NYLSF-MALZD-QC6PK-BABOS';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLocation: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getLocation: function (e) {
    // console.log(e)
    var that = this;
    wx.getLocation({
      success: function (res) {
        console.log(res.longitude);
        console.log(res.latitude);
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude,
            markers: [{
              latitude: res.latitude,
              longitude: res.longitude
            }]
          }
        })
        that.getDistrict(res.latitude, res.longitude);
      }
    })
  },  

  getDistrict: function(latitude, longitude) {
    let that = this;
    wx.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${keys}`,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res);

        // console.log(res.data.result.address_component.district, res.data.result)
        // 省
        let province = res.data.result.address_component.province;
        // 市
        let city = res.data.result.address_component.city;
        // 区
        let district = res.data.result.address_component.district;

        that.setData({
          district: res.data.result.address,
          region: [province, city, district]
        })
      }
    })
  },

  openLocation: function (e) {
    var value = e.detail.value
    wx.openLocation({
      longitude: Number(value.longitude),
      latitude: Number(value.latitude)
    })
  }


})