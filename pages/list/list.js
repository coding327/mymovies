// pages/list/list.js
// 导入api模块
const api = require('../../api/api.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        method: '', // 调api的方法名
        films: {}, // 存放电影信息，由于有个分类名，这里设计为对象格式的数据
        start: 0, // 起始索引
        count: 12, // 返回多少条数据
        total: 0, // 后台数据库中电影总条数
        showLoading: false, // 是否显示loading，只有上拉加载数据还未响应时需要显示loading--->所以设置为false
        showNomore: false // 是否显示nomore
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options); // 成功拿到method
        // 放到数据仓库中
        this.data.method = options.method
        // 这里赋值为何不采用setData呢？
        // this.setData是可以实现数据的响应式，只要页面用到的地方都能及时的更新，但是method的值我们只需要固定的，并且不需要在页面上展示，所以这里两个方法都可以
        // this.setData({
        //     method: options.method
        // })
        this.loadListData()
    },
    // 定义加载数据方法
    loadListData() {
        // 注意method是个变量这里要用中括号
        // 返回Promise对象，便于继续执行
        return api[this.data.method]({
            start: this.data.start,
            count: this.data.count
        }).then(data => {
            // console.log(data) // 成功拿到数据
            // 初始films中没有list，即list为undefined不能使用concat方法需要给它赋个[]空数组
            let list = this.data.films.list || []
            // 定义一个films，再赋值给数据仓库中的films即可
            let films = {
                title: data.subject_collection.name,
                // list: data.subject_collection_items
                list: list.concat(data.subject_collection_items) // 上拉加载时数据累加
            }
            this.setData({
                // films: films
                // 由于对象属性名与属性值的变量名相同可以简写为films
                films,
                start: this.data.start + this.data.count, // 起始索引增加
                total: data.total // 后台数据库中电影总条数
            })
        }).catch(api.showError)
        // 这个写完可以测试一下，学会使用控制台的AppData，它是可以帮我们看这个数据的，如films中的title和list
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
        // 重新加载数据即把值都恢复默认就行了
        this.setData({
            start: 0,
            films: {}
        })
        this.loadListData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // console.log(123) // 这里我们可以测试一下上拉功能

        // 判断是否还有更多数据，如果有就显示loading再加载数据；没有最好显示没有更多数据
        if (this.data.start < this.data.total) { // 还有更多数据
            // 上拉时先让loading显示
            this.setData({
                showLoading: true
            })
            // 发请求获取数据由于起始索引是从0开始，但是下次加载就不能从0开始了，说明start不能写死，需要去数据仓库中定义数据，count是返回多少条数据，也可以不用写死
            // this.loadListData() // 调用加载电影数据的方法
            setTimeout(() => {
                // 这里的.then一定别忘了上面要loadListData要加上return
                this.loadListData().then(() => {
                    // 加载完数据隐藏loading
                    this.setData({
                        showLoading: false
                    })
                })
            }, 3000) // 模拟加载延迟，调用加载电影数据的方法
        } else { // 没有更多数据，显示nomore
            this.setData({
                showNomore: true
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})