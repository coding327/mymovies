// pages/home/home.js
// 引入模块
const api = require('../../api/api')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 一个分类对应一个对象
        // type: {
        //     title: '',
        //     list: []
        // }
        // 既然分类有多个，那直接用数组即可
        types: [] // 存储所有的分类
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // this.loadHotFilms()
        this.loadHomeData()
        // 人为让loading效果时间长一点，只需要让发请求晚一点发即可
        // setTimeout(() => {
        //     this.loadHomeData()
        // }, 3000)
    },
    // loadHotFilms() {
    //     wx.request({
    //       url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
    //       data: {
    //           start: 0,
    //           count: 6
    //       },
    //       success: res => {
    //         //   console.log(res)
    //         // 每一个分类作为一个对象
    //         let type = {
    //             title: res.data.subject_collection.name,
    //             list: res.data.subject_collection_items
    //         }
    //         // 注意是个对象里面再数组，不好用push
    //         this.setData({
    //             'types[0]': type
    //         })
    //       }
    //     })
    // },
    // 加载主页数据
    loadHomeData() {
        // 加载影院热映数据
        // 此时调用返回Promise对象
        api.loadHotFilms({
            start: 0,
            count: 6
        }).then(data => {
            let type = {
                title: data.subject_collection.name,
                list: data.subject_collection_items,
                method: data.method
            }
            // 注意是个对象里面再数组，不能用push
            this.setData({
                'types[0]': type
            }) 
        }).catch(api.showError) // 注意这里直接放的是函数即回调函数function (xx) { xxx }

        // 加载近期热门数据
        api.loadLatestFilms({
            start: 0,
            count: 6
        }).then(data => {
            let type = {
                title: data.subject_collection.name,
                list: data.subject_collection_items,
                method: data.method
            }
            this.setData({
                'types[1]': type
            })
        }).catch(api.showError)

        // 加载免费在线数据
        api.loadFreeFilms({
            start: 0,
            count: 6
        }).then(data => {
            let type = {
                title: data.subject_collection.name,
                list: data.subject_collection_items,
                method: data.method
            }
            this.setData({
                'types[2]': type
            })
        }).catch(api.showError)
    }
})