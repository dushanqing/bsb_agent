const app = getApp();

Page({
  data: {

  },
  mchtPicNextStep: function(e) {
    const path = "../../../../loginShowInfo/loginShowInfo";
    wx.navigateTo({
      url: path
    });
  },
});