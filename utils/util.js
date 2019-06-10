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
  return str.replace(/(^\s*)|(\s*$)/g, "");
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
}


