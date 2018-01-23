import env from './env'
import config from './config'
import cookie from './cookie'
import http from './ajax'

// 用户是否登录
export let logined = isLogin()
export function isLogin() {
  return !!(cookie('wx_user_id') && cookie('wx_mobile') && cookie('wx_ddb_token'))
}

// 转到登录页
export function login(referrer = location.href, replace = false) {
  let url = 'http://' + env.host + '/webapp/login.html?referrer=' + encodeURIComponent(referrer)
  if (replace) {
    location.replace(url)
  } else {
    location.href = url
  }
}

// 清除登录态
export function clearLogin(callback) {
  if (!logined) return

  cookie('wx_user_id', '', {path: '/'})
  cookie('wx_mobile', '', {path: '/'})
  cookie('wx_device_id', '', {path: '/'})
  cookie('wx_ddb_token', '', {path: '/'})
  cookie('wx_is_bind', '', {path: '/'})
  window.sessionStorage.clear()

  if (typeof callback === 'function') {
    callback()
  }
}

// 退出登录
export function logout(callback = login) {
  let url = config[env.isWeixin ? 'wxapi' : 'api'] + 'authentication/logout'
  http.get(url).then(function(res) {
    if (res.ret === 0) {
      clearLogin(callback)
    } else {
      alert(res.msg)
    }
  }).catch(function() {
    alert('服务器出错了 >_< 请重试一次')
  })
}

// 同步乘客端的登录态
function syncLogin(argument) {
  cookie('wx_user_id', '126501', {expires: 365, path: '/'})
  cookie('wx_mobile', '12311111111', {expires: 365, path: '/'})
  cookie('wx_device_id', '440C72F95396E0B0580118690E922339', {expires: 365, path: '/'})
  cookie('wx_ddb_token', 'c487bfc3312614df65dc9637d0cd0b94', {expires: 365, path: '/'})
}

export default {
  logined,
  isLogin,
  login,
  logout,
  syncLogin,
  clearLogin
}