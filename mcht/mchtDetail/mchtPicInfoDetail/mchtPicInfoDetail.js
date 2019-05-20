const App = getApp()

Page({
    /**
   * 页面的初始数据
   */
  data: {
    threeToOne: ["是", "否"],
    threeToOneIndex: 0,
    modalHidden: true,
    modalPicName:''
  },

  /**
   * 显示弹窗
   */
  bindBigPicTap(e) {
    var dataset = e.target.dataset
    var name = dataset.text
    this.setData({
      modalHidden: false,
      modalPicName: name
    })
    // wx.showModal({
    //   title: name,
    //   content: ' <image class="image" src="/images/no-pic.png" mode="aspectFill"></image>',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },

  /**
   * 点击取消
   */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   * 是否三证合一
   * 系统码值：0-否，1-是
   */
  bindThreeToOneChange: function (e) {
    console.log('是否三证合一-发生选择改变，携带值为', e.detail.value);
    this.setData({
      threeToOneIndex: e.detail.value
    })
  },
  bindReturnStep(e) {
    var dataset = e.target.dataset
    var pageNum = dataset.text
    if (pageNum === "1") {
      const path = '../mchtBaseInfoDetail/mchtBaseInfoDetail'
      App.WxService.navigateTo(path)
    } else if (pageNum === "2") {
      const path = '../mchtAcctInfoDetail/mchtAcctInfoDetail'
      App.WxService.navigateTo(path)
    } else if (pageNum === "3") {
      const path = '../mchtPicInfoDetail/mchtPicInfoDetail'
      App.WxService.navigateTo(path)
    } else if (pageNum === "4") {
      const path = '../mchtProdListDetail/mchtProdListDetail'
      App.WxService.navigateTo(path)
    } else {
      console.log("页面步骤异常");
      return
    }
  }
});