import wx from 'wepy'

wx.toast = wx.showToast
wx.showMenu = wx.showActionSheet

// 加载中
wx.loading = (title = '加载中', mask = false) => {
  wx.showToast({title, mask})
}

wx.tips = (title, duration = 2000) => {
  wx.showToast({
    title,
    // icon: 'none',
    mask: true,
    duration
  })
}

wx.confirm = (content, title = '') => {
  wx.showModal({title, content})
}
