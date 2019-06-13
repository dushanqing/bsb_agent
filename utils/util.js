const config = require('../config.js'); 
import { HTTP } from 'http.js'
let http = new HTTP();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatStringyyyyMMddToyyyy_MM_dd(value) {
  if (value.length == 8) {
    return value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8);
  } else if (value.length == 6) {
    return value.substring(0, 4) + "-" + value.substring(4, 6);
  } else {
    return value;
  }
}


function showLoading(message) {
  if (wx.showLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.showLoading({
      title: message,
      mask: true
    });
  } else {
    // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
    wx.showToast({
      title: message,
      icon: 'loading',
      mask: true,
      duration: 20000
    });
  }
}
function showToast(message){
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })
}
function hideLoading() {
  if (wx.hideLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.hideLoading();
  } else {
    wx.hideToast();
  }
}
function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return true;
  }
}

function getOpenId(param){
  let appid = config.config.appid;
  let secret = config.config.secret;
  wx.login({
    success: function (loginCode) {
      console.log(loginCode.code);
      const code = loginCode.code;
      //调用request请求api转换登录凭证
      // http.request({
      //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
      //    success: function (res) {
      //     console.log(res.data.openid);
      //     wx.setStorageSync('openid', res.data.openid)
      //   },

      //   fail: function(err){
      //     this.showToast('获取用户openid出错')
      //   }  
      // })
      const token = http.request({
        url: 'exchangeOpenIdBycode.do',
        data:{
          head:{
            rsakey:456789
          },
          body:{
            jscode: code
          }
         
        },
        method: 'POST'
        }
      );
      token.then(res=>{
        console.log(res);
      })
    }
  })
}
// 获取字符串长度
function getLength (str) {
  if (str == null) return 0;
  if (typeof str != "string") {
    str += "";
  }
  return str.replace(/[^\x00-\xff]/g, "001").length;
}

//字符串验空
function strIsNotEmpty (str) {
  if ("" != str && null != str && undefined != str ) {
    return true;
  } else {
    return false;
  }
}

//字符串验空
function strIsEmpty(str) {
  if ("" == str || null == str || undefined == str ) {
    return true;
  } else {
    return false;
  }
}

//删除左右两端的空格
function trim(str) { 
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

function toKeepTwoDecimals(value) {
  value = value.replace(/[^\d.]/g, "");//把非数字的都替换掉，只保留数字和.
  value = value.replace(/^\./g, "");//保证第一个为数字，而不是.。
  value = value.replace(/\.{2,}/g, ".");//保证只出现一个.
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");//保证.只出现一次
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
  var num = value.split(".");
  if (num.length == 1) {
  value = parseFloat(num[0]);
    if (value == "") {
      value = "0.00";
    } else {
      value = value + ".00";
    }
  } else if (num.length > 1) {
    value = parseFloat(num[0]) + "." + num[1];
    if (num[1].length == 0) {
       value = value + "00";
    } else if (num[1].length == 1) {
      value = value + "0";
    }
  }
  return value;
}

const wxPromisify = fn => {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

module.exports = {
  formatTime: formatTime,
  showLoading: showLoading,
  hideLoading: hideLoading,
  sleep: sleep,
  showToast: showToast,
  getOpenId: getOpenId,
  getLength: getLength,
  strIsNotEmpty: strIsNotEmpty,
  strIsEmpty: strIsEmpty,
  trim: trim,
  wxPromisify: wxPromisify,
  toKeepTwoDecimals: toKeepTwoDecimals,
  formatStringyyyyMMddToyyyy_MM_dd: formatStringyyyyMMddToyyyy_MM_dd
}


