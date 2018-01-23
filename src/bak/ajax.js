import config from './config'
import {device} from './env'
import cookie from './cookie'
import {store, session} from './storage'
// import {toast} from './ui'
import user from './user'
import axios from 'axios'

export let xhrs = []
// axios.defaults.timeout = 8000
// axios.defaults.baseURL = config.api
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// Ajax 通用请求参数
export let params = {
  version: '3.2.1',
  // wxid: ddb.wxid,
  // mobile: '',
  // user_id: '',
  login_type: 1, // 乘客端
  device_type: 3, // 设备类型：1-安卓，2-IOS，3-WEB
  // ddb_token: '', // 登录令牌
  // device_id: '', // 设备 ID
  city_code: '0755', // 默认深圳
  // ddb_src_id: '', // 渠道 ID
  // lat: 1, // 用户当前纬度
  // lng: 1, // 用户当前经度
  screen: device.width + ':' + device.height + '|' + device.dpr, // 用户设备信息
  source: device.isWeixin ? 3 : 5 // 请求来源：1-安卓，2-IOS，3-微信，4-快捷购票，5-webapp
}

// 更新通用参数
export function upParams() {
  let mobile = cookie('wx_mobile')
  if (!mobile || mobile === params.mobile) return

  params.mobile = mobile || params.mobile
  params.user_id = cookie('wx_user_id') || params.user_id
  params.ddb_token = cookie('wx_ddb_token') || params.ddb_token
  params.device_id = cookie('wx_device_id') || params.device_id
  params.ddb_src_id = session('ddb_src_id') || params.ddb_src_id
  params.city_code = (store('ddbCity') || '').split('/')[1] || params.city_code

  // 设置用户地理经纬度
  let gps = store('user_gps')
  if (gps) {
    params.lng = gps.lng
    params.lat = gps.lat
    params.gps_sampling_time = gps.gps_sampling_time
  }
}

// 初始化参数
upParams()
// console.log('params:', params)

// Ajax 请求封装
export function ajax(opts) {
  upParams()
  opts.params = Object.assign({}, params, opts.params)

  return new Promise((resolve, reject) => {
    let cachekey = opts.cachekey
    let cache = cachekey ? session(cachekey) : null

    const done = res => {
      let data = res.data
      let status = data.status = Number(data.status)
      // console.log(res.config.method.toUpperCase() + ' ' + opts.url + '\n ', data)
      resolve(data)

      // 返回未登录状态
      if ((status === 8001 || status === 8002 || status === 8003)) {
        user.clearLogin() // 清除过期登录态，如果有

        // 如果需检查登录态则转到登录页
        if (!opts.notCheckLogin) {
          user.login()
          return
        }
      }

      // 未关注公众号
      // if (status === 6001) {
      //   if (device.isWeixin && !opts.notCheckLogin) {
      //     wx.getOpenid(null, data.wxid || ddb.wxid);
      //   }
      //   return
      // }

      opts.success && opts.success(data)
    }

    // 如果有缓存则使用缓存数据
    if (cache) {
      done(cache)
      return
    }

    let xhr = axios({
      url: opts.url,
      method: opts.method || opts.type || 'get',

      // 将被添加到 url 前面，除非 url 是绝对的
      baseURL: config.api,

      // 与请求一起发送的 URL 参数，必须是纯对象或 URLSearchParams 对象
      params: opts.params,

      // 作为请求主体发送的数据，仅适用于请求方法 PUT、POST 和 PATCH
      data: opts.data,

      // 服务器将响应的数据类型，包括：arraybuffer、blob、document、json、text、stream
      responseType: opts.responseType || opts.dataType || 'json',

      // headers: {'content-type': 'application/json'},
      headers: opts.headers || opts.header || {'content-type': 'text/plain'},  // 这里要重设，默认的有跨域问题
      // withCredentials: true, // 指示是否跨站点访问控制请求，没搞懂是作毛用的

      // 指定请求超时之前的毫秒数
      timeout: opts.timeout || 8000
    }).then(done).catch(err => {
      opts.error && opts.error(err)
      console.log('网络异常: [' + err + ']')
      // toast('网络异常: [' + err + ']')
      // reject(err)
    })

    xhrs.push(xhr)
  })
}

// get 请求封装
export function get(url, params = {}, opts = {}) {
  opts = Object.assign(opts, {
    url,
    params,
    method: 'get'
  })

  return ajax(opts)
}

// post 请求封装
export function post(url, data, opts) {
  opts = Object.assign(opts, {
    url,
    data,
    method: 'post'
  })

  return ajax(opts)
}

export default {
  xhrs,
  ajax,
  get,
  post
}
