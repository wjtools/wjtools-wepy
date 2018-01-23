import config from 'config';
// import es6 from 'es6-promise';

class Tools {
  constructor(opts = {}) {
    Object.assign(this, {
      opts,
      globalData: {}
    });
  }

  /**
   * 判断某个元素是否为字符串
   * @param  {String}  value
   * @return {Boolean}
   */
  isString(value) {
    return typeof value === 'string';
  }

  /**
   * 判断某个元素是否为函数
   * @param  {Function}  value
   * @return {Boolean}
   */
  isFunction(value) {
    return this.type(value) === 'function';
  }

  /**
   * 判断某个元素是否为数组
   * @param  {Array}  value
   * @return {Boolean}
   */
  isArray(value) {
    return Array.isArray(value);
  }

  /**
   * 判断某个元素是否为对象
   * @param  {Obejct}  value
   * @return {Boolean}
   */
  isObject(value) {
    return value !== null && typeof value === 'object';
  }

  /**
   * 判断某个元素是否为数值
   * @param  {Number}  value
   * @return {Boolean}
   */
  isNumber(value) {
    return typeof value === 'number';
  }

  /**
   * 判断某个元素是否为日期
   * @param  {Date}  value
   * @return {Boolean}
   */
  isDate(value) {
    return this.type(value) === '[object Date]';
  }

  /**
   * 判断某个元素是否为正则表达式
   * @param  {RegExp}  value
   * @return {Boolean}
   */
  isRegExp(value) {
    return this.type(value) === '[object RegExp]';
  }

  /**
   * 判断某个元素是否为File对象
   * @param  {Object}  obj
   * @return {Boolean}
   */
  isFile(obj) {
    return this.type(obj) === '[object File]';
  }

  /**
   * 判断某个元素是否为FormData对象
   * @param  {Object}  obj
   * @return {Boolean}
   */
  isFormData(obj) {
    return this.type(obj) === '[object FormData]';
  }

  /**
   * 判断某个元素是否为Blob对象
   * @param  {Object}  obj
   * @return {Boolean}
   */
  isBlob(obj) {
    return this.type(obj) === '[object Blob]';
  }

  /**
   * 判断某个元素是否为布尔值
   * @param  {boolean}  value
   * @return {Boolean}
   */
  isBoolean(value) {
    return typeof value === 'boolean';
  }

  /**
   * 判断某个元素是否为Promise对象
   * @param  {Function}  obj
   * @return {Boolean}
   */
  isPromiseLike(obj) {
    return obj && this.isFunction(obj.then);
  }

  /**
   * 判断数组类型
   * @param  {Array}  value
   * @return {Boolean}
   */
  isTypedArray(value) {
    const TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/;
    return value && this.isNumber(value.length) && TYPED_ARRAY_REGEXP.test(this.type(value));
  }

  /**
   * 判断某个元素是否为ArrayBuffer对象
   * @param  {Object}  obj
   * @return {Boolean}
   */
  isArrayBuffer(obj) {
    return this.type(obj) === '[object ArrayBuffer]';
  }

  /**
   * 判断某个元素是否为defined
   * @param  {undefined}  value
   * @return {Boolean}
   */
  isDefined(value) {
    return typeof value !== 'undefined';
  }

  /**
   * 判断某个元素是否为undefined
   * @param  {undefined}  value
   * @return {Boolean}
   */
  isUndefined(value) {
    return typeof value === 'undefined';
  }

  /**
   * 判断某个元素是否为null
   * @param  {Null}  value
   * @return {Boolean}
   */
  isNull(value) {
    return value === null;
  }

  /**
   * 判断某个元素是否为有限数
   * @param  {Number}  value
   * @return {Boolean}
   */
  isFinite(value) {
    return typeof value == 'number' && isFinite(value);
  }

  /**
   * 判断某个元素是否为自然数
   * @param  {Number}  value
   * @return {Boolean}
   */
  isNaN(value) {
    return this.isNumber(value) && value != +value;
  }

  /**
   * 判断某个元素是否为错误类型
   * @param  {Object}  value
   * @return {Boolean}
   */
  isError(value) {
    return this.type(value) === '[object Error]';
  }

  /**
   * 删除字符串左右两端的空格
   * @param  {String} str
   * @return {String}
   */
  trim(str) {
    return this.isString(str) ? str.trim() : str;
  }

  /**
   * 字符串转义
   * @param  {String} str
   * @return {String}
   */
  escapeForRegexp(str) {
    return str.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
  }

  /**
   * 字符串转对象
   * @param  {String} str 'key1,key2,...'
   * @return {Object} in the form of {key1:true, key2:true, ...}
   */
  makeMap(str) {
    let obj = {},
      items = str.split(',');
    for (let i = 0; i < items.length; i++) {
      obj[items[i]] = !0;
    }
    return obj;
  }

  /**
   * 判断数组中是否含有指定元素
   * @param  {Array} arr
   * @param  {Objext} obj
   * @return {Array}
   */
  includes(arr, obj) {
    return Array.prototype.indexOf.call(arr, obj) != -1;
  }

  /**
   * 数组删除指定的元素，并返回元素的索引值
   * @param  {Array} array
   * @param  {String} value
   * @return {Number}
   */
  arrayRemove(array, value) {
    let index = array.indexOf(value);
    if (index >= 0) {
      array.splice(index, 1);
    }
    return index;
  }

  /**
   * 日期增加分钟
   * @param  {Date} date
   * @param  {Number} minutes
   * @return {Date}
   */
  addDateMinutes(date, minutes) {
    date = new Date(date.getTime());
    date.setMinutes(date.getMinutes() + minutes || 0);
    return date;
  }

  /**
   * 对象解析出JSON字符串
   * @param  {Object} obj
   * @param  {Number} pretty
   * @return {Object}
   */
  toJson(obj, pretty) {
    if (this.isUndefined(obj)) return undefined;
    if (!this.isNumber(pretty)) {
      pretty = pretty ? 2 : null;
    }
    return JSON.stringify(obj, null, pretty);
  }

  /**
   * JSON字符串解析成对象
   * @param  {String} json
   * @return {Object}
   */
  fromJson(json) {
    return this.isString(json) ? JSON.parse(json) : json;
  }

  /**
   * 扩展对象
   * @return {Object}
   */
  extend() {
    let src, copyIsArray, copy, name, options, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = !1;

    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[i] || {};
      i++;
    }

    if (typeof target !== 'object' && !this.isFunction(target)) {
      target = {};
    }

    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];

          if (target === copy) {
            continue;
          }

          if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = !1;
              clone = src && this.isArray(src) ? src : [];
            } else {
              clone = src && this.isPlainObject(src) ? src : {};
            }
            target[name] = this.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  }

  /**
   * 判断传入的参数是否为纯粹的对象，即直接量{}或new Object()创建的对象
   * @param  {[type]}  obj [description]
   * @return {Boolean}     [description]
   */
  isPlainObject(obj) {
    let getProto = Object.getPrototypeOf;
    let class2type = {};
    let toString = class2type.toString;
    let hasOwn = class2type.hasOwnProperty;
    let fnToString = hasOwn.toString;
    let ObjectFunctionString = fnToString.call(Object);
    let proto, Ctor;
    if (!obj || this.type(obj) !== '[object Object]') {
      return !1;
    }
    proto = getProto(obj);
    if (!proto) {
      return !0;
    }
    Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
  }

  /**
   * 判断对象是否为空
   * @param  {Object}  obj
   * @return {Boolean}
   */
  isEmptyObject(obj) {
    for (let i in obj)
      return !1;
    return !0;
  }

  /**
   * 判断对象的类型
   * @param  {Object} obj
   * @return {String}
   */
  type(obj) {
    const toString = Object.prototype.toString;

    if (obj == null) {
      return obj + '';
    }

    return typeof obj === 'object' || typeof obj === 'function' ? toString.call(obj) || 'object' : typeof obj;
  }

  /**
   * 合并对象并返回一个新的对象，目标对象自身也会改变
   * @param  {Array} args
   * @return {Object}
   */
  merge(...args) {
    return Object.assign(...args);
  }

  /**
   * 拷贝对象并返回一个新的对象
   * @param  {Object} obj
   * @return {Object}
   */
  clone(obj) {
    if (typeof obj !== 'object' || !obj) {
      return obj;
    }
    let copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = obj[attr];
      }
    }
    return copy;
  }

  /**
   * 删除对象上的指定属性并返回一个新的对象
   * @param  {Object} obj
   * @param  {Array} keys
   * @return {[type]}
   */
  omit(obj, keys) {
    let o = this.clone(obj);
    keys.forEach(key => {
      delete o[key];
    });
    return o;
  }

  /**
   * 返回一个新数组，数组中的元素为指定属性的值
   * @param  {Array} arr
   * @param  {String} key
   * @return {Array}
   */
  pluck(arr, key) {
    if (typeof arr !== 'object' || arr.length === 0) {
      return [];
    }
    if (!key) {
      return arr;
    }
    return arr.map(a => a[key]);
  }

  /**
   * 返回序列化的值
   * @param  {String} value
   * @return {String}
   */
  serializeValue(value) {
    if (this.isObject(value)) return this.isDate(value) ? value.toISOString() : this.toJson(value);
    return value;
  }

  /**
   * 编码URI
   * @param  {String} value
   * @param  {String} pctEncodeSpaces
   * @return {String}
   */
  encodeUriQuery(value, pctEncodeSpaces) {
    return encodeURIComponent(value)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%3B/gi, ';')
      .replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
  }

  /**
   * 对象序列化
   * @param  {Object} obj
   * @return {String}
   */
  paramSerializer(obj) {
    if (!obj) return '';
    let that = this;
    let parts = [];
    for (let key in obj) {
      const value = obj[key];
      if (value === null || that.isUndefined(value)) return;
      if (that.isArray(value)) {
        value.forEach(function(v) {
          parts.push(that.encodeUriQuery(key) + '=' + that.encodeUriQuery(that.serializeValue(v)));
        });
      } else {
        parts.push(that.encodeUriQuery(key) + '=' + that.encodeUriQuery(that.serializeValue(value)));
      }
    }
    return parts.join('&');
  }

  /**
   * 拼接URL
   * @param  {String} obj
   * @param  {Object} obj
   * @return {String}
   */
  buildUrl(url, obj) {
    const serializedParams = this.paramSerializer(obj);
    if (serializedParams.length > 0) {
      url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams;
    }
    return url;
  }

  /**
   * 格式化时间
   * @param  {Object} date
   * @return {String}
   */
  formatTime(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':');
  }

  /**
   * 格式化数字：个数数前补0
   * @param  {Number} number
   * @return {String}
   */
  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }

  // 获取当前的位置信息
  getLocation(callback) {
    let self = this;

    if (this.globalData.location) {
      callback(this.globalData.location);
    } else {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function(res) {
          self.globalData.location = res;
          callback(self.globalData.location);
        }
      });
    }
  }

  /**
   * 通过经纬度获取城市数据(逆地理编码)
   * @param  {String} lng
   * @param  {String} lat
   * @param  {Function} callback
   */
  getCityByLocation(lng, lat, callback) {
    let page = this;
    let key = config.amapwebkey;
    let url = 'https://restapi.amap.com/v3/geocode/regeo';

    wx.request({
      url,
      data: {
        // s: 'rsx',
        key,
        location: `${lng},${lat}`
      },
      // header: {}, // 设置请求的 header
      method: 'GET',
      success(res) {
        callback && callback(res.data.regeocode);
      },
      fail: function(info) {
        wx.showModal({
          title: info.errMsg
        });
      }
    });
  }

  /**
   * 通过城市名称获取城市数据
   * @param  {String} keywords
   * @param  {Function} callback
   */
  getCityByName(keywords, callback) {
    let page = this;
    let key = config.amapwebkey;
    let url = 'https://restapi.amap.com/v3/config/district';

    wx.request({
      url,
      data: {
        // s: 'rsx',
        key,
        keywords,
        subdistrict: 0 // 0-不返回下级行政区 1~3-返回下n级行政区；
      },
      // header: {
      //   apikey: key // page.data.weatherApikey
      // },
      method: 'GET',
      success(res) {
        callback && callback(res.data.districts[0]);
      },
      fail: function(info) {
        wx.showModal({
          title: info.errMsg
        });
      }
    });
  }

  /**
   * 截掉字符串最后几位 如（3）12:12:00 -> 12:12
   * @param  {String} str
   * @param  {Number} num
   * @return {String}
   */
  fnSlice(str, num) {
    if (typeof str === 'undefined' || !str) {
      return str;
    }
    return str.slice(0, -num);
  }

  /**
   * 订单列表 计算支付剩余时间
   * @param  {String} orderTime 如'2017-03-16 09:59:00'
   * @param  {String} nowTime
   * @param  {String} orderKeepTime
   * @return {String}
   */
  orderLeftTime(orderTime, nowTime, orderKeepTime) {
    let ret = 0;
    orderTime = orderTime.replace(/-/g, '/');
    nowTime = nowTime.replace(/-/g, '/');

    ret = Math.ceil(orderKeepTime - (Date.parse(nowTime) - Date.parse(orderTime)) / (60 * 1000));
    return ret > 0 ? ret : 0;
  }

  /**
   * 时间格式化
   * @param  {String} time需要格式化的时间， serverTime 当前时间
   * @param  {Function} callback
   */
  timeFilter(time, serverTime) {
    let moment = require('./moment.js');
    var date = moment.unix(time);
    if (moment(serverTime).isSame(date, 'year')) {
      return date.format('MM-DD HH:mm');
    } else {
      return date.format('YYYY-MM-DD HH:mm');
    }
  }

  /**
   * 报名截止状态
   * @param  {String} time活动报名结束时间， serverTime 当前时间
   * @param  {Function} callback
   */
  endTimeFilter(time, serverTime) {
    let moment = require('./moment.js');
    var date = moment.unix(time);
    var difMin = date.diff(moment(serverTime), 'minutes');
    if (difMin > 24*60) {
      return '报名：剩' + date.diff(moment(serverTime), 'days') + '天';
    } else if (difMin > 60) {
      return '报名：剩' + date.diff(moment(serverTime), 'hours') + '小时';
    } else if (difMin > 1) {
      return '报名：剩' + difMin + '分钟';
    } else {
      return '报名已截止';
    }
  }

  /**
   * 分转元
   * @param  {String} money 需要转化的钱
   * @param  {Function} callback
   */
  fenToYuan(money) {
    if (!money) return 0;
      return Number(money)/(100);
  }

  /**
   * 去零保留两位
   * @param  {String} price
   * @return {String}
   */
  fnDelZero(price) {
    // 价格统一显示函数，整数显示整数，小数显示一位小数
    if (typeof price === "undefined" || !price) {
      return price;
    }

    const oNum = price.toString();

    if (price == 0) {
      return '0';
    }

    if (oNum.indexOf('.') == -1) {
      return price;
    }

    let arr = oNum.split('.');
    let arr_t = arr[1];
    if (arr[0] == 0) {
      arr[0] = 0;
    }

    if (arr_t.length >= 2) {
      arr_t = arr_t.substr(0, 2);
    }

    for (let i = 0, len = arr_t.length; i < len; i++) {
      if (arr_t.length > 0 && arr_t.charAt(arr_t.length - 1) == 0) {
        arr_t = arr_t.slice(0, -1);
      }
    }
    return arr_t.length > 0 ? arr[0] + '.' + arr_t : arr[0];
  }
}

export default Tools;