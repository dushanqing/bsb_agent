const App = getApp()

Page({
  data: {

  },

  navigateTo(e) {
    console.log("mchtlist");
    const index = e.currentTarget.dataset.index
    const path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: path
    });
  },
});