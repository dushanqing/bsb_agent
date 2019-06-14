var app = getApp()
import {HTTP} from '../../../utils/http.js'
var util = require('../../../utils/util.js');

const http = new HTTP();
Page({
  data: {
    searchData:'',//搜索条件
    mchtListData: [],//返回数据
    pageNo: 1,//搜索开始页
    pageSize:10,//每页展示数据
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏  
    searchFlag:false,
    isFromSearch: true,   // 用于判断searchSongList数组是不是空数组，默认true，空的数组
     
    mchtStat: [
    {
      mchtStatId: "100",
      mchtStatName: "全部",
    },
    {
      mchtStatId: "00",
      mchtStatName: "正常",
      picFlag: "/images/u892.png",
    }, 
    {
      mchtStatId: "01",
      mchtStatName: "冻结"
    },
    {
      mchtStatId: "02",
      mchtStatName: "注销",
      picFlag: "/images/u917.png", 
    },
    {
      mchtStatId: "03",
      mchtStatName: "新增待审核",
      picFlag: "/images/u936.png",  
    }, 
    {
      mchtStatId: "04",
      mchtStatName: "修改待审核",
      picFlag: "/images/u936.png",  

    },
    {
      mchtStatId: "05",
      mchtStatName: "冻结待审核",
      picFlag: "/images/u936.png",  

    },
    {
      mchtStatId: "06",
      mchtStatName: "解冻待审核",
      picFlag: "/images/u936.png",
    }, 
    {
      mchtStatId: "07",
      mchtStatName: "注销待审核",
      picFlag: "/images/u936.png",  

    },
    {
      mchtStatId: "08",
      mchtStatName: "新增被拒绝",
      picFlag: "/images/u917.png",  
    },
    {
      mchtStatId: "12",
      mchtStatName: "暂存",
      picFlag: "/images/u936.png",  
   
    }
    ],
    mchtStatIndex: 0,
  },
  onLoad: function() {
    var that = this;
    let mchtStat = { 
      mchtStat:that.data.mchtStat[0],
      mchtNameSearch:""
      } 
    console.log(mchtStat)
    this.setData({
      searchData: mchtStat,
      pageNo: 1,   //第一次加载，设置1  
      mchtListData: [],  //放置返回数据的数组,设为空  
      isFromSearch: true,  //第一次加载，设置true  
      searchLoading: true,  //把"上拉加载"的变量设为true，显示  
      searchLoadingComplete: false //把“没有数据”设为false，隐藏  
    })
    
    this.fetchSearchList();

  },

  bindMchtStatChange: function(e) {
    this.setData({
      mchtStatIndex: e.detail.value
    });
  },
 //初始化查询数据
  initSearchData: function(e){
    var that = this;
    console.log("输入框事件") 
    console.log(e.detail.value) 

    //避免重复提交
    if (that.data.searchFlag) {
      return;
    }
    that.setData({
      searchFlag: true,
    })
    this.setData({
      searchData: e.detail.value,
      pageNo: 1,   //第一次加载，设置1  
      mchtListData: [],  //放置返回数据的数组,设为空  
      isFromSearch: true,  //第一次加载，设置true  
      searchLoading: true,  //把"上拉加载"的变量设为true，显示  
      searchLoadingComplete: false //把“没有数据”设为false，隐藏  
    })
    this.fetchSearchList();
  },

  //滚动到底部触发事件  
  searchScrollLower: function () {
    console.log("滚动到底部触发事件");
    var that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        pageNo: that.data.pageNo + 1,  //每次触发上拉事件，把pageNo+1  
        isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      //避免重复提交
      if (that.data.searchFlag) {
        return;
      }
      that.setData({
        searchFlag: true,
      })
      that.fetchSearchList();
    }
  },  

 //查询商户列表
  fetchSearchList: function() {
    var that =this;
    let userNo = wx.getStorageSync('userNo');
    let mchtSimpleName = that.data.searchData.mchtNameSearch;
    let mchtStat = that.data.searchData.mchtStat;
    let mchtStatId = mchtStat.mchtStatId;
    let mchtStatName = mchtStat.mchtStatName;
    //请求网络服务获取查询数据
    const resbody = http.request({
      url: 'MerchantList.do',
      data: {
        body: {
          userNo: userNo,
          userType: '1',
          mchtSimpleName: that.data.searchData.mchtNameSearch,
          mchtStat: mchtStatId == '100' ? '' : mchtStatId,
          pageNo: that.data.pageNo.toString(),
        }
      },
      method: 'POST'
    });

    //封装返回参数
    resbody.then(res =>{

      that.setData({
        searchFlag: false,
      })
      console.log(res);
      var mchtList = [];
        let empList = res.empList;
      if (!util.strIsEmpty(empList)) {
          for (var index in empList) {
            let stat = that.getPic(empList[index].mchtStat)
            var tmp = {
              brName: empList[index].brName,
              crtDateTime: empList[index].crtDateTime,
              mchtId: empList[index].mchtId,
              userName: empList[index].userName,
              picFlag: stat.picFlag,
              mchtStat: stat.mchtStatName,
              mchtName: empList[index].mchtSimpleName,
              url: "../mchtDetail/mchtBaseInfoDetail/mchtBaseInfoDetail"
            };
            mchtList.push(tmp);
          }
          //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
          that.data.isFromSearch ? mchtList : mchtList = that.data.mchtListData.concat(mchtList)
          that.setData({
            mchtListData: mchtList,
            mchtSimpleName: mchtSimpleName,
            mchtStatId: mchtStatId,
            searchLoading: true   //把"上拉加载"的变量设为ture，显示  
          })
        if (empList.length<10){
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
          }); 
        }
      }else{
        that.setData({
          searchLoadingComplete: true, //把“没有数据”设为true，显示  
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
        }); 
      }
    })
  },

  //通过返回商户状态获取状态显示图片
  getPic:function(stat){
    let that = this;
    let mchtStat = that.data.mchtStat;
    let tmp ;
    for (var index in mchtStat){
      if (mchtStat[index].mchtStatId == stat){
        tmp = mchtStat[index]
        
        break ;
      }
    }
    return tmp
  }

  //通过
});