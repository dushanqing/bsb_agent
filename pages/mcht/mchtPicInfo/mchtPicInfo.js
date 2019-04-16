const App = getApp()

Page({
  data: {

    userInfo: {},
    // items: [
    //   {
    //     icon: '',
    //     text: '所属商户',
    //     path: '../detail/mchtMngNo/mchtMngNo'
    //   },
    // ],



    showTopTips: false,

    mchtLevs: ["连锁商户", "普通商户"],
    mchtLevIndex: 0,

    stores: ["是", "否"],
    storeIndex: 0,

    isAgree: false
  },

  navigateTo(e) {
    console.log("mchtlist");
    const index = e.currentTarget.dataset.index
    const path = e.currentTarget.dataset.path
    App.WxService.navigateTo(path)
  },



  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  bindMchtLevChange: function (e) {
    console.log('picker mchtLev 商户类型-发生选择改变，携带值为', e.detail.value);
    this.setData({
      mchtLevIndex: e.detail.value
    })
  },

  bindStoreChange: function (e) {
    console.log('picker Store 是否门店-发生选择改变，携带值为', e.detail.value);
    this.setData({
      storeIndex: e.detail.value
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 电子信息页面 下一步
  mchtPicNextStep(e) {
    console.log("nextStep");
    const path = "../mchtProdInfo/mchtProdInfo"
    App.WxService.navigateTo(path)
  }

});