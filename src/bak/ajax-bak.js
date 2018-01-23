// import config from 'config'
// import device from 'device'
// import cookie from 'cookie'
// import {store} from 'storage'
// import {noop, extend} from 'util'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

// let xhrs = []

// Ajax 通用请求参数
export let params = {
  version: '3.2.1',
  // wxid: ddb.wxid,
  // mobile: '', // 用户手机号
  // user_id: '',
  login_type: 1, // 乘客端
  device_type: 3, // 设备类型：1-安卓，2-IOS，3-WEB
  // ddb_token: '', // 登录令牌
  // device_id: '', // 设备 ID
  city_code: '0755', // 默认深圳
  // ddb_src_id: '', // 渠道 ID
  // lat: 1, // 用户当前纬度
  // lng: 1, // 用户当前经度
  // screen: device.width + ':' + device.height + '|' + device.dpr, // 用户设备信息
  // source: device.isWeixin ? 3 : 5 // 请求来源：1-安卓，2-IOS，3-微信，4-快捷购票，5-webapp，6-wxapp
  source: 3 // 请求来源：1-安卓，2-IOS，3-微信，4-快捷购票，5-webapp，6-wxapp
}

// 更新通用参数
export function upParams(params = params) {
  // params.mobile = cookie('mobile') || params.mobile
  // params.user_id = cookie('user_id') || params.user_id
  // params.ddb_token = cookie('ddb_token') || params.ddb_token
  // params.device_id = cookie('device_id') || params.device_id
  // params.city_code = cookie('user_city').split('/')[1] || params.city_code
  // params.ddb_src_id = cookie('ddb_src_id') || params.ddb_src_id

  // 设置用户地理经纬度
  // let gps = store('user_gps')
  // if (gps) {
  //   params.lng = gps.lng
  //   params.lat = gps.lat
  //   params.gps_sampling_time = gps.gps_sampling_time
  // }
}

// 初始化参数
upParams(params)

// let globalXHR = {}
// let goErrorPage = redirect => {
//   if (redirect) {
//     window.location = URI_ERROR
//   }
// }

// // TODO
// export default class Ajax {
//   constructor(opts = {}) {
//     this.path = opts.path || ''
//     this.options = {
//       url: URI_BASE + this.path,
//       method: opts.method || 'get',
//       data: opts.data || {},
//       success: opts.success,
//       fail: opts.fail,
//       before: opts.beforeSend,
//       complete: opts.complete,
//       cache: opts.cache || false,
//       emulateJSON: opts.emulateJSON || false,
//       redirect: opts.redirect || false
//     }
//   }

//   update(data = this.options.data) {
//     let self = this,
//       options = self.options
//     options.data = data
//   }

//   local(options = this.options) {
//     let self = this,
//       path = self.path,
//       method = options.method,
//       ret = local.fetch(path + '|' + method)
//     console.log('Fetch cache of ' + path + '|' + method + ': ', ret)
//     return ret
//   }

//   fetch(options = this.options) {
//     let self = this
//     if (options.cache) {
//       let data = self.local()
//       if (data.data) {
//         self.success(data)
//       } else {
//         self.http()
//       }
//     } else {
//       self.http()
//     }
//   }

//   http(options = this.options) {
//     let self = this,
//       settings = {
//         url: options.url,
//         method: options.method,
//         before(request) {
//           if (globalXHR[options.method]) {
//             globalXHR[options.method].cancel()
//           }
//           globalXHR[options.method] = request.xhr
//           // callback
//           if (typeof options.beforeSend === 'function') {
//             options.beforeSend(request)
//           }
//         }
//       }
//     if (options.method === 'get') {
//       settings.params = options.data
//     } else {
//       settings.body = options.data
//     }
//     Vue.http(settings).then(
//       function(response, status, request) {
//         self.success(response, options)
//       },
//       function(response, status, request) {
//         toast.log([
//           '路径 ',
//           self.path,
//           ' 出现错误: ',
//           response,
//           ' 请联系管理员或稍后重试。'
//         ])
//         goErrorPage(options.redirect)
//       }
//     ).then(options.complete)
//   }

//   // 请求成功回调
//   success(response, options = this.options) {
//     var self = this
//     if (response.ok && response.data.rspHeader) {
//       if (response.data && response.data.rspHeader.rspCode === '000000') {
//         goErrorPage(options.redirect && !response.data.data)
//         if (typeof options.success === 'function') {
//           options.success(response.data)
//           local.save(response, self.path + '|' + options.method)
//         }
//       } else {
//         if (typeof options.fail === 'function') {
//           options.fail(response)
//         }
//         toast.log([
//           '路径 ',
//           self.path,
//           ' 出现错误（',
//           response.data.rspHeader.rspCode,
//           '）：',
//           response.data.rspHeader.rspMsg || '未知错误，请联系管理员或稍后重试',
//           '。'
//         ])
//         goErrorPage(options.redirect)
//       }
//     } else {
//       if (typeof options.fail === 'function') {
//         options.fail(response)
//       }
//       toast.log([
//         '路径 ',
//         self.path,
//         ' 出现错误，请联系管理员或稍后重试。'
//       ])
//       console.log(response)
//       goErrorPage(options.redirect)
//     }
//   }
// }

// Ajax 请求封装
export function ajax(opts) {
  this.upParams()
  opts.data = Object.assign({}, this.params, opts.data)
  opts.before = opts.before || this.noop
  opts.success = opts.success || this.noop
  opts.fail = opts.fail || opts.error || this.noop
  opts.complete = opts.complete || this.noop

  // 如果非完整地址
  if (!/^https?:/i.test(opts.url)) {
    // 正则添加路径斜杠：'test/api' => '/test/api'
    // opts.url = this.config.api + opts.url.replace(/^([^\/])/, '/$1')
    opts.url = this.config.api + opts.url
  }

  // 默认显示加载动画
  if (!opts.noLoading) {
    this.loading()
  }

  return Vue.http({
    url: opts.url,
    method: opts.type || opts.method || 'get',
    data: opts.data,
    dataType: opts.dataType,
    header: opts.header,
    cache: opts.cache || false,
    emulateJSON: opts.emulateJSON || false,
    redirect: opts.redirect || false,
    before: opts.before,
    success(res) {
      !opts.noLoading && this.hideLoading()
      let data = res.data

      // 接口返回未登录状态
      if ((+data.ret === 8001 || +data.ret === 8002 || +data.ret === 8003)) {
        // 如果有过期登录态则清除
        this.isLogin() && this.clearLogin()

        // 如果需检查登录态则转到登录页
        if (!opts.notCheckLogin) {
          this.login()
          return
        }
      }

      opts.success && opts.success(data)
      console.log((opts.type || 'GET') + opts.url + '\n ', data)
    },
    fail(err) {
      !opts.noLoading && this.hideLoading()
      opts.fail(err)
      console.log('网络异常[' + err + ']')
    },
    complete: opts.complete
  }).then(
    // function(response, status, request) {
    //   self.success(response, opts)
    // },
    // function(response, status, request) {
    //   toast.log([
    //     '路径 ',
    //     self.path,
    //     ' 出现错误: ',
    //     response,
    //     ' 请联系管理员或稍后重试。'
    //   ])
    //   goErrorPage(opts.redirect)
    // }
  ).then(opts.complete)
}

// get 请求封装
export function get(url, data, success, error) {
  // data 参数可缺省
  if (typeof data === 'function') {
    error = success
    success = data
  }

  return ajax({
    url: url,
    data: data,
    method: 'GET',
    dataType: 'json',
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

  return ajax({
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

// get 请求封装
export function getJsonp(url, data, success, error) {
  // data 参数可缺省
  if (typeof data === 'function') {
    error = success
    success = data
  }

  return ajax({
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