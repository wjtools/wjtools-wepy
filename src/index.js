import config, {params, globalData} from './config'
import user, {getUserInfo, getLocation} from './user'
import * as route from './route'
import * as util from './util'
import './ui'

import {
  store,
  removeStore,
  clearStore,
  sessionData,
  session,
  removeSession,
  clearSession
} from './storage'

import {
  setParams,
  ajax,
  get,
  post
} from './http'

// 工具函数库
export default {
  // 通用配置
  config,
  params,
  globalData,

  // 通用工具
  util,

  // 数据存储
  store,
  removeStore,
  clearStore,
  sessionData,
  session,
  removeSession,
  clearSession,

  // ajax
  setParams,
  ajax,
  get,
  post,

  // 用户相关
  user,
  getUserInfo,
  getLocation,

  // 路由
  ...route,

  // 添加属性或方法
  extend(obj) {
    util.deepClone(this, obj)
  }
}
