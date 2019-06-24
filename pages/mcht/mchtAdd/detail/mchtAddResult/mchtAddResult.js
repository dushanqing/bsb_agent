const app = getApp();

Page({
  data: {

  },
  mchtPicNextStep: function(e) {
    wx.switchTab({
      url: "../../../../loginShowInfo/loginShowInfo"
    });
  },
});