// pages/forgetPassWord/forgetPassWord.js
const app = getApp();
var util = require("../../utils/util.js");
var reg = require("../../utils/reg.js");
import { HTTP } from '../../utils/http.js'
const http = new HTTP();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: true, //按钮是否禁用
    loading: false,
    loginStep1: true,
    loginStep2: true,
    submitFlag: false, //避免重复提交

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.loginCallback = loginFlag => {
      if (loginFlag) {
        //用户已经登录过
        that.setData({
          loginStep2: false,
          loading: true,
        })
        let userNo = wx.getStorageSync('userNo');
        let mchtLicnNo = wx.getStorageSync('mchtLicnNo');
        let phoneNo = wx.getStorageSync('phoneNo');

        that.setData({
          phoneNo: phoneNo,
          userNo: userNo,
          mchtLicnNo: mchtLicnNo,
        })
      } else {
        //用户未登录
        that.setData({
          loginStep1: false,
          loading: true,
        })
      }

    }
  },
  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {
    var that = this;
    that.selectComponent("#test").onUpdate();
  },
  /** 
   * onStep1登录商户信息(客户经理编号,营业执照号,手机号) 
   */
  onStep1: function (e) {
    let sessionId = wx.getStorageSync("sessionId");
    let userNo = e.detail.value.userName;
    let mchtLicnNo = e.detail.value.mchtLicnNo;
    let phoneNo = e.detail.value.telPhone;
    if (util.strIsEmpty(userNo)) {
      util.showToast('请输入账号')
      return;
    }
    if (util.strIsEmpty(mchtLicnNo)) {
      util.showToast('请输入营业执照号')
      return;
    }
    if (util.strIsNotEmpty(phoneNo)) {
      if (!reg.pattern.test(phoneNo)) {
        util.showToast('手机号格式不正确')
        return;
      }
    }
    const resBody = http.request({
      url: 'checkLoginInfo.do',
      data: {
        body: {
          userNo: userNo,
          mchtLicnNo: mchtLicnNo,
          phoneNo: phoneNo,
        }
      },
      method: 'POST'
    });
    resBody.then(res => {
      const resCode = res.resCode
      const resMessage = res.resMessage

      //session 过期处理 按照首次登录处理
      if (resCode == 'REQ1015') {
        app.onLaunch();
        wx.redirectTo({
          url: "/pages/forgetPassWordStep1/forgetPassWordStep1",
        })
        return;
      }

      //验证请求状态不是成功直接暴露异常
      if (resCode != 'S') {
        util.showToast(resMessage)
        return;
      }

      //数据放入本地缓存
      wx.setStorageSync('userNo', userNo)
      wx.setStorageSync('mchtLicnNo', mchtLicnNo)
      wx.setStorageSync('phoneNo', phoneNo)
      //数据验证成功,显示step2页面
      that.setData({
        phoneNo: phoneNo,
        userNo: userNo,
        mchtLicnNo: mchtLicnNo,
        loginStep1: true,
        loginStep2: false
      })

    })
  },

  /** 
   * 图形验证,成功到后台获取验证码
   */
  myEventListener: function (e) {
    var that = this;
    //图形验证成功调用后台返回随机数
    if (e.detail.msg) {
      const resBody = http.request({
        url: 'getCapCode.do',
        data: {
          body: {}
        },
        method: 'POST',
      });
      resBody.then(res => {
        //回调结果处理
        const resCode = res.resCode
        const resMessage = res.resMessage

        //session 过期处理 按照首次登录处理
        if (resCode == 'REQ1015') {
          app.onLaunch();
          wx.redirectTo({
            url: "/pages/forgetPassWordStep1/forgetPassWordStep1",
          })
          return;
        }

        //验证请求状态不是成功直接暴露异常
        if (resCode != 'S') {
          util.showToast(resMessage);
          that.onShow();
          that.setData({
            disabled: 'true',
          })
          return;
        }
        let msgToken = res.msgToken;
        that.setData({
          msgToken: msgToken
        });
        //获取图形验证成功,显示获取验证码
        that.setData({
          disabled: false
        });
      })
    }
  },

  /** 
   * 获取短信验证码 
   */
  getCheckCode: function () {
    var that = this;
    var currentTime = that.data.currentTime;
    //只要点击了按钮就让按钮禁用
    that.setData({
      disabled: 'true',
    })

    //调用服务端发送短信验证
    const resBody = http.request({
      url: 'getMesCode.do',
      data: {
        body: {
          msgToken: that.data.msgToken,
          phoneNo: wx.getStorageSync('phoneNo')
        }
      },
      method: 'POST'
    });
    resBody.then(res => {
      const resCode = res.resCode;
      const resMessage = res.resMessage;

      //session 过期处理 按照首次登录处理
      if (resCode == 'REQ1015') {
        app.onLaunch();
        wx.redirectTo({
          url: "/pages/forgetPassWordStep1/forgetPassWordStep1",
        })
        return;
      }

      //图片验证随机数过期处理 失败直接刷新
      if (resCode == 'REQ1001') {
        console.log(resCode);
        util.showToast('图形验证码过期,请重新验证');
        that.onShow();
        return;
      }

      //验证请求状态不是成功直接暴露异常
      if (resCode != 'S') {
        util.showToast("短信验证码发送失败,请重新发送短信验证码");
        that.onShow();
        return;
      }

      util.showToast("短信验证码已发送");
      let taskId = res.taskId;
      let reqSsn = res.reqSsn;
      that.setData({
        taskId: taskId,
        reqSsn: reqSsn
      });
      // 设置一分钟的倒计时
      var interval = setInterval(function () {

        currentTime--; //每执行一次让倒计时秒数减一

        that.setData({

          text: currentTime + 's', //按钮文字变成倒计时对应秒数

        })
        if (currentTime <= 0) {
          that.onShow();
        }
        //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 
        //倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            text: '重新发送',
            currentTime: 61,
            disabled: true,
            color: 'red'
          })
        }
      }, 1000);
    });
  },

  /** 
   * 登录验证,提交 
   */
  onStep2: function (e) {
    var that = this;

    //验证码校验 必须为6位
    let vrfyCode = e.detail.value.checkCode;
    if (util.strIsEmpty(vrfyCode)) {
      util.showToast("请输入验证码");
      return;
    }
    if (util.getLength(vrfyCode) != 6) {
      util.showToast("验证码格式不正确");
      return;
    }

    //避免重复提交
    if (that.data.submitFlag) {
      return;
    }
    that.setData({
      submitFlag: true,
    })

    const resBody = http.request({
      url: 'checkMesCode.do',
      data: {
        body: {
          userNo: wx.getStorageSync('userNo'),
          phoneNo: wx.getStorageSync('phoneNo'),
          mchtLicnNo: wx.getStorageSync('mchtLicnNo'),
          taskId: that.data.taskId,
          vrfyCode: vrfyCode,
          reqSsn: that.data.reqSsn
        }
      },
      method: 'POST'
    });

    resBody.then(res => {
      that.setData({
        submitFlag: false,
      })
      console.log(res);
      const resCode = res.resCode;
      const resMessage = res.resMessage;

      //session 过期处理 按照首次登录处理
      if (resCode == 'REQ1015') {
        app.onLaunch();
        wx.redirectTo({
          url: "/pages/forgetPassWordStep1/forgetPassWordStep1",
        })
        return;
      }
      //用户验证身份失败 跳转到登录首页
      if (resCode == '0026') {
        util.showToast("用户手机号更改,请重新登录");
        //用户未登录
        that.setData({
          loginStep1: false,
          loginStep2: true,
        })
        return;
      }

      if (resCode != 'S') {
        util.showToast("短信验证失败");
        return;
      }
      //登录成功以后userId放到本地缓存中
      wx.setStorageSync('userId', res.userId)
      wx.redirectTo({
        url: "/pages/loginShowInfo/loginShowInfo",
      })
    });

  },

})