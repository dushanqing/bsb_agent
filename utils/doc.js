/**
 * 商户进件：
 * 银行卡号，身份证号支持OCR识别。
 * 
 * 法人：输入，但不记录数据库 
 * 联系人：
 * 经纬度：
 * 
 * 仅quyu入库，省市不入库，查询库表显示。
 * 
 * 商户名称：200  <=66中文
 * 商户简称 10 ,中英文均可
 * 
 * 
 * //维度：-90 到 +90，小数后六位以内，不支持其它
 * //经度：-180 到 +180，小数后六位以内，不支持其它
 * 
 * 
 * 
 * 
 * 提交审核 页面验账号的户名和联系人不一致的校验。看jira。
 * 商户列表页面有分页。
 * 
 * 
 * 
 * 
 * 
 * 
 * -----
 * 
 * 修改代理商门户行业类别取值：
 * 1.暂存、新增、修改、暂存，去掉mchtMngScope字段，行业类别使用mchtBigType字段。
 * 2.清空数据库字段mchtMngScope的值。
 * 3.写影响范围分析。
 * -------------------------
 * 
 * 
 * 
 * 表结构变化
 * 1.登录新增表
 * 2.商户基本信息表中增加字段  渠道号ChannelID
 * 3.gateway 中增加jar包
 * 4.修改gateway中jdk的引用外部jar
 * 
 * 
 * 问题：
 * 法人不入库？详情中如何展示？
 * --佟杰确定；展示联系人
 *
 * 
 * 系统中什么情况下不存手机号？需要确定
 * 三证合一字段：取自合同表，商户基本信息表中临时表中有，正式表中没有，去掉临时表中的三证合一字段，需要修改内管、门户，公众号。--和佟杰确定，可以修改。 
 */



