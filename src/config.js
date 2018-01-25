// 应用版本号
const version = '1.0.0'

// 接口通用请求参数
export const params = {
  version,
  // user_id: '',
  // login_type: 1, // 乘客端
  // device_type: 3, // 设备类型：1-安卓，2-IOS，3-WEB
  // mobile: '', // 用户绑定的手机号
  // device_id: '', // 设备 ID
  // token: '',
  city_code: '0755', // 默认深圳
  source: 6 // 请求来源：1-安卓，2-IOS，3-微信，4-快捷购票，5-webapp，6-wxapp
}

// 全局数据
export const globalData = {
  loginChanged: false,
  systemInfo: null,
  userInfo: null
}

export default {
  version,
  amapkey: '',
  api: '',
  wxapi: ''
}
