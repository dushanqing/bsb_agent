const app = getApp();

Page({
  data: {

  },
  mchtPicNextStep: function(e) {
    wx.showTabBar({
      url: "../../../../loginShowInfo/loginShowInfo"
    });
  },
});