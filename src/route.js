import wx from 'wepy'

// 转到
export function goto(e, type, checkLogin) {
  if (checkLogin && !this.isLogin()) {
    this.login()
    return
  }

  let url = typeof e === 'string' ? e : e.currentTarget.dataset.url
  console.log('test: ', url)
  wx[type || 'navigateTo']({
    url: url
  })
}

export function navigateTo(e, checkLogin) {
  this.goto(e, 'navigateTo', checkLogin)
}

export function redirectTo(e, checkLogin) {
  this.goto(e, 'redirectTo', checkLogin)
}

export function switchTab(e, checkLogin) {
  this.goto(e, 'switchTab', checkLogin)
}

// 获取当前路由
export function getRoute() {
  let pages = wx.getCurrentPages()
  let curPage = pages[pages.length - 1]
  return '/' + curPage.__route__
}

// 动态设置当前页面的标题
export function setTitle(title) {
  wx.setNavigationBarTitle({
    title: title
  })
}
