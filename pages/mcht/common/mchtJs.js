function queryAgencyInfo(mchtBigType) {
  var that = this;
  wx.request({
    url: 'http://ydsd.bsb.com.cn/ifsp-gateway/agent/queryAgencyInfo.do',
    data: {
    },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var cgList = res.data.cgList;
        if (cgList.length > 0) {
          cgList.forEach(function (item, index) {
            if (mchtBigType == item.custNo) {
              mchtBigType = item.custName;
              console.log("mchtBigType22:" + mchtBigType);
              return mchtBigType;
            }
          })
        }
      },
      fail: function (res) {
      }
  })
}

//封装request方法
function request() {
var promise = new Promise((resolve, reject) => {

    //网络请求
    wx.request({
      url: "http://ydsd.bsb.com.cn/ifsp-gateway/agent/selectByFlagAndCtCode.do",
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        ctFlag: '3',
        ctCode: '1039',
        sessionId: "111111111111111111111111111111111111",
      },
      success(res) {
            //服务器返回数据
            // if (res.statusCode == 200) {
                resolve(res);
               
            // // } else {
            //     //返回错误提示信息
            //     reject(res.data);
            // }
        },
        fail: function (e) {
            wx.hideLoading()
            wx.showToast({
              title: '无法连接服务器',
              icon: 'loading',
              duration: 1000
            })
            reject('网络出错');
        }
})
});
    return promise;
}



// 调用方法

// 作者：波叫怪
// 链接：https://www.jianshu.com/p/29d57c91eda2
// 来源：简书
// 简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
// function selectByFlagAndCtCode(ctCode) {
//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: "http://ydsd.bsb.com.cn/ifsp-gateway/agent/selectByFlagAndCtCode.do",
//       method: 'post',
//       header: {
//         "content-type": "application/x-www-form-urlencoded",
//       },
//       data: {
//         ctFlag: '3',
//         ctCode: ctCode,
//         sessionId: "111111111111111111111111111111111111",
//       },
//       success(res) {
//         resolve(res.data)
//       },
//       fail(err) {
//         reject(err)
//       }
//     })
//   })
// }
module.exports = {
  queryAgencyInfo: queryAgencyInfo,
  request: request
}