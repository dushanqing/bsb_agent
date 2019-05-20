var app = getApp()
Page({
  data: {
    hidden: false,
    curNav: 1,
    curIndex: 0,
    cart: [],
    cartTotal: 0,
    prodList: [
      [
        {
          name: "微信",
          price: 38,
          num: 1,
          id: 1
        },
        {
          name: "支付宝",
          price: 58,
          num: 1,
          id: 29
        },
        {
          name: "银联",
          price: 88,
          num: 1,
          id: 2
        }
      ]
    ],
    prodes: []
  },
  loadingChange() {
   
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 2000)
  },

checkProdStatus(){
  let prodes = this.data.prodList;
  //  从缓存中取
  wx.getStorage({
    key: 'productCheck',
    success(res) {
      console.log("缓存中的产品：" + res.data)
      let id = event.target.dataset.id,
        index = parseInt(event.target.dataset.index);
      self = this;
      this.setData({
        curNav: id,
        curIndex: index
      })
    }
  })



  
},
 


    
  selectNav(event) {
    let id = event.target.dataset.id,
      index = parseInt(event.target.dataset.index);
    self = this;
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  // 选择产品
  selectProd(event) {
    let prod = event.currentTarget.dataset.prod;
    let flag = true;
    let cart = this.data.cart;

    if (cart.length > 0) {
      cart.forEach(function (item, index) {
        if (item == prod) {
          cart.splice(index, 1);
          flag = false;
        }
      })
    }
    if (flag) cart.push(prod);
    this.setData({
      cartTotal: cart.length
    })
    //将值保存到本地缓存中
    wx.setStorage({ key: 'productCheck', data: cart })
    this.setStatus(prod)
  },
  setStatus(prodId) {
    let prodes = this.data.prodList;
    for (let prod of prodes) {
      prod.forEach((item) => {
        if (item.id == prodId) {
          item.status = !item.status || false
        }
      })
    }

    this.setData({
      prodList: this.data.prodList
    })
  },
  onLoad() {
    this.loadingChange()
    this.checkProdStatus()
    // this.checkProdStatus()
    // this.setStatus()
  }
}) 