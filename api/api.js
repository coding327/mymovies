/**
 * API请求的模块化处理
 * 将项目中的所有请求都进行统一的管理
 * */ 

// 统一定义接口地址
const URLS = {
    hotUrl: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
    latestUrl: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',
    freeUrl: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items',
    detailUrl: 'https://m.douban.com/rexxar/api/v2/movie/'
}

// 处理请求错误[响应错误这里没做处理]
const showError = function (error) {
    // 使用微信小程序提供弹出组件显示请求失败
    wx.showToast({
      title: error.errMsg,
      // 消息也可以自己给
      // title: '请求失败',
      image: '/imgs/error.png'
    })
}

// 影院热映数据
const loadHotFilms = function(params={}) {
    // 返回Promise对象
    return new Promise((resolve, reject) => {
        wx.request({
            url: URLS.hotUrl,
            data: params,
            success: resolve,
            fail: reject
        })
    }).then( res => {
        // console.log(res)
        if (res.statusCode === 200) {
            res.data.method = 'loadHotFilms'
            return res.data
        } else {
            // 如果失败将Promise状态由fulfilled转换为rejected
            Promise.reject({
                // message换为errMsg是可以处理响应错误，reject(xx)里的xx会作为catch的实参,包括上面fail里的reject的res，失败都会传递给catch里的回调函数
                message: res.errMsg
            })
        }
    })
}

// 近期热门数据
const loadLatestFilms = function (params = {}) {
    // 返回Promise对象
    return new Promise((resolve, reject) => {
        wx.request({
            url: URLS.latestUrl,
            data: params,
            success: resolve,
            fail: reject
        })
    }).then( res => {
        // console.log(res)
        if (res.statusCode === 200) {
            res.data.method = 'loadLatestFilms'
            return res.data
        } else {
            // 如果失败将Promise状态由fulfilled转换为rejected
            Promise.reject({
                // message换为errMsg是可以处理响应错误，reject(xx)里的xx会作为catch的实参,包括上面fail里的reject的res，失败都会传递给catch里的回调函数
                message: res.errMsg
            })
        }
    })
}

// 免费在线数据
const loadFreeFilms = function (params = {}) {
    // 返回Promise对象
    return new Promise((resolve, reject) => {
        wx.request({
            url: URLS.freeUrl,
            data: params,
            success: resolve,
            fail: reject
        })
    }).then( res => {
        // console.log(res)
        if (res.statusCode === 200) {
            res.data.method = 'loadFreeFilms'
            return res.data
        } else {
            // 如果失败将Promise状态由fulfilled转换为rejected
            Promise.reject({
                // message换为errMsg是可以处理响应错误，reject(xx)里的xx会作为catch的实参,包括上面fail里的reject的res，失败都会传递给catch里的回调函数
                message: res.errMsg
            })
        }
    })
}

// 电影详情页数据
const loadFilmByFilmId = function (filmId) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: URLS.detailUrl + filmId,
            success: resolve,
            fail: reject
        })
    }).then(res => {
        if (res.statusCode == 200) {
            return res.data
        } else {
            return Promise.reject({
                message: res.errMsg
            })
        }
    })
}

// 电影详情页评论数据
const loadCommentsByFilmId = function (filmId,params={}) {
    return new Promise((resolve, reject) => {
        wx.request({
          url: URLS.detailUrl+filmId+'/interests',
          data:params,
          success: resolve,
          fail: reject
        })
    }).then(res => {
        if (res.statusCode == 200) {
            return res.data
        } else {
            return Promise.reject({
                message: res.errMsg
            })
        }
    })
}

// 注意要暴露出去
module.exports = {
    showError,
    loadHotFilms,
    loadLatestFilms,
    loadFreeFilms,
    loadFilmByFilmId,
    loadCommentsByFilmId
}