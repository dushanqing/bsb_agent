import {
  JSEncrypt
} from '../../utils/jsencrypt.js'


export const encryptByRsa = (text, publicKey) => {
  //实例化加密对象
  var encrypt = new JSEncrypt();
  //设置加密公钥
  encrypt.setPublicKey(publicKey);
 //分段加密
  var encrypted = encrypt.encrypt(text);
  console.log("encrypted:" + encrypted);
  return encrypted;
}

export const decryptByRsa = (text, privateKey) => {
  //实例化加密对象
  var decrypt = new JSEncrypt();
   //设置解密私钥
  decrypt.setPrivateKey(privateKey);
  //分段解密
  var decrypted = decrypt.decryptLong(text);
  console.log("decrypt:" + decrypted);
  return decrypted;
}




//获取应用实例
var app = getApp()
var Sig = ""
var encStr = ""

Page({
  data: {
    output: '上方输入框输入数据后点击下方对应按钮转换',
    input: ''

  },
  input_rsa: function(e) {
    this.setData({
      input: e.detail.value
    })
    let v = e.detail.value
    console.log(v)
  },

  // 加签
  jiaqian: function() {
    //公钥
    var PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3jeTQxCeAL7LX+wcHHBJqm4SIZx19Jniz8gl2'
   + 'n3hFUcV0wLjOWqcW4FUJNP + SxKZTyh7p5rQWnCTwAsbln1cCk6UQEm1FkNenCXeuclmmjMYYqsiW'
   + 'efPtVIpwrK4KFP3gQ6dCcb1cOaLjT9JAPkYQlA7WezA4fptRHLMeJPN6MwIDAQAB';
    // this.data.output
    console.log('加签RSA1:')
    // var encStr = encryptByRsa("abcdefg", PUBLIC_KEY);
    var encStr = encryptByRsa("今晚在院子里坐着乘凉，忽然想起日日走过的荷塘，", PUBLIC_KEY);
    console.log("加密结果：" + encStr)
    this.setData({
      output: encStr
    })
  },

  // 验签
  yanqian: function() {
    //公钥
    var PRIVATE_KEY = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKBGszUCz9V8E4JP7kAZD/dZqRQz'
      + '+/kvVUz2zkg5qRl26L/VPfVO6rLuFv0AMFQJHZbBizdMJAtqGcyQT0LDnJqlRp+Y4gsdH6LkgXJ1'
      + 'OysUULRVFslnKT8a6Mpx9cWKZdMoKe4ObL8/SALBNtmpPtU6bAirEasIlv88rd1vTU77AgMBAAEC'
      + 'gYAm317hkZAE0DYPGgHH7AwySr22V7FaS3+dzhJT9CAuO+fRdw+y6nQD97j9ncka6KcThFeWjtID'
      + 'LrWZJrsCj1zwxNgzh85uxhY8qx7fyUyjq4tgbCf7v3bqnDMu6+ETzF00Ne1N/Ytgg/cvoPyLABOa'
      + 'N57+rlrJHES5ouy7GBC8uQJBAPY9qbt88w+BtKM7pyAW2SKq3p3yVgHl/ZuRSREVpjyKcWriGJ4h'
      + '90ouRCf9NJl1WQWzbA9xqr6Xd5RMjwMZ8S0CQQCmoNjf3BLPeyFWIwooeVORUaKBvtdrufxesuta'
      + 'ViqFzt/ghxUGvt61kYNTqXNhuR33yjXdMyrfI7iPbS0J8UnHAkBKrQqjbFI+GqTQeA/IAIXbKJyY'
      + 'o9yHeNs/aYESKFGgvI+GzYiPtFdNbNiIlBZ2j4ru2qnjySHx6Pd/xvP8CcsFAkBw2Bdnq2O1zX5r'
      +'FjnH5TqZ/H4gffznwMHP5D2NJTORAOQO64xq0BKFRjF5FBXGxZYs/G10CzXqfgd8YoSQ6i57AkEA'
      + 'zW65+cYEVLde1syQ6JOfQcbnRDkKRziPcPnBxfhpAY1KmI3jDkJoOinimwOJijcTKsak1EfikCc5'
      + 'gU8l1TrWyA==';
    console.log('验签RSA:')
    // var encStr = encryptByRsa("abcdefg", PUBLIC_KEY);
    var str ="TlZ+uUCQoOtfd0izNvv1SLgcFcSybSuQnaryBsb4XX8aMF2nD+bIHElR+/mtEOsDG/HazMB6c4SBgv12KKSV/6FP9gSNcMamnqAVNCNrLByVPAfQzDFEInipKc++MX0YM6nMlk6lRzQNvGK4sIbrKnFGyjAqHH4VFlCe/fYNyAo=";
    var encStr = decryptByRsa(str, PRIVATE_KEY);
    console.log("验签结果：" + encStr)
      this.setData({
        output: encStr
      })
  },

  onLoad: function() {
    console.log('onLoad')
  }
})