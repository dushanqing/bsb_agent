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
            console.log("mchtBigType22:"+mchtBigType);
            return mchtBigType;
          }
        })
      }
    },
    fail: function (res) {
    }
  })
  
}
module.exports = {
  queryAgencyInfo : queryAgencyInfo,
}