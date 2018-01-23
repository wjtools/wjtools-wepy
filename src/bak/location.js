// 通用地址类作工具

export function getParam(name, url) {
  url = url || location.href
  let reg = new RegExp('(^|&|\\?|#)' + name + '=([^&]*?)(&|#|$)')
  let tempHash = url.match(/#.*/) ? url.match(/#.*/)[0] : ''
  url = url.replace(/#.*/, '')

  if (reg.test(tempHash)) {
    return decodeURIComponent(tempHash.match(reg)[2])
  } else if (reg.test(url)) {
    return decodeURIComponent(url.match(reg)[2])
  } else {
    return ''
  }
}

export function setParam(name, value, url, isHashMode) {
  if (typeof name === 'undefined' || typeof value === 'undefined' || typeof url === 'undefined') {
    return url
  }

  let reg = new RegExp('(^|&|\\?|#)' + name + '=([^&]*?)(&|#|$)')
  let tempHash = url.match(/#.*/) ? url.match(/#.*/)[0] : ''
  let separator

  url = url.replace(/#.*/, '')
  if (isHashMode === true) {
    if (reg.test(tempHash)) {
      tempHash = tempHash.replace(reg, function(m, r1, r2, r3) {
        return r1 + name + '=' + encodeURIComponent(value) + r3
      })
    } else {
      separator = tempHash.indexOf('#') === -1 ? '#' : '&'
      tempHash = tempHash + separator + name + '=' + encodeURIComponent(value)
    }
    tempHash = tempHash.replace(reg, function(m, r1, r2, r3) {
      return r1 + name + '=' + encodeURIComponent(value) + r3
    })
    return tempHash + url
  } else if (reg.test(url)) {
    url = url.replace(reg, function(m, r1, r2, r3) {
      return r1 + name + '=' + encodeURIComponent(value) + r3
    })
  } else {
    separator = url.indexOf('?') === -1 ? '?' : '&'
    url = url + separator + name + '=' + encodeURIComponent(value)
  }
  return url + tempHash
}

// 删除指定参数
export function delParam(name, url) {
  let reg = new RegExp('[\\?&]' + name + '=[^&#]*&?', 'g')

  // 提供了 url 参数则返回替换结果，否则替换地址栏路径
  if (url) {
    return url.replace(reg, '')
  } else {
    history.replaceState(null, '', location.href.replace(reg, ''))
  }
}

// 设置 hash 值
export function setHash(hash, url, replace) {
  url = url || location.href
  // return url.split('#')[0] + hash
  return url.replace(/(?:#(.*))?$/, hash)
}

export function parseHash(hash) {
  let tag
  let query
  let param = {}
  let arr = hash.split('?')
  tag = arr[0]

  if (arr.length > 1) {
    let seg
    let s
    query = arr[1]
    seg = query.split('&')

    for (let i = 0; i < seg.length; i++) {
      if (!seg[i]) continue
      s = seg[i].split('=')
      param[s[0]] = s[1]
    }
  }

  return {
    hash: hash,
    tag: tag,
    query: query,
    param: param
  }
}

export function serializeArray(params) {
  let param = {}
  let temp

  try {
    params = params.split('&')
    for (let i = 0, len = params.length; i < len; i++) {
      if (!params[i]) continue
      temp = params[i].split('=')
      param[temp[0]] = temp[1]
    }
  } catch (err) {
    alert('解析公用参数出错：' + err)
  }

  return param
}

// 将 url 中的参数全部提取到一个对象中并返回
export function getObj(url) {
  let obj = parseHash(url)
  return obj.param
}

export function setObj(url, obj) {
  obj.forEach(function(key, value) {
    url = setParam(key, value, url)
  })
  return url
}

// 转到
// goto(e, type, checkLogin) {
//   if (checkLogin && !this.isLogin()) {
//     this.login()
//     return
//   }

//   let url = typeof e === 'string' ? e : e.currentTarget.dataset.url
//   console.log('test: ', url)
//   wx[type || 'navigateTo']({
//     url: url
//   })
// },

// navigateTo(e, checkLogin) {
//   this.goto(e, 'navigateTo', checkLogin)
// },

// redirectTo(e, checkLogin) {
//   this.goto(e, 'redirectTo', checkLogin)
// },