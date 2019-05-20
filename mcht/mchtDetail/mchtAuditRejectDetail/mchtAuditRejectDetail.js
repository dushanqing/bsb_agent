// pages/mcht/mchtDetail/mchtAuditRejectDetail/mchtAuditRejectDetail.js
Page({
      bindCallMchtPhone(e) {
        const path = e.currentTarget.dataset.path
        console.log("path=" + path);
        wx.makePhoneCall({
          phoneNumber: path
        })
      }
})