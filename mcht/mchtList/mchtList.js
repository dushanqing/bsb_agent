var app = getApp()
Page({
  data: {
    hidden: false,
    curNav: 1,
    curIndex: 0,
    mchtList: [],
    feed_length: 0,
    mchtStat: ["新增待审核", "审核拒绝", "正常", "修改待审核", "冻结待审核", "冻结", "解冻待审核", "注销"],
    mchtStatIndex: 0,
  },
  onLoad: function() {
    this.getData();
  },

  getData: function() {
    var mchtList = [{
        mchtName: "大明水果铺",
        mchtStat: "正常",
        picFlag: "/images/u892.png",
        crtDateTime: "今天 09:09:09",
        url: "../mchtDetail/mchtBaseInfoDetail/mchtBaseInfoDetail",
        mchtId: "8201901010000001"
      }, {
        mchtName: "本姑娘舞蹈班",
        mchtStat: "审核拒绝",
        picFlag: "/images/u917.png",
        crtDateTime: "今天 09:09:09",
        url: "../mchtDetail/mchtAuditRejectDetail/mchtAuditRejectDetail",
        mchtId: "8201901010000002"
      }, {
        mchtName: "大明水果铺",
        mchtStat: "正常",
        picFlag: "/images/u892.png",
        crtDateTime: "今天 09:09:09",
        url: "../mchtDetail/mchtBaseInfoDetail/mchtBaseInfoDetail",
        mchtId: "8201901010000001"
      }, {
        mchtName: "大明水果铺",
        mchtStat: "正常",
        picFlag: "/images/u892.png",
        crtDateTime: "今天 09:09:09",
        url: "../mchtDetail/mchtBaseInfoDetail/mchtBaseInfoDetail",
        mchtId: "8201901010000001"
      }, {
        mchtName: "本姑娘舞蹈班",
        mchtStat: "审核拒绝",
        picFlag: "/images/u917.png",
        crtDateTime: "今天 09:09:09",
        url: "../mchtDetail/mchtAuditRejectDetail/mchtAuditRejectDetail",
        mchtId: "8201901010000002"
      }, {
        mchtName: "大明水果铺",
        mchtStat: "正常",
        picFlag: "/images/u892.png",
        crtDateTime: "今天 09:09:09",
        url: "../mchtDetail/mchtBaseInfoDetail/mchtBaseInfoDetail",
        mchtId: "8201901010000001"
      }, {
        mchtName: "眼镜店",
        mchtStat: "新增待审核",
        picFlag: "/images/u936.png",
        crtDateTime: "今天 09:09:09",
        url: "../mchtDetail/mchtBaseInfoDetail/mchtBaseInfoDetail",
        mchtId: "8201901010000003"
      }
    ];

    console.log("mchtList:" + mchtList.length);
    this.setData({
      mchtList: mchtList,
      mcht_length: mchtList.length
    });
  },

  bindMchtStatChange: function(e) {
    this.setData({
      mchtStatIndex: e.detail.value
    });
  }


});