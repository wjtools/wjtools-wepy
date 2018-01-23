// 数据永久缓存
// store(key, val) {
//   if (val === undefined) { // 读取
//     return wx.getStorageSync(key)
//   } else if (val === null) { // 删除
//     try {
//       return wx.removeStorageSync(key)
//     } catch (e) {
//       console.log('删除缓存出错：', e)
//       return false
//     }
//   } else { // 写入
//     try {
//       return wx.setStorageSync(key, val)
//     } catch (e) {
//       console.log('设置缓存出错：', e)
//       return false
//     }
//   }
// },

// // 删除永久缓存数据
// removeStore(key) {
//   return store(key, null)
// },

// // 清除永久缓存数据
// clearStore() {
//   try {
//     return wx.clearStorageSync()
//   } catch (e) {
//     console.log('清除缓存出错：', e)
//     return false
//   }
// },

// // 数据会话缓存，可用于页面间传参
// session(key, val) {
//   switch (val) { // 读取
//     case undefined:
//       return sessionData[key]
//     case null: // 删除
//       sessionData[key] = undefined
//       return true
//     default: // 写入
//       sessionData[key] = val
//       return true
//   }
// },

// // 删除会话缓存数据
// removeSession(key) {
//   return session(key, null)
// },

// // 清除会话缓存数据
// clearSession() {
//   sessionData = {}
//   return true
// },

// 数据存储（注意此方式存储经过了 JSON 解析，会还原原数据类型）
function storage(type, key, val) {
  // 如果不支持本地缓存，很可能是启用了『无痕模式』
  // if (!window[type]) {
  //   alert('为了能享受更好的服务，请关闭浏览器的无痕模式！');
  //   return;
  // }

  // 不支持/无痕模式/禁用了缓存（safari 禁用缓存会报 SecurityError: Dom Exception 18）
  try {
    window[type].setItem('test-storage', 'test')
    window[type].removeItem('test-storage')
  } catch (err) {
    alert('您开启了无痕模式或禁用了缓存，为了能享受更好的服务，请更改您的设置。')
    return false
  }

  if (typeof val === 'undefined') { // 读取
    try {
      return JSON.parse(window[type].getItem(key))
    } catch (r) {
      return window[type].getItem(key)
    }
  } else if (val === null || val === '') { // 删除
    return window[type].removeItem(key)
  } else { // 写入
    // 当本地存储满了，再往里面写数据，将会触发 error
    // return window[type].setItem(key, JSON.stringify(val))
    try {
      return window[type].setItem(key, JSON.stringify(val))
    } catch (e) {
      if (type === 'sessionStorage') {
        removeStoragesByKeyContains('/', type) // 删除接口的缓存
      } else {
        removeStoragesBut('ddbCity|isAward|ddbSearch|travel_city_code|waitBusTips', type)
      }
      return window[type].setItem(key, JSON.stringify(val))
    }
  }
}

// 本地存储-localStorage
export function store(key, val) {
  return storage('localStorage', key, val)
}

// 本地存储-sessionStorage，可用于页面间传参
export function session(key, val) {
  return storage('sessionStorage', key, val)
}

// 删除 key 值中包含所给字符的缓存
export function removeStoragesByKeyContains(str, type) {
  let storage = window[type || 'sessionStorage']
  let len = storage.length
  let key

  // 如果不支持本地缓存，很可能是启用了『无痕模式』
  if (!storage) {
    alert('为了能享受更好的服务，请关闭浏览器的无痕模式！')
    return
  }

  while (len) {
    len--
    key = storage.key(len)
    if (key.indexOf(str) !== -1) {
      storage.removeItem(key)
    }
  }
}

// 删除除了所给 key 值的缓存，参数格式：'key1|key2|key3'
export function removeStoragesBut(keys, type) {
  keys = keys.split('|')
  let storage = window[type || 'localStorage']
  let len = storage.length
  let key

  // 如果不支持本地缓存，很可能是启用了『无痕模式』
  if (!storage) {
    alert('为了能享受更好的服务，请关闭浏览器的无痕模式！')
    return
  }

  while (len) {
    len--
    key = storage.key(len)
    if (keys.indexOf(key) === -1) {
      storage.removeItem(key)
    }
  }
}