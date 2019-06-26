import {JSEncrypt} from 'jsencrypt.js'

function encryptByRsa(text, publicKey) {
  //实例化加密对象
  var encrypt = new JSEncrypt();
  //设置加密公钥
  encrypt.setPublicKey(publicKey);
  //分段加密
  var encrypted = encrypt.encrypt(text);
  return encrypted;
}

function decryptByRsa(text, privateKey) {
  //实例化加密对象
  var decrypt = new JSEncrypt();
  //设置解密私钥
  decrypt.setPrivateKey(privateKey);
  //分段解密
  var decrypted = decrypt.decryptLong(text);
  return decrypted;
}

export { encryptByRsa, decryptByRsa}


