// miniprogram/pages/categorypictures/categorypictures.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    pictureList: [], // 服务器数组，数组
    loading: false, //"上拉加载"的变量，默认false，隐藏  
    loaded: false, //“没有数据”的变量，默认false，隐藏 
    isLoading: true,  //第一次加载，设置true ,进入该界面时就开始加载
    pageIndex: 0, // 每次触发上拉事件，把pageIndex+2 默认为0
    categeryname:'',
  },

  topictureDeail:function(e){
    var pictureSrc = e.currentTarget.dataset.src;
    wx.navigateTo({
      url: '../picturedetail/picturedetail?pictureSrc=' + pictureSrc,
      // url: '../picturedetail/picturedetail',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    var categeryname = options.categeryname;
    this.setData({
      categeryname: categeryname,
    })
    this.pictureList();
  },


  async pictureList(){
    const db = wx.cloud.database()

    let that = this;
    let pageIndex = that.data.pageIndex;
    let categeryname = that.data.categeryname;
    wx.showLoading({
      title: '正在加载...',
    })

    console.log("pageIndex == ", pageIndex);
    // 查询当前用户所有的 counters
    db.collection(categeryname).where({
      //  _openid: app.globalData.openid
    }).skip(pageIndex).limit(20).orderBy('mytime', 'desc').get({
      success: res => {
        if (res.data.length !=0) {
          var arr1 = that.data.pictureList; //从data获取当前datalist数组
          var arr2 = res.data; //从此次请求返回的数据中获取新数组
          arr1 = arr1.concat(arr2); //合并数组
          // that.data.isLoading ? array = res.data : array = that.data.array.concat(res.data)
        }
        this.setData({
          pictureList: arr1,
        })
        wx.hideLoading({
          complete: (res) => {},
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
        wx.hideLoading({
          complete: (res) => {},
        })
      },
      
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

    let that = this;

    that.setData({
      isLoading: false, // 上拉触发后，不再是初始数据加载，按页码加载
      loading: true,  //把"上拉加载"的变量设为false，显示 
      pageIndex: that.data.pageIndex + 20

    })
    //获取数据 
    that.pictureList() 

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})