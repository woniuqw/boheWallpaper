// miniprogram/pages/picturedetail/picturedetail.js

// 在页面中定义激励视频广告
let videoAd = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictureUrl:"",
    weight:'',
    height:'',
  


  },

  backaction:function(){

   wx.navigateBack({
     complete: (res) => {
       
     },
   })

  },

  backachome:function(){

    wx.switchTab({
      url: '../find/index',
    })

  },

  todowload:function(){

    // 用户触发广告后，显示激励视频广告
if (videoAd) {
  videoAd.show().catch(() => {
    // 失败重试
    videoAd.load()
      .then(() => videoAd.show())
      .catch(err => {
        console.log('激励视频 广告显示失败')
      })
  })
}



  },

  comtodowload:function(){

    wx.showLoading({
      title: '正在下载图片',
    }),
    wx.downloadFile({
      url: this.data.pictureUrl,//图片地址
      success: function (res) {
        wx.hideLoading({
              
        })
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '图片已保存到相册',
              showCancel: false,
            })
          },
          fail: function (err) {

            wx.hideLoading({
              
            })
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: modalSuccess => {
                  wx.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击图片即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData", failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
            }
          },
          complete(res) {
            wx.hideLoading()
          }
        })
      }
    })

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // 在页面onLoad回调事件中创建激励视频广告实例
   if (wx.createRewardedVideoAd) {
    videoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-7ca46bac124df849'
    })
    videoAd.onLoad(() => {})
    videoAd.onError((err) => {})
    videoAd.onClose(res => {
    // 用户点击了【关闭广告】按钮
    if (res && res.isEnded) {
      // 正常播放结束，可以下发游戏奖励
      this.comtodowload()
    } else {
      // 播放中途退出，不下发游戏奖励
    }
   })
  }


    this.setData({
      weight:wx.getSystemInfoSync().windowWidth  + 'px',
      height:wx.getSystemInfoSync().windowHeight + 'px'
    }),
    console.log(wx.getSystemInfoSync().windowHeight)

    console.log("点击按钮")
    var pictureUrl = options.pictureSrc;
    this.setData({
      pictureUrl: pictureUrl,
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

  }
})