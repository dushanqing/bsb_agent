const App = getApp()
Page({
  data: {
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
    } else if  (pageNum === "4") {
      const path = '../mchtProdListDetail/mchtProdListDetail'
      App.WxService.navigateTo(path)
    } else {
      console.log("页面步骤异常");
      return 
    }
  }
});