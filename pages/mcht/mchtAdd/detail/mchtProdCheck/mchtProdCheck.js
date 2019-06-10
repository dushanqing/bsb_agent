// var app = getApp()
// Page({
//   data: {
//     hidden: false,
//     curNav: 1,
//     curIndex: 0,
//     cart: [],
//     cartTotal: 0,
//     prodList: [
//       [
//         {
//           name: "微信",
//           price: 38,
//           num: 1,
//           id: 1
//         },
//         {
//           name: "支付宝",
//           price: 58,
//           num: 1,
//           id: 29
//         },
//         {
//           name: "银联",
//           price: 88,
//           num: 1,
//           id: 2
//         }
//       ]
//     ],
//     prodes: []
//   },
//   loadingChange() {
   
//     setTimeout(() => {
//       this.setData({
//         hidden: true
//       })
//     }, 2000)
//   },

// checkProdStatus(){
//   let prodes = this.data.prodList;
//   //  从缓存中取
//   wx.getStorage({
//     key: 'productCheck',
//     success(res) {
//       console.log("缓存中的产品：" + res.data)
//       let id = event.target.dataset.id,
//         index = parseInt(event.target.dataset.index);
//       self = this;
//       this.setData({
//         curNav: id,
//         curIndex: index
//       })
//     }
//   })



  
// },
 


    
//   selectNav(event) {
//     let id = event.target.dataset.id,
//       index = parseInt(event.target.dataset.index);
//     self = this;
//     this.setData({
//       curNav: id,
//       curIndex: index
//     })
//   },
//   // 选择产品
//   selectProd(event) {
//     let prod = event.currentTarget.dataset.prod;
//     let flag = true;
//     let cart = this.data.cart;

//     if (cart.length > 0) {
//       cart.forEach(function (item, index) {
//         if (item == prod) {
//           cart.splice(index, 1);
//           flag = false;
//         }
//       })
//     }
//     if (flag) cart.push(prod);
//     this.setData({
//       cartTotal: cart.length
//     })
//     //将值保存到本地缓存中
//     wx.setStorage({ key: 'productCheck', data: cart })
//     this.setStatus(prod)
//   },
//   setStatus(prodId) {
//     let prodes = this.data.prodList;
//     for (let prod of prodes) {
//       prod.forEach((item) => {
//         if (item.id == prodId) {
//           item.status = !item.status || false
//         }
//       })
//     }

//     this.setData({
//       prodList: this.data.prodList
//     })
//   },
//   onLoad() {
//     this.loadingChange()
//     this.checkProdStatus()
//     // this.checkProdStatus()
//     // this.setStatus()
//   }
// }) 







Page({
  data: {
    showTopTips: false,

    // checkboxItems: [
    //   { name: '微信', value: '0', checked: true },
    //   { name: '支付宝', value: '1' }
    // ]
    checkboxItems: [
      // { productName: '微信', prodId: 'PD1004', prodChecked: true },
      // { productName: '支付宝', prodId: 'PD1005', prodChecked: false}
    ]

  },

  onLoad() {
    this.queryProductNameByUserId();
  },

  //根据用户获取代理商的产品名称
  queryProductNameByUserId: function () {
    var that = this;
    wx.request({
      url: "https://ydsd.bsb.com.cn/ifsp-gateway/agent/selectProductNameByUserId.do",
      data: {
        sessionId: "111111111111111111111111111111111111",
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        // var result = JSON.parse(res.data)
        console.log(res);
        // prodId: "PD1004", productName: "微信1"
        // console.log("-------------:"+res.data.empList);
        // var result = JSON.parse(res.data);
        res.data.empList[0].prodChecked = true;
        that.setData({
          checkboxItems: res.data.empList
        });

      },
      fail: function (res) { }
    })
  },


  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].prodChecked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].prodId == values[j]) {
          checkboxItems[i].prodChecked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }
});