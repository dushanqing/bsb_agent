/*****************正则表达式*****************/
var isLicnNo = /^[a-zA-Z0-9]{0,32}$/;
var isAcctNo = /^\d{41}$/;
var isCode = /^[a-zA-Z0-9]{34}$/;
/**验证邮箱*/
var isEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
//	var isEmail= /^[a-zA-Z0-9]([a-zA-Z0-9\.]*)@([a-zA-Z0-9\.]*)*\.([a-zA-Z]{2,3})$/;
/**验证邮政编码*/
var isZig = /^\d{6}$/;
/**验证座机电话 */
var isPhone = /^(\d{3,4}-)?\d{6,8}$/;
/**验证手机号*/
var pattern = /^\d{11}$/;
/**验证金额*/
var isAmt12 = /^([1-9][\d]{0,9}|[1-9][\d]{0,2}(\,[\d]{3})*|0)(\.[\d]{1,2})?$/;//最大长度12位，最多包含两位小数，支持带','格式，需和isAmtLength12匹配使用
var isAmtLength12 = /^([\d]{0,10})(\.[\d]{1,2})?$/;//去除','，最大长度12位，最多包含两位小数
var isAmt20 = /^([1-9][\d]{0,17}|[1-9][\d]{0,2}(\,[\d]{3})*|0)(\.[\d]{1,2})?$/;//最大长度20位，最多包含两位小数，支持带','格式，需和isAmtLength20匹配使用
var isAmtLength20 = /^([\d]{0,18})(\.[\d]{1,2})?$/;//去除','，最大长度20位，最多包含两位小数 
var isAmt18 = /^([1-9][\d]{0,14}|[1-9][\d]{0,2}(\,[\d]{3})*|0)(\.[\d]{1,2})?$/;
/**验证字符串长度*/
var isDesc42 = /^\S{1,42}$/;//最大长度42位
var isDesc21 = /^\S{1,21}$/;//最大长度21位
var isDesc8 = /^\S{1,8}$/;//最大长度8位
var isDesc10 = /^\S{1,10}$/;//最大长度10位
var isDesc6 = /^\S{1,6}$/;//最大长度6位
var isSetlAcctInstitute = /^[0-9]{12}$/;//联行号最长为12位
var isSetlCertNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//证件号码18位
var isNumber = /^[0-9]*$/ //验证数字
var isLongitude = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{1,6}|180)$/;
var isLatitude = /^(\-|\+)?([1-8]?\d{1}\.\d{0,6}|[1-8]?\d{1})$/;
var isChEngNum =/^[A-Za-z0-9\u4E00-\u9FA5/\.\-（）、]*$/;
var isEightFigure = /^\d{8}$/;

module.exports = {
  isLicnNo: isLicnNo,
  isAcctNo: isAcctNo,
  isCode: isCode,
  isEmail: isEmail,
  isZig: isZig,
  isPhone: isPhone,
  pattern: pattern,
  isAmt12: isAmt12,
  isAmtLength12: isAmtLength12,
  isAmt20: isAmt20,
  isAmtLength20: isAmtLength20,
  isDesc42: isDesc42,
  isDesc21: isDesc21,
  isDesc8: isDesc8,
  isDesc10: isDesc10,
  isSetlAcctInstitute: isSetlAcctInstitute,
  isSetlCertNo: isSetlCertNo,
  isNumber: isNumber,
  isLongitude: isLongitude,
  isLatitude: isLatitude,
  isChEngNum: isChEngNum,
  isEightFigure: isEightFigure,
  isAmt18: isAmt18
}
