// pages/detail/detail.js
const api = require('../../api/api')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        filmId: '', // 电影id
        film: {}, // 存储电影信息
        start: 0, // 评论的起始索引
        count: 10, // 评论的条数
        total: 0, // 总的评论条数
        comments: [], // 存储电影的评论
        showLoading: false, // loading的开关
        showNomore: false // 没有更多的开关
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.data.filmId = options.filmId
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        api.loadFilmByFilmId(this.data.filmId).then(data => {
            // console.log(data); // 成功返回电影信息
            // 将它们保存到数据仓库中，页面上需要直接使用
            this.setData({
                film: data
            })
        }).catch(api.showError)
        // 单独加载电影的评论
        this.loadComments()
    },
    loadComments() { // 单独加载电影评论的封装
        return api.loadCommentsByFilmId(this.data.filmId, {
            start: this.data.start,
            count: this.data.count,
            order_by: 'time' // 时间的降序，最新评论在最上面
        }).then(data => {
            console.log(data); // 打印下data，找到评论数据
            this.setData({
                // comments: data.interests, // 评论数据
                comments: this.data.comments.concat(data.interests), // 评论数组的累加
                start: this.data.start + this.data.count, // 起始索引每次累加
                total: data.total // 记录总条数
            })
        }).catch(api.showError)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.data.start < this.data.total) { // 有数据
            // 为了考虑用户体验，发请求获取数据需要时间，显示loading效果
            this.setData({
                showLoading: true
            })
            // 注意拿到数据之后才能再让loading隐藏，但是发请求是个异步，我们需要借助promise.then，即把之前加载评论数据封装的方法里的promise对象return出来即可
            this.loadComments().then(() => {
                this.setData({
                    showLoading: false // 拿到返回的评论数据
                })
            })
        } else { // 没有更多数据
            this.setData({
                nomore: true
            })
        }
    },
    // 添加收藏
    addFavorite() {
        // 如果用户没有登陆，给一个提示，让用户先登陆了才能收藏
        let userInfo = wx.getStorageSync('userInfo')
        // 判断用户是否登陆
        if (!userInfo) {
            wx.showModal({
              title: '提示',
              content: '请先登陆'
            })
            return // 终止掉函数
        }
        // 已经登陆，添加电影到本地缓存，如果取不到【首次】就是空字符串，而我们favorite设计的是对象，处理一下即可
        // 获取本地缓存中收藏的电影
        var favorites = wx.getStorageSync('favorites') || {}
        // 判断是否已收藏
        if (favorites[this.data.filmId]) {
            wx.showToast({
              title: '已收藏',
              image: '/imgs/error.png'
            })
            return
        }
        // 添加电影到本地缓存
        // 由于图片原因，不好到film-item组件中修改，所以到这里修改图片路径【detail和home接口问题，这里需要把图片给它换成有效的图片】
        this.data.film.cover.url = this.data.film.cover_url
        favorites[this.data.filmId] = this.data.film
        // 存到缓存中【下方控制台Storage可以查看有没有存进去】
        wx.setStorageSync('favorites', favorites)
        // 收藏成功提示
        wx.showToast({
          title: '收藏成功',
          image: '/imgs/success.png'
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})