import { config } from '../config.js'

class HTTP {
  request({url,data={},method='GET'}){
    console.log(url);
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method);
    })
  };

  _request(url, resolve,reject,data={},method='GET') {
    // var that = this;
    var url = config.baseRestUrl + url;
    console.log(url);
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res);
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        const code = res.statusCode.toString();
        const startChar = code.charAt(0);
        if (startChar == '2') {
            resolve(res.data);
        } else {
          reject();
        }
      },
      fail: function (err) {
        console.log(err);
        reject();
      },
    });
  }
};

export { HTTP };