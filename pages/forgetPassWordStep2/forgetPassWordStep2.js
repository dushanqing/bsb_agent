// pages/forgetPassWordStep2/forgetPassWordStep2.js
var util = require("../../utils/util.js");
import { HTTP } from '../../utils/http.js'
var http = new HTTP();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: true,  //按钮是否禁用   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sessionId = wx.getStorageSync('sessionId');
    let userNo = wx.getStorageSync('userNo')
    let mchtLicnNo = wx.getStorageSync('mchtLicnNo')
    // let phoneNo =  wx.getStorageSync('phoneNo')
    let phoneNo =  "18330014406"
    this.setData({

      phoneNo: "18330014406",
      userNo: userNo,
      mchtLicnNo: mchtLicnNo,
      sessionId: sessionId

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.selectComponent("#test").onUpdate();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /** 图形验证,成功到后台获取验证码 */
  myEventListener: function (e) {
    //图形验证成功调用后台返回随机数
    if (e.detail.msg) {
      const info = http.request({
        url: 'getCapCode.do',
        data: {
          head: {
            rsakey: 456789
          },
          body: {
            sessionId: this.data.sessionId
          }
        },
        method: 'POST',
      });

      //回调结果处理
      info.then(res => {

        const resCode = res.body.resCode
        const resMessage = res.body.resMessage

        //session 过期处理 按照首次登录处理
        if (resCode == 'REQ1015') {
          console.log('sessionId过期')
          app.onLaunch();
        }

        //验证请求状态不是成功直接暴露异常
        if(resCode != 'S'){
          util.showToast(resMessage);
          this.onShow();
          return ;
        }

        let msgToken = res.body.msgToken;
        this.setData({
          msgToken: msgToken
        });
      });

      //获取图形验证成功,显示获取验证码
      this.setData({
        disabled: false
      });
      
    }
  },

  /** 获取短信验证码 */
  getCheckCode:function(){
    var that = this;
    var currentTime = that.data.currentTime 

    //只要点击了按钮就让按钮禁用
    that.setData({
      disabled: 'true', 
    })
    
    //调用服务端发送短信验证
    const info = http.request({
      url: 'getMesCode.do',
      data: {
        head: {
          rsakey: 456789
        },
        body: {
          sessionId: this.data.sessionId,
          msgToken: this.data.msgToken,
          phoneNo: "18330014406"
        }
      },
      method: 'POST'
    });
    info.then(res => {
      const resCode = res.body.resCode;
      const resMessage = res.body.resMessage;

      //session 过期处理 按照首次登录处理
      if (resCode == 'REQ1015') {
        app.onLaunch();
      }

      //图片验证随机数过期处理 失败直接刷新
      if(resCode == 'REQ1001'){
        console.log(resCode);
        util.showToast('图形验证码过期,请重新验证');
        this.onShow();
        return;
      }

      //验证请求状态不是成功直接暴露异常
      if (resCode != 'S'){
        util.showToast("短信验证码发送失败,请重新发送短信验证码");
        this.onShow();
        return;
      }

      util.showToast("短信验证码已发送");
      let taskId = res.body.taskId;
      let reqSsn = res.body.reqSsn;
      this.setData({
        taskId: taskId,
        reqSsn: reqSsn
      });
      // 设置一分钟的倒计时
      var interval = setInterval(function () {

        currentTime--; //每执行一次让倒计时秒数减一

        that.setData({

          text: currentTime + 's', //按钮文字变成倒计时对应秒数

        })
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

  /** 登录验证,提交 */
  onStep2:function(e){

    //验证码校验 必须为6位
    let vrfyCode = e.detail.value.checkCode;
    if (util.strIsEmpty(vrfyCode)) {
        util.showToast("请输入验证码");
        return;
    }
    if (util.getLength(vrfyCode) !=6 ){
        util.showToast("验证码格式不正确");
        return;
    }

    const info = http.request({
      url: 'checkMesCode.do',
      data: {
        head: {
          rsakey: 456789
        },
        body: {
          sessionId: this.data.sessionId,
          userNo: this.data.userNo,
          phoneNo: "18330014406",
          mchtLicnNo: this.data.mchtLicnNo,
          taskId: this.data.taskId,
          vrfyCode: vrfyCode,
          reqSsn: this.data.reqSsn
        }
      },
      method: 'POST'
    });

    info.then(res=>{
      //session 过期处理 按照首次登录处理
      if (resCode == 'REQ1015') {
        app.onLaunch();
      }

      if (resCode != 'S') {
          util.showToast("短信验证失败");
          return;
      }
    });

    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
})