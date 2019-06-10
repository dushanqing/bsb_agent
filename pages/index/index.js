var adds = {};
Page({
  data: {
    img_arr: [],
    formdata: '',
  },
  formSubmit: function (e) {
    var id = e.target.id
    // adds = e.detail.value;
    // adds.program_id = app.jtappid
    // adds.openid = app._openid
    // adds.zx_info_id = this.data.zx_info_id
    this.upload()
  },

  upload: function () {
    var that = this
    for (var i = 0; i < this.data.img_arr.length; i++) {
      console.log("11111111111111111111111+" + wx.getStorageSync('sessionId'));
      wx.uploadFile({
        url: 'http://ydsd.bsb.com.cn/ifsp-gateway/agent/ocrRecognize.do',
        filePath: that.data.img_arr[i],
        name: "file",
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          sessionId: wx.getStorageSync('sessionId'),
          type:'01'
        },
        success: function (res) {
          console.log(res)
          if (res) {
            wx.showToast({
              title: '已提交发布！',
              duration: 3000
            });
          }
        }
      })
    }
    this.setData({
      formdata: ''
    })
  },
  upimg: function () {
    var that = this;
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传三张图片',
        icon: 'loading',
        duration: 3000
      });
    }
  },

});
