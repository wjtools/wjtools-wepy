import wx from 'wepy'

// 更新通用参数
export function setParams() {}

// Ajax 请求封装
export function ajax(opts) {
  let app = this
  this.setParams()
  opts.data = Object.assign(this.params, opts.data)

  // 如果非完整地址
  if (!/^https?:/i.test(opts.url)) {
    opts.url = this.config.api + opts.url
  }

  // 默认显示加载动画
  if (!opts.noLoading) {
    this.loading()
  }

  return wx.request({
    url: opts.url,
    data: opts.data,
    method: opts.type,
    dataType: opts.dataType,
    header: opts.header,
    success(res) {
      let data = res.data
      !opts.noLoading && app.hideLoading()

      // 接口返回未登录状态
      if (app.notLoginCodes.includes(data.ret)) {
        // 如果有过期登录态则清除
        app.isLogin() && app.clearLogin()

        // 如果需检查登录态则转到登录页
        if (!opts.notCheckLogin) {
          app.login()
          return
        }
      }

      opts.success && opts.success(data)
      console.log((opts.type || 'GET') + opts.url + '\n ', data)
    },
    error(err) {
      !opts.noLoading && app.hideLoading()
      opts.error && opts.error(err)
      console.log('网络异常[' + err + ']')
    },
    complete(res) {
      opts.complete && opts.complete(res)
    }
  })
}

// get 请求封装
export function get(url, data, success, error) {
  // data 参数可缺省
  if (typeof data === 'function') {
    error = success
    success = data
  }

  return this.ajax({
    url: url,
    data: data,
    method: 'GET',
    dataType: 'json',
    header: {
      'content-type': 'application/json'
    },
    success: success,
    error: error
  })
}

// post 请求封装
export function post(url, data, success, error) {
  // data 参数可缺省
  if (typeof data === 'function') {
    error = success
    success = data
  }

  return this.ajax({
    url: url,
    data: data,
    method: 'POST',
    dataType: 'json',
    header: {
      'content-type': 'application/json'
    },
    success: success,
    error: error
  })
}
