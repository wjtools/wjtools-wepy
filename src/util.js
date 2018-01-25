// 常用工具

/**
 * Perform no operation.
 */
export function noop() {}

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
export function isUndef(v) {
  return v === undefined || v === null
}

export function isDef(v) {
  return v !== undefined && v !== null
}

export function isFunction(obj) {
  return typeof obj === 'function'
}

export function isNumber(obj) {
  let type = typeof obj
  return (type === 'number' || type === 'string') && !isNaN(obj - parseFloat(obj))
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

const _toString = Object.prototype.toString

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

export function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
export function toString(val) {
  return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export function toNumber(val) {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 * Remove an item from an array
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Convert an Array-like object to a real Array.
 */
export function toArray(list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

// 深拷贝
export function deepClone(to = {}, obj = {}) {
  for (var k in obj) {
    if (typeof obj[k] === 'object') {
      to[k] = (obj[k].constructor === Array) ? [] : {}
      deepCopy(obj[k], to[k])
    } else {
      to[k] = obj[k]
    }
  }
  return to
}

/**
 * Mix properties into target object.
 */
export function clone(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject(arr) {
  const res = {}
  for (let i = 0 i < arr.length i++) {
    if (arr[i]) {
      clone(res, arr[i])
    }
  }
  return res
}

/**
 * Ensure a function is called only once.
 */
export function once(fn) {
  let called = false
  return function() {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
