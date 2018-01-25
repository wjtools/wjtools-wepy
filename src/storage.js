import wx from 'wepy'

// 数据永久缓存
export function store(key, val) {
  if (val === undefined) { // 读取
    return wx.getStorageSync(key)
  } else if (val === null) { // 删除
    try {
      return wx.removeStorageSync(key)
    } catch (e) {
      console.log('删除缓存出错：', e)
      return false
    }
  } else { // 写入
    try {
      return wx.setStorageSync(key, val)
    } catch (e) {
      console.log('设置缓存出错：', e)
      return false
    }
  }
}

// 删除永久缓存数据
export function removeStore(key) {
  return this.store(key, null)
}

// 清除永久缓存数据
export function clearStore() {
  try {
    return wx.clearStorageSync()
  } catch (e) {
    console.log('清除缓存出错：', e)
    return false
  }
}

// 会话缓存数据
export const sessionData = {}

// 数据会话缓存，可用于页面间传参
export function session(key, val) {
  switch (val) { // 读取
    case undefined:
      return this.sessionData[key]
    case null: // 删除
      this.sessionData[key] = undefined
      return true
    default: // 写入
      this.sessionData[key] = val
      return true
  }
}

// 删除会话缓存数据
export function removeSession(key) {
  return this.session(key, null)
}

// 清除会话缓存数据
export function clearSession() {
  this.sessionData = {}
  return true
}

Object.assign(wx, {
  store,
  removeStore,
  clearStore,
  sessionData,
  session,
  removeSession,
  clearSession
})
