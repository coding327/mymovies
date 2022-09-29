// app.js
App({
    // 原先getUserInfo方案
    // userInfo: null, // 全局的用户信息
    // onLaunch() { // 小程序启动时获取用户信息
    //     // 获取用户设置，这里面有个成功回调，其中有个参数表示用户授权的结果
    //     wx.getSetting({
    //       success: res => {
    //         // 判断是否授权用户信息
    //         // console.log(res);
    //         if (res.authSetting["scope.userInfo"]) {
    //             // getUserInfo不适用了，老方法从缓存中看设置里有没有授权，授权就拿其中用户信息，但是拿这个用户信息是个异步过程，如果先展示关于页面，全局的用户信息还是null，当做没有全局用户信息使用了，由于这个加载时机的问题，最好的解决方法就是回调，绑定到全局实例上就行了
    //             wx.getUserInfo({ // 授权了就获取用户信息
    //                 desc: '用于完善用户个人信息',
    //                 success: res => {
    //                     // console.log(123, res); // 打印用户信息
    //                     this.userInfo = res.userInfo
    //                     // 由于wx.getUserInfo是异步请求，可能会在about页面onload之后才返回结果，所以此处判断有没有关于页面绑定的callback以防止这种情况
    //                     if (this.userInfoReadyCallback) {
    //                         this.userInfoReadyCallback(res)
    //                     }
    //                 }
    //             })
    //         }
    //       }
    //     })
    // }
})
