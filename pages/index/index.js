const App = getApp()
import { HTTP } from '../../utils/http.js'
const http = new HTTP();
Page({
  data: {
    items: [
      {
        icon: '',
        text: '进件商户',
        path: '/pages/mcht/mchtAdd/mchtBaseInfo/mchtBaseInfo'
      },
      {
        icon: '',
        text: '商户列表',
        path: '/pages/mcht/mchtList/mchtList'
      },
    ]
  },
  onLoad() {
    this.getStorageInfo()
  },
  test :function(){
    const resBody = http.request({
      url: 'editMerchant.do',
      data: {
        body: {
          mchtId: '8201904230000002'
        }
      },
      method: 'POST',
    });
  },
  navigateTo(e) {
   
    
    const index = e.currentTarget.dataset.index
    const path = e.currentTarget.dataset.path

    switch (index) {
      case 2:
        App.WxService.makePhoneCall({
          phoneNumber: path
        })
        break
      default:
        App.WxService.navigateTo(path)
    }
  },
  getUserInfo() {
    const userInfo = App.globalData.userInfo

    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
      return
    }

    App.getUserInfo()
      .then(data => {
        console.log(data)
        this.setData({
          userInfo: data
        })
      })
  },
  getStorageInfo() {
    App.WxService.getStorageInfo()
      .then(data => {
        console.log(data)
        this.setData({
          'settings[0].path': `${data.currentSize}KB`
        })
      })
  },

})