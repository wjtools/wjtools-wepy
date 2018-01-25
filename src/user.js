import wx from 'wepy'

function noop() {}

// 获取微信用户信息
export function getUserInfo(callback = noop) {
  this.globalData = this.globalData || {}

  if (this.globalData.userInfo) {
    callback(this.globalData.userInfo)
  } else {
    let app = this
    wx.login({
      success() {
        wx.getUserInfo({
          success(res) {
            console.log(res)
            app.globalData.userInfo = res.userInfo
            callback(res.userInfo)
          }
        })
      }
    })
  }
}

// 获取当前的位置信息
export function getLocation(callback = noop) {
  this.globalData = this.globalData || {}

  if (this.globalData.location) {
    callback(this.globalData.location)
  } else {
    let app = this
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {
        app.globalData.location = res
        callback(res)
      }
    })
  }
}

export default {
  getUserInfo,
  getLocation,
  getInfo: getUserInfo,
  isLogin: noop,
  login: noop,
  logout: noop,
  clearLogin: noop
}
