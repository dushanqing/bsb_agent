import { config } from '../config.js';
var aesUtil = require("aesUtil.js");
var rsaUtil = require("rsaUtil.js");
var util = require("util.js");
var aesKey;

class HTTP {
  request({ url, data = {}, method = 'GET', contentType = 'application/json' }){
    //进入小程序页面跳转不需要加密
    let sessionId = wx.getStorageSync('sessionId');
    let rsaPubKey = wx.getStorageSync('rsaPubKey');
    aesKey = aesUtil.getAesKey(16);
    let body = JSON.stringify(data.body);
    
    //通过rsa加密aeskey
    // console.log('aesKey' + aesKey);
    let rsaAesKey = rsaUtil.encryptByRsa(aesKey, rsaPubKey);

    //通过aes加密body
    let aesBody = aesUtil.encrypt_ecb(body, aesKey);
  
    //请求参数封装
    let aesData = {
      head: {
        sessionId: sessionId,
        aesKey: rsaAesKey
      },
      body:{
        aesBody: aesBody
      } 
    };

    //发送请求
      return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, aesData, method, contentType);
    })
  };

  /**
   * aes报文加密
   */
  _encrypt_ecb(body){
    let aesKey = aesUtil.getAesKey(16);
    return aesUtil.encrypt_ecb(body, aesKey);
  }
  
/**
 * 发起服务器请求
 */
_request(url, resolve, reject, data = {}, method = 'GET', contentType = 'application/json') {

    var url = config.baseRestUrl + url;
    console.log(url);
    wx.request({
      
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
      },

      success: function (res) {
        // 判断以2（2xx)开头的状态码为正确
        const code = res.statusCode.toString();
        const startChar = code.charAt(0);
        if (startChar == '2') {
          let resCode = res.data.body.resCode;
          if ("" == resCode || null == resCode || undefined == resCode) {
            //返回报文解密
            let aesResBody = res.data.body.aesBody
            aesResBody = aesResBody.replace(/\r\n/g, "").replace(/\n/g, "");
            let resBody = aesUtil.decrypt_ecb(aesResBody, aesKey);
            resBody = JSON.parse(resBody);
            resolve(resBody);
          }else{
            resolve(res.data.body);
       
          }
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