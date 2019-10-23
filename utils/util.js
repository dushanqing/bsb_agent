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

const formatTimeyyy_MM_dd = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
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
  if (this.strIsNotEmpty(str)){
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }else {
    return str;
  }
}
/**保留两位有效数字 */
function toKeepTwoDecimals(value) {
  var result = (value * 100 / 100).toFixed(3);
  if ("NaN" === result){
    result = "0.00";
    return result;
  }
  result = result.substring(0, result.lastIndexOf('.') + 3);
  return result;
}
/**保留六位有效数字 */
function toKeepSixDecimals(value) {
  value = value + "";
  value = value.substring(0, value.indexOf(".") + 7);
  value = (value * 100 / 100).toFixed(7);
  value = value.substring(0, value.lastIndexOf('.') + 7);
  return value;
}
/**保留两位有效数字(解决边界值) */
function toKeepTwoDecimalsNotFixed(value) {
  value = value.replace(/[^\d.]/g, "");//把非数字的都替换掉，只保留数字和.
  value = value.replace(/^\./g, "");//保证第一个为数字，而不是。
  value = value.replace(/\.{2,}/g, ".");//保证只出现一个.
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");//保证.只出现一次
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
  var num = value.split(".");
  if (num.length == 1) {
    if (value == "") {
      value = "0.00";
    } else {
      value = value + ".00";
    }
  } else if (num.length > 1) {
    if (num[1].length < 2) {
      value = value + "0";
    }
  }
  return value;
}

function buttonClicked(self) {
  self.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    self.setData({
      buttonClicked: false
    })
  }, 1000)
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
//判断手机机型是否是iPhone8P
function checkIsIphone8plus() {
  const that = this
  var flag = false;
  wx.getSystemInfo({
    success: function (res) {
      // 根据 model 进行判断
      if (res.model.search('iPhone 8 Plus') != -1) {
        flag =true; 
      }
    }
  })
  return flag;
}
module.exports = {
  formatTime: formatTime,
  showLoading: showLoading,
  hideLoading: hideLoading,
  sleep: sleep,
  showToast: showToast,
  getLength: getLength,
  strIsNotEmpty: strIsNotEmpty,
  strIsEmpty: strIsEmpty,
  trim: trim,
  wxPromisify: wxPromisify,
  toKeepTwoDecimals: toKeepTwoDecimals,
  toKeepSixDecimals:toKeepSixDecimals,
  formatStringyyyyMMddToyyyy_MM_dd: formatStringyyyyMMddToyyyy_MM_dd,
  formatTimeyyy_MM_dd: formatTimeyyy_MM_dd,
  buttonClicked: buttonClicked,
  toKeepTwoDecimalsNotFixed,
  checkIsIphone8plus
}


