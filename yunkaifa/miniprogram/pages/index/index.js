//index.js
const app = getApp()
 

Page({

  data: {
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
  },

  onShow: function(e){
    // this.setData({
    //   items:res.data
    // })
    // 获取轮播图数据
    // this.onGetOpenid()
    //  this.bnrUrl()

     this.items()

  },

  tosee: function(e) {

    console.log("点击按钮")
    var id = e.target.dataset.id;
    var cotomlink = '';
    for (var i = 0; i < e.target.dataset.list.length; i++) {
      let item = e.target.dataset.list[i];
      if (item._id == id) {
        cotomlink = item.ProductPic;
        break;
      }
    }
    wx.navigateTo({
      url: '../gongzhonghao/gongzhonghao?cotomlink=' + cotomlink,
    })

  },

  async items(){
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('homelistitem').where({
      //  _openid: app.globalData.openid
    }).get({
      success: res => {
        this.setData({
          costmlist: res.data,
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },



  async bnrUrl(){
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
   
    db.collection('homebanners').where({
      // _openid: app.globalData.openid
    }).get({
      success: res => {
        this.setData({
          bnrUrl: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
 
 

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },


  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'homeswiper',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        this.data.openid = res.result.openid 
        this.bnrUrl()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      
      }
    })
  },

 

})
