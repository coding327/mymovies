// pages/about/about.js
const app = getApp() // 获取全局实例
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null, // 存储局部用户信息
        favorites: {}, // 存储收藏的电影信息
        showNoFavorite: true, // 是否显示暂无收藏
    },
    getUserProfile(e) { // 获取用户信息【这个事件对象可传可不传】
        // 【注意wx.getUserProfile必须搭配点击事件才能使用】推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
          desc: '用于完善用户个人信息',
          success: res => {
            //   console.log(res);
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                app.userInfo = res.userInfo // 考虑到很多页面会使用用户信息，添加到全局实例中
                wx.setStorageSync('userInfo', res.userInfo) // 将用户信息保存到本地存储中
          }
        })
    },
    deleteFavorite(e) { // 删除收藏电影
        // console.log(e); // 打印一下事件对象，里面有个currentTarget属性接着还有个dataset属性里面存储着id
        // console.log(e.currentTarget.dataset.id); // 成功打印id
        let id = e.currentTarget.dataset.id // 获取事件触发时传递的参数

        // 先从数据仓库中删除，delete之后是要重新赋值数据仓库的，不然页面上不会改变
        delete this.data.favorites[id]
        this.setData({
            favorites: this.data.favorites,
            showNoFavorite: Object.keys(this.data.favorites).length == 0 // 注意这里是this.data.favorites，它是刚刚delete删除了的最新的收藏数据，如果长度为0说明删完了
        })

        // 从本地缓存中删除
        wx.setStorageSync('favorites', this.data.favorites) // 直接用上面已经删除的faborites
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userInfo') // 从本地存储中获取用户信息
        this.setData({
            userInfo
        })
        // 原先getUserInfo方案
        // 当页面加载时从全局数据中获取用户数据【授权分授权和不授权】
        // if (app.userInfo) { // 授权
        //     this.setData({
        //         userInfo: app.userInfo
        //     })
        // } 
        // else {
        //     // 由于wx.getUserInfo是异步请求，可能会在当前页面onload之后才返回结果，所以此处加入callback以防止这种情况
        //     app.userInfoReadyCallback = res => {
        //         this.setData({
        //             userInfo: res.userInfo
        //         })
        //     }
        // }
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
        // 从本地缓存中把最新收藏电影取出来
        let favorites = wx.getStorageSync('favorites')
        // 要在页面上使用，需要放到数据仓库中
        this.setData({
            favorites,
            showNoFavorite: Object.keys(favorites) == 0 // 当收藏为空时显示【需要拿到最新的收藏电影来做这个判断，所以开关阀门在这里】
        })
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